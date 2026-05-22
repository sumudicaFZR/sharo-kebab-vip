"use client";

import { useEffect, useRef } from "react";

type MusicNodes = {
  context: AudioContext;
  master: GainNode;
  delay: DelayNode;
  feedback: GainNode;
  filter: BiquadFilterNode;
  timer: number;
  step: number;
  nextTime: number;
};

const AudioContextClass = () =>
  window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

function pluck(context: AudioContext, destination: AudioNode, frequency: number, time: number, velocity: number) {
  const osc = context.createOscillator();
  const gain = context.createGain();
  const tone = context.createBiquadFilter();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(frequency, time);
  tone.type = "lowpass";
  tone.frequency.setValueAtTime(1150, time);
  tone.Q.setValueAtTime(3.2, time);
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(velocity, time + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.72);

  osc.connect(tone);
  tone.connect(gain);
  gain.connect(destination);
  osc.start(time);
  osc.stop(time + 0.78);
}

function drum(context: AudioContext, destination: AudioNode, time: number, kind: "kick" | "hat") {
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.type = kind === "kick" ? "sine" : "square";
  osc.frequency.setValueAtTime(kind === "kick" ? 96 : 520, time);
  osc.frequency.exponentialRampToValueAtTime(kind === "kick" ? 46 : 720, time + 0.1);
  gain.gain.setValueAtTime(kind === "kick" ? 0.18 : 0.025, time);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + (kind === "kick" ? 0.18 : 0.045));
  osc.connect(gain);
  gain.connect(destination);
  osc.start(time);
  osc.stop(time + 0.22);
}

function createMusic(): MusicNodes | null {
  const Context = AudioContextClass();
  if (!Context) return null;

  const context = new Context();
  const master = context.createGain();
  const filter = context.createBiquadFilter();
  const delay = context.createDelay(1.2);
  const feedback = context.createGain();

  master.gain.setValueAtTime(0.0001, context.currentTime);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1800, context.currentTime);
  delay.delayTime.setValueAtTime(0.34, context.currentTime);
  feedback.gain.setValueAtTime(0.18, context.currentTime);

  filter.connect(master);
  filter.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(master);
  master.connect(context.destination);

  const nodes: MusicNodes = {
    context,
    master,
    delay,
    feedback,
    filter,
    timer: 0,
    step: 0,
    nextTime: context.currentTime + 0.04
  };

  const bpm = 78;
  const beat = 60 / bpm;
  const scale = [196, 207.65, 246.94, 261.63, 293.66, 311.13, 392];
  const pattern = [0, 2, 3, 2, 5, 3, 2, 1, 0, 2, 6, 5, 3, 2, 1, 0];

  function schedule() {
    while (nodes.nextTime < context.currentTime + 0.22) {
      const step = nodes.step % 16;
      const note = scale[pattern[step]];
      if ([0, 3, 6, 8, 11, 14].includes(step)) {
        pluck(context, filter, note, nodes.nextTime, 0.055);
      }
      if (step === 0 || step === 8) drum(context, filter, nodes.nextTime, "kick");
      if (step === 4 || step === 12) drum(context, filter, nodes.nextTime, "hat");
      nodes.step += 1;
      nodes.nextTime += beat / 2;
    }
  }

  nodes.timer = window.setInterval(schedule, 90);
  schedule();
  return nodes;
}

export function BackgroundMusic() {
  const nodesRef = useRef<MusicNodes | null>(null);

  useEffect(() => {
    function start() {
      if (nodesRef.current) {
        void nodesRef.current.context.resume().catch(() => undefined);
        const now = nodesRef.current.context.currentTime;
        nodesRef.current.master.gain.cancelScheduledValues(now);
        nodesRef.current.master.gain.setTargetAtTime(0.12, now, 0.7);
        return;
      }

      try {
        const nodes = createMusic();
        if (!nodes) return;
        nodesRef.current = nodes;
        nodes.master.gain.setTargetAtTime(0.12, nodes.context.currentTime, 0.7);
      } catch {
        nodesRef.current = null;
      }
    }

    function stop() {
      const nodes = nodesRef.current;
      if (!nodes) return;
      const now = nodes.context.currentTime;
      nodes.master.gain.cancelScheduledValues(now);
      nodes.master.gain.setTargetAtTime(0.0001, now, 0.35);
      window.setTimeout(() => void nodes.context.suspend().catch(() => undefined), 650);
    }

    function handleSoundChange(event: Event) {
      const enabled = event instanceof CustomEvent ? Boolean(event.detail?.enabled) : window.localStorage.getItem("sharo_sound") === "on";
      if (enabled) start();
      else stop();
    }

    function firstGesture() {
      if (window.localStorage.getItem("sharo_sound") === "on") start();
    }

    window.addEventListener("sharo:sound-change", handleSoundChange);
    window.addEventListener("pointerdown", firstGesture, { once: true });
    window.addEventListener("keydown", firstGesture, { once: true });

    return () => {
      window.removeEventListener("sharo:sound-change", handleSoundChange);
      window.removeEventListener("pointerdown", firstGesture);
      window.removeEventListener("keydown", firstGesture);
      const nodes = nodesRef.current;
      if (nodes) {
        window.clearInterval(nodes.timer);
        void nodes.context.close().catch(() => undefined);
      }
      nodesRef.current = null;
    };
  }, []);

  return null;
}

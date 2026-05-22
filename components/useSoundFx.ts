"use client";

import { useCallback } from "react";

const soundMap = {
  hover: "/sounds/hover.mp3",
  click: "/sounds/click.mp3",
  stamp: "/sounds/stamp.mp3"
} as const;

export type SoundName = keyof typeof soundMap;

function soundEnabled() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem("sharo_sound") === "on";
}

function synthSound(name: SoundName, volume: number) {
  const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  const context = new AudioContextClass();
  const gain = context.createGain();
  const osc = context.createOscillator();
  const filter = context.createBiquadFilter();
  const now = context.currentTime;

  const settings = {
    hover: { start: 520, end: 760, duration: 0.075, type: "sine" as OscillatorType, gain: volume * 0.22 },
    click: { start: 220, end: 120, duration: 0.09, type: "triangle" as OscillatorType, gain: volume * 0.55 },
    stamp: { start: 440, end: 980, duration: 0.22, type: "sine" as OscillatorType, gain: volume * 0.78 }
  }[name];

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1600, now);
  osc.type = settings.type;
  osc.frequency.setValueAtTime(settings.start, now);
  osc.frequency.exponentialRampToValueAtTime(settings.end, now + settings.duration);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, settings.gain), now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + settings.duration);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);
  osc.start(now);
  osc.stop(now + settings.duration + 0.02);
  osc.onended = () => void context.close().catch(() => undefined);
}

export function useSoundFx() {
  return useCallback((name: SoundName, volume = 0.24) => {
    if (!soundEnabled()) return;
    try {
      const audio = new Audio(soundMap[name]);
      audio.volume = volume;
      void audio.play().catch(() => synthSound(name, volume));
    } catch {
      try {
        synthSound(name, volume);
      } catch {
        // Missing files or blocked playback should never break the app.
      }
    }
  }, []);
}

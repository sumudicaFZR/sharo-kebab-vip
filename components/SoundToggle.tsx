"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSoundFx } from "@/components/useSoundFx";

export function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const [armed, setArmed] = useState(false);
  const play = useSoundFx();
  const lastHover = useRef(0);

  useEffect(() => {
    const stored = window.localStorage.getItem("sharo_sound") === "on";
    setEnabled(stored);
    setArmed(stored);
    if (stored) window.dispatchEvent(new CustomEvent("sharo:sound-change", { detail: { enabled: true } }));

    function handleHover(event: Event) {
      if (!(event.target instanceof Element) || !event.target.closest(".sound-hover")) return;
      const now = Date.now();
      if (now - lastHover.current < 260) return;
      lastHover.current = now;
      play("hover", 0.28);
    }

    function handleClick(event: Event) {
      if (event instanceof CustomEvent && event.type === "sharo:stamp") {
        play("stamp", 0.55);
        return;
      }
      if (!(event.target instanceof Element) || !event.target.closest(".sound-click")) return;
      play("click", 0.34);
    }

    document.addEventListener("mouseover", handleHover);
    document.addEventListener("click", handleClick);
    window.addEventListener("sharo:stamp", handleClick as EventListener);
    return () => {
      document.removeEventListener("mouseover", handleHover);
      document.removeEventListener("click", handleClick);
      window.removeEventListener("sharo:stamp", handleClick as EventListener);
    };
  }, [play]);

  function toggle() {
    const next = !enabled;
    setEnabled(next);
    setArmed(next);
    window.localStorage.setItem("sharo_sound", next ? "on" : "off");
    window.dispatchEvent(new CustomEvent("sharo:sound-change", { detail: { enabled: next } }));
    if (next) {
      window.setTimeout(() => play("click", 0.42), 20);
      window.setTimeout(() => play("hover", 0.3), 130);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`sound-click sound-toggle spotlight-shell fixed right-4 top-4 z-[60] inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-black text-cream shadow-glow backdrop-blur-xl ${
        enabled ? "border-ember/70 bg-ember/18" : "border-cream/15 bg-coal/78"
      }`}
      aria-pressed={enabled}
    >
      {enabled ? <Volume2 className="h-4 w-4 text-ember" /> : <VolumeX className="h-4 w-4 text-smoke" />}
      <span>{enabled ? "Sound ON" : "Activeaza sunet"}</span>
      {!armed && <span className="ml-1 h-2 w-2 animate-pulse rounded-full bg-ember" />}
    </button>
  );
}

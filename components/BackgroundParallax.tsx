"use client";

import { useEffect } from "react";

export function BackgroundParallax() {
  useEffect(() => {
    let frame = 0;
    function handleMove(event: MouseEvent) {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const x = ((event.clientX / window.innerWidth) - 0.5) * 8;
        const y = ((event.clientY / window.innerHeight) - 0.5) * 8;
        document.documentElement.style.setProperty("--bg-x", `${x.toFixed(2)}px`);
        document.documentElement.style.setProperty("--bg-y", `${y.toFixed(2)}px`);
      });
    }
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}

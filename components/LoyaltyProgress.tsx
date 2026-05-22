"use client";

import { motion } from "framer-motion";

export function LoyaltyProgress({ points, max = 15 }: { points: number; max?: number }) {
  const percent = Math.min(100, (points / max) * 100);
  const milestones = [
    { value: 5, label: "5 🔥" },
    { value: 10, label: "10 🔥🔥 VIP" },
    { value: 15, label: "15 🔥🔥🔥 LEGEND" }
  ];

  return (
    <div className="mt-5">
      <div className="relative h-3 overflow-hidden rounded-full bg-cream/10 shadow-[inset_0_0_18px_rgba(255,122,26,0.12)]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="progress-fill h-full rounded-full"
        />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {milestones.map((milestone) => (
          <div key={milestone.value} className={`rounded-md border px-2 py-2 text-center text-[11px] font-black ${points >= milestone.value ? "border-ember bg-ember/15 text-ember" : "border-cream/10 text-smoke"}`}>
            {milestone.label}
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2 text-center text-[11px] font-bold text-cream/80">
        <span>Ayran / Cartofi</span>
        <span>50% Cheese / Upgrade</span>
        <span>Cheese Kebab GRATIS</span>
      </div>
    </div>
  );
}

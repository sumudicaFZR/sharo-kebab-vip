"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export function RewardUnlockModal({ points }: { points: number }) {
  if (points < 5) return null;
  const label = points >= 15 ? "SHARO LEGEND" : points >= 10 ? "VIP reward" : "Bonus reward";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 22 }}
      className="reward-unlock mt-4 rounded-lg border border-ember/50 bg-ember/12 p-4"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-ember text-coal shadow-glow">
          <Flame className="h-6 w-6 fill-coal" />
        </span>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-ember">Reward unlock</p>
          <strong className="text-lg text-cream">{label}</strong>
        </div>
      </div>
      <p className="mt-3 text-sm text-smoke">Arată acest ecran la casă pentru confirmare staff.</p>
    </motion.div>
  );
}

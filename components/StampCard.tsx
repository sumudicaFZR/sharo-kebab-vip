"use client";

import { motion } from "framer-motion";
import { Flame, Stamp } from "lucide-react";
import { LoyaltyProgress } from "@/components/LoyaltyProgress";
import { RewardUnlockModal } from "@/components/RewardUnlockModal";
import { SpotlightCard } from "@/components/SpotlightCard";

export function StampCard({ points = 7 }: { points?: number }) {
  const max = 15;
  const nextReward = points >= 10 ? 0 : max - points;

  return (
    <SpotlightCard className="loyalty-reference-card sound-hover rounded-lg p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-smoke">Loialitate</p>
          <h2 className="mt-3 text-2xl font-black text-cream">Ai {points} din 15 ștampile 🔥</h2>
        </div>
        <div className="rounded-full bg-cream px-3 py-1 text-sm font-black text-coal">{points}/15</div>
      </div>

      <div className="mt-5 grid grid-cols-5 gap-3">
        {Array.from({ length: max }).map((_, index) => {
          const active = index < points;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.025, duration: 0.18 }}
              className={`grid aspect-square min-h-12 place-items-center rounded-lg border sm:min-h-14 ${
                active
                  ? "border-ember bg-ember text-coal shadow-[0_0_24px_rgba(255,122,26,0.38)]"
                  : "border-cream/15 bg-white/[0.035] text-cream/25"
              }`}
            >
              {active ? <Stamp className="h-5 w-5" /> : <Flame className="h-4 w-4" />}
            </motion.div>
          );
        })}
      </div>

      <LoyaltyProgress points={points} />

      <div className="mobile-loyalty-notes">
        <span>Următorul reward: 10 ștampile</span>
        <span>Ștampilele expiră în 60 de zile</span>
      </div>

      <RewardUnlockModal points={points} />
      <p className="mt-4 text-sm leading-6 text-smoke">
        {points >= 15
          ? "SHARO LEGEND deblocat. Arată acest ecran la casă."
          : points >= 10
            ? "Reward VIP disponibil: Cheese Kebab gratuit sau voucher discount."
            : points >= 5
              ? `Reward disponibil la 5 ștampile. Mai ai nevoie de ${nextReward} vizite pentru reward mare.`
              : `Mai ai nevoie de ${5 - points} vizite pentru Ayran sau cartofi gratis.`}
      </p>
    </SpotlightCard>
  );
}

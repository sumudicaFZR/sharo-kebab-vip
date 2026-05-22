"use client";

import { Crown } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

const legends = [
  { name: "Marius", visits: 42 },
  { name: "Alex", visits: 38 },
  { name: "Bogdan", visits: 31 },
  { name: "Andrei", visits: 26 },
  { name: "Robert", visits: 24 }
];

export function LeaderboardCard() {
  return (
    <SpotlightCard className="leaderboard-card sound-hover rounded-lg border border-cream/10 bg-white/[0.045] p-5 backdrop-blur-xl lg:p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-ember">Clasament pe ultimele 60 de zile</p>
          <h2 className="mt-2 text-3xl font-black text-cream">TOP SHARO LEGENDS 🔥</h2>
        </div>
        <div className="hidden rounded-full border border-ember/30 bg-ember/10 px-3 py-1 text-xs font-black text-ember sm:block">LIVE</div>
      </div>
      <div className="mt-5 grid gap-2">
        {legends.map((legend, index) => (
          <div key={legend.name} className="leader-row flex items-center gap-3 rounded-md border border-cream/10 bg-coal/55 p-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-cream text-sm font-black text-coal">
              {index === 0 ? <Crown className="h-5 w-5 fill-ember text-ember" /> : index + 1}
            </div>
            <div className="min-w-0 flex-1">
              <strong className="block truncate text-cream">{legend.name}</strong>
              <span className="text-xs text-smoke">{legend.visits} vizite</span>
            </div>
            <span className="inline-flex items-center gap-1 rounded-md border border-ember/30 bg-ember/15 px-3 py-1 text-xs font-black text-ember">
              VIP
            </span>
          </div>
        ))}
      </div>
    </SpotlightCard>
  );
}

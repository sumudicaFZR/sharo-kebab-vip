import type { LucideIcon } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

export function StatCard({ label, value, icon: Icon }: { label: string; value: string | number; icon: LucideIcon }) {
  return (
    <SpotlightCard className="sound-hover rounded-lg border border-cream/10 bg-white/[0.045] p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-bold text-smoke">{label}</p>
        <Icon className="h-5 w-5 text-ember" />
      </div>
      <strong className="mt-3 block text-3xl font-black text-cream">{value}</strong>
    </SpotlightCard>
  );
}

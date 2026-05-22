import type { LucideIcon } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

export function FeatureTile({ icon: Icon, kicker, title, text, action }: { icon: LucideIcon; kicker: string; title: string; text: string; action: string }) {
  return (
    <SpotlightCard className="sound-hover rounded-lg border border-cream/10 bg-white/[0.045] p-5 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-ember">{kicker}</p>
          <h3 className="mt-3 text-xl font-black text-cream">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-smoke">{text}</p>
        </div>
        <Icon className="h-9 w-9 text-ember drop-shadow-[0_0_18px_rgba(255,122,26,0.55)]" />
      </div>
      <div className="mt-5 rounded-md bg-ember/12 px-4 py-3 text-center text-sm font-black text-ember">{action}</div>
    </SpotlightCard>
  );
}

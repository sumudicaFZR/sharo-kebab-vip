import { Gift, MessageCircle, QrCode, Repeat2, ShieldCheck, Star, Users } from "lucide-react";
import { AdminShell } from "@/components/AdminShell";
import { StatCard } from "@/components/StatCard";
import { analytics } from "@/lib/data";

export default function DashboardPage() {
  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Clienti total" value={analytics.totalCustomers} icon={Users} />
        <StatCard label="Scanari QR" value={analytics.totalScans} icon={QrCode} />
        <StatCard label="Vizite" value={analytics.totalVisits} icon={Repeat2} />
        <StatCard label="Reward-uri revendicate" value={analytics.rewardsClaimed} icon={Gift} />
        <StatCard label="Clienti activi" value={analytics.activeCustomers} icon={Users} />
        <StatCard label="Review clicks" value={analytics.reviewClicks} icon={Star} />
        <StatCard label="WhatsApp clicks" value={analytics.whatsappClicks} icon={MessageCircle} />
        <StatCard label="Returning customers" value={`${analytics.returningCustomers}%`} icon={Repeat2} />
        <StatCard label="Secret QR flow" value="Activ" icon={ShieldCheck} />
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <section className="rounded-lg border border-cream/10 bg-white/[0.04] p-5">
          <h2 className="text-xl font-black">Best hours</h2>
          <div className="mt-5 grid gap-3">
            {analytics.bestHours.map((item) => (
              <div key={item.hour} className="grid grid-cols-[70px_1fr_50px] items-center gap-3">
                <span className="text-sm text-smoke">{item.hour}</span>
                <div className="h-3 overflow-hidden rounded-full bg-cream/10">
                  <div className="h-full rounded-full bg-ember" style={{ width: `${Math.min(100, item.visits)}%` }} />
                </div>
                <strong>{item.visits}</strong>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-lg border border-cream/10 bg-white/[0.04] p-5">
          <h2 className="text-xl font-black">Top products clicked</h2>
          <div className="mt-5 grid gap-3">
            {analytics.topProducts.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-md bg-coal p-3">
                <span>{item.name}</span>
                <strong className="text-ember">{item.clicks}</strong>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}

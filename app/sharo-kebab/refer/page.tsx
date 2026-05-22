import { Share2 } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { StickyCustomerNav } from "@/components/StickyCustomerNav";

export default function ReferPage() {
  return (
    <main className="min-h-screen pb-28 text-cream">
      <div className="mx-auto max-w-2xl px-4 py-6">
        <BrandMark />
        <section className="mt-8 rounded-lg border border-cream/10 bg-white/[0.04] p-6">
          <Share2 className="h-8 w-8 text-ember" />
          <h1 className="mt-4 text-3xl font-black">Invita un prieten</h1>
          <p className="mt-3 leading-7 text-smoke">Trimite codul tau referral. Cand prietenul intra in SHARO VIP CLUB, amandoi primiti bonus points dupa prima vizita validata.</p>
          <div className="mt-5 rounded-md bg-coal p-4 text-center text-2xl font-black text-ember">SHARO-VIP-DEMO</div>
        </section>
      </div>
      <StickyCustomerNav />
    </main>
  );
}

import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { StampCard } from "@/components/StampCard";
import { StickyCustomerNav } from "@/components/StickyCustomerNav";

export default function LoyaltyPage() {
  return (
    <main className="min-h-screen pb-28 text-cream">
      <div className="mx-auto max-w-3xl px-4 py-6">
        <BrandMark />
        <section className="mt-8">
          <StampCard points={7} />
          <div className="mt-5 rounded-lg border border-cream/10 bg-white/[0.04] p-5">
            <h1 className="text-3xl font-black">Revendica recompensa</h1>
            <p className="mt-3 leading-7 text-smoke">La 5 stampile alegi Ayran sau cartofi. La 10 stampile primesti Cheese Kebab sau voucher discount.</p>
            <p className="mt-3 font-black text-ember">Arată acest ecran la casă pentru reward. Reward-urile sunt confirmate doar de staff.</p>
            <Link href="/sharo-kebab/refer" className="mt-5 inline-flex rounded-md bg-ember px-5 py-3 font-black text-coal">
              Invita un prieten
            </Link>
          </div>
        </section>
      </div>
      <StickyCustomerNav />
    </main>
  );
}

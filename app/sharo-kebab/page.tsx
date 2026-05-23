import Link from "next/link";
import { Bot, Gift, MessageCircle, QrCode, ShieldCheck, Sparkles, Star, Utensils } from "lucide-react";
import { AmbientGlow } from "@/components/AmbientGlow";
import { BrandMark } from "@/components/BrandMark";
import { FeatureTile } from "@/components/FeatureTile";
import { HeroQrOffer } from "@/components/HeroQrOffer";
import { HeroTitle } from "@/components/HeroTitle";
import { LeaderboardCard } from "@/components/LeaderboardCard";
import { LoyaltyJoinForm } from "@/components/LoyaltyJoinForm";
import { MotionSection } from "@/components/MotionSection";
import { ProductCard } from "@/components/ProductCard";
import { StampCard } from "@/components/StampCard";
import { StickyCustomerNav } from "@/components/StickyCustomerNav";
import { SpotlightCard } from "@/components/SpotlightCard";
import { SpotlightLink } from "@/components/SpotlightLink";
import { getWhatsAppUrl, menuItems } from "@/lib/data";

export default function SharoLandingPage() {
  const featured = menuItems.filter((item) => item.is_featured).slice(0, 4);

  return (
    <main className="cinematic-grid min-h-screen pb-28 text-cream">
      <AmbientGlow />
      <div className="customer-page-shell mx-auto w-full max-w-[1280px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div aria-hidden="true" />
          <BrandMark size="hero" showVip />
          <div className="flex items-center justify-end gap-3">
            <Link href="/admin/login" className="hidden rounded-md border border-cream/15 px-4 py-2 text-sm font-bold text-cream/80 lg:block">
              Admin
            </Link>
            <div className="hidden rounded-md border border-cream/10 bg-coal/45 p-3 lg:block">
              <ShieldCheck className="h-5 w-5 text-ember" />
            </div>
          </div>
        </header>

        <MotionSection className="mobile-hero-section grid gap-7 py-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-10 lg:py-10">
          <section className="text-center lg:text-left">
            <HeroTitle />
            <p className="mobile-value-line">Mănânci. Scanezi. Primești reward-uri.</p>
            <div className="mobile-hero-actions mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <SpotlightLink href="#join" className="hero-cta-primary inline-flex min-h-14 items-center justify-center gap-2 rounded-md bg-ember px-8 py-4 text-lg font-black text-coal">
                <Gift className="h-5 w-5" />
                Intră în club
              </SpotlightLink>
              <SpotlightLink href="/sharo-kebab/review" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-md border border-cream/15 bg-coal/35 px-8 py-4 text-lg font-black text-cream backdrop-blur-xl">
                <Star className="h-5 w-5 text-ember" />
                Lasă review
              </SpotlightLink>
            </div>
            <HeroQrOffer />
          </section>

          <aside className="grid gap-5">
            <StampCard points={7} />
            <SpotlightCard className="mobile-reward-card sound-hover rounded-lg border border-ember/30 bg-ember/10 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <Gift className="h-9 w-9 text-ember" />
                <SpotlightLink href="/sharo-kebab/loyalty" className="rounded-md border border-ember/30 px-4 py-2 text-sm font-black text-ember">
                  Arată la casă
                </SpotlightLink>
              </div>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-ember">Reward disponibil</p>
              <h2 className="mt-2 text-2xl font-black">5 ștampile</h2>
              <p className="mt-2 leading-7 text-smoke">Alege: Ayran sau Cartofi Mici GRATIS.</p>
            </SpotlightCard>
            <LeaderboardCard />
          </aside>
        </MotionSection>

        <MotionSection id="join" className="mobile-join-section grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <LoyaltyJoinForm />
          <div className="mobile-quick-actions grid gap-5 sm:grid-cols-2">
            <SpotlightLink href="/sharo-kebab/loyalty" className="rounded-lg border border-cream/10 bg-white/[0.045] p-5 backdrop-blur-xl">
              <QrCode className="h-7 w-7 text-ember" />
              <h3 className="mt-4 text-xl font-black">QR de ștampilă</h3>
              <p className="mt-2 text-sm text-smoke">După plată, cere QR-ul secret ținut la casă.</p>
            </SpotlightLink>
            <SpotlightLink data-mobile-section="whatsapp" href={getWhatsAppUrl()} className="rounded-lg border border-cream/10 bg-white/[0.045] p-5 backdrop-blur-xl">
              <MessageCircle className="h-7 w-7 text-ember" />
              <h3 className="mt-4 text-xl font-black">Comandă WhatsApp</h3>
              <p className="mt-2 text-sm text-smoke">Mesaj pregătit: Salut SHARO KEBAB, vreau să comand.</p>
            </SpotlightLink>
            <SpotlightLink href="/sharo-kebab/menu" className="rounded-lg border border-cream/10 bg-white/[0.045] p-5 backdrop-blur-xl">
              <Utensils className="h-7 w-7 text-ember" />
              <h3 className="mt-4 text-xl font-black">Vezi meniul</h3>
              <p className="mt-2 text-sm text-smoke">Cheese, Arăbească, shaorma, sides și desert.</p>
            </SpotlightLink>
            <SpotlightLink data-mobile-section="review" href="/sharo-kebab/review" className="rounded-lg border border-cream/10 bg-white/[0.045] p-5 backdrop-blur-xl">
              <Star className="h-7 w-7 text-ember" />
              <h3 className="mt-4 text-xl font-black">Review Google</h3>
              <p className="mt-2 text-sm text-smoke">Lasă-ne un review și ajută-ne să creștem.</p>
            </SpotlightLink>
          </div>
        </MotionSection>

        <MotionSection className="mobile-products-section mt-10 grid gap-5 lg:grid-cols-[0.78fr_0.78fr_0.78fr_2.05fr]">
          <FeatureTile className="mobile-feature-tile" icon={Bot} kicker="AI recomandă" title="Cheese Pui + Ayran" text="Combo-ul preferat azi" action="Comandă acum" />
          <FeatureTile className="mobile-feature-tile" icon={Sparkles} kicker="Oferte VIP" title="-50% Cheese Kebab" text="La 10 ștampile" action="Vezi oferta" />
          <FeatureTile className="mobile-feature-tile" icon={MessageCircle} kicker="Comandă rapid" title="WhatsApp" text="Comandă pe WhatsApp" action="Comandă acum" />
          <div className="mobile-products-panel rounded-lg border border-cream/10 bg-white/[0.045] p-6 backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-ember">Produse populare</p>
              <Link href="/sharo-kebab/menu" className="text-sm text-smoke">Vezi toate →</Link>
            </div>
            <div className="mobile-product-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </MotionSection>
      </div>
      <StickyCustomerNav />
    </main>
  );
}

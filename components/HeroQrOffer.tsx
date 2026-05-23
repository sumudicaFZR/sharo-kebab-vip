"use client";

import Image from "next/image";
import QRCode from "qrcode";
import { MessageCircle, QrCode, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { getWhatsAppUrl } from "@/lib/data";
import { SpotlightCard } from "@/components/SpotlightCard";
import { SpotlightLink } from "@/components/SpotlightLink";

export function HeroQrOffer() {
  const [qr, setQr] = useState("");

  useEffect(() => {
    const origin = window.location.origin;
    QRCode.toDataURL(`${origin}/sharo-kebab`, {
      width: 720,
      margin: 2,
      color: { dark: "#0b0908", light: "#f7e4bc" }
    }).then(setQr).catch(() => setQr(""));
  }, []);

  return (
    <div className="hero-business-visual mt-7 grid gap-5">
      <SpotlightCard className="qr-hero-card sound-hover rounded-xl border border-ember/30 bg-coal/62 p-6 backdrop-blur-xl">
        <div className="grid gap-5 sm:grid-cols-[220px_1fr] sm:items-center">
          <div className="qr-frame relative mx-auto grid h-56 w-56 place-items-center rounded-2xl border border-ember/50 bg-cream p-4 shadow-[0_0_46px_rgba(255,122,26,0.25)]">
            {qr ? (
              <Image src={qr} alt="QR SHARO KEBAB VIP Club" width={190} height={190} unoptimized className="rounded-md" />
            ) : (
              <QrCode className="h-28 w-28 text-coal" />
            )}
            <span className="qr-scan-line" />
          </div>
          <div className="text-center sm:text-left">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-ember">VIP Club</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-cream sm:text-4xl">
              Scanează pentru VIP Club 🔥
            </h2>
            <p className="mt-3 text-base leading-7 text-smoke">
              Intră în club, strânge ștampile și arată progresul la casă după comandă.
            </p>
          </div>
        </div>
      </SpotlightCard>

      <SpotlightCard className="offer-hero-card sound-hover overflow-hidden rounded-xl border border-ember/25 bg-white/[0.045] backdrop-blur-xl">
        <div className="grid sm:grid-cols-[1fr_1.05fr]">
          <div className="offer-food-image relative min-h-56 overflow-hidden bg-gradient-to-br from-ember/30 via-chili/20 to-coal sm:min-h-full">
            <Image
              src="/images/products/shawerma-cheese.jpg"
              alt="Cheese Kebab + Ayran"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="steam steam-a" />
            <div className="steam steam-b" />
            <div className="absolute inset-0 bg-gradient-to-t from-coal/82 via-coal/12 to-transparent" />
          </div>
          <div className="p-6 sm:p-7">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-ember">Oferta Zilei</p>
            <h3 className="mt-4 text-3xl font-black leading-tight text-cream">Cheese Kebab + Ayran</h3>
            <p className="mt-3 text-base leading-7 text-smoke">
              Combo cald, rapid și perfect pentru pauza de prânz sau seara târziu.
            </p>
            <SpotlightLink href={getWhatsAppUrl()} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-ember px-5 py-3 font-black text-coal sm:w-auto">
              <MessageCircle className="h-5 w-5" />
              Comandă acum
            </SpotlightLink>
          </div>
        </div>
      </SpotlightCard>

      <SpotlightCard className="delivery-hero-card sound-hover rounded-xl border border-cream/10 bg-coal/58 p-6 backdrop-blur-xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-ember">Livrări disponibile</p>
            <h3 className="mt-3 text-2xl font-black text-cream">Comandă SHARO și prin aplicații</h3>
            <p className="mt-2 text-sm leading-6 text-smoke">Ridicare rapidă sau livrare prin partenerii de delivery.</p>
          </div>
          <div className="grid gap-3 sm:min-w-64">
            <div className="delivery-logo-card glovo-logo-card">
              <ShoppingBag className="h-5 w-5" />
              <span className="glovo-wordmark">Glovo</span>
            </div>
            <div className="delivery-logo-card bolt-logo-card">
              <ShoppingBag className="h-5 w-5" />
              <span className="bolt-wordmark">Bolt Food</span>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}

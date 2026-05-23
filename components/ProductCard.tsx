"use client";

import Image from "next/image";
import { MessageCircle, Scale, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SpotlightCard } from "@/components/SpotlightCard";
import { SpotlightLink } from "@/components/SpotlightLink";
import { getProductGramaj } from "@/lib/gramaj";
import { getWhatsAppUrl } from "@/lib/data";
import type { MenuItem } from "@/lib/types";

export function ProductCard({ item }: { item: MenuItem }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const showImage = Boolean(item.image_url && !imageFailed);
  const gramaj = getProductGramaj(item.id);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <SpotlightCard
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className="product-premium sound-hover group rounded-lg border border-ember/20 bg-white/[0.045] p-3 backdrop-blur-xl"
      >
        <div className="product-image relative mb-4 flex aspect-[1.15] items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-ember/30 via-chili/20 to-coal">
          {showImage ? (
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-110"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="animated-food-placeholder absolute inset-0" />
          )}
          <div className="steam steam-a" />
          <div className="steam steam-b" />
          <div className="light-sweep" />
          <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/18 to-transparent" />
          <span className="relative mt-auto w-full p-4 text-base font-black text-cream drop-shadow">{item.name}</span>
        </div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ember">{item.category}</p>
            <h3 className="mt-1 text-lg font-black text-cream">{item.name}</h3>
          </div>
          <strong className="rounded-md bg-ember px-2 py-1 text-sm text-coal">{item.price} LEI</strong>
        </div>
        <p className="mt-3 text-sm leading-6 text-smoke">{item.description}</p>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setOpen(true);
          }}
          className="sound-click mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-ember/35 bg-ember/12 px-4 py-3 text-sm font-black text-ember transition hover:bg-ember hover:text-coal"
        >
          <Scale className="h-4 w-4" />
          Vezi gramaj
        </button>
      </SpotlightCard>

      {mounted && open && createPortal(
        <div className="product-modal-backdrop fixed inset-0 z-50 flex items-end justify-center bg-black/72 p-3 backdrop-blur-md sm:items-center" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Gramaj ${item.name}`}
            className="product-modal-panel max-h-[92svh] w-full max-w-3xl overflow-hidden rounded-t-3xl border border-ember/25 bg-coal shadow-[0_0_80px_rgba(255,122,26,0.22)] sm:rounded-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="grid max-h-[92svh] overflow-y-auto sm:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-64 overflow-hidden bg-gradient-to-br from-ember/20 via-chili/10 to-coal sm:min-h-full">
                {showImage ? (
                  <Image src={item.image_url} alt={item.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                ) : (
                  <div className="animated-food-placeholder absolute inset-0" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-coal/88 via-coal/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-ember">{item.category}</p>
                  <h2 className="mt-2 text-3xl font-black leading-tight text-cream">{item.name}</h2>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-ember">Gramaj estimativ</p>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-ember/35 bg-ember/12 px-4 py-2 text-lg font-black text-cream">
                      <Scale className="h-5 w-5 text-ember" />
                      Total {gramaj.total}
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="Inchide"
                    onClick={() => setOpen(false)}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-cream/10 bg-white/[0.05] text-cream transition hover:border-ember/50 hover:text-ember"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <p className="mt-5 text-sm leading-6 text-smoke">{item.description}</p>

                <div className="mt-5 rounded-2xl border border-cream/10 bg-white/[0.045] p-4">
                  <div className="flex items-center justify-between gap-3 border-b border-cream/10 pb-3">
                    <span className="text-xs font-black uppercase tracking-[0.22em] text-smoke">{gramaj.template}</span>
                    <span className="rounded-full bg-ember px-3 py-1 text-xs font-black text-coal">{item.price} LEI</span>
                  </div>
                  <div className="mt-4 grid gap-3">
                    {gramaj.lines.map((line) => (
                      <div key={`${item.id}-${line.label}`} className="flex items-center justify-between gap-4 rounded-xl border border-cream/10 bg-coal/55 px-4 py-3">
                        <span className="font-bold text-cream">{line.label}</span>
                        <span className="font-black text-ember">{line.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {gramaj.note && <p className="mt-4 rounded-xl border border-ember/20 bg-ember/10 p-3 text-xs leading-5 text-smoke">{gramaj.note}</p>}

                <SpotlightLink
                  href={getWhatsAppUrl(`Salut SHARO KEBAB, vreau sa comand: ${item.name}`)}
                  className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-ember px-5 py-3 font-black text-coal"
                >
                  <MessageCircle className="h-5 w-5" />
                  Comandă pe WhatsApp
                </SpotlightLink>
              </div>
            </div>
          </div>
        </div>
      , document.body)}
    </>
  );
}

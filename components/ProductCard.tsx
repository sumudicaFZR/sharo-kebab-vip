"use client";

import Image from "next/image";
import { useState } from "react";
import { SpotlightCard } from "@/components/SpotlightCard";
import type { MenuItem } from "@/lib/types";

export function ProductCard({ item }: { item: MenuItem }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(item.image_url && !imageFailed);

  return (
    <SpotlightCard className="product-premium sound-hover group rounded-lg border border-ember/20 bg-white/[0.045] p-3 backdrop-blur-xl">
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
    </SpotlightCard>
  );
}

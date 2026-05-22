import Image from "next/image";

type BrandMarkProps = {
  compact?: boolean;
  size?: "normal" | "hero";
  showVip?: boolean;
};

export function BrandMark({ compact = false, size = "normal" }: BrandMarkProps) {
  const logoSize = size === "hero" ? "h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20" : "h-12 w-12";
  const titleSize = size === "hero" ? "text-xl sm:text-2xl lg:text-3xl" : "text-lg";
  const addressSize = size === "hero" ? "max-w-[30rem] text-[10px] sm:text-xs" : "max-w-[16rem] text-[10px]";

  const logo = (
    <div className={`sharo-logo-glow grid ${logoSize} shrink-0 place-items-center rounded-full bg-ember/10 p-1 shadow-glow`}>
      <Image
        src="/images/sharo-logo-official.png"
        alt="SHARO KEBAB"
        width={180}
        height={180}
        priority
        className="h-full w-full object-contain"
      />
    </div>
  );

  if (compact) {
    return logo;
  }

  return (
    <div className="flex min-w-0 items-center justify-center gap-3 sm:gap-5">
      {logo}
      <div className="min-w-0 text-center">
        <strong className={`sharo-brand-glide ${titleSize} block font-black uppercase leading-none tracking-[0.04em] text-cream`}>
          SHARO KEBAB
        </strong>
        <p className={`sharo-address-glide mx-auto mt-2 font-bold leading-snug text-smoke ${addressSize}`}>
          Bulevardul Pache Protopopescu 101, 021409 București
        </p>
      </div>
      {logo}
    </div>
  );
}

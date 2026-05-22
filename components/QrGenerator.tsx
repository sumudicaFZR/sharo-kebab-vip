"use client";

import QRCode from "qrcode";
import { Download, QrCode } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

const targets = [
  { label: "VIP Club", path: "/sharo-kebab" },
  { label: "Meniu", path: "/sharo-kebab/menu" },
  { label: "Review Google", path: "/sharo-kebab/review" },
  { label: "WhatsApp", path: "/sharo-kebab?open=whatsapp" }
];

export function QrGenerator({ baseUrl }: { baseUrl: string }) {
  const [path, setPath] = useState(targets[0].path);
  const [dataUrl, setDataUrl] = useState("");
  const value = useMemo(() => `${baseUrl.replace(/\/$/, "")}${path}`, [baseUrl, path]);

  async function generate() {
    const next = await QRCode.toDataURL(value, {
      width: 1024,
      margin: 2,
      color: { dark: "#0b0908", light: "#f7e4bc" }
    });
    setDataUrl(next);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <section className="rounded-lg border border-cream/10 bg-white/[0.04] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-ember">Generator QR</p>
        <select value={path} onChange={(event) => setPath(event.target.value)} className="mt-4 w-full rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream">
          {targets.map((target) => (
            <option key={target.path} value={target.path}>
              {target.label}
            </option>
          ))}
        </select>
        <p className="mt-4 break-all rounded-md bg-coal p-3 text-sm text-smoke">{value}</p>
        <button onClick={generate} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-ember px-5 py-3 font-black text-coal">
          <QrCode className="h-5 w-5" />
          Genereaza QR
        </button>
      </section>
      <section className="rounded-lg border border-cream/10 bg-white/[0.04] p-5">
        {dataUrl ? (
          <div className="grid place-items-center gap-4">
            <Image src={dataUrl} alt="QR code generat" width={384} height={384} unoptimized className="w-full max-w-sm rounded-lg bg-cream p-4" />
            <a href={dataUrl} download={`sharo-${path.replaceAll("/", "-")}.png`} className="inline-flex items-center gap-2 rounded-md border border-ember px-5 py-3 font-bold text-ember">
              <Download className="h-5 w-5" />
              Download PNG
            </a>
          </div>
        ) : (
          <div className="grid min-h-80 place-items-center rounded-md border border-dashed border-cream/20 text-smoke">
            Genereaza un QR pentru previzualizare.
          </div>
        )}
      </section>
    </div>
  );
}

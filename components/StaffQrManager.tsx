"use client";

import QRCode from "qrcode";
import Image from "next/image";
import { Download, Printer, RefreshCcw, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";

type StaffToken = {
  id: string;
  token: string;
  active: boolean;
  expires_at: string | null;
  created_at: string | null;
  url: string;
};

type StaffEvent = {
  id: string;
  customer_id?: string | null;
  token_id?: string | null;
  created_at: string;
  metadata?: Record<string, unknown>;
  ok?: boolean;
  reason?: string;
  phone?: string;
};

export function StaffQrManager() {
  const [expiration, setExpiration] = useState("weekly");
  const [token, setToken] = useState<StaffToken | null>(null);
  const [events, setEvents] = useState<StaffEvent[]>([]);
  const [qr, setQr] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    const response = await fetch("/api/staff-qr");
    const data = (await response.json()) as { token: StaffToken | null; events: StaffEvent[] };
    setToken(data.token);
    setEvents(data.events || []);
    if (data.token?.url) {
      setQr(await QRCode.toDataURL(data.token.url, { width: 1024, margin: 2, color: { dark: "#0b0908", light: "#f7e4bc" } }));
    }
    setLoading(false);
  }

  async function rotate() {
    setLoading(true);
    const response = await fetch("/api/staff-qr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expiration })
    });
    const data = (await response.json()) as { token: StaffToken };
    setToken(data.token);
    setQr(await QRCode.toDataURL(data.token.url, { width: 1024, margin: 2, color: { dark: "#0b0908", light: "#f7e4bc" } }));
    await load();
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <section className="rounded-lg border border-ember/30 bg-ember/10 p-5 backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <ShieldAlert className="h-7 w-7 shrink-0 text-ember" />
          <div>
            <h2 className="text-xl font-black">Secret staff QR</h2>
            <p className="mt-2 leading-7 text-smoke">Acest QR trebuie ținut la casă și arătat doar după plată.</p>
          </div>
        </div>
        <label className="mt-5 block text-sm font-bold text-smoke">Expirare token</label>
        <select value={expiration} onChange={(event) => setExpiration(event.target.value)} className="mt-2 w-full rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="never">Never expire</option>
        </select>
        <button disabled={loading} onClick={rotate} className="sound-click spotlight-shell mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-ember px-5 py-3 font-black text-coal">
          <RefreshCcw className="h-5 w-5" />
          Rotate token
        </button>
        {token && (
          <div className="mt-4 rounded-md bg-coal/70 p-3 text-xs text-smoke">
            <p className="break-all">URL: {token.url}</p>
            <p className="mt-2">Expires: {token.expires_at ? new Date(token.expires_at).toLocaleString("ro-RO") : "never"}</p>
          </div>
        )}
      </section>

      <section className="rounded-lg border border-cream/10 bg-white/[0.045] p-5 backdrop-blur-xl">
        {qr ? (
          <div className="grid place-items-center gap-4 print:bg-white print:text-black">
            <div className="rounded-lg bg-cream p-4">
              <Image src={qr} alt="Secret staff QR" width={360} height={360} unoptimized />
            </div>
            <div className="flex flex-wrap justify-center gap-3 print:hidden">
              <a href={qr} download="sharo-secret-staff-qr.png" className="inline-flex items-center gap-2 rounded-md border border-ember px-4 py-3 font-bold text-ember">
                <Download className="h-5 w-5" />
                Download PNG
              </a>
              <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-md border border-cream/15 px-4 py-3 font-bold text-cream">
                <Printer className="h-5 w-5 text-ember" />
                Print
              </button>
            </div>
          </div>
        ) : (
          <div className="grid min-h-80 place-items-center text-smoke">Generează token staff QR.</div>
        )}
      </section>

      <section className="rounded-lg border border-cream/10 bg-white/[0.045] p-5 backdrop-blur-xl lg:col-span-2">
        <h2 className="text-xl font-black">Recent secret QR stamp events</h2>
        <div className="mt-4 grid gap-2">
          {events.length ? (
            events.slice(0, 12).map((event) => (
              <div key={event.id} className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-coal/70 p-3 text-sm">
                <span>{new Date(event.created_at).toLocaleString("ro-RO")}</span>
                <span className="text-smoke">customer: {event.customer_id || "n/a"}</span>
                <span className="font-bold text-ember">{String(event.reason || event.metadata?.reason || event.metadata?.ok || event.ok || "event")}</span>
              </div>
            ))
          ) : (
            <p className="text-smoke">Nu există evenimente încă.</p>
          )}
        </div>
      </section>
    </div>
  );
}

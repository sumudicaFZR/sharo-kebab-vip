"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

type Result = {
  ok: boolean;
  message: string;
  points?: number;
  referralCode?: string;
};

export function LoyaltyJoinForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [referral, setReferral] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    const response = await fetch("/api/loyalty", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, referral })
    });
    const data = (await response.json()) as Result;
    setResult(data);
    if (data.ok) window.localStorage.setItem("sharo_phone", phone);
    setLoading(false);
  }

  return (
    <SpotlightCard className="glass sound-hover rounded-lg p-5">
    <form onSubmit={submit}>
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-ember">VIP Club</p>
      <h2 className="mt-2 text-2xl font-black text-cream">Intra in VIP Club</h2>
      <p className="mt-2 text-sm leading-6 text-smoke">După ce comanzi, cere QR-ul de ștampilă la casă.</p>
      <div className="mt-5 grid gap-3">
        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream outline-none focus:border-ember"
          placeholder="Nume"
        />
        <input
          required
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream outline-none focus:border-ember"
          placeholder="Telefon romanesc: 07..."
        />
        <input
          value={referral}
          onChange={(event) => setReferral(event.target.value)}
          className="rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream outline-none focus:border-ember"
          placeholder="Cod referral optional"
        />
      </div>
      <button
        disabled={loading}
        className="sound-click spotlight-shell mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-ember px-5 py-3 font-black text-coal disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
        Primești ștampilă după plată
      </button>
      {result && (
        <div className={`mt-4 rounded-md border p-3 text-sm ${result.ok ? "border-ember/50 text-cream" : "border-chili/60 text-red-100"}`}>
          <p>{result.message}</p>
          {result.referralCode && <p className="mt-2 font-black text-ember">Codul tau: {result.referralCode}</p>}
        </div>
      )}
    </form>
    </SpotlightCard>
  );
}

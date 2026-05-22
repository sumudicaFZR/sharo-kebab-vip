"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Flame, Loader2, ShieldAlert } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

type StampResult = {
  ok: boolean;
  code?: string;
  message: string;
  points?: number;
  rewardMessage?: string | null;
};

export function StampValidationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StampResult | null>(null);

  useEffect(() => {
    setPhone(window.localStorage.getItem("sharo_phone") || "");
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);
    const response = await fetch("/api/stamp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, phone })
    });
    const data = (await response.json()) as StampResult;
    setResult(data);
    if (data.ok) {
      window.localStorage.setItem("sharo_phone", phone);
      window.dispatchEvent(new CustomEvent("sharo:stamp"));
    }
    setLoading(false);
  }

  if (!token) {
    return (
      <SpotlightCard className="glass rounded-lg p-6">
        <ShieldAlert className="h-10 w-10 text-chili" />
        <h1 className="mt-4 text-3xl font-black">QR invalid sau expirat.</h1>
        <p className="mt-3 text-smoke">Cere personalului un QR valid.</p>
      </SpotlightCard>
    );
  }

  return (
    <SpotlightCard className="glass rounded-lg p-6">
      <div className="inline-flex items-center gap-2 rounded-full border border-ember/40 bg-ember/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-ember">
        <Flame className="h-4 w-4 fill-ember" />
        Secret staff QR
      </div>
      <h1 className="mt-4 text-4xl font-black">Primești ștampila după plată</h1>
      <p className="mt-3 leading-7 text-smoke">Introdu telefonul folosit la VIP Club. Tokenul este validat server-side.</p>
      <form onSubmit={submit} className="mt-6 grid gap-3">
        <input
          required
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Telefon romanesc: 07..."
          className="rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream outline-none focus:border-ember"
        />
        <button disabled={loading} className="sound-click spotlight-shell inline-flex items-center justify-center gap-2 rounded-md bg-ember px-5 py-3 font-black text-coal">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Flame className="h-5 w-5" />}
          Adaugă ștampilă
        </button>
      </form>
      {result && (
        <div className={`mt-5 rounded-md border p-4 ${result.ok ? "border-ember/50 bg-ember/10 text-cream" : "border-chili/60 bg-chili/10 text-red-100"}`}>
          <h2 className="text-xl font-black">{result.ok ? "Ștampilă adăugată 🔥" : result.message}</h2>
          {result.ok && <p className="mt-2">Ai acum {result.points || 0} din 10 ștampile.</p>}
          {result.rewardMessage && <p className="mt-3 font-black text-ember">{result.rewardMessage}</p>}
        </div>
      )}
    </SpotlightCard>
  );
}

"use client";

import { useState } from "react";
import { Bot, Loader2, Send, Sparkles } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

const examples = [
  "Genereaza 5 postari pentru Cheese Kebab",
  "Scrie o oferta pentru luni-marti cand e mai slab",
  "Raspunde elegant la acest review negativ: mancarea a venit rece",
  "Creeaza hook TikTok pentru kebab cu branza topita"
];

export function AiAssistant() {
  const [prompt, setPrompt] = useState(examples[0]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setResponse("");
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, type: "marketing" })
    });
    const data = (await res.json()) as { response: string; mode: string };
    setResponse(`${data.mode === "mock" ? "MOCK: " : ""}${data.response}`);
    setLoading(false);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <SpotlightCard className="sound-hover rounded-lg border border-cream/10 bg-white/[0.05] p-5 backdrop-blur-2xl">
        <div className="mb-4 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-ember/15 shadow-[0_0_28px_rgba(255,122,26,0.28)]">
            <Bot className="h-6 w-6 text-ember" />
          </span>
          <h2 className="text-xl font-black">Genereaza promotie cu AI</h2>
          <Sparkles className="ml-auto h-5 w-5 animate-pulse text-ember" />
        </div>
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          className="min-h-44 w-full rounded-md border border-cream/15 bg-coal/82 p-4 text-cream outline-none shadow-[inset_0_0_26px_rgba(255,122,26,0.06)] focus:border-ember focus:shadow-[0_0_34px_rgba(255,122,26,0.16)]"
        />
        <button onClick={generate} disabled={loading} className="sound-click spotlight-shell mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-ember px-5 py-3 font-black text-coal">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          Genereaza
        </button>
        <div className="mt-5 grid gap-2">
          {examples.map((item) => (
            <button key={item} onClick={() => setPrompt(item)} className="sound-click sound-hover spotlight-shell rounded-full border border-cream/10 bg-coal/45 px-3 py-2 text-left text-sm text-smoke hover:border-ember hover:text-cream">
              {item}
            </button>
          ))}
        </div>
      </SpotlightCard>
      <SpotlightCard className="sound-hover rounded-lg border border-cream/10 bg-white/[0.05] p-5 backdrop-blur-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-ember">Raspuns</p>
        <div className="mt-4 min-h-80 whitespace-pre-wrap rounded-md bg-coal/82 p-5 leading-7 text-cream">
          {loading ? (
            <div className="flex items-center gap-2 text-smoke">
              <span className="h-2 w-2 animate-bounce rounded-full bg-ember" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-ember [animation-delay:120ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-ember [animation-delay:240ms]" />
              AI scrie campania...
            </div>
          ) : (
            response || "Aici apare textul pentru Instagram, TikTok, WhatsApp, review-uri sau plan saptamanal."
          )}
        </div>
      </SpotlightCard>
    </div>
  );
}

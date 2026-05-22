"use client";

import { useState } from "react";

export function FeedbackForm() {
  const [sent, setSent] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form.entries()))
    });
    setSent(true);
  }

  if (sent) {
    return <div className="rounded-lg border border-ember/40 bg-ember/10 p-5 text-cream">Multumim. Feedback-ul ajunge privat la echipa SHARO.</div>;
  }

  return (
    <form onSubmit={submit} className="mt-5 grid gap-3">
      <input name="name" required placeholder="Nume" className="rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream outline-none focus:border-ember" />
      <input name="phone" required placeholder="Telefon" className="rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream outline-none focus:border-ember" />
      <select name="rating" className="rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream outline-none focus:border-ember">
        {[5, 4, 3, 2, 1].map((rating) => (
          <option key={rating} value={rating}>
            {rating} stele
          </option>
        ))}
      </select>
      <textarea name="message" required placeholder="Ce putem imbunatati?" className="min-h-32 rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream outline-none focus:border-ember" />
      <button className="rounded-md bg-ember px-5 py-3 font-black text-coal">Trimite feedback privat</button>
    </form>
  );
}

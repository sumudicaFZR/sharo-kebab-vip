import { MessageSquare, Star } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { FeedbackForm } from "@/components/FeedbackForm";
import { StickyCustomerNav } from "@/components/StickyCustomerNav";
import { business } from "@/lib/data";

export default function ReviewPage() {
  return (
    <main className="min-h-screen pb-28 text-cream">
      <div className="mx-auto max-w-3xl px-4 py-6">
        <BrandMark />
        <section className="mt-8 rounded-lg border border-cream/10 bg-white/[0.04] p-6">
          <Star className="h-10 w-10 fill-ember text-ember" />
          <h1 className="mt-4 text-4xl font-black">Ti-a placut la SHARO KEBAB?</h1>
          <p className="mt-3 leading-7 text-smoke">Daca a fost top, lasa-ne un review si ajuta-ne sa crestem. Daca avem ceva de reparat, trimite-ne feedback privat.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              href={`/api/track?type=review_click&to=${encodeURIComponent(business.google_review_url)}`}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-ember px-5 py-4 font-black text-coal"
            >
              <Star className="h-5 w-5" />
              Da, a fost top
            </a>
            <a href="#feedback" className="inline-flex items-center justify-center gap-2 rounded-md border border-cream/15 px-5 py-4 font-black text-cream">
              <MessageSquare className="h-5 w-5 text-ember" />
              Am o sugestie
            </a>
          </div>
        </section>
        <section id="feedback" className="mt-6 rounded-lg border border-cream/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-black">Feedback privat</h2>
          <FeedbackForm />
        </section>
      </div>
      <StickyCustomerNav />
    </main>
  );
}

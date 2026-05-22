import { Suspense } from "react";
import { BrandMark } from "@/components/BrandMark";
import { StampValidationForm } from "@/components/StampValidationForm";

export default function StampPage() {
  return (
    <main className="min-h-screen text-cream">
      <div className="mx-auto max-w-2xl px-4 py-6">
        <BrandMark />
        <section className="mt-8">
          <Suspense fallback={<div className="glass rounded-lg p-6 text-smoke">Se verifică QR-ul...</div>}>
            <StampValidationForm />
          </Suspense>
        </section>
      </div>
    </main>
  );
}

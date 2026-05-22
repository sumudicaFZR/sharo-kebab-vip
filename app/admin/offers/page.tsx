import { AdminShell } from "@/components/AdminShell";
import { offers } from "@/lib/data";

export default function OffersPage() {
  return (
    <AdminShell title="Offer management">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <form className="rounded-lg border border-cream/10 bg-white/[0.04] p-5">
          <h2 className="text-xl font-black">Creeaza oferta</h2>
          <div className="mt-4 grid gap-3">
            <input placeholder="Titlu" className="rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream" />
            <textarea placeholder="Descriere" className="min-h-28 rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream" />
            <div className="grid gap-3 sm:grid-cols-2">
              <input type="datetime-local" className="rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream" />
              <input type="datetime-local" className="rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream" />
            </div>
            <button className="rounded-md bg-ember px-5 py-3 font-black text-coal">Salveaza oferta</button>
          </div>
        </form>
        <div className="grid gap-3">
          {offers.map((offer) => (
            <article key={offer.id} className="rounded-lg border border-cream/10 bg-white/[0.04] p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-black">{offer.title}</h3>
                <span className="rounded-full bg-ember px-3 py-1 text-xs font-black text-coal">{offer.active ? "Activ" : "Inactiv"}</span>
              </div>
              <p className="mt-3 text-smoke">{offer.description}</p>
            </article>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

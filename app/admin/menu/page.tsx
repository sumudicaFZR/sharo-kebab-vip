import { AdminShell } from "@/components/AdminShell";
import { menuItems } from "@/lib/data";

export default function AdminMenuPage() {
  return (
    <AdminShell title="Menu editor">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <form className="rounded-lg border border-cream/10 bg-white/[0.04] p-5">
          <h2 className="text-xl font-black">Adauga produs</h2>
          <div className="mt-4 grid gap-3">
            <input placeholder="Nume produs" className="rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream" />
            <input placeholder="Categorie" className="rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream" />
            <input placeholder="Pret" type="number" className="rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream" />
            <textarea placeholder="Descriere" className="min-h-24 rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream" />
            <label className="flex items-center gap-2 text-sm text-smoke">
              <input type="checkbox" /> Featured pe landing page
            </label>
            <button className="rounded-md bg-ember px-5 py-3 font-black text-coal">Salveaza produs</button>
          </div>
        </form>
        <div className="grid gap-3">
          {menuItems.map((item) => (
            <article key={item.id} className="flex items-center justify-between gap-4 rounded-lg border border-cream/10 bg-white/[0.04] p-4">
              <div>
                <h3 className="font-black">{item.name}</h3>
                <p className="text-sm text-smoke">{item.category} - {item.price} lei</p>
              </div>
              <button className="rounded-md border border-cream/15 px-3 py-2 text-sm font-bold">Edit</button>
            </article>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

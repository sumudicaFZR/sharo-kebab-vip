import { AdminShell } from "@/components/AdminShell";
import { business } from "@/lib/data";

export default function SettingsPage() {
  return (
    <AdminShell title="Business settings">
      <form className="grid max-w-3xl gap-4 rounded-lg border border-cream/10 bg-white/[0.04] p-5">
        <input defaultValue={business.name} className="rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream" />
        <input defaultValue={business.address} className="rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream" />
        <input defaultValue={business.phone} className="rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream" />
        <input defaultValue={business.whatsapp_number} className="rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream" />
        <input defaultValue={business.google_review_url} className="rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream" />
        <div className="grid gap-3 sm:grid-cols-2">
          <input defaultValue={business.primary_color} className="rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream" />
          <input defaultValue={business.secondary_color} className="rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream" />
        </div>
        <button className="rounded-md bg-ember px-5 py-3 font-black text-coal">Salveaza setari</button>
      </form>
    </AdminShell>
  );
}

import Link from "next/link";
import { Lock } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4 text-cream">
      <section className="w-full max-w-md rounded-lg border border-cream/10 bg-white/[0.04] p-6">
        <BrandMark />
        <div className="mt-7 flex items-center gap-3">
          <Lock className="h-6 w-6 text-ember" />
          <h1 className="text-3xl font-black">Admin login</h1>
        </div>
        <p className="mt-3 text-sm leading-6 text-smoke">Productie: Supabase Auth cu email si parola. Demo: continua spre dashboard cu date mock.</p>
        <form className="mt-6 grid gap-3">
          <input placeholder="Email" defaultValue="admin@sharokebab.ro" className="rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream outline-none focus:border-ember" />
          <input placeholder="Parola" type="password" className="rounded-md border border-cream/15 bg-coal px-4 py-3 text-cream outline-none focus:border-ember" />
          <Link href="/admin/dashboard" className="mt-2 rounded-md bg-ember px-5 py-3 text-center font-black text-coal">
            Intra in dashboard
          </Link>
        </form>
      </section>
    </main>
  );
}

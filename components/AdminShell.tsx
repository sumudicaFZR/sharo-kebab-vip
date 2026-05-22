import Link from "next/link";
import { BarChart3, Bot, Cog, Gift, LayoutDashboard, QrCode, ShieldCheck, Users, Utensils } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";

const nav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/customers", label: "Clienti", icon: Users },
  { href: "/admin/offers", label: "Oferte", icon: Gift },
  { href: "/admin/menu", label: "Meniu", icon: Utensils },
  { href: "/admin/qr", label: "QR", icon: QrCode },
  { href: "/admin/qr-staff", label: "Staff QR", icon: ShieldCheck },
  { href: "/admin/ai", label: "AI Marketing", icon: Bot },
  { href: "/admin/settings", label: "Setari", icon: Cog },
  { href: "/sharo-kebab", label: "Public", icon: BarChart3 }
];

export function AdminShell({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="min-h-screen bg-coal text-cream">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-cream/10 bg-charcoal/78 p-5 backdrop-blur-2xl lg:block">
        <BrandMark />
        <nav className="mt-8 grid gap-2">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="sound-hover sound-click spotlight-shell flex items-center gap-3 rounded-md border border-transparent px-3 py-3 text-sm font-bold text-cream/80 hover:bg-white/5 hover:text-cream">
                <Icon className="h-5 w-5 text-ember" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="px-4 py-5 lg:ml-72 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-ember">Admin SHARO KEBAB</p>
            <h1 className="mt-2 text-3xl font-black">{title}</h1>
          </div>
          <Link href="/admin/login" className="rounded-md border border-cream/15 px-4 py-2 text-sm font-bold text-cream/80">
            Login
          </Link>
        </div>
        {children}
      </main>
    </div>
  );
}

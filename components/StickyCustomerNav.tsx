import Link from "next/link";
import { Gift, MessageCircle, Star, Utensils } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/data";

export function StickyCustomerNav() {
  const items = [
    { href: "/sharo-kebab/loyalty", label: "Loyalty", icon: Gift },
    { href: "/sharo-kebab/menu", label: "Meniu", icon: Utensils },
    { href: "/sharo-kebab/review", label: "Review", icon: Star },
    { href: getWhatsAppUrl(), label: "WhatsApp", icon: MessageCircle }
  ];

  return (
    <nav className="safe-bottom mobile-bottom-nav fixed inset-x-0 bottom-0 z-50 border-t border-cream/10 bg-coal/92 px-3 pt-3 backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="mobile-nav-item flex flex-col items-center gap-1 rounded-md px-2 py-2 text-xs font-bold text-cream/85"
            >
              <Icon className="h-5 w-5 text-ember" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

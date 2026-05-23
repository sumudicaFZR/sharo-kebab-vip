"use client";

import { useEffect, useMemo, useState } from "react";
import { Gift, MessageCircle, Star, Utensils } from "lucide-react";
import { motion } from "framer-motion";
import { getWhatsAppUrl } from "@/lib/data";

type NavId = "loyalty" | "menu" | "review" | "whatsapp";
type NavItem =
  | { id: Exclude<NavId, "whatsapp">; label: string; icon: typeof Gift; selector: string; fallback: string }
  | { id: "whatsapp"; label: string; icon: typeof MessageCircle; href: string };

export function StickyCustomerNav() {
  const [active, setActive] = useState<NavId>("loyalty");

  const items = useMemo<NavItem[]>(
    () => [
      { id: "loyalty" as const, label: "Loyalty", icon: Gift, selector: ".loyalty-reference-card", fallback: "/sharo-kebab/loyalty" },
      { id: "menu" as const, label: "Meniu", icon: Utensils, selector: ".mobile-products-panel", fallback: "/sharo-kebab/menu" },
      { id: "review" as const, label: "Review", icon: Star, selector: "[data-mobile-section='review']", fallback: "/sharo-kebab/review" },
      { id: "whatsapp" as const, label: "WhatsApp", icon: MessageCircle, href: getWhatsAppUrl() }
    ],
    []
  );

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes("/menu")) setActive("menu");
    else if (path.includes("/review")) setActive("review");
    else if (path.includes("/loyalty")) setActive("loyalty");
  }, []);

  useEffect(() => {
    const observed = items
      .filter((item) => "selector" in item)
      .map((item) => {
        const element = document.querySelector(item.selector);
        return element ? { id: item.id, element } : null;
      })
      .filter(Boolean) as { id: NavId; element: Element }[];

    if (observed.length === 0 || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const match = observed.find((item) => item.element === visible.target);
        if (match) setActive(match.id);
      },
      { rootMargin: "-34% 0px -52% 0px", threshold: [0.12, 0.28, 0.45] }
    );

    observed.forEach(({ element }) => observer.observe(element));
    return () => observer.disconnect();
  }, [items]);

  function scrollOrNavigate(item: (typeof items)[number]) {
    setActive(item.id);

    if ("href" in item) {
      window.location.href = item.href;
      return;
    }

    const target = document.querySelector(item.selector);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.location.href = item.fallback;
  }

  return (
    <nav className="safe-bottom mobile-bottom-nav fixed inset-x-0 bottom-0 z-50 border-t border-cream/10 bg-coal/92 px-3 pt-3 backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={() => scrollOrNavigate(item)}
              className={`mobile-nav-item ${isActive ? "mobile-nav-item-active" : ""} flex flex-col items-center gap-1 rounded-md px-2 py-2 text-xs font-bold text-cream/85`}
            >
              {isActive ? (
                <motion.span
                  layoutId="mobile-nav-active-pill"
                  className="mobile-nav-active-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ) : null}
              <span className="mobile-nav-item-content">
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

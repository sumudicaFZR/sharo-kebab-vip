import { BrandMark } from "@/components/BrandMark";
import { ProductCard } from "@/components/ProductCard";
import { StickyCustomerNav } from "@/components/StickyCustomerNav";
import { menuItems } from "@/lib/data";

export default function MenuPage() {
  const categories = Array.from(new Set(menuItems.map((item) => item.category)));

  return (
    <main className="min-h-screen pb-28 text-cream">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <BrandMark />
        <h1 className="mt-8 text-4xl font-black">Meniu SHARO KEBAB</h1>
        <p className="mt-3 max-w-2xl text-smoke">Cheese kebab, Arabeasca, shaorma, sides si deserturi pentru comenzi rapide din Pache Protopopescu 101.</p>
        <div className="mt-8 grid gap-8">
          {categories.map((category) => (
            <section key={category}>
              <h2 className="mb-4 text-2xl font-black text-ember">{category}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {menuItems.filter((item) => item.category === category).map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <StickyCustomerNav />
    </main>
  );
}

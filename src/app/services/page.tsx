import type { Metadata } from "next";
import { getServices } from "@/lib/data";
import { ServiceRow } from "@/components/ServiceRow";
import { SHOP } from "@/lib/shop";
import { CATEGORY_LABELS } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Services & Pricing | Scissorhands Barbershop",
  description: "Full price list for Scissorhands Barbershop in League City, TX.",
};

export default async function ServicesPage() {
  const services = await getServices();
  const categories = Array.from(new Set(services.map((s) => s.category)));

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <p className="font-display text-sm tracking-[0.3em] text-gold">
        PRICE LIST
      </p>
      <h1 className="mt-3 font-display text-5xl tracking-wide text-bone sm:text-6xl">
        THE MENU
      </h1>
      <p className="mt-4 max-w-lg text-bone-dim">
        Card payments carry a {(SHOP.cardFeeCents / 100).toFixed(2)}{" "}
        processing fee, same as in the shop. Cash always welcome.
      </p>

      {categories.map((cat) => (
        <div key={cat} className="mt-12">
          <h2 className="font-display text-xl uppercase tracking-widest text-blood">
            {CATEGORY_LABELS[cat] ?? cat}
          </h2>
          <div className="mt-2">
            {services
              .filter((s) => s.category === cat)
              .map((s) => (
                <ServiceRow key={s.id} service={s} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

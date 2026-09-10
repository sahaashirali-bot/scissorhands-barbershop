import type { Metadata } from "next";
import { getBarbers } from "@/lib/data";
import { BarberCard } from "@/components/BarberCard";

export const metadata: Metadata = {
  title: "Our Barbers | Scissorhands Barbershop",
  description: "Meet the barbers at Scissorhands Barbershop in League City, TX.",
};

export default async function BarbersPage() {
  const barbers = await getBarbers();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="font-display text-sm tracking-[0.3em] text-gold">
        THE CREW
      </p>
      <h1 className="mt-3 font-display text-5xl tracking-wide text-bone sm:text-6xl">
        MEET YOUR BARBER
      </h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {barbers.map((b) => (
          <BarberCard key={b.id} barber={b} />
        ))}
      </div>
    </div>
  );
}

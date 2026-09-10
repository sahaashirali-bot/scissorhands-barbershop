import type { Metadata } from "next";
import { getBarbers, getServices } from "@/lib/data";
import { BookingWizard } from "@/components/booking/BookingWizard";

export const metadata: Metadata = {
  title: "Book an Appointment | Scissorhands Barbershop",
  description: "Book your barber online in under a minute.",
};

export default async function BookPage({
  searchParams,
}: PageProps<"/book">) {
  const sp = await searchParams;
  const [services, barbers] = await Promise.all([
    getServices(),
    getBarbers(),
  ]);

  const serviceSlug =
    typeof sp.service === "string" ? sp.service : undefined;
  const barberSlug = typeof sp.barber === "string" ? sp.barber : undefined;

  const initialServiceId = services.find((s) => s.slug === serviceSlug)?.id;
  const initialBarberId = barbers.find((b) => b.slug === barberSlug)?.id;

  return (
    <BookingWizard
      services={services}
      barbers={barbers}
      initialServiceId={initialServiceId}
      initialBarberId={initialBarberId}
    />
  );
}

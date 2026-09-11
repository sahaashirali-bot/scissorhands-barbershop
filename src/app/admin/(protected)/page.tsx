import { createClient } from "@/lib/supabase/server";
import { formatMoney, formatSlotTime } from "@/lib/format";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const { data: todaysBookings } = await supabase
    .from("bookings")
    .select("*, barbers(name), booking_services(service_name)")
    .gte("start_at", startOfToday.toISOString())
    .lte("start_at", endOfToday.toISOString())
    .neq("status", "cancelled")
    .order("start_at");

  const { count: pendingCount } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending_payment");

  const { count: upcomingCount } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true })
    .eq("status", "confirmed")
    .gte("start_at", new Date().toISOString());

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide text-bone">
        DASHBOARD
      </h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat label="Today's Appointments" value={todaysBookings?.length ?? 0} />
        <Stat label="Confirmed Upcoming" value={upcomingCount ?? 0} />
        <Stat label="Awaiting Payment" value={pendingCount ?? 0} />
      </div>

      <h2 className="mt-10 font-display text-xl tracking-wide text-bone">
        TODAY
      </h2>
      <div className="mt-4 card-edge divide-y divide-ink-line bg-ink-soft">
        {!todaysBookings || todaysBookings.length === 0 ? (
          <p className="p-6 text-sm text-steel">No appointments today.</p>
        ) : (
          todaysBookings.map((b) => (
            <div
              key={b.id}
              className="flex items-center justify-between gap-4 p-4"
            >
              <div>
                <p className="font-display tracking-wide text-bone">
                  {formatSlotTime(b.start_at)} —{" "}
                  {(
                    b as unknown as {
                      booking_services: { service_name: string }[];
                    }
                  ).booking_services
                    ?.map((s) => s.service_name)
                    .join(", ")}
                </p>
                <p className="text-xs uppercase tracking-wider text-steel">
                  {b.customer_name} · with{" "}
                  {(b as unknown as { barbers: { name: string } }).barbers
                    ?.name}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-1 text-xs uppercase tracking-wider ${
                    b.status === "confirmed"
                      ? "bg-blood/20 text-blood-light"
                      : b.status === "pending_payment"
                        ? "bg-gold/20 text-gold"
                        : "bg-ink text-steel"
                  }`}
                >
                  {b.status.replace("_", " ")}
                </span>
                <span className="font-display text-bone">
                  {formatMoney(b.total_amount_cents)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <Link
        href="/admin/bookings"
        className="mt-6 inline-block text-sm text-blood-light hover:underline"
      >
        View all bookings →
      </Link>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="card-edge bg-ink-soft p-5">
      <p className="font-display text-4xl text-bone">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wider text-steel">
        {label}
      </p>
    </div>
  );
}

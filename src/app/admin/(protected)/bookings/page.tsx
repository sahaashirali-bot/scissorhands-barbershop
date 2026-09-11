import { createClient } from "@/lib/supabase/server";
import { formatMoney, formatSlotDate, formatSlotTime } from "@/lib/format";
import { BookingActions } from "@/components/admin/BookingActions";
import type { Barber, BookingStatus } from "@/lib/types";

export default async function AdminBookingsPage() {
  const supabase = await createClient();
  const { data: bookings } = await supabase
    .from("bookings")
    .select("*, barbers(name), booking_services(service_name)")
    .order("start_at", { ascending: false })
    .limit(200);

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wide text-bone">
        ALL BOOKINGS
      </h1>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-ink-line text-left text-xs uppercase tracking-wider text-steel">
              <th className="py-3 pr-4">When</th>
              <th className="py-3 pr-4">Client</th>
              <th className="py-3 pr-4">Service</th>
              <th className="py-3 pr-4">Barber</th>
              <th className="py-3 pr-4">Total</th>
              <th className="py-3 pr-4">Status</th>
              <th className="py-3 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-line">
            {bookings?.map((b) => {
              const barberName = (b as unknown as { barbers: Barber }).barbers
                ?.name;
              const serviceName = (
                b as unknown as { booking_services: { service_name: string }[] }
              ).booking_services
                ?.map((s) => s.service_name)
                .join(", ");
              return (
                <tr key={b.id}>
                  <td className="py-3 pr-4 text-bone-dim">
                    {formatSlotDate(b.start_at)}
                    <br />
                    <span className="text-xs text-steel">
                      {formatSlotTime(b.start_at)}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <p className="text-bone">{b.customer_name}</p>
                    <p className="text-xs text-steel">{b.customer_phone}</p>
                  </td>
                  <td className="py-3 pr-4 text-bone-dim">{serviceName}</td>
                  <td className="py-3 pr-4 text-bone-dim">{barberName}</td>
                  <td className="py-3 pr-4 font-display text-bone">
                    {formatMoney(b.total_amount_cents)}
                  </td>
                  <td className="py-3 pr-4">
                    <StatusPill status={b.status} />
                  </td>
                  <td className="py-3 pr-4">
                    <BookingActions bookingId={b.id} status={b.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {(!bookings || bookings.length === 0) && (
          <p className="py-8 text-sm text-steel">No bookings yet.</p>
        )}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: BookingStatus }) {
  const styles: Record<BookingStatus, string> = {
    confirmed: "bg-blood/20 text-blood",
    pending_payment: "bg-gold/20 text-gold",
    completed: "bg-steel/20 text-bone-dim",
    cancelled: "bg-ink text-steel line-through",
    no_show: "bg-ink text-steel",
  };
  return (
    <span
      className={`whitespace-nowrap px-2 py-1 text-xs uppercase tracking-wider ${styles[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}

"use client";

import { useTransition } from "react";
import { updateBookingStatus } from "@/app/admin/actions";
import type { BookingStatus } from "@/lib/types";

export function BookingActions({
  bookingId,
  status,
}: {
  bookingId: string;
  status: BookingStatus;
}) {
  const [isPending, startTransition] = useTransition();

  function set(next: BookingStatus) {
    startTransition(() => updateBookingStatus(bookingId, next));
  }

  return (
    <div className="flex flex-wrap gap-2">
      {status !== "completed" && (
        <button
          disabled={isPending}
          onClick={() => set("completed")}
          className="border border-ink-line px-3 py-1.5 text-xs uppercase tracking-wider text-bone-dim hover:border-bone-dim disabled:opacity-50"
        >
          Mark Done
        </button>
      )}
      {status !== "no_show" && (
        <button
          disabled={isPending}
          onClick={() => set("no_show")}
          className="border border-ink-line px-3 py-1.5 text-xs uppercase tracking-wider text-bone-dim hover:border-bone-dim disabled:opacity-50"
        >
          No Show
        </button>
      )}
      {status !== "cancelled" && (
        <button
          disabled={isPending}
          onClick={() => set("cancelled")}
          className="border border-ink-line px-3 py-1.5 text-xs uppercase tracking-wider text-blood hover:border-blood disabled:opacity-50"
        >
          Cancel
        </button>
      )}
      {status === "pending_payment" && (
        <button
          disabled={isPending}
          onClick={() => set("confirmed")}
          className="border border-gold px-3 py-1.5 text-xs uppercase tracking-wider text-gold hover:bg-gold/10 disabled:opacity-50"
        >
          Force Confirm
        </button>
      )}
    </div>
  );
}

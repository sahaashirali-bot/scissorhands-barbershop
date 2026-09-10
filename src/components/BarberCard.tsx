import Link from "next/link";
import { Scissors } from "lucide-react";
import type { Barber } from "@/lib/types";
import { StarRating } from "./StarRating";

export function BarberCard({ barber }: { barber: Barber }) {
  return (
    <Link
      href={`/barbers/${barber.slug}`}
      className="group card-edge relative block overflow-hidden bg-ink-soft p-6 transition hover:border-blood"
    >
      <div className="flex h-40 items-center justify-center border border-ink-line bg-ink text-ink-line">
        <Scissors size={40} className="transition group-hover:text-blood" />
      </div>
      <h3 className="mt-5 font-display text-2xl tracking-wide text-bone">
        {barber.name}
      </h3>
      <p className="text-sm uppercase tracking-wider text-gold">
        {barber.title}
      </p>
      {barber.years_experience && (
        <p className="mt-2 text-sm text-steel">
          {barber.years_experience}+ years experience
        </p>
      )}
      {barber.rating ? (
        <div className="mt-3 flex items-center gap-2">
          <StarRating rating={barber.rating} />
          <span className="text-xs text-steel">
            ({barber.review_count})
          </span>
        </div>
      ) : (
        <p className="mt-3 text-xs uppercase tracking-wider text-steel">
          New to the shop
        </p>
      )}
      <span className="mt-4 inline-block text-sm font-medium text-blood group-hover:underline">
        Book with {barber.name.split(" ")[0]} →
      </span>
    </Link>
  );
}

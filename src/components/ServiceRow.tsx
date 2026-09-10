import Link from "next/link";
import type { Service } from "@/lib/types";
import { formatDuration, formatMoney } from "@/lib/format";

export function ServiceRow({ service }: { service: Service }) {
  return (
    <Link
      href={`/book?service=${service.slug}`}
      className="group flex items-center justify-between gap-4 border-b border-ink-line py-5 transition hover:bg-ink-soft"
    >
      <div>
        <h3 className="font-display text-lg tracking-wide text-bone group-hover:text-gold">
          {service.name}
        </h3>
        {service.description && (
          <p className="mt-1 max-w-md text-sm text-steel">
            {service.description}
          </p>
        )}
        <p className="mt-1 text-xs uppercase tracking-wider text-steel">
          {formatDuration(service.duration_minutes)}
        </p>
      </div>
      <div className="shrink-0 font-display text-2xl text-bone">
        {formatMoney(service.price_cents)}
      </div>
    </Link>
  );
}

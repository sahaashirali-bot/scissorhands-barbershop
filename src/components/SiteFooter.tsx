import Link from "next/link";
import { SHOP } from "@/lib/shop";
import { LogoMark } from "./Logo";

export function SiteFooter() {
  return (
    <footer id="location" className="border-t border-ink-line bg-ink-soft">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark className="h-10 w-10" />
            <span className="font-display text-xl tracking-wide">
              SCISSORHANDS
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-steel">
            Fresh cuts, razor fades, and hot towel shaves in League City. Walk
            in or book ahead — either way, you leave sharp.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm tracking-widest text-gold">
            VISIT
          </h3>
          <a
            href={SHOP.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-sm text-bone-dim hover:text-bone"
          >
            {SHOP.address}
          </a>
          <a
            href={SHOP.phoneHref}
            className="mt-2 block text-sm text-bone-dim hover:text-bone"
          >
            {SHOP.phone}
          </a>
          <a
            href={`mailto:${SHOP.email}`}
            className="mt-2 block text-sm text-bone-dim hover:text-bone"
          >
            {SHOP.email}
          </a>
        </div>

        <div>
          <h3 className="font-display text-sm tracking-widest text-gold">
            HOURS
          </h3>
          <ul className="mt-3 space-y-1 text-sm text-bone-dim">
            {SHOP.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="text-steel">{h.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="stripe-bar" />

      <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-steel sm:px-6">
        <p className="max-w-3xl">{SHOP.cancellationPolicy}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} {SHOP.name}
          </span>
          <Link href="/admin/login" className="hover:text-bone-dim">
            Staff Login
          </Link>
        </div>
      </div>
    </footer>
  );
}

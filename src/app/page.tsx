import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Award } from "lucide-react";
import { getBarbers, getReviews, getServices } from "@/lib/data";
import { ServiceRow } from "@/components/ServiceRow";
import { BarberCard } from "@/components/BarberCard";
import { ReviewCard } from "@/components/ReviewCard";
import { GallerySection } from "@/components/GallerySection";
import { SHOP } from "@/lib/shop";

const TICKER_ITEMS = [
  "WALK-INS WELCOME",
  "RAZOR FADES",
  "HOT TOWEL SHAVES",
  "LEAGUE CITY, TX",
  "5.0 RATED",
  "BOOK ONLINE 24/7",
];

export default async function HomePage() {
  const [barbers, services, reviews] = await Promise.all([
    getBarbers(),
    getServices(),
    getReviews(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-line bg-ink">
        <div className="grain relative">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1.2fr_1fr] md:py-28">
            <div>
              <p className="font-display text-sm tracking-[0.3em] text-gold">
                LEAGUE CITY&apos;S SHARPEST CHAIR
              </p>
              <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-wide text-bone sm:text-6xl md:text-7xl">
                FRESH CUTS.
                <br />
                <span className="text-blood">NO WAIT.</span>
                <br />
                YOUR BARBER.
              </h1>
              <p className="mt-6 max-w-md text-base text-bone-dim">
                Razor fades, hot towel shaves, and clean lineups from a crew
                with 60+ years of combined experience. Pick your barber, pick
                your time, and walk out sharp.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/book"
                  className="bg-blood px-8 py-4 font-display text-lg tracking-wider text-bone transition hover:bg-blood-dark"
                >
                  BOOK YOUR CUT
                </Link>
                <a
                  href={SHOP.phoneHref}
                  className="border border-ink-line px-8 py-4 font-display text-lg tracking-wider text-bone transition hover:border-bone"
                >
                  CALL THE SHOP
                </a>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="cut-tr relative h-80 w-full overflow-hidden border border-ink-line sm:h-96">
                <Image
                  src="/images/gallery/cut-3.jpg"
                  alt="A fresh fade from Scissorhands Barbershop"
                  fill
                  priority
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="stripe-bar" />
      </section>

      {/* Ticker */}
      <div className="overflow-hidden border-b border-ink-line bg-blood py-3">
        <div className="marquee-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="mx-4 font-display text-sm tracking-widest text-bone"
            >
              {item} •
            </span>
          ))}
        </div>
      </div>

      {/* Trust bar */}
      <section className="border-b border-ink-line bg-ink-soft">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
          <div className="flex items-center gap-4">
            <Award className="shrink-0 text-gold" size={28} />
            <div>
              <p className="font-display text-lg text-bone">33 Years</p>
              <p className="text-sm text-steel">Master barber experience</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Clock className="shrink-0 text-gold" size={28} />
            <div>
              <p className="font-display text-lg text-bone">7 Days</p>
              <p className="text-sm text-steel">Open every day of the week</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="shrink-0 text-gold" size={28} />
            <div>
              <p className="font-display text-lg text-bone">League City</p>
              <p className="text-sm text-steel">Gulf Freeway, Suite D1</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl tracking-wide text-bone sm:text-5xl">
            THE MENU
          </h2>
          <Link
            href="/services"
            className="text-sm font-medium uppercase tracking-wider text-blood hover:underline"
          >
            Full price list →
          </Link>
        </div>
        <div className="mt-8">
          {services.slice(0, 5).map((s) => (
            <ServiceRow key={s.id} service={s} />
          ))}
        </div>
      </section>

      {/* Barbers */}
      <section className="border-t border-ink-line bg-ink-soft">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-4xl tracking-wide text-bone sm:text-5xl">
            MEET THE CREW
          </h2>
          <p className="mt-3 max-w-lg text-bone-dim">
            Walk in and get whoever&apos;s free, or book with your favorite.
            Either way, you&apos;re in good hands.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {barbers.map((b) => (
              <BarberCard key={b.id} barber={b} />
            ))}
          </div>
        </div>
      </section>

      <GallerySection />

      {/* Reviews */}
      <section id="reviews" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-4xl tracking-wide text-bone sm:text-5xl">
          WHAT PEOPLE SAY
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 6).map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-ink-line bg-blood">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h2 className="font-display text-4xl tracking-wide text-bone sm:text-5xl">
            READY WHEN YOU ARE
          </h2>
          <p className="mt-3 text-bone/80">
            Pick your barber, pick your time — takes less than a minute.
          </p>
          <Link
            href="/book"
            className="mt-8 inline-block bg-ink px-10 py-4 font-display text-lg tracking-wider text-bone transition hover:bg-ink-soft"
          >
            BOOK NOW
          </Link>
        </div>
      </section>
    </>
  );
}

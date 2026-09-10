import { notFound } from "next/navigation";
import Link from "next/link";
import { Scissors } from "lucide-react";
import { getBarberBySlug, getReviews } from "@/lib/data";
import { StarRating } from "@/components/StarRating";
import { ReviewCard } from "@/components/ReviewCard";

export default async function BarberPage({
  params,
}: PageProps<"/barbers/[slug]">) {
  const { slug } = await params;
  const barber = await getBarberBySlug(slug);
  if (!barber) notFound();

  const allReviews = await getReviews();
  const barberReviews = allReviews.filter(
    (r) => r.barber_name === barber.name
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="grid gap-8 sm:grid-cols-[220px_1fr]">
        <div className="flex h-56 items-center justify-center border border-ink-line bg-ink-soft">
          <Scissors size={56} className="text-ink-line" />
        </div>
        <div>
          <h1 className="font-display text-4xl tracking-wide text-bone sm:text-5xl">
            {barber.name}
          </h1>
          <p className="mt-1 text-sm uppercase tracking-wider text-gold">
            {barber.title}
          </p>
          {barber.rating ? (
            <div className="mt-3 flex items-center gap-2">
              <StarRating rating={barber.rating} />
              <span className="text-sm text-steel">
                {barber.rating.toFixed(1)} ({barber.review_count} reviews)
              </span>
            </div>
          ) : (
            <p className="mt-3 text-sm uppercase tracking-wider text-steel">
              New to the shop
            </p>
          )}
          <p className="mt-5 max-w-xl text-bone-dim">{barber.bio}</p>
          <Link
            href={`/book?barber=${barber.slug}`}
            className="mt-6 inline-block bg-blood px-8 py-3 font-display text-lg tracking-wider text-bone transition hover:bg-blood-dark"
          >
            BOOK WITH {barber.name.split(" ")[0].toUpperCase()}
          </Link>
        </div>
      </div>

      {barberReviews.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-2xl tracking-wide text-bone">
            CLIENT REVIEWS
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {barberReviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

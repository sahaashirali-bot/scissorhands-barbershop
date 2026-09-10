import type { Review } from "@/lib/types";
import { StarRating } from "./StarRating";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="card-edge flex h-full flex-col justify-between bg-ink-soft p-6">
      <div>
        <StarRating rating={review.rating} />
        <p className="mt-4 text-sm leading-relaxed text-bone-dim">
          &ldquo;{review.body}&rdquo;
        </p>
      </div>
      <div className="mt-6 border-t border-ink-line pt-3">
        <p className="font-display tracking-wide text-bone">
          {review.author_name}
        </p>
        {review.barber_name && (
          <p className="text-xs uppercase tracking-wider text-gold">
            Client of {review.barber_name}
          </p>
        )}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { SHOP } from "@/lib/shop";
import { LegalPageLayout, LegalSection } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Scissorhands Barbershop",
  description: "Our policy on appointment cancellations, late arrivals, and refunds.",
};

const UPDATED = "September 11, 2026";

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="LEGAL"
      title="REFUND & CANCELLATION POLICY"
      updated={UPDATED}
    >
      <LegalSection heading="Cancelling or rescheduling">
        <p>{SHOP.cancellationPolicy}</p>
        <p>
          You can cancel or reschedule by calling or texting us at{" "}
          {SHOP.phone}, or by emailing{" "}
          <a href={`mailto:${SHOP.email}`} className="text-blood-light underline">
            {SHOP.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Late cancellations & no-shows">
        <p>
          Cancelling with less than 1 hour&apos;s notice, or not showing up
          for your appointment, may be charged the full price of the
          booked service. If you paid online, that charge is deducted from
          your card; if you booked to pay in-shop, we may ask for it before
          booking you again.
        </p>
      </LegalSection>

      <LegalSection heading="If we cancel">
        <p>
          If we need to cancel or reschedule your appointment (illness,
          emergency, etc.), you&apos;ll get a full refund to your original
          payment method, or we&apos;ll happily rebook you — your choice.
        </p>
      </LegalSection>

      <LegalSection heading="Card processing fee">
        <p>
          The ${(SHOP.cardFeeCents / 100).toFixed(2)} card processing fee
          charged on online payments covers payment processing costs and
          is non-refundable, except when we cancel your appointment.
        </p>
      </LegalSection>

      <LegalSection heading="How refunds are issued">
        <p>
          Refunds are returned to the same card or payment method used to
          book, through Stripe. Refunds typically appear on your statement
          within 5–10 business days, depending on your bank or card
          issuer.
        </p>
      </LegalSection>

      <LegalSection heading="Not satisfied with a service?">
        <p>
          Let us know before you leave the shop and we&apos;ll make it
          right at no extra charge. If that&apos;s not possible in the
          moment, contact us within 3 days at{" "}
          <a href={`mailto:${SHOP.email}`} className="text-blood-light underline">
            {SHOP.email}
          </a>{" "}
          and we&apos;ll work it out with you on a case-by-case basis.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

import type { Metadata } from "next";
import { SHOP } from "@/lib/shop";
import { LegalPageLayout, LegalSection } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Scissorhands Barbershop",
  description: "Our policy on appointment cancellations, late arrivals, and refunds.",
};

const UPDATED = "September 13, 2026";

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="LEGAL"
      title="REFUND & CANCELLATION POLICY"
      updated={UPDATED}
    >
      <LegalSection heading="Booking & payment">
        <p>
          Appointments are booked and paid for through our online booking
          partner, Vagaro, or in person at the shop. Any card payment is
          handled directly by Vagaro — we don&apos;t process or store card
          numbers ourselves.
        </p>
      </LegalSection>

      <LegalSection heading="Cancelling or rescheduling">
        <p>{SHOP.cancellationPolicy}</p>
        <p>
          You can cancel or reschedule through your Vagaro confirmation
          email/text, or by calling or texting us at {SHOP.phone}, or
          emailing{" "}
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
          booked service, following Vagaro&apos;s no-show/late-cancellation
          policy for this shop.
        </p>
      </LegalSection>

      <LegalSection heading="If we cancel">
        <p>
          If we need to cancel or reschedule your appointment (illness,
          emergency, etc.), you&apos;ll get a full refund of anything paid
          in advance, or we&apos;ll happily rebook you — your choice.
        </p>
      </LegalSection>

      <LegalSection heading="How refunds are issued">
        <p>
          If you paid online through Vagaro, refunds are returned to the
          same card or payment method through Vagaro&apos;s payment
          processor and typically appear on your statement within 5–10
          business days, depending on your bank or card issuer. If you
          paid in-shop, we&apos;ll refund you directly.
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

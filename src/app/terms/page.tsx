import type { Metadata } from "next";
import Link from "next/link";
import { SHOP } from "@/lib/shop";
import { LegalPageLayout, LegalSection } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms & Conditions | Scissorhands Barbershop",
  description: "The terms that apply when you book or use the Scissorhands Barbershop website.",
};

const UPDATED = "September 13, 2026";

export default function TermsPage() {
  return (
    <LegalPageLayout eyebrow="LEGAL" title="TERMS & CONDITIONS" updated={UPDATED}>
      <LegalSection heading="Agreement">
        <p>
          These terms apply whenever you use this website or book an
          appointment with {SHOP.name}. By booking, you agree to them. If
          you don&apos;t agree, please book by phone or in person instead.
        </p>
      </LegalSection>

      <LegalSection heading="Booking appointments">
        <p>
          This site&apos;s &quot;Book Now&quot; buttons take you to our
          online booking partner, Vagaro, to pick a service, barber, and
          time — Vagaro&apos;s own terms apply to your use of their
          booking system. Prices shown on this site are current at time of
          publishing; we may update our menu and prices going forward, and
          the price shown at checkout on Vagaro governs.
        </p>
      </LegalSection>

      <LegalSection heading="Cancellations, late arrivals & refunds">
        <p>{SHOP.cancellationPolicy}</p>
        <p>
          Full details, including how refunds are issued, are in our{" "}
          <Link href="/refund-policy" className="text-blood-light underline">
            Refund &amp; Cancellation Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Payment">
        <p>
          You can pay online through Vagaro when you book, or in person at
          the shop (cash or card). Card payments made through Vagaro are
          processed by Vagaro and its payment processor, not by us — we
          never see or store your card details.
        </p>
      </LegalSection>

      <LegalSection heading="Using this site">
        <p>
          You agree to give accurate contact information when booking, and
          not to use this site to submit false bookings or to interfere
          with its normal operation.
        </p>
      </LegalSection>

      <LegalSection heading="Content & ownership">
        <p>
          The text, photos, and branding on this site belong to{" "}
          {SHOP.name} unless otherwise noted, and may not be copied or
          reused without our permission.
        </p>
      </LegalSection>

      <LegalSection heading="No guarantee of results">
        <p>
          We take pride in our work, but haircuts and grooming services are
          a craft, not an exact science — results can vary with hair type,
          styling, and your input at the chair. If something&apos;s not
          right, tell us before you leave and we&apos;ll do what we can to
          make it right.
        </p>
      </LegalSection>

      <LegalSection heading="Liability">
        <p>
          To the extent allowed by law, {SHOP.name} is not liable for
          indirect or incidental damages arising from your use of this
          website or Vagaro&apos;s booking system (for example, a
          technical error on Vagaro&apos;s end that delays a booking
          confirmation). This doesn&apos;t limit any liability that
          can&apos;t be limited under Texas law.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These terms are governed by the laws of the State of Texas,
          without regard to conflict-of-law rules.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms?{" "}
          <a href={`mailto:${SHOP.email}`} className="text-blood-light underline">
            {SHOP.email}
          </a>{" "}
          or {SHOP.phone}.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { SHOP } from "@/lib/shop";
import { LegalPageLayout, LegalSection } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | Scissorhands Barbershop",
  description: "How Scissorhands Barbershop collects, uses, and protects your information.",
};

const UPDATED = "September 13, 2026";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout eyebrow="LEGAL" title="PRIVACY POLICY" updated={UPDATED}>
      <LegalSection heading="Who we are">
        <p>
          {SHOP.name} ({SHOP.address}) operates this website. For questions
          about this policy or your data, contact us at{" "}
          <a href={`mailto:${SHOP.email}`} className="text-blood-light underline">
            {SHOP.email}
          </a>{" "}
          or {SHOP.phone}.
        </p>
      </LegalSection>

      <LegalSection heading="Booking is handled by Vagaro">
        <p>
          This website doesn&apos;t take bookings or payments directly —
          the &quot;Book Now&quot; buttons on this site send you to our
          online booking partner,{" "}
          <a
            href="https://www.vagaro.com/scissorhandsbarbershop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blood-light underline"
          >
            Vagaro
          </a>
          . Any name, email, phone number, or payment details you enter to
          book an appointment are collected and stored by Vagaro under{" "}
          <a
            href="https://www.vagaro.com/pro/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blood-light underline"
          >
            Vagaro&apos;s own privacy policy
          </a>
          , not this one. We only see what Vagaro shows us as the
          business — your appointment details and, for returning clients,
          your booking history with us.
        </p>
      </LegalSection>

      <LegalSection heading="What this website collects">
        <p>
          Browsing this site itself doesn&apos;t require you to submit any
          personal information. If you email or call us directly, we&apos;ll
          have whatever contact details you send us. We don&apos;t use
          analytics or advertising trackers on this site.
        </p>
      </LegalSection>

      <LegalSection heading="How we use your information">
        <ul className="list-disc space-y-1 pl-5">
          <li>To provide the service you booked, and to contact you about it</li>
          <li>To respond if you email or call us</li>
          <li>To keep basic business records as required by law</li>
        </ul>
        <p>We do not sell your information or use it for advertising.</p>
      </LegalSection>

      <LegalSection heading="Cookies">
        <p>
          This site uses only cookies that are strictly necessary to run
          it — see our{" "}
          <Link href="/cookies" className="text-blood-light underline">
            Cookie Policy
          </Link>{" "}
          for details. Vagaro&apos;s booking pages, once you leave this
          site, set their own cookies under their own policy.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          For information you gave Vagaro when booking, contact Vagaro
          directly or use their booking confirmation to manage your data.
          For anything you&apos;ve sent us directly (an email or call),
          you can ask us to access, correct, or delete it at any time by
          emailing{" "}
          <a href={`mailto:${SHOP.email}`} className="text-blood-light underline">
            {SHOP.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Children">
        <p>
          This site is not directed at children under 13, and we do not
          knowingly collect personal information from them. A
          parent/guardian may book or check in a child for a haircut.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          If we change how we handle your information, we&apos;ll update
          this page and the date at the top.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

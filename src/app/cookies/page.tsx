import type { Metadata } from "next";
import { SHOP } from "@/lib/shop";
import { LegalPageLayout, LegalSection } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Cookie Policy | Scissorhands Barbershop",
  description: "What cookies this site uses and why.",
};

const UPDATED = "September 13, 2026";

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout eyebrow="LEGAL" title="COOKIE POLICY" updated={UPDATED}>
      <LegalSection heading="Short version">
        <p>
          This site doesn&apos;t set any cookies of its own — no tracking,
          no advertising, nothing. It&apos;s a static marketing site whose
          &quot;Book Now&quot; buttons send you to Vagaro to book.
        </p>
      </LegalSection>

      <LegalSection heading="What cookies are">
        <p>
          Cookies are small text files a website stores in your browser to
          remember information between visits.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies on Vagaro">
        <p>
          Once you click &quot;Book Now&quot; and leave this site for
          Vagaro&apos;s booking page (vagaro.com), Vagaro sets its own
          cookies to run its booking widget, process payments, and prevent
          fraud. Those are governed by{" "}
          <a
            href="https://www.vagaro.com/pro/cookie-preferences"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blood-light underline"
          >
            Vagaro&apos;s own cookie policy
          </a>
          , not ours — we have no control over them.
        </p>
      </LegalSection>

      <LegalSection heading="No analytics or advertising cookies">
        <p>
          We don&apos;t run Google Analytics, Facebook/Meta Pixel, or any
          other tracking or ad-targeting script on this site.
        </p>
      </LegalSection>

      <LegalSection heading="Managing cookies">
        <p>
          Since this site sets no cookies itself, there&apos;s nothing to
          manage here. To control what Vagaro stores in your browser, use
          your browser&apos;s cookie settings while on vagaro.com.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions?{" "}
          <a href={`mailto:${SHOP.email}`} className="text-blood-light underline">
            {SHOP.email}
          </a>
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

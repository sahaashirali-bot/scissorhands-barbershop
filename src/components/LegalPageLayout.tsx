import type { ReactNode } from "react";

export function LegalPageLayout({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="font-display text-sm tracking-[0.3em] text-gold">
        {eyebrow}
      </p>
      <h1 className="mt-3 font-display text-4xl tracking-wide text-bone sm:text-5xl">
        {title}
      </h1>
      <p className="mt-3 text-sm text-steel">Last updated {updated}</p>

      <div className="prose-legal mt-10 space-y-8 text-bone-dim">
        {children}
      </div>
    </div>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-xl tracking-wide text-bone">
        {heading}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed sm:text-base">
        {children}
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-notice-dismissed";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable — skip the notice rather than error.
    }
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore — worst case the notice reappears next visit.
    }
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-line bg-ink-soft px-4 py-4 sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-bone-dim">
          We only use cookies that are strictly necessary to run this site
          (like keeping staff logged in). No tracking or advertising cookies.{" "}
          <Link href="/cookies" className="text-blood-light underline">
            Learn more
          </Link>
        </p>
        <button
          onClick={dismiss}
          className="shrink-0 bg-blood px-5 py-2 font-display text-sm tracking-wider text-bone transition hover:bg-blood-dark"
        >
          GOT IT
        </button>
      </div>
    </div>
  );
}

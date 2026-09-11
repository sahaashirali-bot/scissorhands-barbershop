"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { LogoMark } from "@/components/Logo";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    window.location.href = "/admin";
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col items-center justify-center px-4">
      <LogoMark className="h-16 w-16" />
      <h1 className="mt-4 font-display text-2xl tracking-wide text-bone">
        STAFF LOGIN
      </h1>
      <form onSubmit={handleSubmit} className="mt-8 w-full space-y-4">
        <label htmlFor="admin-email" className="sr-only">
          Email
        </label>
        <input
          id="admin-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          autoComplete="username"
          required
          className="w-full border border-ink-line bg-ink-soft px-4 py-3 text-bone placeholder:text-steel focus:border-blood focus:outline-none focus:ring-2 focus:ring-blood/40"
        />
        <label htmlFor="admin-password" className="sr-only">
          Password
        </label>
        <input
          id="admin-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          required
          className="w-full border border-ink-line bg-ink-soft px-4 py-3 text-bone placeholder:text-steel focus:border-blood focus:outline-none focus:ring-2 focus:ring-blood/40"
        />
        {error && (
          <p role="alert" className="text-sm text-blood-light">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blood px-6 py-3 font-display tracking-wider text-bone transition hover:bg-blood-dark disabled:opacity-50"
        >
          {loading ? "SIGNING IN…" : "SIGN IN"}
        </button>
      </form>
    </div>
  );
}

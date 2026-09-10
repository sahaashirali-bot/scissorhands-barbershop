import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Plain, sessionless Supabase client for server-side route handlers that call
 * public/security-definer RPCs (slots, booking creation, payment webhooks).
 * No cookie/auth plumbing needed — those RPCs don't require a signed-in user.
 */
export function createAnonClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

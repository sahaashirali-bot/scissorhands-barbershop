"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { BookingStatus } from "@/lib/types";

export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("bookings")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", bookingId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/admin/bookings");
}

export async function addBlockedTime(formData: FormData) {
  const supabase = await createClient();
  const barberId = String(formData.get("barberId"));
  const startAt = String(formData.get("startAt"));
  const endAt = String(formData.get("endAt"));
  const reason = String(formData.get("reason") ?? "");

  const { error } = await supabase.from("blocked_times").insert({
    barber_id: barberId,
    start_at: new Date(startAt).toISOString(),
    end_at: new Date(endAt).toISOString(),
    reason,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/blocked-times");
}

export async function deleteBlockedTime(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("blocked_times").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/blocked-times");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

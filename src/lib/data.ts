import { createClient } from "@/lib/supabase/server";
import type { Barber, Review, Service } from "@/lib/types";

export async function getBarbers(): Promise<Barber[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("barbers")
    .select("*")
    .eq("active", true)
    .order("sort_order");
  if (error) throw error;
  return data;
}

export async function getBarberBySlug(slug: string): Promise<Barber | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("barbers")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getServices(): Promise<Service[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("active", true)
    .order("sort_order");
  if (error) throw error;
  return data;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getReviews(): Promise<Review[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

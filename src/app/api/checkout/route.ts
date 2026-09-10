import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAnonClient } from "@/lib/supabase/anon";
import { getStripe } from "@/lib/stripe";
import type { Booking } from "@/lib/types";

const bodySchema = z.object({
  barberId: z.string().uuid(),
  serviceId: z.string().uuid(),
  start: z.string(),
  customerName: z.string().min(1).max(200),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(7).max(30),
  noPreference: z.boolean(),
  notes: z.string().max(1000).optional(),
  paymentMethod: z.enum(["online", "in_shop"]),
});

const ERROR_MESSAGES: Record<string, string> = {
  slot_taken: "Sorry, that time was just booked. Please pick another slot.",
  slot_in_past: "That time has already passed. Please pick another slot.",
  invalid_service: "That service is no longer available.",
};

export async function POST(request: NextRequest) {
  const json = await request.json();
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const body = parsed.data;

  const supabase = createAnonClient();

  const { data: rpcData, error } = await supabase.rpc(
    "create_pending_booking",
    {
      p_barber_id: body.barberId,
      p_service_id: body.serviceId,
      p_start_at: body.start,
      p_customer_name: body.customerName,
      p_customer_email: body.customerEmail,
      p_customer_phone: body.customerPhone,
      p_no_preference: body.noPreference,
      p_notes: body.notes ?? null,
      p_payment_method: body.paymentMethod,
    }
  );
  const booking = rpcData as unknown as Booking;

  if (error) {
    const code = error.message.includes("slot_taken")
      ? "slot_taken"
      : error.message.includes("slot_in_past")
        ? "slot_in_past"
        : error.message.includes("invalid_service")
          ? "invalid_service"
          : null;
    return NextResponse.json(
      { error: code ? ERROR_MESSAGES[code] : "Could not create booking." },
      { status: code ? 409 : 500 }
    );
  }

  if (body.paymentMethod === "in_shop") {
    return NextResponse.json({
      redirectUrl: `/book/success?booking=${booking.id}`,
    });
  }

  const [{ data: service }, { data: barber }] = await Promise.all([
    supabase.from("services").select("name").eq("id", body.serviceId).single(),
    supabase.from("barbers").select("name").eq("id", body.barberId).single(),
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin;

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: body.customerEmail,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: booking.total_amount_cents,
          product_data: {
            name: `${service?.name ?? "Barbershop appointment"} with ${barber?.name ?? "your barber"}`,
            description: `Includes a $${(booking.card_fee_cents / 100).toFixed(2)} card processing fee`,
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${siteUrl}/book/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/book?cancelled=1`,
    metadata: { booking_id: booking.id },
  });

  await supabase.rpc("attach_checkout_session", {
    p_booking_id: booking.id,
    p_session_id: session.id,
  });

  return NextResponse.json({ redirectUrl: session.url });
}

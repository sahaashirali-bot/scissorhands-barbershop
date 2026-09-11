"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Scissors, Users, Check } from "lucide-react";
import type { Barber, Service } from "@/lib/types";
import {
  addDaysISODate,
  formatDuration,
  formatMoney,
  formatSlotDateShort,
  formatSlotTime,
  todayISODate,
} from "@/lib/format";
import { SHOP } from "@/lib/shop";
import { CATEGORY_LABELS } from "@/lib/categories";

type Slot = { start: string; barberId: string };

const STEPS = ["Service", "Barber", "Time", "Your Info", "Confirm"] as const;

export function BookingWizard({
  services,
  barbers,
  initialServiceId,
  initialBarberId,
}: {
  services: Service[];
  barbers: Barber[];
  initialServiceId?: string;
  initialBarberId?: string;
}) {
  const [step, setStep] = useState(0);

  const [serviceIds, setServiceIds] = useState<string[]>(
    initialServiceId ? [initialServiceId] : []
  );
  const [barberId, setBarberId] = useState<string | undefined>(
    initialBarberId
  );

  function toggleService(id: string) {
    setServiceIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  const serviceCategories = useMemo(
    () => Array.from(new Set(services.map((s) => s.category))),
    [services]
  );

  const dateOptions = useMemo(() => {
    const today = todayISODate();
    return Array.from({ length: 14 }, (_, i) => addDaysISODate(today, i));
  }, []);
  const [date, setDate] = useState(dateOptions[0]);

  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"online" | "in_shop">(
    "online"
  );
  const [consent, setConsent] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const selectedServices = services.filter((s) => serviceIds.includes(s.id));
  const servicePriceCents = selectedServices.reduce(
    (sum, s) => sum + s.price_cents,
    0
  );
  const serviceDurationMinutes = selectedServices.reduce(
    (sum, s) => sum + s.duration_minutes,
    0
  );
  const barber = barberId ? barbers.find((b) => b.id === barberId) : undefined;

  useEffect(() => {
    if (serviceIds.length === 0 || !barberId || step !== 2) return;
    setSlotsLoading(true);
    setSelectedSlot(null);
    fetch(
      `/api/slots?serviceIds=${serviceIds.join(",")}&barberId=${barberId}&date=${date}`
    )
      .then((r) => r.json())
      .then((data) => setSlots(data.slots ?? []))
      .finally(() => setSlotsLoading(false));
  }, [serviceIds, barberId, date, step]);

  const totalCents =
    servicePriceCents + (paymentMethod === "online" ? SHOP.cardFeeCents : 0);

  async function handleSubmit() {
    if (selectedServices.length === 0 || !selectedSlot) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          barberId: selectedSlot.barberId,
          serviceIds,
          start: selectedSlot.start,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          notes,
          noPreference: barberId === "any",
          paymentMethod,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error ?? "Something went wrong. Try again.");
        setSubmitting(false);
        return;
      }
      window.location.href = data.redirectUrl;
    } catch {
      setSubmitError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  const canContinue = [
    serviceIds.length > 0,
    !!barberId,
    !!selectedSlot,
    name.trim().length > 0 &&
      email.includes("@") &&
      phone.trim().length >= 7 &&
      consent,
    true,
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* Step indicator */}
      <div className="flex items-center">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center border font-display text-sm ${
                  i < step
                    ? "border-blood bg-blood text-bone"
                    : i === step
                      ? "border-gold text-gold"
                      : "border-ink-line text-steel"
                }`}
              >
                {i < step ? <Check size={16} /> : i + 1}
              </div>
              <span className="mt-1 hidden text-[0.65rem] uppercase tracking-wider text-steel sm:block">
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`mx-2 h-0.5 flex-1 ${i < step ? "bg-blood" : "bg-ink-line"}`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-10">
        {/* Step 0: Service */}
        {step === 0 && (
          <div>
            <h2 className="font-display text-3xl tracking-wide text-bone">
              PICK YOUR SERVICES
            </h2>
            <p className="mt-2 text-sm text-steel">
              Select as many as you&apos;d like — we&apos;ll book them back to back.
            </p>
            {serviceCategories.map((cat) => (
              <div key={cat} className="mt-8 first:mt-6">
                <h3 className="font-display text-sm uppercase tracking-widest text-gold">
                  {CATEGORY_LABELS[cat] ?? cat}
                </h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {services
                    .filter((s) => s.category === cat)
                    .map((s) => {
                      const selected = serviceIds.includes(s.id);
                      return (
                        <button
                          key={s.id}
                          onClick={() => toggleService(s.id)}
                          aria-pressed={selected}
                          className={`card-edge flex items-center justify-between gap-3 p-4 text-left transition ${
                            selected
                              ? "border-blood bg-blood/20 shadow-[0_0_0_1px_var(--color-blood),0_0_20px_-4px_var(--color-blood)]"
                              : "hover:border-bone-dim"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-5 w-5 shrink-0 items-center justify-center border transition ${
                                selected
                                  ? "border-blood bg-blood"
                                  : "border-ink-line"
                              }`}
                            >
                              {selected && (
                                <Check size={14} className="text-bone" />
                              )}
                            </div>
                            <div>
                              <p className="font-display tracking-wide text-bone">
                                {s.name}
                              </p>
                              <p className="text-xs uppercase tracking-wider text-steel">
                                {formatDuration(s.duration_minutes)}
                              </p>
                            </div>
                          </div>
                          <span className="shrink-0 font-display text-xl text-bone">
                            {formatMoney(s.price_cents)}
                          </span>
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}

            {serviceIds.length > 0 && (
              <div className="card-edge mt-8 flex items-center justify-between bg-ink-soft p-4">
                <p className="text-sm text-bone-dim">
                  {serviceIds.length} service
                  {serviceIds.length > 1 ? "s" : ""} selected ·{" "}
                  {formatDuration(serviceDurationMinutes)}
                </p>
                <p className="font-display text-xl text-bone">
                  {formatMoney(servicePriceCents)}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 1: Barber */}
        {step === 1 && (
          <div>
            <h2 className="font-display text-3xl tracking-wide text-bone">
              PICK YOUR BARBER
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => setBarberId("any")}
                className={`card-edge flex items-center gap-4 p-4 text-left transition ${
                  barberId === "any"
                    ? "border-blood bg-ink-soft"
                    : "hover:border-bone-dim"
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-ink-line">
                  <Users size={22} className="text-gold" />
                </div>
                <div>
                  <p className="font-display tracking-wide text-bone">
                    No Preference
                  </p>
                  <p className="text-xs text-steel">
                    First barber available
                  </p>
                </div>
              </button>
              {barbers.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBarberId(b.id)}
                  className={`card-edge flex items-center gap-4 p-4 text-left transition ${
                    barberId === b.id
                      ? "border-blood bg-ink-soft"
                      : "hover:border-bone-dim"
                  }`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-ink-line">
                    <Scissors size={20} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-display tracking-wide text-bone">
                      {b.name}
                    </p>
                    <p className="text-xs text-steel">{b.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Time */}
        {step === 2 && (
          <div>
            <h2 className="font-display text-3xl tracking-wide text-bone">
              PICK A TIME
            </h2>
            <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
              {dateOptions.map((d) => (
                <button
                  key={d}
                  onClick={() => setDate(d)}
                  className={`shrink-0 border px-4 py-2 text-center transition ${
                    date === d
                      ? "border-blood bg-blood text-bone"
                      : "border-ink-line text-bone-dim hover:border-bone-dim"
                  }`}
                >
                  <span className="block font-display text-sm tracking-wide">
                    {formatSlotDateShort(`${d}T12:00:00`)}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6">
              {slotsLoading ? (
                <p className="text-sm text-steel">Loading times…</p>
              ) : slots.length === 0 ? (
                <p className="text-sm text-steel">
                  No openings this day — try another date.
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {slots.map((slot) => (
                    <button
                      key={slot.start}
                      onClick={() => setSelectedSlot(slot)}
                      className={`border px-3 py-2 font-display text-sm tracking-wide transition ${
                        selectedSlot?.start === slot.start
                          ? "border-blood bg-blood text-bone"
                          : "border-ink-line text-bone-dim hover:border-bone-dim"
                      }`}
                    >
                      {formatSlotTime(slot.start)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Info */}
        {step === 3 && (
          <div>
            <h2 className="font-display text-3xl tracking-wide text-bone">
              YOUR INFO
            </h2>
            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="booking-name" className="sr-only">
                  Full name
                </label>
                <input
                  id="booking-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  autoComplete="name"
                  required
                  className="w-full border border-ink-line bg-ink-soft px-4 py-3 text-bone placeholder:text-steel focus:border-blood focus:outline-none focus:ring-2 focus:ring-blood/40"
                />
              </div>
              <div>
                <label htmlFor="booking-email" className="sr-only">
                  Email
                </label>
                <input
                  id="booking-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full border border-ink-line bg-ink-soft px-4 py-3 text-bone placeholder:text-steel focus:border-blood focus:outline-none focus:ring-2 focus:ring-blood/40"
                />
              </div>
              <div>
                <label htmlFor="booking-phone" className="sr-only">
                  Phone number
                </label>
                <input
                  id="booking-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="w-full border border-ink-line bg-ink-soft px-4 py-3 text-bone placeholder:text-steel focus:border-blood focus:outline-none focus:ring-2 focus:ring-blood/40"
                />
              </div>
              <div>
                <label htmlFor="booking-notes" className="sr-only">
                  Anything your barber should know? (optional)
                </label>
                <textarea
                  id="booking-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Anything your barber should know? (optional)"
                  rows={3}
                  className="w-full border border-ink-line bg-ink-soft px-4 py-3 text-bone placeholder:text-steel focus:border-blood focus:outline-none focus:ring-2 focus:ring-blood/40"
                />
              </div>

              <div className="pt-2">
                <p className="font-display text-sm tracking-widest text-gold">
                  PAYMENT
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => setPaymentMethod("online")}
                    className={`card-edge p-4 text-left transition ${
                      paymentMethod === "online"
                        ? "border-blood bg-ink-soft"
                        : "hover:border-bone-dim"
                    }`}
                  >
                    <p className="font-display tracking-wide text-bone">
                      Pay Online Now
                    </p>
                    <p className="mt-1 text-xs text-steel">
                      Card, secures your spot ·{" "}
                      {formatMoney(SHOP.cardFeeCents)} processing fee
                    </p>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("in_shop")}
                    className={`card-edge p-4 text-left transition ${
                      paymentMethod === "in_shop"
                        ? "border-blood bg-ink-soft"
                        : "hover:border-bone-dim"
                    }`}
                  >
                    <p className="font-display tracking-wide text-bone">
                      Pay At The Shop
                    </p>
                    <p className="mt-1 text-xs text-steel">
                      Cash or card when you arrive
                    </p>
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-3 pt-2 text-sm text-bone-dim">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 border border-ink-line bg-ink-soft accent-blood focus:outline-none focus:ring-2 focus:ring-blood/40"
                />
                <span>
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    target="_blank"
                    className="text-blood-light underline"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    target="_blank"
                    className="text-blood-light underline"
                  >
                    Privacy Policy
                  </Link>
                  , and consent to Scissorhands Barbershop using my name,
                  email, and phone number to manage this booking.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && selectedServices.length > 0 && selectedSlot && (
          <div>
            <h2 className="font-display text-3xl tracking-wide text-bone">
              CONFIRM YOUR BOOKING
            </h2>
            <div className="card-edge mt-6 space-y-3 bg-ink-soft p-6">
              <Row
                label="Services"
                value={selectedServices.map((s) => s.name).join(", ")}
              />
              <Row
                label="Barber"
                value={
                  barberId === "any"
                    ? "No preference"
                    : (barber?.name ?? "")
                }
              />
              <Row
                label="When"
                value={`${formatSlotDateShort(selectedSlot.start)} at ${formatSlotTime(selectedSlot.start)}`}
              />
              <Row
                label="Payment"
                value={
                  paymentMethod === "online"
                    ? "Card (paid now)"
                    : "Cash/card at shop"
                }
              />
              <div className="border-t border-ink-line pt-3">
                <Row
                  label="Total"
                  value={formatMoney(totalCents)}
                  big
                />
              </div>
            </div>
            <p className="mt-4 text-xs text-steel">
              {SHOP.cancellationPolicy}
            </p>
            {submitError && (
              <p role="alert" className="mt-4 text-sm text-blood-light">
                {submitError}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Nav buttons */}
      <div className="mt-10 flex items-center justify-between">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="px-6 py-3 text-sm uppercase tracking-wider text-steel disabled:opacity-0"
        >
          ← Back
        </button>
        {step < 4 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canContinue[step]}
            className="bg-blood px-8 py-3 font-display tracking-wider text-bone transition hover:bg-blood-dark disabled:cursor-not-allowed disabled:opacity-30"
          >
            CONTINUE →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-blood px-8 py-3 font-display tracking-wider text-bone transition hover:bg-blood-dark disabled:opacity-50"
          >
            {submitting
              ? "PROCESSING…"
              : paymentMethod === "online"
                ? "PAY & BOOK"
                : "CONFIRM BOOKING"}
          </button>
        )}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  big,
}: {
  label: string;
  value: string;
  big?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm uppercase tracking-wider text-steel">
        {label}
      </span>
      <span
        className={
          big
            ? "font-display text-2xl text-bone"
            : "font-medium text-bone"
        }
      >
        {value}
      </span>
    </div>
  );
}

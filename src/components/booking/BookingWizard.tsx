"use client";

import { useEffect, useMemo, useState } from "react";
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

  const [serviceId, setServiceId] = useState<string | undefined>(
    initialServiceId
  );
  const [barberId, setBarberId] = useState<string | undefined>(
    initialBarberId
  );

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

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const service = services.find((s) => s.id === serviceId);
  const barber = barberId ? barbers.find((b) => b.id === barberId) : undefined;

  useEffect(() => {
    if (!serviceId || !barberId || step !== 2) return;
    setSlotsLoading(true);
    setSelectedSlot(null);
    fetch(
      `/api/slots?serviceId=${serviceId}&barberId=${barberId}&date=${date}`
    )
      .then((r) => r.json())
      .then((data) => setSlots(data.slots ?? []))
      .finally(() => setSlotsLoading(false));
  }, [serviceId, barberId, date, step]);

  const totalCents =
    (service?.price_cents ?? 0) +
    (paymentMethod === "online" ? SHOP.cardFeeCents : 0);

  async function handleSubmit() {
    if (!service || !selectedSlot) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          barberId: selectedSlot.barberId,
          serviceId: service.id,
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
    !!serviceId,
    !!barberId,
    !!selectedSlot,
    name.trim().length > 0 && email.includes("@") && phone.trim().length >= 7,
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
              PICK YOUR SERVICE
            </h2>
            {serviceCategories.map((cat) => (
              <div key={cat} className="mt-8 first:mt-6">
                <h3 className="font-display text-sm uppercase tracking-widest text-gold">
                  {CATEGORY_LABELS[cat] ?? cat}
                </h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {services
                    .filter((s) => s.category === cat)
                    .map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setServiceId(s.id)}
                        className={`card-edge flex items-center justify-between gap-3 p-4 text-left transition ${
                          serviceId === s.id
                            ? "border-blood bg-ink-soft"
                            : "hover:border-bone-dim"
                        }`}
                      >
                        <div>
                          <p className="font-display tracking-wide text-bone">
                            {s.name}
                          </p>
                          <p className="text-xs uppercase tracking-wider text-steel">
                            {formatDuration(s.duration_minutes)}
                          </p>
                        </div>
                        <span className="shrink-0 font-display text-xl text-bone">
                          {formatMoney(s.price_cents)}
                        </span>
                      </button>
                    ))}
                </div>
              </div>
            ))}
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
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full border border-ink-line bg-ink-soft px-4 py-3 text-bone placeholder:text-steel focus:border-blood focus:outline-none"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                className="w-full border border-ink-line bg-ink-soft px-4 py-3 text-bone placeholder:text-steel focus:border-blood focus:outline-none"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                type="tel"
                className="w-full border border-ink-line bg-ink-soft px-4 py-3 text-bone placeholder:text-steel focus:border-blood focus:outline-none"
              />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything your barber should know? (optional)"
                rows={3}
                className="w-full border border-ink-line bg-ink-soft px-4 py-3 text-bone placeholder:text-steel focus:border-blood focus:outline-none"
              />

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
            </div>
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && service && selectedSlot && (
          <div>
            <h2 className="font-display text-3xl tracking-wide text-bone">
              CONFIRM YOUR BOOKING
            </h2>
            <div className="card-edge mt-6 space-y-3 bg-ink-soft p-6">
              <Row label="Service" value={service.name} />
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
              <p className="mt-4 text-sm text-blood">{submitError}</p>
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

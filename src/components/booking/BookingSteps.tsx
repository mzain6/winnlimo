"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plane, Plus, Repeat, Sparkles } from "lucide-react";
import { fleet } from "@/lib/data";
import {
  extraOptions,
  formatDate,
  formatTime,
  serviceOptions,
  todayLocal,
  type BookingDraft,
  type Errors,
} from "@/lib/booking";
import { Field } from "@/components/ui/Field";
import { Vehicle } from "@/components/art/Vehicle";

export interface StepProps {
  draft: BookingDraft;
  errors: Errors;
  update: (patch: Partial<BookingDraft>) => void;
}

const err = (errors: Errors, k: keyof BookingDraft) => ({
  "aria-invalid": !!errors[k] || undefined,
  "aria-describedby": errors[k] ? `bk-${k}-error` : undefined,
});

/* ------------------------------------------------------------------ */
/* Step 1 — Trip                                                       */
/* ------------------------------------------------------------------ */

export function TripStep({ draft, errors, update }: StepProps) {
  const hourly = draft.service === "hourly";
  const [min, setMin] = useState<string | undefined>();
  useEffect(() => setMin(todayLocal()), []);

  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-brand-300">What do you need?</legend>
        <div role="radiogroup" aria-label="Service type" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {serviceOptions.map((s) => {
            const on = draft.service === s.id;
            return (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => update({ service: s.id })}
                className={`relative rounded-2xl border p-4 text-left transition-colors ${
                  on ? "border-transparent" : "border-white/12 hover:border-white/30"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="service-ring"
                    className="absolute inset-0 rounded-2xl border border-brand-400 bg-brand-500/15 shadow-[0_0_30px_-8px_rgb(30_172_199/0.6)]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative flex items-start justify-between gap-2">
                  <span>
                    <span className="block font-semibold text-white">{s.label}</span>
                    <span className="mt-0.5 block text-[0.8rem] leading-snug text-steel">{s.hint}</span>
                  </span>
                  <AnimatePresence>
                    {on && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-500 text-white"
                      >
                        <Check className="size-3" aria-hidden />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="bk-pickup" label="Pickup location" error={errors.pickup}>
          <input
            id="bk-pickup"
            className="field"
            placeholder="Address, hotel, terminal…"
            value={draft.pickup}
            onChange={(e) => update({ pickup: e.target.value })}
            autoComplete="street-address"
            {...err(errors, "pickup")}
          />
        </Field>

        <AnimatePresence mode="wait" initial={false}>
          {hourly ? (
            <motion.div key="hours" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <Field id="bk-hours" label="Hours needed">
                <select id="bk-hours" className="field" value={draft.hours} onChange={(e) => update({ hours: Number(e.target.value) })}>
                  {Array.from({ length: 11 }, (_, i) => i + 2).map((h) => (
                    <option key={h} value={h}>
                      {h} hours
                    </option>
                  ))}
                </select>
              </Field>
            </motion.div>
          ) : (
            <motion.div key="dropoff" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <Field id="bk-dropoff" label="Drop-off location" error={errors.dropoff}>
                <input
                  id="bk-dropoff"
                  className="field"
                  placeholder="Destination"
                  value={draft.dropoff}
                  onChange={(e) => update({ dropoff: e.target.value })}
                  {...err(errors, "dropoff")}
                />
              </Field>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field id="bk-date" label="Date" error={errors.date}>
          <input id="bk-date" type="date" min={min} className="field" value={draft.date} onChange={(e) => update({ date: e.target.value })} {...err(errors, "date")} />
        </Field>
        <Field id="bk-time" label="Pickup time" error={errors.time}>
          <input id="bk-time" type="time" className="field" value={draft.time} onChange={(e) => update({ time: e.target.value })} {...err(errors, "time")} />
        </Field>
        <Field id="bk-passengers" label="Passengers" error={errors.passengers}>
          <div className="flex h-[3.4rem] items-center justify-between rounded-xl border border-white/12 bg-white/[0.04] px-2">
            <button
              type="button"
              aria-label="Fewer passengers"
              onClick={() => update({ passengers: Math.max(1, draft.passengers - 1) })}
              className="grid size-10 place-items-center rounded-lg text-white transition-colors hover:bg-white/10 disabled:opacity-30"
              disabled={draft.passengers <= 1}
            >
              <Minus className="size-4" aria-hidden />
            </button>
            <span id="bk-passengers" aria-live="polite" className="relative h-7 w-10 overflow-hidden text-center text-lg font-semibold text-white">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={draft.passengers}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  {draft.passengers}
                </motion.span>
              </AnimatePresence>
            </span>
            <button
              type="button"
              aria-label="More passengers"
              onClick={() => update({ passengers: Math.min(60, draft.passengers + 1) })}
              className="grid size-10 place-items-center rounded-lg text-white transition-colors hover:bg-white/10 disabled:opacity-30"
              disabled={draft.passengers >= 60}
            >
              <Plus className="size-4" aria-hidden />
            </button>
          </div>
        </Field>
      </div>

      <AnimatePresence initial={false}>
        {draft.service === "airport" && (
          <motion.div
            key="flight"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <Field id="bk-flight" label="Flight number" optional hint="Helps dispatch time your pickup around arrivals and delays.">
              <div className="relative">
                <Plane className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-brand-300" aria-hidden />
                <input
                  id="bk-flight"
                  className="field !pl-11 uppercase placeholder:normal-case"
                  placeholder="e.g. AA 1234"
                  value={draft.flight}
                  onChange={(e) => update({ flight: e.target.value })}
                  autoComplete="off"
                />
              </div>
            </Field>
          </motion.div>
        )}
      </AnimatePresence>

      {!hourly && (
        <button
          type="button"
          role="switch"
          aria-checked={draft.roundTrip}
          onClick={() => update({ roundTrip: !draft.roundTrip })}
          className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/12 p-4 text-left transition-colors hover:border-white/30"
        >
          <span className="flex items-center gap-3">
            <Repeat className="size-5 text-brand-300" aria-hidden />
            <span>
              <span className="block font-semibold text-white">Round trip</span>
              <span className="text-[0.8rem] text-steel">Add a return journey — dispatch will confirm the return details.</span>
            </span>
          </span>
          <span className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${draft.roundTrip ? "bg-brand-500" : "bg-white/15"}`}>
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
              className={`absolute top-1 size-5 rounded-full bg-white shadow ${draft.roundTrip ? "right-1" : "left-1"}`}
            />
          </span>
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 2 — Vehicle                                                    */
/* ------------------------------------------------------------------ */

export function VehicleStep({ draft, errors, update }: StepProps) {
  const recommended = fleet.find((v) => v.passengers >= draft.passengers)?.id;

  return (
    <div>
      <p className="mb-5 text-mist">
        Showing vehicles for <strong className="text-white">{draft.passengers}</strong> {draft.passengers === 1 ? "passenger" : "passengers"}. Capacity is typical for each class.
      </p>
      <div role="radiogroup" aria-label="Vehicle" className="grid gap-4 sm:grid-cols-2">
        {fleet.map((v) => {
          const on = draft.vehicle === v.id;
          const fits = v.passengers >= draft.passengers;
          return (
            <button
              key={v.id}
              type="button"
              role="radio"
              aria-checked={on}
              aria-disabled={!fits}
              onClick={() => fits && update({ vehicle: v.id })}
              className={`group relative overflow-hidden rounded-3xl border text-left transition-all duration-300 ${
                on ? "border-transparent" : fits ? "border-white/12 hover:-translate-y-1 hover:border-white/30" : "cursor-not-allowed border-white/8 opacity-45"
              }`}
            >
              {on && (
                <motion.span
                  layoutId="vehicle-ring"
                  className="absolute inset-0 rounded-3xl border-2 border-brand-400 bg-brand-500/10 shadow-[0_0_40px_-10px_rgb(30_172_199/0.7)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <div className="relative">
                <div className="bg-[linear-gradient(180deg,#0a1218,#0d2530)] px-5 pb-2 pt-6">
                  <Vehicle type={v.id} lights={false} className="w-full transition-transform duration-500 group-hover:scale-[1.05]" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{v.name}</p>
                      <p className="text-[0.8rem] text-steel">{v.model}</p>
                    </div>
                    {fits && recommended === v.id && (
                      <span className="flex shrink-0 items-center gap-1 rounded-full bg-brand-500/20 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-brand-200">
                        <Sparkles className="size-3" aria-hidden /> Best fit
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-mist">
                    {fits ? `Up to ${v.passengers} guests · ${v.bags} bags` : `Seats up to ${v.passengers} — too small for ${draft.passengers}`}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <p id="bk-vehicle-error" role="alert" className="mt-4 min-h-6 text-sm text-[#ff8a93]">
        {errors.vehicle}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 3 — Details                                                    */
/* ------------------------------------------------------------------ */

export function DetailsStep({ draft, errors, update }: StepProps) {
  const toggle = (label: string) =>
    update({ extras: draft.extras.includes(label) ? draft.extras.filter((x) => x !== label) : [...draft.extras, label] });

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="bk-name" label="Full name" error={errors.name}>
          <input id="bk-name" className="field" value={draft.name} onChange={(e) => update({ name: e.target.value })} autoComplete="name" {...err(errors, "name")} />
        </Field>
        <Field id="bk-company" label="Company" optional>
          <input id="bk-company" className="field" value={draft.company} onChange={(e) => update({ company: e.target.value })} autoComplete="organization" />
        </Field>
        <Field id="bk-phone" label="Mobile phone" error={errors.phone} hint="Your chauffeur may text you on the day.">
          <input id="bk-phone" type="tel" className="field" value={draft.phone} onChange={(e) => update({ phone: e.target.value })} autoComplete="tel" {...err(errors, "phone")} />
        </Field>
        <Field id="bk-email" label="Email" error={errors.email}>
          <input id="bk-email" type="email" className="field" value={draft.email} onChange={(e) => update({ email: e.target.value })} autoComplete="email" {...err(errors, "email")} />
        </Field>
      </div>

      <fieldset>
        <legend className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-brand-300">
          Preferences <span className="font-normal normal-case tracking-normal text-steel">— requested, subject to availability</span>
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {extraOptions.map((x) => {
            const on = draft.extras.includes(x.label);
            return (
              <motion.button
                key={x.id}
                type="button"
                role="checkbox"
                aria-checked={on}
                onClick={() => toggle(x.label)}
                whileTap={{ scale: 0.94 }}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-colors ${
                  on ? "border-brand-400 bg-brand-500/20 text-white" : "border-white/15 text-mist hover:border-white/35 hover:text-white"
                }`}
              >
                <span className={`grid size-4 place-items-center rounded-full border ${on ? "border-brand-300 bg-brand-500" : "border-white/30"}`}>
                  {on && <Check className="size-3 text-white" aria-hidden />}
                </span>
                {x.label}
              </motion.button>
            );
          })}
        </div>
      </fieldset>

      <Field id="bk-notes" label="Notes for your chauffeur" optional>
        <textarea
          id="bk-notes"
          rows={4}
          className="field resize-none"
          placeholder="Gate codes, luggage, special requests…"
          value={draft.notes}
          onChange={(e) => update({ notes: e.target.value })}
        />
      </Field>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step 4 — Review                                                     */
/* ------------------------------------------------------------------ */

interface ReviewProps {
  draft: BookingDraft;
  goTo: (step: number) => void;
  honeypot: string;
  setHoneypot: (v: string) => void;
}

export function ReviewStep({ draft, goTo, honeypot, setHoneypot }: ReviewProps) {
  const v = fleet.find((f) => f.id === draft.vehicle);
  const svc = serviceOptions.find((s) => s.id === draft.service);

  const blocks: { title: string; step: number; rows: [string, string][] }[] = [
    {
      title: "Trip",
      step: 0,
      rows: [
        ["Service", `${svc?.label ?? ""}${draft.roundTrip ? " · round trip" : ""}`],
        ["Pickup", draft.pickup],
        draft.service === "hourly" ? ["Duration", `${draft.hours} hours`] : ["Drop-off", draft.dropoff],
        ["When", `${formatDate(draft.date)} · ${formatTime(draft.time)}`],
        ["Passengers", String(draft.passengers)],
        ...(draft.flight ? ([["Flight", draft.flight.toUpperCase()]] as [string, string][]) : []),
      ],
    },
    { title: "Vehicle", step: 1, rows: [["Selected", v ? `${v.name} — ${v.model}` : "—"]] },
    {
      title: "You",
      step: 2,
      rows: [
        ["Name", draft.name],
        ...(draft.company ? ([["Company", draft.company]] as [string, string][]) : []),
        ["Phone", draft.phone],
        ["Email", draft.email],
        ...(draft.extras.length ? ([["Preferences", draft.extras.join(", ")]] as [string, string][]) : []),
        ...(draft.notes ? ([["Notes", draft.notes]] as [string, string][]) : []),
      ],
    },
  ];

  return (
    <div>
      <div className="space-y-4">
        {blocks.map((b, bi) => (
          <motion.section
            key={b.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: bi * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-brand-300">{b.title}</h3>
              <button type="button" onClick={() => goTo(b.step)} className="text-sm text-mist underline-offset-4 transition-colors hover:text-white hover:underline">
                Edit
              </button>
            </div>
            <dl className="mt-3 space-y-2">
              {b.rows.map(([k, val]) => (
                <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 text-[0.95rem]">
                  <dt className="text-steel">{k}</dt>
                  <dd className="break-words text-white">{val || "—"}</dd>
                </div>
              ))}
            </dl>
          </motion.section>
        ))}
      </div>

      <p className="mt-6 rounded-2xl border border-brand-500/25 bg-brand-500/10 p-4 text-sm leading-relaxed text-brand-100">
        This is a booking <strong className="font-semibold text-white">request</strong>. Dispatch will confirm availability and your exact rate by phone or email
        — you are not charged when you submit.
      </p>

      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>
    </div>
  );
}

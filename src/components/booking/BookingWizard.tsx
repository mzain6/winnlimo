"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { company, fleet } from "@/lib/data";
import {
  clearDraft,
  emptyDraft,
  loadDraft,
  makeRef,
  saveDraft,
  serviceOptions,
  validateContact,
  validateTrip,
  validateVehicle,
  type BookingDraft,
  type Errors,
} from "@/lib/booking";
import { DetailsStep, ReviewStep, TripStep, VehicleStep } from "./BookingSteps";
import { BookingSummary } from "./BookingSummary";
import { BookingDone } from "./BookingDone";

const steps = [
  { id: "trip", label: "Trip", title: "Where & when" },
  { id: "vehicle", label: "Vehicle", title: "Choose your ride" },
  { id: "details", label: "Details", title: "About you" },
  { id: "review", label: "Review", title: "Review & request" },
] as const;

const validators = [validateTrip, validateVehicle, validateContact];

type Status = "editing" | "submitting" | "done";

export function BookingWizard() {
  const params = useSearchParams();
  const [draft, setDraft] = useState<BookingDraft>(emptyDraft);
  const [errors, setErrors] = useState<Errors>({});
  const [[step, dir], setStep] = useState<[number, number]>([0, 0]);
  const [status, setStatus] = useState<Status>("editing");
  const [submitError, setSubmitError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [result, setResult] = useState({ ref: "", delivered: false });
  const [ready, setReady] = useState(false);

  const topRef = useRef<HTMLDivElement>(null);
  const shake = useAnimationControls();

  // restore any draft (from the hero quote bar or a previous visit) and apply ?service= / ?vehicle=
  useEffect(() => {
    const saved = loadDraft() ?? {};
    const patch: Partial<BookingDraft> = { ...saved };
    const vehicle = params.get("vehicle");
    const service = params.get("service");
    if (vehicle && fleet.some((f) => f.id === vehicle)) patch.vehicle = vehicle as BookingDraft["vehicle"];
    if (service && serviceOptions.some((s) => s.id === service)) patch.service = service as BookingDraft["service"];
    setDraft((d) => ({ ...d, ...patch }));
    setReady(true);
  }, [params]);

  // persist as the visitor types, so a refresh doesn't cost them their progress
  useEffect(() => {
    if (ready && status === "editing") saveDraft(draft);
  }, [draft, ready, status]);

  const update = useCallback((patch: Partial<BookingDraft>) => {
    setDraft((d) => ({ ...d, ...patch }));
    setErrors((e) => {
      const next = { ...e };
      for (const k of Object.keys(patch) as (keyof BookingDraft)[]) delete next[k];
      // changing party size can invalidate a previously chosen vehicle
      if ("passengers" in patch) delete next.vehicle;
      return next;
    });
  }, []);

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const goTo = (target: number) => {
    setStep(([cur]) => [target, target > cur ? 1 : -1]);
    setErrors({});
    scrollTop();
  };

  const submit = async () => {
    setStatus("submitting");
    setSubmitError("");
    const ref = makeRef();
    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind: "booking", ref, website: honeypot, data: draft }),
      });
      const json = (await res.json()) as { ok: boolean; delivered?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Something went wrong.");
      setResult({ ref, delivered: !!json.delivered });
      clearDraft();
      setStatus("done");
      scrollTop();
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "We couldn't send your request.");
      setStatus("editing");
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    if (step < steps.length - 1) {
      const found = validators[step](draft);
      if (Object.keys(found).length) {
        setErrors(found);
        shake.start({ x: [0, -10, 9, -6, 4, 0], transition: { duration: 0.45 } });
        const first = Object.keys(found)[0];
        requestAnimationFrame(() => document.getElementById(`bk-${first}`)?.focus());
        return;
      }
      goTo(step + 1);
    } else {
      void submit();
    }
  };

  const reset = () => {
    setDraft(emptyDraft);
    setErrors({});
    setStep([0, 0]);
    setStatus("editing");
    setHoneypot("");
    scrollTop();
  };

  if (status === "done") {
    return (
      <div ref={topRef} className="container-x scroll-mt-28 py-16 sm:py-24">
        <BookingDone draft={draft} reference={result.ref} delivered={result.delivered} onReset={reset} />
      </div>
    );
  }

  const last = step === steps.length - 1;

  return (
    <div ref={topRef} className="container-x scroll-mt-28 py-12 sm:py-20">
      {/* stepper */}
      <ol className="relative mx-auto mb-12 flex max-w-3xl items-start justify-between" aria-label="Booking progress">
        <span aria-hidden className="absolute left-5 right-5 top-5 h-px bg-white/12" />
        <motion.span
          aria-hidden
          className="absolute left-5 right-5 top-5 h-px origin-left bg-gradient-to-r from-brand-600 to-brand-300"
          animate={{ scaleX: step / (steps.length - 1) }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        {steps.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li key={s.id} className="relative z-10 flex w-20 flex-col items-center gap-2.5 text-center" aria-current={active ? "step" : undefined}>
              <button
                type="button"
                onClick={() => i < step && goTo(i)}
                disabled={i >= step}
                aria-label={`${s.label}${done ? " (completed — go back)" : ""}`}
                className="relative grid size-10 place-items-center rounded-full"
              >
                <motion.span
                  animate={{
                    backgroundColor: done || active ? "#1eacc7" : "#101318",
                    borderColor: done || active ? "#5ccae0" : "rgba(255,255,255,0.18)",
                    scale: active ? 1.12 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="absolute inset-0 rounded-full border-2"
                />
                {active && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-400/40" />}
                <span className="relative text-sm font-semibold text-white">
                  {done ? (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="block">
                      <Check className="size-4" aria-hidden />
                    </motion.span>
                  ) : (
                    i + 1
                  )}
                </span>
              </button>
              <span className={`text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-colors ${active ? "text-white" : "text-steel"}`}>{s.label}</span>
            </li>
          );
        })}
      </ol>

      <div className="grid gap-8 lg:grid-cols-[1fr_21rem] xl:grid-cols-[1fr_24rem]">
        <motion.form
          onSubmit={onSubmit}
          noValidate
          animate={shake}
          className="relative rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-10"
          aria-label="Booking request"
        >
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={step}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d >= 0 ? 48 : -48 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d >= 0 ? -48 : 48 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-brand-300">
                Step {step + 1} of {steps.length}
              </p>
              <h2 className="display mb-8 mt-2 text-3xl text-white sm:text-4xl">{steps[step].title}</h2>

              {step === 0 && <TripStep draft={draft} errors={errors} update={update} />}
              {step === 1 && <VehicleStep draft={draft} errors={errors} update={update} />}
              {step === 2 && <DetailsStep draft={draft} errors={errors} update={update} />}
              {step === 3 && <ReviewStep draft={draft} goTo={goTo} honeypot={honeypot} setHoneypot={setHoneypot} />}
            </motion.div>
          </AnimatePresence>

          {submitError && (
            <p role="alert" className="mt-6 rounded-xl border border-[#ff8a93]/30 bg-[#ff8a93]/10 px-4 py-3 text-sm text-[#ffb3b9]">
              {submitError} You can also call {company.phones[0].display}.
            </p>
          )}

          <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              className={`inline-flex items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-mist transition-colors hover:text-white ${
                step === 0 ? "invisible" : ""
              }`}
            >
              <ArrowLeft className="size-4" aria-hidden /> Back
            </button>

            <motion.button
              type="submit"
              disabled={status === "submitting"}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex h-14 items-center gap-3 rounded-full bg-brand-500 px-8 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_10px_40px_-10px_rgb(30_172_199/0.8)] transition-colors hover:bg-brand-400 disabled:opacity-60"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="size-5 animate-spin" aria-hidden /> Sending…
                </>
              ) : last ? (
                <>
                  Send request <Check className="size-4" aria-hidden />
                </>
              ) : (
                <>
                  Continue <ArrowRight className="size-4" aria-hidden />
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="Trip summary">
          <BookingSummary draft={draft} />
        </aside>
      </div>
    </div>
  );
}

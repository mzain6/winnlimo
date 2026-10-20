"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { company } from "@/lib/data";
import { buildMailto, formatDate, formatTime, type BookingDraft } from "@/lib/booking";
import { Button } from "@/components/ui/Button";

interface BookingDoneProps {
  draft: BookingDraft;
  reference: string;
  delivered: boolean;
  onReset: () => void;
}

export function BookingDone({ draft, reference, delivered, onReset }: BookingDoneProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-14 text-center sm:px-12"
    >
      <div className="relative mx-auto size-24">
        <motion.span
          initial={{ scale: 0.6, opacity: 0.8 }}
          animate={{ scale: 2.1, opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-brand-400"
        />
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 15 }}
          className="absolute inset-0 grid place-items-center rounded-full bg-brand-500 shadow-[0_0_60px_rgb(30_172_199/0.7)]"
        >
          <svg viewBox="0 0 24 24" className="size-12 text-white" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }} />
          </svg>
        </motion.span>
      </div>

      <h2 className="display mt-8 text-4xl text-white sm:text-5xl">{delivered ? "Request received" : "Almost there"}</h2>
      <p className="mt-4 text-lg text-mist">
        {delivered
          ? `Thank you, ${draft.name.split(" ")[0]}. Dispatch will confirm availability and your rate by phone or email shortly.`
          : "Our online booking inbox isn't connected yet, so your request hasn't reached dispatch. Send it in one tap by email (it's pre-filled), or call us."}
      </p>

      <div className="mx-auto mt-8 inline-flex flex-col items-center rounded-2xl border border-white/10 bg-ink/60 px-8 py-4">
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-steel">Reference</span>
        <span className="display mt-1 text-3xl tracking-wider text-brand-300">{reference}</span>
      </div>
      <p className="mt-4 text-sm text-steel">
        {formatDate(draft.date)} · {formatTime(draft.time)}
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        {!delivered && (
          <Button href={buildMailto(company.email, draft, reference)} arrow>
            <Mail className="size-4" aria-hidden /> Email dispatch
          </Button>
        )}
        <Button href={company.phones[0].href} variant={delivered ? "primary" : "outline"}>
          <Phone className="size-4" aria-hidden /> {company.phones[0].display}
        </Button>
      </div>
      <div className="mt-6 flex justify-center gap-6 text-sm">
        <button type="button" onClick={onReset} className="text-mist underline-offset-4 transition-colors hover:text-white hover:underline">
          Book another ride
        </button>
        <a href="/" className="text-mist underline-offset-4 transition-colors hover:text-white hover:underline">
          Back to home
        </a>
      </div>
    </motion.div>
  );
}

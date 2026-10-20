"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Phone, Users } from "lucide-react";
import { company, fleet } from "@/lib/data";
import { formatDate, formatTime, serviceOptions, type BookingDraft } from "@/lib/booking";
import { Vehicle } from "@/components/art/Vehicle";

/** Live trip card that fills in as the visitor completes each step. */
export function BookingSummary({ draft }: { draft: BookingDraft }) {
  const v = fleet.find((f) => f.id === draft.vehicle);
  const svc = serviceOptions.find((s) => s.id === draft.service);
  const hourly = draft.service === "hourly";

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(170deg,#0e1a21,#0a1014)]">
      <div className="border-b border-white/10 px-6 py-5">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand-300">Your trip</p>
        <p className="display mt-1 text-2xl text-white">{svc?.label}</p>
      </div>

      <div className="space-y-6 p-6">
        {/* route */}
        <div className="relative pl-7">
          <span className="absolute bottom-3 left-[0.45rem] top-3 w-px border-l border-dashed border-brand-400/50" />
          <span className="absolute left-0 top-1 size-3.5 rounded-full border-2 border-brand-400 bg-ink" />
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-steel">Pickup</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={draft.pickup || "empty"}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`mt-0.5 break-words ${draft.pickup ? "text-white" : "text-white/30"}`}
              >
                {draft.pickup || "Add pickup location"}
              </motion.p>
            </AnimatePresence>
          </div>

          <span className="absolute bottom-[0.2rem] left-0 size-3.5 rounded-full bg-brand-500 shadow-[0_0_14px_rgb(30_172_199)]" />
          <div className="mt-5">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-steel">{hourly ? "Duration" : "Drop-off"}</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={hourly ? "h" : draft.dropoff || "empty"}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`mt-0.5 break-words ${hourly || draft.dropoff ? "text-white" : "text-white/30"}`}
              >
                {hourly ? `${draft.hours} hours, as directed` : draft.dropoff || "Add destination"}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-4 border-t border-white/10 pt-5 text-sm">
          <div>
            <dt className="flex items-center gap-1.5 text-steel">
              <CalendarDays className="size-3.5" aria-hidden /> Date
            </dt>
            <dd className="mt-1 text-white">{formatDate(draft.date)}</dd>
          </div>
          <div>
            <dt className="text-steel">Time</dt>
            <dd className="mt-1 text-white">{formatTime(draft.time)}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-steel">
              <Users className="size-3.5" aria-hidden /> Guests
            </dt>
            <dd className="mt-1 text-white">{draft.passengers}</dd>
          </div>
          <div>
            <dt className="text-steel">Return</dt>
            <dd className="mt-1 text-white">{hourly ? "—" : draft.roundTrip ? "Round trip" : "One way"}</dd>
          </div>
        </dl>

        <div className="border-t border-white/10 pt-5">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-steel">Vehicle</p>
          <div className="relative mt-2 h-24">
            <AnimatePresence mode="popLayout" initial={false}>
              {v ? (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ type: "spring", stiffness: 200, damping: 24 }}
                  className="flex items-center gap-4"
                >
                  <Vehicle type={v.id} lights={false} className="w-32 shrink-0" />
                  <div>
                    <p className="font-semibold text-white">{v.name}</p>
                    <p className="text-[0.8rem] text-steel">{v.model}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.p key="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-4 text-white/30">
                  Choose a vehicle in step 2
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-white/[0.03] px-6 py-4 text-sm text-mist">
        Prefer to talk it through?{" "}
        <a href={company.phones[0].href} className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-brand-300">
          <Phone className="size-3.5 text-brand-400" aria-hidden /> {company.phones[0].display}
        </a>
      </div>
    </div>
  );
}

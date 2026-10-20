"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Check, Users } from "lucide-react";
import { fleet } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Vehicle } from "@/components/art/Vehicle";

interface FleetShowcaseProps {
  heading?: boolean;
  /** Heading level for the section title; the fleet page already has an h1. */
  className?: string;
}

/** Interactive vehicle picker: sliding tab pill, direction-aware vehicle swap, animated spec chips. */
export function FleetShowcase({ heading = true, className = "" }: FleetShowcaseProps) {
  const [[active, dir], setActive] = useState<[number, number]>([0, 0]);
  const v = fleet[active];

  const go = (i: number) => setActive([i, i > active ? 1 : -1]);

  return (
    <section className={`relative overflow-hidden bg-night py-24 sm:py-32 ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_0%,rgb(30_172_199/0.14),transparent),radial-gradient(50%_40%_at_90%_100%,rgb(30_172_199/0.1),transparent)]" />
      <div className="container-x relative">
        {heading && (
          <SectionHeading
            eyebrow="Our fleet"
            title="Late-model, *all-black* executive vehicles"
            description="From a single executive sedan to a full mini coach — every vehicle is immaculate, current and driven by a professional chauffeur."
          />
        )}

        {/* tabs */}
        <div
          role="tablist"
          aria-label="Vehicle classes"
          className={`${heading ? "mt-14" : ""} flex gap-2 overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] p-1.5 [scrollbar-width:none] sm:inline-flex`}
        >
          {fleet.map((f, i) => (
            <button
              key={f.id}
              role="tab"
              type="button"
              aria-selected={i === active}
              onClick={() => go(i)}
              className={`relative shrink-0 rounded-full px-5 py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
                i === active ? "text-white" : "text-steel hover:text-white"
              }`}
            >
              {i === active && (
                <motion.span
                  layoutId="fleet-pill"
                  className="absolute inset-0 rounded-full bg-brand-500 shadow-[0_8px_24px_-6px_rgb(30_172_199/0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{f.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          {/* stage */}
          <div className="relative">
            <div className="absolute inset-x-[8%] bottom-[8%] h-10 rounded-[50%] bg-brand-500/30 blur-2xl" />
            <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,#0a1218,#0d2530)]">
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,#020405,transparent)]" />
              <div className="absolute inset-x-6 bottom-[14%] h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent" />
              <AnimatePresence mode="popLayout" custom={dir} initial={false}>
                <motion.div
                  key={v.id}
                  custom={dir}
                  variants={{
                    enter: (d: number) => ({ x: d >= 0 ? 160 : -160, opacity: 0, scale: 0.94 }),
                    center: { x: 0, opacity: 1, scale: 1 },
                    exit: (d: number) => ({ x: d >= 0 ? -160 : 160, opacity: 0, scale: 0.94 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 160, damping: 22, mass: 0.9 }}
                  className="absolute inset-0 flex items-end justify-center px-[6%] pb-[7%]"
                >
                  <Vehicle type={v.id} className="w-full" />
                </motion.div>
              </AnimatePresence>
              <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-brand-200 backdrop-blur">
                {String(active + 1).padStart(2, "0")} / {String(fleet.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* details */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.26em] text-brand-300">{v.model}</p>
                <h3 className="display mt-3 text-4xl text-white sm:text-5xl">{v.name}</h3>
                <p className="mt-3 text-lg italic text-brand-100">{v.tagline}</p>
                <p className="mt-5 leading-relaxed text-mist">{v.description}</p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm text-white">
                    <Users className="size-4 text-brand-400" aria-hidden /> Up to {v.passengers} guests
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm text-white">
                    <Briefcase className="size-4 text-brand-400" aria-hidden /> {v.bags} bags
                  </span>
                </div>

                <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                  {v.features.map((f, i) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.07 }}
                      className="flex items-center gap-2.5 text-[0.95rem] text-mist"
                    >
                      <Check className="size-4 shrink-0 text-brand-400" aria-hidden /> {f}
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Button href={`/booking?vehicle=${v.id}`} arrow>
                    Reserve this vehicle
                  </Button>
                  {heading && (
                    <Button href="/fleet" variant="outline">
                      Full fleet
                    </Button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

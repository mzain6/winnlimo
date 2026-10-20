"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { process } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Timeline whose spine draws itself as the visitor scrolls. */
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="How it works"
            title="How a ride is *arranged*"
            description="Four simple steps from first call to final invoice — designed so your only job is to be ready."
          />
        </div>

        <div ref={ref} className="relative pl-12 sm:pl-16">
          {/* spine */}
          <div className="absolute bottom-3 left-[1.15rem] top-3 w-px bg-white/10 sm:left-[1.65rem]" />
          <motion.div
            aria-hidden
            style={{ scaleY: draw }}
            className="absolute bottom-3 left-[1.15rem] top-3 w-px origin-top bg-gradient-to-b from-brand-300 via-brand-500 to-brand-600 shadow-[0_0_18px_rgb(30_172_199/0.9)] sm:left-[1.65rem]"
          />

          <ol className="space-y-14">
            {process.map((step, i) => (
              <li key={step.title} className="relative">
                <Reveal x={30} y={0}>
                  <motion.span
                    initial={{ scale: 0.4, backgroundColor: "#090b0e" }}
                    whileInView={{ scale: 1, backgroundColor: "#1eacc7" }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="absolute -left-12 top-0 grid size-10 place-items-center rounded-full border border-brand-400/60 text-sm font-semibold text-white shadow-[0_0_24px_rgb(30_172_199/0.5)] sm:-left-16 sm:size-[3.4rem] sm:text-base"
                  >
                    {i + 1}
                  </motion.span>
                  <h3 className="display text-3xl text-white sm:text-4xl">{step.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-mist">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SkylineLayer } from "@/components/art/Skyline";

/** Teal band echoing the "What about pricing?" strip on the original site. */
export function PricingBanner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-brand-600">
      <div className="absolute inset-0 bg-[linear-gradient(110deg,#0f5a6b_0%,#1eacc7_55%,#5ccae0_100%)]" />
      <motion.div style={{ y }} className="absolute inset-x-0 -bottom-10 h-[130%] opacity-[0.14] mix-blend-multiply">
        <SkylineLayer layer="mid" className="size-full" />
      </motion.div>
      <div className="grain absolute inset-0" />

      <div className="container-x relative flex flex-col items-start justify-between gap-8 py-16 sm:py-20 lg:flex-row lg:items-center">
        <Reveal className="max-w-2xl">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.3em] text-white/80">What about pricing?</p>
          <h2 className="display mt-4 text-3xl leading-tight text-white sm:text-5xl">
            The most competitive rates in southern California for the quality of service.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <Button href="/booking" variant="dark" size="lg" arrow>
            Get an instant quote
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

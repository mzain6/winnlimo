"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { company, testimonial } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

/** Large pull-quote whose words light up as the section scrolls through the viewport. */
export function Testimonial() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 45%"] });
  const words = testimonial.quote.split(" ");

  return (
    <section className="relative overflow-hidden py-24 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/10 blur-[120px]" />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-5xl text-center">
          <span className="eyebrow justify-center">Client words</span>
          <span aria-hidden className="display mt-6 block text-8xl leading-none text-brand-500/60">
            “
          </span>
        </Reveal>

        <div ref={ref} className="mx-auto max-w-5xl">
          <blockquote className="display -mt-6 text-center text-[1.65rem] leading-[1.45] sm:text-4xl sm:leading-[1.4] lg:text-[2.7rem]">
            {words.map((w, i) => (
              <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {w}
              </Word>
            ))}
          </blockquote>

          <Reveal className="mt-12 flex flex-col items-center gap-5">
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.26em] text-brand-300">— {testimonial.author}</p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-mist">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2">
                <BadgeCheck className="size-4 text-brand-400" aria-hidden /> Proud member of LABTA
              </span>
              <a
                href={company.socials.find((s) => s.id === "yelp")?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 transition-colors hover:border-brand-400 hover:text-white"
              >
                Read more reviews on Yelp <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: import("framer-motion").MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className="text-white">
        {children}
      </motion.span>{" "}
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { company } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { SplitText } from "@/components/ui/SplitText";
import { Vehicle } from "@/components/art/Vehicle";
import { Palm, SkylineLayer, Stars } from "@/components/art/Skyline";

const slides = [
  {
    eyebrow: "Los Angeles",
    title: "Chauffeured *Black Car* Transportation",
    text: "Late-model, all-black executive vehicles and professional chauffeurs — on call 24 hours a day.",
  },
  {
    eyebrow: "Corporate Ground Transportation",
    title: "Corporate Transportation *At Its Best*",
    text: "Competitive business rates. 24/7 service. Professional chauffeurs. Easy billing.",
  },
  {
    eyebrow: "V.I.P. Entertainment Transportation",
    title: "Experience *Luxury* Like Never Before",
    text: "Concerts, premieres, stadium nights and private flights — arrive exactly as you intended.",
  },
];

const SLIDE_MS = 6500;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yFar = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, 170]);
  const yNear = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const yCars = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, paused]);

  const slide = slides[index];
  const settle = { duration: 1.2, ease: [0.16, 1, 0.3, 1] } as const;

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden bg-ink">
      {/* sky */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#04070a_0%,#07151d_38%,#0c3141_72%,#145a6e_100%)]" />
      <Stars className="absolute inset-0" />
      <div className="absolute left-[62%] top-[30%] size-[34rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[110px]" />

      {/* parallax skyline */}
      <motion.div style={{ y: yFar }} className="absolute inset-x-0 bottom-0 h-[78%] opacity-80">
        <SkylineLayer layer="far" className="size-full" />
      </motion.div>
      <motion.div style={{ y: yMid }} className="absolute inset-x-0 bottom-0 h-[62%]">
        <SkylineLayer layer="mid" className="size-full" />
      </motion.div>
      <motion.div style={{ y: yNear }} className="absolute inset-x-0 bottom-0 h-[44%]">
        <SkylineLayer layer="near" className="size-full" />
      </motion.div>

      {/* palms */}
      <motion.div style={{ y: yNear }} className="pointer-events-none absolute bottom-[8%] left-[1%] hidden h-[48%] sm:block">
        <Palm className="h-full" lean={-3} />
      </motion.div>
      <motion.div style={{ y: yNear }} className="pointer-events-none absolute bottom-[8%] right-[3%] hidden h-[40%] sm:block">
        <Palm className="h-full" lean={4} />
      </motion.div>

      <div className="grain absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_30%,transparent,rgb(4_7_10/0.55))]" />

      {/* copy */}
      <motion.div
        style={{ y: yText, opacity: textOpacity }}
        className="container-x relative z-20 flex min-h-[100svh] flex-col items-center justify-start pb-60 pt-36 text-center sm:pb-[21rem] sm:pt-40 lg:pt-40"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand-200 backdrop-blur"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-brand-400" />
            <span className="relative inline-flex size-2 rounded-full bg-brand-400" />
          </span>
          Available 24/7 · TCP# {company.tcp}
        </motion.span>

        <div className="mt-7 flex min-h-[14rem] w-full max-w-4xl flex-col items-center sm:min-h-[15.5rem] lg:min-h-[16.5rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              exit={{ opacity: 0, y: -24, filter: "blur(6px)" }}
              transition={{ duration: 0.45 }}
              className="flex flex-col items-center"
            >
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.34em] text-brand-300">{slide.eyebrow}</p>
              <h1 className="display mt-5 text-[2.55rem] leading-[1.06] text-white sm:text-6xl lg:text-[4.4rem] xl:text-[4.8rem]">
                <SplitText text={slide.title} trigger="mount" delay={0.1} stagger={0.09} />
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="mt-6 max-w-2xl text-base leading-relaxed text-mist sm:text-lg"
              >
                {slide.text}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-4 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button href="/booking" size="lg" arrow>
            Book your ride
          </Button>
          <Button href={company.phones[0].href} variant="outline" size="lg">
            Call {company.phones[0].display}
          </Button>
        </motion.div>

        {/* slide indicator */}
        <div className="mt-10 flex items-center gap-3" role="tablist" aria-label="Hero messages">
          {slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show message ${i + 1}`}
              onClick={() => setIndex(i)}
              className="group relative h-6 w-14"
            >
              <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/20">
                {i === index && (
                  <motion.span
                    key={`${index}-${paused}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: paused ? 0 : 1 }}
                    transition={{ duration: paused ? 0.3 : SLIDE_MS / 1000, ease: "linear" }}
                    className="absolute inset-0 origin-left rounded-full bg-brand-400"
                  />
                )}
                {i < index && <span className="absolute inset-0 rounded-full bg-brand-400/70" />}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* the fleet fades up into place (wheels stay still) */}
      <motion.div style={{ y: yCars }} className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-center px-2 pb-28 sm:pb-32">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...settle, delay: 0.5 }}
          className="-mr-[18vw] w-[50vw] max-w-[26rem] sm:-mr-14 sm:w-[30vw]"
        >
          <Vehicle type="sedan" />
        </motion.div>
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...settle, delay: 0.3 }}
          className="relative z-10 w-[62vw] max-w-[36rem] sm:w-[38vw]"
        >
          <Vehicle type="van" />
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...settle, delay: 0.5 }}
          className="-ml-[20vw] w-[52vw] max-w-[28rem] sm:-ml-16 sm:w-[32vw]"
        >
          <Vehicle type="suv" />
        </motion.div>
      </motion.div>

      {/* wet road catching the city glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[22%] bg-[linear-gradient(180deg,transparent,#0b3140_45%,#050c11)]" />
      <div className="pointer-events-none absolute inset-x-[10%] bottom-[19%] z-[5] h-px bg-gradient-to-r from-transparent via-brand-300/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-ink to-transparent" />

      {/* scroll cue */}
      <div aria-hidden className="absolute bottom-3 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-1 text-[0.65rem] uppercase tracking-[0.3em] text-steel lg:flex">
        Scroll
        <ChevronDown className="size-4 animate-float text-brand-400" />
      </div>
    </section>
  );
}

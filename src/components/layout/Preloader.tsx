"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue } from "framer-motion";
import { company } from "@/lib/data";
import { SkylineLayer, Stars } from "@/components/art/Skyline";
import { useSiteReady } from "./SiteReady";

/** Never keep a visitor waiting longer than this, even if a slow asset hasn't finished loading. */
const MIN_MS = 1700;
const MAX_MS = 4500;

/**
 * Opening loading screen. It is part of the server-rendered HTML, so it covers the page from the very first
 * paint (no flash of un-styled content), runs a progress count while the page finishes loading, then lifts away.
 * It lives in the root layout, so it only plays on a full page load — never on in-site navigation.
 */
export function Preloader() {
  const { markReady } = useSiteReady();
  const [visible, setVisible] = useState(true);
  const progress = useMotionValue(0);

  // lock scrolling while the loading screen is up
  useEffect(() => {
    if (!visible) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, [visible]);

  useEffect(() => {
    let cancelled = false;

    // creep toward 90% while we wait, then finish the last stretch once the page has loaded
    const creep = animate(progress, 0.9, { duration: MIN_MS / 1000, ease: [0.22, 1, 0.36, 1] });

    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((res) => window.addEventListener("load", () => res(), { once: true }));
    const minimum = new Promise<void>((res) => setTimeout(res, MIN_MS));
    const ceiling = new Promise<void>((res) => setTimeout(res, MAX_MS));

    Promise.race([Promise.all([loaded, minimum]), ceiling]).then(() => {
      if (cancelled) return;
      animate(progress, 1, { duration: 0.35, ease: "easeOut" }).then(() => {
        if (cancelled) return;
        setTimeout(() => {
          if (cancelled) return;
          markReady();
          setVisible(false);
        }, 150);
      });
    });

    return () => {
      cancelled = true;
      creep.stop();
    };
  }, [progress, markReady]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="preloader"
          key="preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading Winn Limousine"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden border-b-2 border-brand-500 bg-ink"
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#04070a_0%,#07151d_60%,#0c3141_100%)]" />
          <Stars className="absolute inset-0 opacity-60" />
          <div className="absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/15 blur-[110px]" />
          <div className="absolute inset-x-0 bottom-0 h-[38%] opacity-60">
            <SkylineLayer layer="near" className="size-full" />
          </div>
          <div className="grain absolute inset-0" />

          {/* wordmark */}
          <div className="relative flex flex-col items-center px-6 text-center">
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.4 }}
              animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
              className="display whitespace-nowrap text-[2.1rem] uppercase tracking-[0.08em] text-white sm:text-6xl"
            >
              Winn <span className="text-brand-500">Limousine</span>
            </motion.div>

            <div className="mt-4 h-px w-[min(78vw,26rem)] overflow-hidden bg-white/15">
              <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-gradient-to-r from-brand-600 to-brand-300 shadow-[0_0_12px_rgb(30_172_199)]" />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-4 text-[0.6rem] uppercase tracking-[0.4em] text-steel sm:text-[0.7rem]"
            >
              {company.tagline}
            </motion.p>
          </div>

          {/* credentials */}
          <p className="absolute inset-x-0 bottom-0 px-6 pb-6 text-center text-[0.6rem] uppercase tracking-[0.3em] text-steel sm:pb-8 sm:text-[0.7rem]">
            Los Angeles · TCP# {company.tcp}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { SplitText } from "./SplitText";
import { SkylineLayer, Stars } from "@/components/art/Skyline";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

/** Compact, cinematic header for inner pages with its own parallax skyline. */
export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const ySky = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#04070a_0%,#07151d_55%,#0c3141_100%)]" />
      <Stars className="absolute inset-0 opacity-70" />
      <div className="absolute -right-24 top-10 size-[30rem] rounded-full bg-brand-500/20 blur-[110px]" />
      <motion.div style={{ y: ySky }} className="absolute inset-x-0 bottom-0 h-[85%] opacity-70">
        <SkylineLayer layer="far" className="size-full" />
      </motion.div>
      <motion.div style={{ y: ySky }} className="absolute inset-x-0 -bottom-6 h-[60%]">
        <SkylineLayer layer="mid" className="size-full" />
      </motion.div>
      <div className="grain absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />

      <motion.div style={{ y: yText, opacity }} className="container-x relative z-10 pb-24 pt-40 sm:pb-32 sm:pt-48">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6 flex items-center gap-1.5 text-[0.78rem] uppercase tracking-[0.2em] text-steel"
        >
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <ChevronRight className="size-3.5" aria-hidden />
          <span className="text-brand-300">{eyebrow}</span>
        </motion.nav>

        <h1 className="display max-w-4xl text-[2.7rem] leading-[1.05] text-white sm:text-6xl lg:text-7xl">
          <SplitText text={title} trigger="mount" delay={0.35} stagger={0.08} />
        </h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-mist"
          >
            {description}
          </motion.p>
        )}
        {children && (
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }} className="mt-9">
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

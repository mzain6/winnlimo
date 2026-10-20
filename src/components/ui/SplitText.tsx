"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "./Reveal";

interface SplitTextProps {
  /** Wrap words in *asterisks* to render them as a gradient accent. */
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate on scroll-into-view (default) or immediately on mount. */
  trigger?: "view" | "mount";
}

interface Word {
  value: string;
  accent: boolean;
}

function tokenize(text: string): Word[] {
  let accent = false;
  return text.split(" ").map((raw) => {
    let word = raw;
    if (word.startsWith("*")) {
      accent = true;
      word = word.slice(1);
    }
    const closes = word.endsWith("*");
    if (closes) word = word.slice(0, -1);
    const out = { value: word, accent };
    if (closes) accent = false;
    return out;
  });
}

/** Masked word-by-word headline reveal. Screen readers get the plain string. */
export function SplitText({ text, className, delay = 0, stagger = 0.07, trigger = "view" }: SplitTextProps) {
  const words = tokenize(text);
  const plain = words.map((w) => w.value).join(" ");

  const animation =
    trigger === "view"
      ? { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-60px" } }
      : { initial: "hidden", animate: "show" };

  return (
    <motion.span
      aria-label={plain}
      className={className}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...animation}
    >
      {words.map((w, i) => (
        // padding + matching negative margin widens the clip box so italic overhang isn't cropped
        <span key={i} aria-hidden className="-mx-[0.1em] inline-block overflow-hidden px-[0.1em] pb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block will-change-transform ${w.accent ? "text-gradient -mx-[0.1em] px-[0.1em] italic" : ""}`}
            variants={{
              hidden: { y: "115%", rotate: 4 },
              show: { y: "0%", rotate: 0, transition: { duration: 1, ease: easeOutExpo } },
            }}
          >
            {w.value}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.span>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

interface AccordionProps {
  items: readonly { q: string; a: string }[];
  tone?: "dark" | "light";
}

export function Accordion({ items, tone = "dark" }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(0);
  const dark = tone === "dark";

  return (
    <div className={`divide-y ${dark ? "divide-white/10 border-y border-white/10" : "divide-black/10 border-y border-black/10"}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span
                className={`text-lg font-medium transition-colors sm:text-xl ${
                  dark ? "text-white group-hover:text-brand-300" : "text-ink group-hover:text-brand-700"
                }`}
              >
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 135 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className={`grid size-9 shrink-0 place-items-center rounded-full border ${
                  isOpen ? "border-brand-500 bg-brand-500 text-white" : dark ? "border-white/20 text-white" : "border-black/20 text-ink"
                }`}
              >
                <Plus className="size-4" aria-hidden />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className={`max-w-3xl pb-7 pr-12 leading-relaxed ${dark ? "text-mist" : "text-steel"}`}>{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

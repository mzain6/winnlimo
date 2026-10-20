"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUp, CalendarCheck, Phone } from "lucide-react";
import { company } from "@/lib/data";

/** Mobile: sticky call/book bar. Desktop: back-to-top button. Both appear after the user scrolls. */
export function FloatingActions() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 700));

  const onBooking = pathname.startsWith("/booking");

  return (
    <>
      <AnimatePresence>
        {show && !onBooking && (
          <motion.div
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-ink/85 p-2 backdrop-blur-xl lg:hidden"
          >
            <a
              href={company.phones[0].href}
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 text-sm font-semibold uppercase tracking-wider text-white"
            >
              <Phone className="size-4 text-brand-400" aria-hidden /> Call
            </a>
            <Link
              href="/booking"
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-500 text-sm font-semibold uppercase tracking-wider text-white"
            >
              <CalendarCheck className="size-4" aria-hidden /> Book
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {show && (
          <motion.button
            type="button"
            aria-label="Back to top"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-40 hidden size-12 place-items-center rounded-full border border-brand-500/40 bg-ink/80 text-brand-300 backdrop-blur-md transition-colors hover:bg-brand-500 hover:text-white lg:grid"
          >
            <ArrowUp className="size-5" aria-hidden />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

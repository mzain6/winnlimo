"use client";

import { motion } from "framer-motion";

/** Horizontal meter that fills when scrolled into view. */
export function CapacityBar({ value, max }: { value: number; max: number }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-white/10" role="presentation">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${Math.max(6, (value / max) * 100)}%` }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="h-full rounded-full bg-gradient-to-r from-brand-700 to-brand-300"
      />
    </div>
  );
}

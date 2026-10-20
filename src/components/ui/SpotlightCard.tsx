"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  /** Colour of the pointer-tracking glow. */
  glow?: string;
}

/** A card with a soft radial highlight that follows the cursor. */
export function SpotlightCard({ children, className = "", glow = "30 172 199" }: SpotlightCardProps) {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const background = useMotionTemplate`radial-gradient(340px circle at ${x}px ${y}px, rgb(${glow} / 0.16), transparent 70%)`;

  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        x.set(-400);
        y.set(-400);
      }}
    >
      <motion.div aria-hidden style={{ background }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {children}
    </div>
  );
}

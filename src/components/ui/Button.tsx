"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "outline" | "ghost" | "dark";
type Size = "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white shadow-[0_10px_40px_-10px_rgb(30_172_199/0.7)] hover:bg-brand-400",
  outline: "border border-white/25 text-white hover:border-brand-400 hover:text-brand-200 hover:bg-white/5",
  ghost: "text-white hover:text-brand-300",
  dark: "bg-ink text-white hover:bg-charcoal",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-[0.8rem]",
  lg: "h-14 px-8 text-[0.85rem]",
};

/** Button whose body drifts toward the pointer — a small, premium-feeling affordance. */
export function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  arrow = false,
  disabled,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const classes = `group/btn relative inline-flex select-none items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold uppercase tracking-[0.16em] transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`;

  const inner = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-full w-full -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-[250%]"
        />
      )}
      <span className="relative">{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden
          className="relative size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
        />
      )}
    </>
  );

  const external = href && /^(https?:|tel:|mailto:)/.test(href);

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileTap={{ scale: 0.96 }}
      className="inline-block"
    >
      {href ? (
        external ? (
          <a
            href={href}
            className={classes}
            aria-label={ariaLabel}
            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {inner}
          </a>
        ) : (
          <Link href={href} className={classes} aria-label={ariaLabel}>
            {inner}
          </Link>
        )
      ) : (
        <button type={type} onClick={onClick} disabled={disabled} className={classes} aria-label={ariaLabel}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}

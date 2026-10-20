"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
}

/** Fades and lifts its children into view the first time they scroll on screen. */
export function Reveal({ delay = 0, y = 36, x = 0, duration = 0.9, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration, ease: easeOutExpo, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

const container: Variants = {
  hidden: {},
  show: (stagger: number) => ({ transition: { staggerChildren: stagger, delayChildren: 0.05 } }),
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: easeOutExpo } },
};

interface StaggerProps extends HTMLMotionProps<"div"> {
  stagger?: number;
}

/** Parent that staggers any <StaggerItem> children as it enters the viewport. */
export function Stagger({ stagger = 0.1, children, ...rest }: StaggerProps) {
  return (
    <motion.div
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...rest }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={item} {...rest}>
      {children}
    </motion.div>
  );
}

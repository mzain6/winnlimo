"use client";

import { MotionConfig } from "framer-motion";
import { SiteReadyProvider } from "./SiteReady";

/** Respects the visitor's reduced-motion preference for every animation below it, and tracks the opening loader. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SiteReadyProvider>{children}</SiteReadyProvider>
    </MotionConfig>
  );
}

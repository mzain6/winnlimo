"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSiteReady } from "@/components/layout/SiteReady";

/**
 * Re-mounts on every navigation. On in-site navigation a teal-edged curtain lifts away while the page fades up.
 * On a full page load the opening loading screen plays that role instead, and the page is (re)mounted the moment
 * the loader starts lifting so its entrance animations play in view rather than behind the loader.
 * The curtain is non-interactive so it can never trap a visitor.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const { ready } = useSiteReady();
  // captured once: true when this page was reached by navigating inside the site (loader already finished)
  const [navigating] = useState(ready);

  return (
    <>
      {navigating && (
        <motion.div
          aria-hidden
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          style={{ originY: 0 }}
          className="pointer-events-none fixed inset-0 z-[70] border-b-2 border-brand-500 bg-ink"
        />
      )}
      <motion.div
        key={ready ? "in" : "wait"}
        initial={{ opacity: 0, y: 18 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.8, delay: navigating ? 0.35 : 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}

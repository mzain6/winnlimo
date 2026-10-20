"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}

/** Label + control + animated inline error. The control should carry id, aria-invalid and aria-describedby. */
export function Field({ id, label, error, hint, optional, className = "", children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-brand-300">
        <span>{label}</span>
        {optional && <span className="font-normal normal-case tracking-normal text-steel">Optional</span>}
      </label>
      {children}
      <AnimatePresence initial={false} mode="wait">
        {error ? (
          <motion.p
            key="error"
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 flex items-center gap-1.5 text-sm text-[#ff8a93]"
          >
            <AlertCircle className="size-3.5 shrink-0" aria-hidden /> {error}
          </motion.p>
        ) : hint ? (
          <p key="hint" id={`${id}-error`} className="mt-2 text-sm text-steel">
            {hint}
          </p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

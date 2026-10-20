"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Vehicle } from "@/components/art/Vehicle";
import { Stars } from "@/components/art/Skyline";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[linear-gradient(180deg,#04070a,#07151d_60%,#0c3141)]">
      <Stars className="absolute inset-0" />
      <div className="container-x relative z-10 py-40 text-center">
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="display text-[8rem] leading-none text-gradient sm:text-[12rem]"
        >
          404
        </motion.p>
        <h1 className="display mt-2 text-3xl text-white sm:text-5xl">This road doesn&apos;t lead anywhere.</h1>
        <p className="mx-auto mt-5 max-w-md text-mist">The page you were looking for has moved or never existed. Let&apos;s get you back on route.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/" arrow>
            Back to home
          </Button>
          <Button href="/booking" variant="outline">
            Book a ride
          </Button>
        </div>
      </div>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute bottom-6 right-[6%] w-[28rem] max-w-[60vw] opacity-90"
      >
        <Vehicle type="sedan" />
      </motion.div>
    </section>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Navigation, Users } from "lucide-react";
import { emptyDraft, saveDraft, serviceOptions, type ServiceId } from "@/lib/booking";

/** Compact trip form that sits over the hero edge and hands off to the full booking flow. */
export function QuickQuote() {
  const router = useRouter();
  const [service, setService] = useState<ServiceId>("point");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(2);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    saveDraft({ ...emptyDraft, service, pickup, dropoff, date, passengers });
    router.push("/booking");
  };

  const label = "mb-1.5 flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand-300";

  return (
    <div className="container-x relative z-30 -mt-20 sm:-mt-24">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="glass grid gap-4 rounded-3xl p-5 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] sm:p-6 md:grid-cols-2 lg:grid-cols-[1.1fr_1.3fr_1.3fr_1fr_0.7fr_auto] lg:items-end"
        aria-label="Quick quote"
      >
        <div>
          <label htmlFor="qq-service" className={label}>
            <Navigation className="size-3.5" aria-hidden /> Service
          </label>
          <select id="qq-service" className="field" value={service} onChange={(e) => setService(e.target.value as ServiceId)}>
            {serviceOptions.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="qq-pickup" className={label}>
            <MapPin className="size-3.5" aria-hidden /> Pickup
          </label>
          <input id="qq-pickup" className="field" placeholder="Address, hotel or airport" value={pickup} onChange={(e) => setPickup(e.target.value)} autoComplete="off" />
        </div>
        <div>
          <label htmlFor="qq-dropoff" className={label}>
            <MapPin className="size-3.5" aria-hidden /> Drop-off
          </label>
          <input id="qq-dropoff" className="field" placeholder="Destination" value={dropoff} onChange={(e) => setDropoff(e.target.value)} autoComplete="off" />
        </div>
        <div>
          <label htmlFor="qq-date" className={label}>
            <Calendar className="size-3.5" aria-hidden /> Date
          </label>
          <input id="qq-date" type="date" className="field" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="qq-pax" className={label}>
            <Users className="size-3.5" aria-hidden /> Guests
          </label>
          <input id="qq-pax" type="number" min={1} max={60} className="field" value={passengers} onChange={(e) => setPassengers(Math.max(1, Number(e.target.value) || 1))} />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="group/b flex h-[3.4rem] items-center justify-center gap-2 rounded-xl bg-brand-500 px-7 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_10px_30px_-8px_rgb(30_172_199/0.8)] transition-colors hover:bg-brand-400 md:col-span-2 lg:col-span-1"
        >
          Get quote
          <ArrowRight className="size-4 transition-transform group-hover/b:translate-x-1" aria-hidden />
        </motion.button>
      </motion.form>
    </div>
  );
}

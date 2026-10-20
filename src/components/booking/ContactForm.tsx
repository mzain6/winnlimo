"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import { company } from "@/lib/data";
import { Field } from "@/components/ui/Field";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
  website: string; // honeypot
}

const empty: FormState = { name: "", email: "", phone: "", message: "", website: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "queued" | "error">("idle");

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) next.email = "Enter a valid email address";
    if (form.message.trim().length < 5) next.message = "Tell us a little about what you need";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind: "contact", website: form.website, data: { name: form.name, email: form.email, phone: form.phone, message: form.message } }),
      });
      const json = (await res.json()) as { ok: boolean; delivered?: boolean };
      if (!res.ok || !json.ok) throw new Error("rejected");
      setStatus(json.delivered ? "sent" : "queued");
    } catch {
      setStatus("error");
    }
  };

  const mailto = `mailto:${company.email}?subject=${encodeURIComponent(`Message from ${form.name || "website visitor"}`)}&body=${encodeURIComponent(
    `${form.message}\n\n${form.name}\n${form.phone}\n${form.email}`,
  )}`;

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "sent" || status === "queued" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[26rem] flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
              className="grid size-16 place-items-center rounded-full bg-brand-500 text-white shadow-[0_0_50px_rgb(30_172_199/0.6)]"
            >
              <Check className="size-8" aria-hidden />
            </motion.span>
            <h3 className="display mt-6 text-3xl text-white">{status === "sent" ? "Message received" : "One more step"}</h3>
            <p className="mt-3 max-w-sm text-mist">
              {status === "sent"
                ? "Thank you — a member of our team will be in touch shortly."
                : "Our online inbox isn't connected yet, so please send your message by email (it's pre-filled) or call dispatch."}
            </p>
            {status === "queued" && (
              <a href={mailto} className="mt-6 inline-flex h-12 items-center rounded-full bg-brand-500 px-6 text-sm font-semibold uppercase tracking-wider text-white hover:bg-brand-400">
                Email dispatch
              </a>
            )}
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0, y: -10 }} className="space-y-5" aria-label="Contact form">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="c-name" label="Full name" error={errors.name}>
                <input id="c-name" className="field" value={form.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors.name} aria-describedby="c-name-error" />
              </Field>
              <Field id="c-phone" label="Phone" optional>
                <input id="c-phone" type="tel" className="field" value={form.phone} onChange={set("phone")} autoComplete="tel" />
              </Field>
            </div>
            <Field id="c-email" label="Email" error={errors.email}>
              <input id="c-email" type="email" className="field" value={form.email} onChange={set("email")} autoComplete="email" aria-invalid={!!errors.email} aria-describedby="c-email-error" />
            </Field>
            <Field id="c-message" label="How can we help?" error={errors.message}>
              <textarea id="c-message" rows={5} className="field resize-none" value={form.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby="c-message-error" />
            </Field>

            {/* honeypot — hidden from people, tempting to bots */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
              </label>
            </div>

            {status === "error" && (
              <p role="alert" className="rounded-xl border border-[#ff8a93]/30 bg-[#ff8a93]/10 px-4 py-3 text-sm text-[#ffb3b9]">
                We couldn&apos;t send that just now. Please{" "}
                <a href={mailto} className="underline">
                  email us
                </a>{" "}
                or call {company.phones[0].display}.
              </p>
            )}

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-brand-500 text-[0.85rem] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_10px_40px_-10px_rgb(30_172_199/0.7)] transition-colors hover:bg-brand-400 disabled:opacity-60 sm:w-auto sm:px-10"
            >
              {status === "sending" ? <Loader2 className="size-5 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
              {status === "sending" ? "Sending…" : "Send message"}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

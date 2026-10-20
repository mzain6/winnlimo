import type { Metadata } from "next";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { company, faqs, formatAddress } from "@/lib/data";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SocialIcon } from "@/components/ui/Icons";
import { ContactForm } from "@/components/booking/ContactForm";

export const metadata: Metadata = {
  title: "Contact — 24/7 Dispatch",
  description: `Call Winn Limousine dispatch at ${company.phones[0].display}, email ${company.email}, or visit us in Studio City, CA. Available 24/7.`,
  alternates: { canonical: "/contact" },
};

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formatAddress())}`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We're awake when *you* are"
        description="Dispatch is staffed around the clock. Call, email or send a message — we reply quickly."
      />

      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <Stagger stagger={0.09} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {company.phones.map((p) => (
                <StaggerItem key={p.href}>
                  <SpotlightCard className="h-full rounded-3xl border border-white/10 bg-white/[0.03] transition-colors duration-500 hover:border-brand-500/40">
                    <a href={p.href} className="relative flex h-full flex-col p-7">
                      <span className="grid size-12 place-items-center rounded-xl bg-brand-500/15 text-brand-300 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white">
                        <Phone className="size-5" aria-hidden />
                      </span>
                      <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-steel">{p.label}</p>
                      <p className="display mt-1 text-2xl text-white">{p.display}</p>
                    </a>
                  </SpotlightCard>
                </StaggerItem>
              ))}
              <StaggerItem className="sm:col-span-2 lg:col-span-1 xl:col-span-2">
                <SpotlightCard className="rounded-3xl border border-white/10 bg-white/[0.03] transition-colors duration-500 hover:border-brand-500/40">
                  <a href={`mailto:${company.email}`} className="relative flex items-center gap-5 p-7">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-500/15 text-brand-300 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white">
                      <Mail className="size-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-steel">Email</span>
                      <span className="display text-xl text-white sm:text-2xl">{company.email}</span>
                    </span>
                  </a>
                </SpotlightCard>
              </StaggerItem>
            </Stagger>

            {/* location card */}
            <Reveal className="mt-4" delay={0.1}>
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(160deg,#0a1218,#0d2f3c)] p-7 sm:p-9">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:radial-gradient(70%_70%_at_75%_50%,#000,transparent)]"
                />
                <div aria-hidden className="absolute right-12 top-1/2 -translate-y-1/2 sm:right-20">
                  <span className="absolute inset-0 m-auto size-5 animate-pulse-ring rounded-full bg-brand-400" />
                  <MapPin className="relative size-9 text-brand-300 drop-shadow-[0_0_14px_rgb(30_172_199)]" strokeWidth={1.6} />
                </div>
                <div className="relative max-w-[16rem]">
                  <p className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-brand-300">
                    <MapPin className="size-4" aria-hidden /> Office
                  </p>
                  <address className="mt-3 text-lg not-italic leading-snug text-white">
                    {company.address.street}
                    <br />
                    {company.address.city}, {company.address.state} {company.address.zip}
                  </address>
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-brand-300 transition-colors hover:text-white"
                  >
                    Get directions <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-4" delay={0.15}>
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-7">
                <p className="flex items-center gap-3 text-white">
                  <Clock className="size-5 text-brand-400" aria-hidden /> Dispatch hours: <strong className="font-semibold">24 / 7</strong>
                </p>
                <div className="flex items-center gap-3">
                  {company.socials.map((s) => (
                    <a
                      key={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid size-10 place-items-center rounded-full border border-white/15 text-mist transition-all duration-300 hover:-translate-y-1 hover:border-brand-500 hover:bg-brand-500 hover:text-white"
                    >
                      <SocialIcon id={s.id} className="size-[1.05rem]" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal x={40} y={0}>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 sm:p-10">
              <h2 className="display text-3xl text-white sm:text-4xl">Send us a message</h2>
              <p className="mb-8 mt-3 text-mist">Prefer to book directly? Use the booking page — it takes about two minutes.</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/10 bg-coal py-24 sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading eyebrow="FAQ" title="Quick *answers*" description="The things clients ask most before their first ride." />
          <Reveal>
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { faqs, services } from "@/lib/data";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ServiceGlyph } from "@/components/ui/Icons";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Accordion } from "@/components/ui/Accordion";
import { Coverage } from "@/components/home/Coverage";
import { PricingBanner } from "@/components/home/PricingBanner";

export const metadata: Metadata = {
  title: "Services — Corporate, Airport, Events & Private Chauffeur",
  description:
    "Corporate travel, hourly chauffeur service, financial roadshows, LAX/Burbank/Van Nuys airport transfers, Sprinter shuttles, entertainment and stadium transportation across Los Angeles.",
  alternates: { canonical: "/services" },
};

/** Map a service card to the matching option in the booking flow. */
const bookingService: Record<string, string> = {
  corporate: "corporate",
  hourly: "hourly",
  roadshows: "corporate",
  airport: "airport",
  shuttle: "point",
  private: "point",
  entertainment: "event",
  sports: "event",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Ground transportation, *tailored* to the occasion"
        description="Executive black cars, airport transfers, hourly chauffeurs, roadshows, entertainment and group shuttles — delivered with the same standard every time."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/booking" arrow>
            Book a ride
          </Button>
          <Button href="#airport" variant="outline">
            Airport transfers
          </Button>
        </div>
      </PageHero>

      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[17rem_1fr] lg:gap-16">
          {/* in-page index */}
          <aside className="hidden lg:block">
            <nav aria-label="Services on this page" className="sticky top-32">
              <p className="eyebrow before:hidden">On this page</p>
              <ul className="mt-5 space-y-1 border-l border-white/10">
                {services.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-ml-px block border-l border-transparent py-2 pl-5 text-[0.95rem] text-steel transition-all hover:border-brand-400 hover:pl-7 hover:text-white"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="space-y-6">
            {services.map((s, i) => (
              <Reveal key={s.id} y={50}>
                <SpotlightCard className="rounded-3xl border border-white/10 bg-white/[0.03]">
                  <article id={s.id} className="grid gap-8 p-7 sm:p-10 md:grid-cols-[auto_1fr]">
                    <div className="flex items-start gap-5 md:flex-col md:gap-8">
                      <span className="grid size-16 place-items-center rounded-2xl border border-brand-500/30 bg-brand-500/10 text-brand-300 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white">
                        <ServiceGlyph name={s.icon} className="size-8" />
                      </span>
                      <span className="display text-5xl text-white/10 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div>
                      <h2 className="display text-3xl text-white sm:text-4xl">{s.title}</h2>
                      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mist">{s.detail}</p>
                      <ul className="mt-6 flex flex-wrap gap-2.5">
                        {s.points.map((p) => (
                          <li key={p} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-sm text-white">
                            <Check className="size-3.5 text-brand-400" aria-hidden /> {p}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/booking?service=${bookingService[s.id]}`}
                        className="mt-8 inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-brand-300 transition-colors hover:text-white"
                      >
                        Book this service <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </article>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Coverage />

      <section className="py-24 sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading eyebrow="Good to know" title="Questions, *answered*" description="Everything first-time clients ask us. Still unsure? Call dispatch any time — we're awake." />
          <Reveal>
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <PricingBanner />
    </>
  );
}

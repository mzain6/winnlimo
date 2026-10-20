import type { Metadata } from "next";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import { company, promises } from "@/lib/data";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Vehicle } from "@/components/art/Vehicle";
import { Stats } from "@/components/home/Stats";
import { Testimonial } from "@/components/home/Testimonial";
import { PricingBanner } from "@/components/home/PricingBanner";

export const metadata: Metadata = {
  title: "About — Southern California's Corporate Black Car Service",
  description:
    "Winn Limousine has provided dependable, professional chauffeured ground transportation in Los Angeles since 1998. Learn about our service, standards and credentials.",
  alternates: { canonical: "/about" },
};

const milestones = [
  { year: "1998", text: "Winn Limo is founded with a simple promise: excellent service, dependability and value." },
  { year: "25+ yrs", text: "A reputation for excellent service, dependability and value, built one ride at a time." },
  { year: "Today", text: "Sedans, SUVs, Sprinters and mini coaches — serving the Westside, Hollywood and the Valley 24/7." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Dependable service, *since* 1998"
        description="For more than 25 years, Winn Limousine has delivered professional black car and corporate ground transportation to those who demand the best."
      />

      <section className="py-24 sm:py-32">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading
              eyebrow="Our story"
              title="Southern California's *best* black car service"
              description="We tailor every trip to meet and exceed your expectations — using a well-trained staff, professional chauffeurs, the latest technology and a diverse range of luxury vehicles for corporate, leisure and airport transportation."
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl leading-relaxed text-mist">
                Winn Limo was founded in {company.founded} and has built its reputation on excellent service, dependability and value. From a
                single executive sedan to a full mini coach, we offer a complete fleet of late-model vehicles for all your Los Angeles black car
                needs — VIP chauffeured transportation, corporate travel, airport transfers, roadshows and entertainment.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-9">
              <Button href="/booking" arrow>
                Book with us
              </Button>
            </Reveal>
          </div>

          <Reveal x={40} y={0}>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,#0a1218,#0d2f3c)] p-8 sm:p-12">
              <div className="absolute -right-10 -top-10 size-60 rounded-full bg-brand-500/25 blur-[80px]" />
              <p className="display relative text-[7rem] leading-none text-white/10 sm:text-[10rem]">{company.founded}</p>
              <div className="relative -mt-10 sm:-mt-16">
                <Vehicle type="suv" className="w-full" />
              </div>
              <ul className="relative mt-8 space-y-5 border-t border-white/10 pt-8">
                {milestones.map((m) => (
                  <li key={m.year} className="flex gap-5">
                    <span className="display w-16 shrink-0 text-xl text-brand-300">{m.year}</span>
                    <span className="text-[0.95rem] leading-relaxed text-mist">{m.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <Stats />

      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="What you can count on" title="Four promises, *every* trip" align="center" />
          <Stagger stagger={0.1} className="mt-14 grid gap-5 sm:grid-cols-2">
            {promises.map((p, i) => (
              <StaggerItem key={p.title}>
                <SpotlightCard className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-500 hover:border-brand-500/40 sm:p-10">
                  <div className="relative flex items-start gap-6">
                    <span className="display text-5xl text-brand-500/70">0{i + 1}</span>
                    <div>
                      <h3 className="text-2xl font-semibold text-white">{p.title}</h3>
                      <p className="mt-3 leading-relaxed text-mist">{p.text}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-y border-white/10 bg-coal py-20 sm:py-24">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full items-center gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-brand-500/15 text-brand-300">
                <ShieldCheck className="size-8" strokeWidth={1.5} aria-hidden />
              </span>
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-brand-300">Licensed carrier</p>
                <p className="display mt-1 text-4xl text-white">TCP# {company.tcp}</p>
                <p className="mt-1 text-sm text-steel">Operating as a charter-party carrier in California.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="flex h-full items-center gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-brand-500/15 text-brand-300">
                <BadgeCheck className="size-8" strokeWidth={1.5} aria-hidden />
              </span>
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-brand-300">Proud member</p>
                <p className="display mt-1 text-2xl leading-snug text-white sm:text-3xl">Los Angeles Business Travel Association</p>
                <p className="mt-1 text-sm text-steel">LABTA</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Testimonial />
      <PricingBanner />
    </>
  );
}

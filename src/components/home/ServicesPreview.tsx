import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem, Reveal } from "@/components/ui/Reveal";
import { ServiceGlyph } from "@/components/ui/Icons";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/Button";

/** Light section — mirrors the white "Our Services" band on the original site. */
export function ServicesPreview() {
  return (
    <section className="relative bg-fog py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            tone="light"
            eyebrow="Our services"
            title="Ground transportation for *every* occasion"
            description="Executive black cars, corporate road shows, entertainment, airports and private chauffeur service — one trusted team, 24 hours a day."
          />
          <Reveal>
            <Button href="/services" variant="dark" arrow>
              All services
            </Button>
          </Reveal>
        </div>

        <Stagger stagger={0.08} className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s, i) => (
            <StaggerItem key={s.id}>
              <SpotlightCard className="h-full rounded-3xl border border-black/[0.07] bg-white shadow-[0_1px_0_rgb(0_0_0/0.02)] transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-500/40 hover:shadow-[0_30px_60px_-30px_rgb(11_63_75/0.35)]">
                <Link href={`/services#${s.id}`} className="relative flex h-full flex-col p-8">
                  <div className="flex items-start justify-between">
                    <span className="grid size-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white">
                      <ServiceGlyph name={s.icon} className="size-7" />
                    </span>
                    <span className="text-sm font-semibold tabular-nums tracking-widest text-black/20">0{i + 1}</span>
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold text-ink">{s.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-steel">{s.blurb}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-brand-600">
                    Learn more
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

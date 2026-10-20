import type { Metadata } from "next";
import { Briefcase, Users } from "lucide-react";
import { fleet, promises } from "@/lib/data";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Vehicle } from "@/components/art/Vehicle";
import { FleetShowcase } from "@/components/home/FleetShowcase";
import { PricingBanner } from "@/components/home/PricingBanner";
import { CapacityBar } from "@/components/ui/CapacityBar";

export const metadata: Metadata = {
  title: "Fleet — Executive Sedans, Escalade SUVs, Sprinters & Mini Coaches",
  description:
    "Late-model, all-black executive vehicles: Mercedes S-Class and Cadillac XTS sedans, Cadillac Escalade SUVs, Mercedes Sprinter vans and shuttle mini coaches in Los Angeles.",
  alternates: { canonical: "/fleet" },
};

const maxPax = Math.max(...fleet.map((f) => f.passengers));

export default function FleetPage() {
  return (
    <>
      <PageHero
        eyebrow="Fleet"
        title="Late-model, *all-black* executive vehicles"
        description="Every vehicle in the Winn Limo fleet is immaculate, current and driven by a professional chauffeur — whatever the size of your party."
      >
        <Button href="/booking" arrow>
          Reserve a vehicle
        </Button>
      </PageHero>

      <FleetShowcase heading={false} className="!py-16 sm:!py-24" />

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Compare"
            title="Find the *right* vehicle"
            description="Capacity at a glance — if you're between sizes, go one up. Our team will gladly advise on luggage, seating and routing."
          />

          <Stagger stagger={0.1} className="mt-14 grid gap-5 md:grid-cols-2">
            {fleet.map((v) => (
              <StaggerItem key={v.id}>
                <SpotlightCard className="h-full rounded-3xl border border-white/10 bg-white/[0.03] transition-colors duration-500 hover:border-brand-500/40">
                  <div className="relative flex h-full flex-col p-7 sm:p-9">
                    <div className="-mx-2 mb-6 rounded-2xl bg-[linear-gradient(180deg,#0a1218,#0d2530)] px-6 pb-3 pt-8">
                      <Vehicle type={v.id} className="w-full transition-transform duration-700 group-hover:scale-[1.04]" lights={false} />
                    </div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-brand-300">{v.model}</p>
                    <h3 className="display mt-2 text-3xl text-white">{v.name}</h3>
                    <p className="mt-3 flex-1 leading-relaxed text-mist">{v.description}</p>

                    <div className="mt-7 space-y-4">
                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-white">
                            <Users className="size-4 text-brand-400" aria-hidden /> Guests
                          </span>
                          <span className="font-semibold text-white">Up to {v.passengers}</span>
                        </div>
                        <CapacityBar value={v.passengers} max={maxPax} />
                      </div>
                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2 text-white">
                            <Briefcase className="size-4 text-brand-400" aria-hidden /> Luggage
                          </span>
                          <span className="font-semibold text-white">{v.bags} bags</span>
                        </div>
                        <CapacityBar value={v.bags} max={maxPax} />
                      </div>
                    </div>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {v.bestFor.map((b) => (
                        <span key={b} className="rounded-full border border-white/12 px-3 py-1 text-xs uppercase tracking-wider text-mist">
                          {b}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8">
                      <Button href={`/booking?vehicle=${v.id}`} variant="outline" arrow>
                        Reserve {v.name}
                      </Button>
                    </div>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-6 text-sm text-steel">Capacities shown are typical for each vehicle class. Call dispatch to confirm for your specific trip.</p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-coal py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="The Winn standard" title="Included with *every* ride" align="center" />
          <Stagger stagger={0.1} className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((p, i) => (
              <StaggerItem key={p.title} className="bg-coal p-8">
                <span className="display text-4xl text-brand-500">0{i + 1}</span>
                <h3 className="mt-5 text-xl font-semibold text-white">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-steel">{p.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <PricingBanner />
    </>
  );
}

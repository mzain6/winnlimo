import { MapPin, Plane, Ticket } from "lucide-react";
import { airports, serviceAreas, venues } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Marquee } from "@/components/ui/Marquee";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const half = Math.ceil(serviceAreas.length / 2);

/** Airports, stadiums and neighbourhoods — shown as a pair of opposing tickers plus detail cards. */
export function Coverage() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-coal py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Coverage"
          title="Everywhere Los Angeles *takes you*"
          description="From the Westside to the Valley, every major airport and every major venue — Winn Limo is already on the way."
        />
      </div>

      <div className="mt-14 space-y-4">
        <Marquee speed={55}>
          {serviceAreas.slice(0, half).map((a) => (
            <AreaChip key={a}>{a}</AreaChip>
          ))}
        </Marquee>
        <Marquee speed={62} reverse>
          {serviceAreas.slice(half).map((a) => (
            <AreaChip key={a}>{a}</AreaChip>
          ))}
        </Marquee>
      </div>

      <div className="container-x mt-16">
        <Stagger stagger={0.1} className="grid gap-5 lg:grid-cols-2">
          <StaggerItem>
            <SpotlightCard className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <div className="flex items-center gap-3 text-brand-300">
                <Plane className="size-5" aria-hidden />
                <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.24em]">Airports</h3>
              </div>
              <ul className="mt-6 divide-y divide-white/10">
                {airports.map((a) => (
                  <li key={a.code} className="flex items-center gap-5 py-4">
                    <span className="display w-16 text-3xl text-white">{a.code}</span>
                    <span>
                      <span className="block font-medium text-white">{a.name}</span>
                      <span className="text-sm text-steel">{a.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </StaggerItem>

          <StaggerItem>
            <SpotlightCard className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <div className="flex items-center gap-3 text-brand-300">
                <Ticket className="size-5" aria-hidden />
                <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.24em]">Stadiums &amp; arenas</h3>
              </div>
              <ul className="mt-6 grid gap-x-6 sm:grid-cols-2">
                {venues.map((v) => (
                  <li key={v.name} className="border-b border-white/10 py-4">
                    <span className="block font-medium text-white">{v.name}</span>
                    <span className="text-sm text-steel">{v.kind}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

function AreaChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="mx-2 inline-flex shrink-0 items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-lg text-white">
      <MapPin className="size-4 text-brand-400" aria-hidden />
      {children}
    </span>
  );
}

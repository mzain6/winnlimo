import { Counter } from "@/components/ui/Counter";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { company, fleet, serviceAreas } from "@/lib/data";

const stats = [
  { value: 25, suffix: "+", label: "Years serving Los Angeles", note: `Established ${company.founded}` },
  { value: 24, suffix: "/7", label: "Live dispatch", note: "Every day, every hour" },
  { value: serviceAreas.length, suffix: "", label: "LA-area communities served", note: "Westside to the Valley" },
  { value: fleet.length, suffix: "", label: "Vehicle classes", note: "Sedan to mini coach" },
];

export function Stats() {
  return (
    <section className="container-x pb-8 pt-20 sm:pt-24">
      <Stagger stagger={0.12} className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {stats.map((s, i) => (
          <StaggerItem key={s.label} className={`px-2 sm:px-6 ${i > 0 ? "lg:border-l lg:border-white/10" : ""}`}>
            <p className="display text-5xl text-white sm:text-6xl">
              <Counter to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-3 text-[0.95rem] font-medium text-white">{s.label}</p>
            <p className="mt-0.5 text-sm text-steel">{s.note}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

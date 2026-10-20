import { Hero } from "@/components/home/Hero";
import { QuickQuote } from "@/components/home/QuickQuote";
import { Stats } from "@/components/home/Stats";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { FleetShowcase } from "@/components/home/FleetShowcase";
import { Process } from "@/components/home/Process";
import { PricingBanner } from "@/components/home/PricingBanner";
import { Testimonial } from "@/components/home/Testimonial";
import { Coverage } from "@/components/home/Coverage";

export default function Home() {
  return (
    <>
      <Hero />
      <QuickQuote />
      <Stats />
      <div className="mt-20 sm:mt-24">
        <ServicesPreview />
      </div>
      <FleetShowcase />
      <Process />
      <PricingBanner />
      <Testimonial />
      <Coverage />
    </>
  );
}

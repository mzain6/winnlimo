import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Headset, ShieldCheck } from "lucide-react";
import { company } from "@/lib/data";
import { PageHero } from "@/components/ui/PageHero";
import { BookingWizard } from "@/components/booking/BookingWizard";

export const metadata: Metadata = {
  title: "Book a Ride — Request a Chauffeur in Minutes",
  description:
    "Request a black car, SUV, Sprinter van or mini coach in Los Angeles. Four quick steps: trip, vehicle, details, review. Dispatch confirms your rate by phone or email.",
  alternates: { canonical: "/booking" },
};

const assurances = [
  { icon: Clock, text: "Takes about 2 minutes" },
  { icon: ShieldCheck, text: "No payment to request" },
  { icon: Headset, text: "24/7 live dispatch" },
];

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a ride"
        title="Reserve your *chauffeur*"
        description={`Tell us about your trip and we'll confirm availability and your rate. Prefer a person? Call ${company.phones[0].display}.`}
      >
        <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-mist">
          {assurances.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2.5">
              <Icon className="size-4 text-brand-400" aria-hidden /> {text}
            </li>
          ))}
        </ul>
      </PageHero>

      <Suspense fallback={<div className="container-x py-32 text-center text-steel">Loading booking form…</div>}>
        <BookingWizard />
      </Suspense>
    </>
  );
}

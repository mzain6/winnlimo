import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { company, formatAddress, nav, serviceAreas, services } from "@/lib/data";
import { Logo } from "@/components/art/Logo";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SocialIcon } from "@/components/ui/Icons";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-night">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[120px]" />

      <div className="container-x relative pt-20">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-14 lg:flex-row lg:items-end">
            <div className="max-w-xl">
              <span className="eyebrow">Ready when you are</span>
              <p className="display mt-4 text-4xl leading-tight text-white sm:text-5xl">
                Your next ride, <span className="text-gradient italic">arranged</span> in minutes.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/booking" arrow size="lg">
                Book a ride
              </Button>
              <Button href={company.phones[0].href} variant="outline" size="lg">
                {company.phones[0].display}
              </Button>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed text-steel">
              A professional Los Angeles-based ground transportation service, available 24/7 for all your personal and
              corporate chauffeured transportation needs in LA and beyond.
            </p>
            <div className="mt-6 flex items-center gap-3">
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

          <div>
            <h3 className="eyebrow !tracking-[0.22em] before:hidden">Explore</h3>
            <ul className="mt-6 space-y-3">
              {[...nav, { href: "/booking", label: "Book a ride" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group inline-flex items-center gap-2 text-mist transition-colors hover:text-white">
                    <span className="h-px w-0 bg-brand-500 transition-all duration-300 group-hover:w-4" />
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={company.portal.login} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-mist transition-colors hover:text-white">
                  Client login <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow !tracking-[0.22em] before:hidden">Services</h3>
            <ul className="mt-6 space-y-3">
              {services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`} className="text-mist transition-colors hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow !tracking-[0.22em] before:hidden">Dispatch · 24/7</h3>
            <ul className="mt-6 space-y-4 text-mist">
              {company.phones.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className="flex items-center gap-3 transition-colors hover:text-white">
                    <Phone className="size-4 shrink-0 text-brand-500" aria-hidden /> {p.display}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${company.email}`} className="flex items-center gap-3 transition-colors hover:text-white">
                  <Mail className="size-4 shrink-0 text-brand-500" aria-hidden /> {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 size-4 shrink-0 text-brand-500" aria-hidden />
                <address className="not-italic leading-snug">{formatAddress()}</address>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-8">
          <p className="text-[0.8rem] leading-relaxed text-steel">
            <span className="mr-2 font-semibold uppercase tracking-[0.2em] text-mist">Serving</span>
            {serviceAreas.join(" · ")}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 bg-ink">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-[0.8rem] text-steel sm:flex-row">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p>
            TCP# {company.tcp} · Serving Los Angeles since {company.founded}
          </p>
        </div>
      </div>
    </footer>
  );
}

import { company } from "@/lib/data";

/** Wordmark recreated from the original Winn Limousine logo: white WINN, teal LIMOUSINE, hairline, tagline. */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex flex-col leading-none" aria-label={`${company.name} — ${company.tagline}`}>
      <span
        className={`display uppercase tracking-[0.07em] text-white transition-all duration-500 ${
          compact ? "text-[1.35rem]" : "text-[1.6rem] sm:text-[1.8rem]"
        }`}
      >
        Winn <span className="text-brand-500">Limousine</span>
      </span>
      <span className="mt-1.5 block h-px w-full bg-gradient-to-r from-brand-500 via-brand-500/60 to-transparent" />
      <span
        className={`mt-1.5 block text-steel uppercase transition-all duration-500 ${
          compact ? "text-[0.5rem] tracking-[0.3em]" : "text-[0.55rem] tracking-[0.34em] sm:text-[0.6rem]"
        }`}
      >
        {company.tagline}
      </span>
    </span>
  );
}

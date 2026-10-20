"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { company, nav } from "@/lib/data";
import { Logo } from "@/components/art/Logo";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/Icons";
import { useSiteReady } from "./SiteReady";

export function Navbar() {
  const pathname = usePathname();
  const { ready } = useSiteReady();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 28);
    // hide while scrolling down past the hero, reveal as soon as the user scrolls back up
    if (y > 520 && y > prev + 2 && !open) setHidden(true);
    else if (y < prev - 2) setHidden(false);
  });

  // close the menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: hidden ? "-110%" : 0, opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* utility strip — carried over from the original site */}
        <motion.div
          animate={{ height: scrolled ? 0 : 44, opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="hidden overflow-hidden border-b border-white/10 bg-ink/60 backdrop-blur-md lg:block"
        >
          <div className="container-x flex h-11 items-center justify-between text-[0.8rem] text-mist">
            <div className="flex items-center gap-7">
              {company.phones.map((p) => (
                <a key={p.href} href={p.href} className="flex items-center gap-2 transition-colors hover:text-brand-300">
                  <Phone className="size-3.5 text-brand-500" aria-hidden />
                  {p.display}
                </a>
              ))}
              <a href={`mailto:${company.email}`} className="flex items-center gap-2 transition-colors hover:text-brand-300">
                <Mail className="size-3.5 text-brand-500" aria-hidden />
                {company.email}
              </a>
              <span className="text-steel">TCP# {company.tcp}</span>
            </div>
            <div className="flex items-center gap-6">
              <a href={company.portal.register} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand-300">
                Create an account
              </a>
              <a href={company.portal.login} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 transition-colors hover:text-brand-300">
                Client login <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
              <span className="h-4 w-px bg-white/15" />
              <div className="flex items-center gap-3">
                {company.socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="text-steel transition-colors hover:text-brand-300"
                  >
                    <SocialIcon id={s.id} className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* main bar */}
        <div
          className={`transition-[background,border-color,backdrop-filter] duration-500 ${
            scrolled ? "border-b border-white/10 bg-ink/80 backdrop-blur-xl" : "border-b border-transparent bg-gradient-to-b from-ink/70 to-transparent"
          }`}
        >
          <div className={`container-x flex items-center justify-between transition-[height] duration-500 ${scrolled ? "h-[68px]" : "h-[84px]"}`}>
            <Link href="/" aria-label={`${company.name} home`} className="shrink-0">
              <Logo compact={scrolled} />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
              {nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.2em] transition-colors ${
                      active ? "text-white" : "text-mist hover:text-white"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand-500"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden lg:block">
                <Button href="/booking" arrow>
                  Book now
                </Button>
              </div>

              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="relative grid size-11 place-items-center rounded-full border border-white/20 text-white lg:hidden"
              >
                <span className="relative block h-3.5 w-5">
                  <motion.span
                    animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                    className="absolute left-0 top-0 h-[1.5px] w-full origin-center rounded bg-current"
                  />
                  <motion.span
                    animate={{ opacity: open ? 0 : 1, scaleX: open ? 0.2 : 1 }}
                    className="absolute left-0 top-[6.25px] h-[1.5px] w-full rounded bg-current"
                  />
                  <motion.span
                    animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                    className="absolute bottom-0 left-0 h-[1.5px] w-full origin-center rounded bg-current"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "circle(0% at calc(100% - 2.75rem) 2.75rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.75rem) 2.75rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.75rem) 2.75rem)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink lg:hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_0%,rgb(30_172_199/0.22),transparent)]" />
            <div className="container-x relative flex min-h-full flex-col pb-10 pt-28">
              <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1">
                {nav.map((item, i) => (
                  <div key={item.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0, transition: { delay: 0.25 + i * 0.07, duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
                      exit={{ y: "110%", transition: { duration: 0.25 } }}
                    >
                      <Link
                        href={item.href}
                        className={`display flex items-baseline gap-4 py-2 text-[2.6rem] leading-tight ${
                          isActive(item.href) ? "text-brand-400" : "text-white"
                        }`}
                      >
                        <span className="text-sm font-sans tracking-widest text-steel">0{i + 1}</span>
                        {item.label}
                      </Link>
                    </motion.div>
                  </div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}
                  className="mt-6"
                >
                  <Button href="/booking" arrow size="lg" className="w-full">
                    Book a ride
                  </Button>
                </motion.div>
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.8 } }}
                className="mt-10 space-y-3 border-t border-white/10 pt-6 text-mist"
              >
                {company.phones.map((p) => (
                  <a key={p.href} href={p.href} className="flex items-center gap-3 text-lg text-white">
                    <Phone className="size-4 text-brand-500" aria-hidden /> {p.display}
                  </a>
                ))}
                <a href={`mailto:${company.email}`} className="flex items-center gap-3">
                  <Mail className="size-4 text-brand-500" aria-hidden /> {company.email}
                </a>
                <div className="flex items-center gap-5 pt-3">
                  {company.socials.map((s) => (
                    <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-steel hover:text-brand-300">
                      <SocialIcon id={s.id} className="size-5" />
                    </a>
                  ))}
                </div>
                <a href={company.portal.login} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 pt-2 text-sm text-brand-300">
                  Client login <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

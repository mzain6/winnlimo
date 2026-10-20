interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds for one full loop. */
  speed?: number;
  reverse?: boolean;
}

/** Seamless infinite horizontal ticker. Content is duplicated; the copy is hidden from assistive tech. */
export function Marquee({ children, className = "", speed = 48, reverse = false }: MarqueeProps) {
  const style = {
    animationDuration: `${speed}s`,
    animationDirection: reverse ? "reverse" : "normal",
  } as const;
  return (
    <div
      className={`group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] ${className}`}
    >
      <div className="flex min-w-full shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]" style={style}>
        {children}
      </div>
      <div
        aria-hidden
        className="flex min-w-full shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]"
        style={style}
      >
        {children}
      </div>
    </div>
  );
}

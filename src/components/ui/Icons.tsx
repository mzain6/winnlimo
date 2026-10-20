import {
  Briefcase,
  Bus,
  Clock,
  Music,
  Plane,
  TrendingUp,
  Trophy,
  User,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIcon } from "@/lib/data";

const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  briefcase: Briefcase,
  clock: Clock,
  trending: TrendingUp,
  bus: Bus,
  user: User,
  plane: Plane,
  music: Music,
  trophy: Trophy,
};

export function ServiceGlyph({ name, className }: { name: ServiceIcon; className?: string }) {
  const Icon = serviceIcons[name];
  return <Icon aria-hidden className={className} strokeWidth={1.5} />;
}

/** Brand glyphs (lucide dropped its brand icons, so these are drawn here). */
export function SocialIcon({ id, className }: { id: string; className?: string }) {
  const common = { className, "aria-hidden": true, viewBox: "0 0 24 24", fill: "currentColor" } as const;
  switch (id) {
    case "facebook":
      return (
        <svg {...common}>
          <path d="M13.5 21v-8h2.7l.5-3.2h-3.2V7.7c0-.9.4-1.7 1.8-1.7h1.5V3.2S15.6 3 14.4 3C11.9 3 10.3 4.5 10.3 7.2v2.6H7.5V13h2.8v8h3.2Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M4.6 9.2h3v9.7h-3V9.2Zm1.5-4.8a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5ZM9.5 9.2h2.9v1.3h.04c.4-.76 1.4-1.56 2.88-1.56 3.08 0 3.65 2.03 3.65 4.67v5.29h-3v-4.7c0-1.12-.02-2.56-1.56-2.56-1.56 0-1.8 1.22-1.8 2.48v4.78h-3V9.2Z" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M17.7 4h2.9l-6.3 7.2L21.7 20h-5.8l-4.5-5.9L6.2 20H3.3l6.7-7.7L2.9 4h5.9l4.1 5.4L17.7 4Zm-1 14.3h1.6L7.9 5.6H6.2l10.5 12.7Z" />
        </svg>
      );
    case "yelp":
      return (
        <svg {...common}>
          <path d="M12.2 3.1c-.7 0-1.3.6-1.3 1.3v6.5c0 .5.3.9.8 1 .5.1 1-.1 1.2-.6l2.4-5.6c.3-.7-.1-1.4-.8-1.6l-2.3-.9v-.1ZM6 9.4c-.6.3-.8 1.1-.4 1.7l1.7 2.6c.3.5.9.7 1.4.4.5-.2.8-.8.6-1.3L8 9.9c-.2-.6-.9-.9-1.5-.7L6 9.4Zm2.6 6.7-4.5-.4c-.7 0-1.2.5-1.2 1.1v.9c0 .7.7 1.3 1.4 1.1l4.5-1.3c.5-.2.8-.7.7-1.2-.1-.5-.5-.8-.9-.2Zm3.5 1.2c-.5-.2-1.1 0-1.3.5l-1.5 4.3c-.2.7.3 1.3 1 1.3.2 0 .5-.1.7-.2l3.6-2.6c.4-.3.5-.9.2-1.3l-1.2-1.7c-.2-.2-.3-.3-.5-.3Zm5.1-.8c-.5-.1-1 .2-1.2.7l-.8 2c-.2.5 0 1 .5 1.3l1.9 1.1c.6.3 1.3 0 1.5-.6l.5-1.9c.1-.4 0-.8-.3-1.1l-1.5-1.3c-.1-.1-.4-.2-.6-.2Z" />
        </svg>
      );
    default:
      return null;
  }
}

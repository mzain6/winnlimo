import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  as: Tag = "h2",
}: SectionHeadingProps) {
  const center = align === "center";
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <Reveal y={16}>
        <span className={`eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</span>
      </Reveal>
      <Tag
        className={`display mt-5 text-[2.35rem] leading-[1.08] sm:text-5xl lg:text-[3.4rem] ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
      >
        <SplitText text={title} />
      </Tag>
      {description && (
        <Reveal delay={0.15} y={20}>
          <p className={`mt-6 text-lg leading-relaxed ${tone === "dark" ? "text-mist" : "text-steel"}`}>{description}</p>
        </Reveal>
      )}
    </div>
  );
}

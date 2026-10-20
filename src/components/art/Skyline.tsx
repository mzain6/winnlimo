import { useId } from "react";

/**
 * Procedural night-time Los Angeles skyline, drawn as three depth layers so the hero can parallax them.
 * Generation is seeded, so server and client render identical markup.
 */

const W = 1600;
const H = 560;

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

interface Building {
  x: number;
  w: number;
  h: number;
  crown?: "spire" | "step" | "flat";
}

function makeBuildings(seed: number, minW: number, maxW: number, minH: number, maxH: number, gap: number): Building[] {
  const r = rng(seed);
  const out: Building[] = [];
  let x = -20;
  while (x < W + 20) {
    const w = minW + r() * (maxW - minW);
    const h = minH + r() * (maxH - minH);
    const roll = r();
    out.push({ x, w, h, crown: roll > 0.86 ? "spire" : roll > 0.66 ? "step" : "flat" });
    x += w + r() * gap;
  }
  return out;
}

function silhouette(bs: Building[], baseY: number): string {
  return bs
    .map(({ x, w, h, crown }) => {
      const top = baseY - h;
      const cx = x + w / 2;
      if (crown === "spire") {
        return `M${x},${baseY}V${top}H${cx - 2}V${top - 38}H${cx + 2}V${top}H${x + w}V${baseY}Z`;
      }
      if (crown === "step") {
        return `M${x},${baseY}V${top + 14}H${x + w * 0.18}V${top}H${x + w * 0.82}V${top + 14}H${x + w}V${baseY}Z`;
      }
      return `M${x},${baseY}V${top}H${x + w}V${baseY}Z`;
    })
    .join("");
}

function windowPaths(bs: Building[], baseY: number, seed: number, step: number, size: number, density: number) {
  const r = rng(seed);
  const a: string[] = [];
  const b: string[] = [];
  const c: string[] = [];
  for (const { x, w, h } of bs) {
    const top = baseY - h;
    for (let yy = top + 18; yy < baseY - 10; yy += step) {
      for (let xx = x + 7; xx < x + w - size - 4; xx += step) {
        if (r() > density) continue;
        const seg = `M${xx.toFixed(1)},${yy.toFixed(1)}h${size}v${size + 1}h-${size}z`;
        const t = r();
        (t < 0.45 ? a : t < 0.8 ? b : c).push(seg);
      }
    }
  }
  return [a.join(""), b.join(""), c.join("")] as const;
}

type Layer = "far" | "mid" | "near";

const LAYERS: Record<Layer, { seed: number; fill: string; baseY: number; dims: [number, number, number, number, number]; win?: { step: number; size: number; density: number } }> = {
  far: { seed: 11, fill: "#0d2a37", baseY: H, dims: [34, 70, 150, 330, 10] },
  mid: { seed: 29, fill: "#081922", baseY: H, dims: [44, 92, 120, 300, 14], win: { step: 11, size: 3, density: 0.22 } },
  near: { seed: 47, fill: "#04090d", baseY: H, dims: [64, 130, 70, 210, 22], win: { step: 14, size: 4, density: 0.12 } },
};

export function SkylineLayer({ layer, className }: { layer: Layer; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const cfg = LAYERS[layer];
  const [minW, maxW, minH, maxH, gap] = cfg.dims;
  const bs = makeBuildings(cfg.seed, minW, maxW, minH, maxH, gap);

  // one hero tower in the far layer, in the spirit of the DTLA skyline
  if (layer === "far") {
    bs.push({ x: 1010, w: 78, h: 470, crown: "spire" });
    bs.push({ x: 560, w: 90, h: 420, crown: "step" });
  }

  const wins = cfg.win ? windowPaths(bs, cfg.baseY, cfg.seed + 5, cfg.win.step, cfg.win.size, cfg.win.density) : null;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={`fade-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={cfg.fill} />
          <stop offset="1" stopColor="#020406" />
        </linearGradient>
      </defs>
      <path d={silhouette(bs, cfg.baseY)} fill={`url(#fade-${uid})`} />
      {wins && (
        <g>
          <path d={wins[0]} fill="#5ccae0" className="animate-twinkle" style={{ animationDelay: "0s" }} />
          <path d={wins[1]} fill="#ffd9a0" className="animate-twinkle" style={{ animationDelay: "1.4s" }} opacity="0.8" />
          <path d={wins[2]} fill="#e9fbff" className="animate-twinkle" style={{ animationDelay: "2.6s" }} opacity="0.7" />
        </g>
      )}
    </svg>
  );
}

/** Twinkling stars. */
export function Stars({ className }: { className?: string }) {
  const r = rng(7);
  const stars = Array.from({ length: 70 }, (_, i) => ({
    x: r() * 100,
    y: r() * 62,
    s: 0.6 + r() * 1.5,
    d: r() * 4,
    i,
  }));
  return (
    <div className={className} aria-hidden>
      {stars.map((s) => (
        <span
          key={s.i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s`, animationDuration: `${3 + (s.i % 4)}s` }}
        />
      ))}
    </div>
  );
}

/** Palm tree silhouette (trunk + fronds), tall and slightly leaning. */
export function Palm({ className, lean = 0 }: { className?: string; lean?: number }) {
  return (
    <svg viewBox="0 0 120 360" className={className} aria-hidden focusable="false">
      <g transform={`rotate(${lean} 60 360)`} fill="#03070a">
        <path d="M56,360 C58,280 60,200 62,92 L68,92 C68,200 66,280 68,360 Z" />
        <g transform="translate(65 92)">
          {[-80, -55, -28, 0, 28, 55, 80].map((a, i) => (
            <path
              key={a}
              transform={`rotate(${a})`}
              d={`M0,0 C${14 + (i % 2) * 6},-28 ${34},-44 ${60 - (i % 3) * 6},-40 C${36},-52 ${14},-46 0,-6 Z`}
            />
          ))}
          {[-110, 110].map((a) => (
            <path key={a} transform={`rotate(${a})`} d="M0,0 C12,-20 34,-26 50,-18 C30,-34 10,-30 0,-6 Z" />
          ))}
        </g>
      </g>
    </svg>
  );
}

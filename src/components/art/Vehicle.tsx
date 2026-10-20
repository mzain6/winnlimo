import { useId } from "react";
import type { VehicleType } from "@/lib/data";

interface VehicleProps {
  type: VehicleType;
  className?: string;
  /** Draw headlight beams and a glow on the ground. */
  lights?: boolean;
  /** Face left instead of right. */
  flip?: boolean;
}

/**
 * Hand-drawn, side-profile illustrations of each fleet class.
 * Used wherever a real photograph isn't available; everything is vector so it stays crisp at any size.
 */
export function Vehicle({ type, className, lights = true, flip = false }: VehicleProps) {
  const uid = useId().replace(/:/g, "");
  const body = `body-${uid}`;
  const glass = `glass-${uid}`;
  const rim = `rim-${uid}`;
  const beam = `beam-${uid}`;
  const shade = `shade-${uid}`;

  const spec = SPECS[type];

  return (
    <svg
      viewBox="0 0 720 250"
      className={className}
      role="img"
      aria-label={spec.label}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <defs>
        <linearGradient id={body} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6d767e" />
          <stop offset="0.16" stopColor="#343a40" />
          <stop offset="0.6" stopColor="#15181c" />
          <stop offset="1" stopColor="#0a0c0e" />
        </linearGradient>
        <linearGradient id={glass} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4f7f93" />
          <stop offset="0.5" stopColor="#16303b" />
          <stop offset="1" stopColor="#0a171d" />
        </linearGradient>
        <radialGradient id={rim} cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#f4f6f8" />
          <stop offset="0.55" stopColor="#9aa1a8" />
          <stop offset="1" stopColor="#4b5056" />
        </radialGradient>
        <linearGradient id={beam} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d9f6ff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#d9f6ff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={shade} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.65" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="360" cy="226" rx="340" ry="13" fill={`url(#${shade})`} />

      {/* headlight beam + ground glow */}
      {lights && (
        <g>
          <path d={spec.beamPath} fill={`url(#${beam})`} />
          <ellipse cx={spec.glow[0]} cy="224" rx="70" ry="7" fill="#7fe3f5" opacity="0.22" />
        </g>
      )}

      {/* wheel arches */}
      {spec.wheels.map(([cx, , r]) => (
        <path key={`w-${cx}`} d={`M ${cx - r - 7},${spec.base} A ${r + 7} ${r + 7} 0 0 1 ${cx + r + 7},${spec.base} Z`} fill="#020203" />
      ))}

      {/* body */}
      <path d={spec.body} fill={`url(#${body})`} />
      <path d={spec.body} fill="none" stroke="#a9d8e6" strokeOpacity="0.55" strokeWidth="1.3" strokeLinejoin="round" />

      {/* glass */}
      {spec.windows.map((d, i) => (
        <path key={i} d={d} fill={`url(#${glass})`} stroke="#0b1114" strokeWidth="1.5" />
      ))}
      {spec.glints.map((d, i) => (
        <path key={`g-${i}`} d={d} fill="#bfeaf7" opacity="0.12" />
      ))}

      {/* character line, door cuts, trim */}
      <path d={spec.line} fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth="1.4" strokeLinecap="round" />
      {spec.doors.map((d, i) => (
        <path key={`d-${i}`} d={d} fill="none" stroke="#000" strokeOpacity="0.7" strokeWidth="1.3" />
      ))}
      <path d={spec.accent} fill="none" stroke="#1eacc7" strokeOpacity="0.85" strokeWidth="1.6" strokeLinecap="round" />

      {/* grille / lamps */}
      <path d={spec.head} fill="#eafcff" />
      <path d={spec.head} fill="none" stroke="#7fe3f5" strokeWidth="3" opacity="0.45" />
      <path d={spec.tail} fill="#ff3b4a" />
      <path d={spec.grille} fill="#05070a" stroke="#6b737b" strokeWidth="1" />

      {/* wheels */}
      {spec.wheels.map(([cx, cy, r]) => (
        <g key={`wheel-${cx}`}>
          <circle cx={cx} cy={cy} r={r} fill="#08090a" />
          <circle cx={cx} cy={cy} r={r - 4} fill="#16181b" />
          <g>
            <circle cx={cx} cy={cy} r={r * 0.66} fill={`url(#${rim})`} />
            <circle cx={cx} cy={cy} r={r * 0.5} fill="#1b1d20" />
            {[0, 72, 144, 216, 288].map((a) => (
              <rect
                key={a}
                x={cx - 2.6}
                y={cy - r * 0.64}
                width="5.2"
                height={r * 0.5}
                rx="2"
                fill={`url(#${rim})`}
                transform={`rotate(${a} ${cx} ${cy})`}
              />
            ))}
            <circle cx={cx} cy={cy} r={r * 0.13} fill="#1eacc7" />
          </g>
        </g>
      ))}
    </svg>
  );
}

interface Spec {
  label: string;
  base: number;
  body: string;
  windows: string[];
  glints: string[];
  line: string;
  doors: string[];
  accent: string;
  head: string;
  tail: string;
  grille: string;
  beamPath: string;
  glow: [number, number];
  wheels: [number, number, number][];
}

const SPECS: Record<VehicleType, Spec> = {
  sedan: {
    label: "Black executive sedan",
    base: 190,
    wheels: [
      [170, 190, 34],
      [530, 190, 34],
    ],
    body:
      "M44,192 L44,156 C44,144 56,138 84,134 L196,124 C218,104 254,86 304,82 L392,80 C444,80 486,102 512,122 L604,138 C632,143 660,154 660,170 L660,192 Z",
    windows: [
      "M226,118 C244,102 268,92 306,89 L346,88 L346,119 Z",
      "M358,88 L394,87 C436,88 468,104 492,120 L358,120 Z",
    ],
    glints: ["M246,108 C262,98 280,94 300,92 L282,114 Z", "M372,92 L402,91 L384,116 L368,116 Z"],
    line: "M66,140 L200,130 L350,126 L512,128 L612,142",
    doors: ["M352,90 L352,160", "M244,134 L248,176", "M460,128 L458,172"],
    accent: "M60,170 L640,176",
    head: "M626,148 L652,154 L646,163 L622,158 Z",
    tail: "M46,146 L62,143 L64,152 L46,156 Z",
    grille: "M640,168 L660,170 L660,184 L638,184 Z",
    beamPath: "M652,156 L720,128 L720,196 Z",
    glow: [650, 224],
  },
  suv: {
    label: "Black luxury SUV",
    base: 190,
    wheels: [
      [170, 190, 38],
      [540, 190, 38],
    ],
    body:
      "M40,192 L40,116 C40,104 46,96 60,92 L92,74 C100,66 110,62 124,62 L476,60 C500,60 516,68 530,82 L552,116 L644,124 C664,126 676,134 678,152 L678,192 Z",
    windows: [
      "M128,76 L214,75 L214,114 L112,114 Z",
      "M226,75 L336,74 L336,114 L226,114 Z",
      "M348,74 L458,73 C478,74 494,86 506,100 L522,114 L348,114 Z",
    ],
    glints: ["M136,78 L168,78 L146,112 L120,112 Z", "M240,78 L276,78 L254,112 L228,112 Z"],
    line: "M50,120 L120,118 L520,118 L640,128",
    doors: ["M220,76 L220,168", "M342,76 L342,168", "M452,114 L450,170"],
    accent: "M54,174 L660,178",
    head: "M650,134 L674,140 L672,150 L648,146 Z",
    tail: "M42,104 L54,102 L56,126 L42,128 Z",
    grille: "M654,152 L678,154 L678,184 L652,184 Z",
    beamPath: "M672,142 L720,112 L720,200 Z",
    glow: [672, 224],
  },
  van: {
    label: "Black executive Mercedes Sprinter van",
    base: 190,
    wheels: [
      [150, 190, 36],
      [548, 190, 36],
    ],
    body:
      "M30,192 L30,78 C30,66 38,60 52,60 L520,58 C560,58 590,78 612,108 L650,124 C668,130 678,140 678,158 L678,192 Z",
    windows: [
      "M52,76 L176,75 L176,120 L52,120 Z",
      "M188,75 L310,75 L310,120 L188,120 Z",
      "M322,75 L446,74 L446,120 L322,120 Z",
      "M458,74 L520,74 C552,74 574,90 590,112 L592,120 L458,120 Z",
    ],
    glints: ["M62,78 L94,78 L74,118 L52,118 Z", "M200,78 L232,78 L212,118 L190,118 Z", "M334,78 L366,78 L346,118 L324,118 Z"],
    line: "M36,126 L600,124",
    doors: ["M452,76 L452,172", "M596,112 L598,172"],
    accent: "M44,172 L664,176",
    head: "M650,140 L674,146 L672,156 L648,152 Z",
    tail: "M32,92 L44,90 L46,124 L32,126 Z",
    grille: "M660,156 L678,158 L678,184 L658,184 Z",
    beamPath: "M672,148 L720,118 L720,200 Z",
    glow: [672, 224],
  },
  coach: {
    label: "Black Mercedes shuttle mini coach",
    base: 192,
    wheels: [
      [140, 192, 36],
      [528, 192, 36],
    ],
    body:
      "M22,194 L22,56 C22,44 30,38 44,38 L560,36 C600,36 630,60 646,94 L666,110 C680,116 686,128 686,144 L686,194 Z",
    windows: [
      "M42,54 L122,54 L122,104 L42,104 Z",
      "M134,54 L214,54 L214,104 L134,104 Z",
      "M226,54 L306,54 L306,104 L226,104 Z",
      "M318,54 L398,54 L398,104 L318,104 Z",
      "M410,54 L490,54 L490,104 L410,104 Z",
      "M502,54 L562,53 C590,54 612,68 624,92 L626,104 L502,104 Z",
    ],
    glints: ["M50,56 L78,56 L60,102 L42,102 Z", "M142,56 L170,56 L152,102 L134,102 Z", "M234,56 L262,56 L244,102 L226,102 Z"],
    line: "M28,112 L636,110",
    doors: ["M594,56 L594,176", "M492,56 L492,176"],
    accent: "M36,176 L670,180",
    head: "M662,128 L684,134 L682,144 L660,140 Z",
    tail: "M24,70 L36,68 L38,108 L24,110 Z",
    grille: "M672,146 L686,148 L686,186 L670,186 Z",
    beamPath: "M680,136 L720,108 L720,200 Z",
    glow: [684, 224],
  },
};

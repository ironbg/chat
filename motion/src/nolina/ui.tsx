import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";
import { C, text } from "./theme";

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const ease = (frame: number, from: number, dur: number) =>
  interpolate(frame, [from, from + dur], [0, 1], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) });

// Line of text that slides up out of a mask.
export const Reveal: React.FC<{ delay?: number; dur?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  delay = 0,
  dur = 22,
  children,
  style,
}) => {
  const p = ease(useCurrentFrame(), delay, dur);
  return (
    <div style={{ overflow: "hidden", paddingBottom: "0.08em", ...style }}>
      <div style={{ transform: `translateY(${(1 - p) * 115}%) rotate(${(1 - p) * 4}deg)`, transformOrigin: "left top" }}>
        {children}
      </div>
    </div>
  );
};

export const Label: React.FC<{ children: React.ReactNode; color?: string; delay?: number }> = ({
  children,
  color = C.sage,
  delay = 0,
}) => {
  const p = ease(useCurrentFrame(), delay, 20);
  return (
    <div
      style={{
        fontFamily: text,
        fontSize: 22,
        fontWeight: 600,
        letterSpacing: "0.32em",
        textTransform: "uppercase",
        color,
        opacity: p,
        display: "flex",
        alignItems: "center",
        gap: 18,
      }}
    >
      <div style={{ width: 60 * p, height: 2, background: color }} />
      {children}
    </div>
  );
};

export const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "overlay", opacity: 0.22 }}>
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={frame % 30} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};

export const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{ pointerEvents: "none", background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)" }}
  />
);

// Showreel HUD: corner marks, timecode, brand tag.
export const Hud: React.FC = () => {
  const frame = useCurrentFrame();
  const s = Math.floor(frame / 30);
  const tc = `00:00:${String(s).padStart(2, "0")}:${String(frame % 30).padStart(2, "0")}`;
  const p = ease(frame, 4, 20);
  const corner = (r: number): React.CSSProperties => ({
    position: "absolute",
    width: 34,
    height: 34,
    borderColor: "rgba(241,235,224,0.55)",
    borderStyle: "solid",
    borderWidth: 0,
    transform: `rotate(${r}deg)`,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  });
  const t: React.CSSProperties = {
    position: "absolute",
    fontFamily: text,
    fontSize: 17,
    fontWeight: 500,
    letterSpacing: "0.2em",
    color: "rgba(241,235,224,0.7)",
    fontVariantNumeric: "tabular-nums",
  };
  return (
    <AbsoluteFill style={{ opacity: p, pointerEvents: "none", mixBlendMode: "difference" }}>
      <div style={{ ...corner(0), left: 40, top: 40 }} />
      <div style={{ ...corner(90), right: 40, top: 40 }} />
      <div style={{ ...corner(180), right: 40, bottom: 40 }} />
      <div style={{ ...corner(270), left: 40, bottom: 40 }} />
      <div style={{ ...t, left: 92, top: 48 }}>NOLINA — ХИСАРЯ</div>
      <div style={{ ...t, right: 92, top: 48 }}>● REC {tc}</div>
      <div style={{ ...t, left: 92, bottom: 48 }}>NOLINA-MED.EU</div>
      <div style={{ ...t, right: 92, bottom: 48 }}>SHOWREEL / 2026</div>
    </AbsoluteFill>
  );
};

export const Dust: React.FC<{ count?: number; color?: string }> = ({ count = 40, color = C.sage }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: count }).map((_, i) => {
        const x = random(`x${i}`) * 1920;
        const y = ((random(`y${i}`) * 1200 - frame * (0.6 + random(`s${i}`) * 1.4)) % 1200 + 1200) % 1200 - 60;
        const r = 1.5 + random(`r${i}`) * 3.5;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: r * 2,
              height: r * 2,
              borderRadius: "50%",
              background: color,
              opacity: 0.15 + random(`o${i}`) * 0.35,
              filter: `blur(${random(`b${i}`) * 2}px)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

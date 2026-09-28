import { evolvePath } from "@remotion/paths";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, display, text } from "./theme";
import { Dust, clamp, ease } from "./ui";

// Stand-in mark: a nolina plant's fan of slender leaves rising from one base.
const LEAVES = Array.from({ length: 9 }).map((_, i) => {
  const a = interpolate(i, [0, 8], [-68, 68]) * (Math.PI / 180);
  const len = 150 - Math.abs(i - 4) * 16;
  const bx = 120;
  const by = 200;
  const tx = bx + Math.sin(a) * len * 1.05;
  const ty = by - Math.cos(a) * len;
  const cx = bx + Math.sin(a) * len * 0.35;
  const cy = by - Math.cos(a) * len * 0.75;
  return `M ${bx} ${by} Q ${cx} ${cy} ${tx} ${ty}`;
});
const WORD = "NOLINA";

export const S7Logo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ring = ease(frame, 0, 40);
  const markScale = spring({ frame: frame - 44, fps, config: { damping: 12 } });
  const lift = ease(frame, 50, 30);
  const sweep = interpolate(frame, [80, 120], [-40, 140], clamp);
  const flash = interpolate(frame, [42, 46, 60], [0, 0.6, 0], clamp);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 45%, ${C.moss} 0%, ${C.deep} 60%)`, justifyContent: "center", alignItems: "center" }}>
      <Dust count={50} />
      <AbsoluteFill style={{ background: C.teal, opacity: flash, mixBlendMode: "screen" }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", transform: `translateY(${interpolate(lift, [0, 1], [120, 0])}px)` }}>
        <svg width={240} height={240} viewBox="0 0 240 240" style={{ transform: `scale(${1 + (1 - lift) * 0.5 + markScale * 0.04 - 0.04})`, overflow: "visible" }}>
          <circle cx={120} cy={120} r={112} fill="none" stroke={C.sage} strokeWidth={2} strokeDasharray={704} strokeDashoffset={704 * (1 - ring)} opacity={0.6} transform="rotate(-90 120 120)" />
          {LEAVES.map((d, i) => {
            const p = evolvePath(ease(frame, 8 + Math.abs(i - 4) * 4, 30), d);
            return (
              <path key={i} d={d} fill="none" stroke={i === 4 ? C.gold : C.sage} strokeWidth={i === 4 ? 7 : 5} strokeLinecap="round" strokeDasharray={p.strokeDasharray} strokeDashoffset={p.strokeDashoffset} />
            );
          })}
          <circle cx={120} cy={200} r={8 * markScale} fill={C.gold} />
        </svg>
        <div style={{ display: "flex", marginTop: 40, position: "relative" }}>
          {WORD.split("").map((ch, i) => {
            const s = spring({ frame: frame - 52 - i * 3, fps, config: { damping: 14, stiffness: 160 } });
            return (
              <div key={i} style={{ overflow: "hidden" }}>
                <div
                  style={{
                    fontFamily: display,
                    fontWeight: 800,
                    fontSize: 190,
                    lineHeight: 1,
                    letterSpacing: interpolate(s, [0, 1], [0.4, 0.06]) + "em",
                    color: C.stone,
                    transform: `translateY(${(1 - s) * 110}%)`,
                    backgroundImage: `linear-gradient(100deg, ${C.stone} ${sweep - 20}%, #ffffff ${sweep}%, ${C.gold} ${sweep + 6}%, ${C.stone} ${sweep + 20}%)`,
                    backgroundSize: `${WORD.length * 100}% 100%`,
                    backgroundPosition: `${(i / (WORD.length - 1)) * 100}% 0`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {ch}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ fontFamily: text, fontSize: 28, fontWeight: 500, letterSpacing: "0.34em", color: C.sage, marginTop: 20, opacity: ease(frame, 82, 20) }}>
          ЛЕЧЕБНО-ВЪЗСТАНОВИТЕЛЕН ЦЕНТЪР
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 28, marginTop: 50, fontFamily: text, fontSize: 30, fontWeight: 600, color: C.stone, opacity: ease(frame, 100, 20), transform: `translateY(${(1 - ease(frame, 100, 20)) * 20}px)` }}>
          <span>nolina-med.eu</span>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: C.gold }} />
          <span>0883 30 55 56</span>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: C.gold }} />
          <span>гр. Хисаря</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

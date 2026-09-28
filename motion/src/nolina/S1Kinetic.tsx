import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, display, text } from "./theme";
import { clamp } from "./ui";

// Real service line from the site: "Масаж, кинезитерапия, рехабилитация".
const WORDS = [
  { w: "МАСАЖ", bg: C.paper, fg: C.ink },
  { w: "КИНЕЗИТЕРАПИЯ", bg: C.slate, fg: C.paper },
  { w: "РЕХАБИЛИТАЦИЯ", bg: C.lime, fg: C.night },
];
const PER = 24;

export const S1Kinetic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const idx = Math.min(Math.floor(frame / PER), WORDS.length);

  if (idx >= WORDS.length) {
    // Final beat: location slam with stacked outline echoes.
    const f = frame - WORDS.length * PER;
    const s = spring({ frame: f, fps, config: { damping: 11, stiffness: 180 } });
    return (
      <AbsoluteFill style={{ background: C.night, justifyContent: "center", alignItems: "center" }}>
        {[3, 2, 1].map((k) => (
          <div
            key={k}
            style={{
              position: "absolute",
              fontFamily: display,
              fontWeight: 900,
              fontSize: 300,
              letterSpacing: "-0.04em",
              color: "transparent",
              WebkitTextStroke: `2px ${C.lime}`,
              opacity: 0.5 / k,
              transform: `scale(${1 + k * 0.14 * s}) translateY(${k * 6}px)`,
            }}
          >
            ХИСАРЯ
          </div>
        ))}
        <div
          style={{
            fontFamily: display,
            fontWeight: 900,
            fontSize: 300,
            letterSpacing: "-0.04em",
            color: C.paper,
            transform: `scale(${interpolate(s, [0, 1], [2.2, 1])})`,
            opacity: s,
          }}
        >
          ХИСАРЯ
        </div>
      </AbsoluteFill>
    );
  }

  const { w, bg, fg } = WORDS[idx];
  const f = frame - idx * PER;
  const s = spring({ frame: f, fps, config: { damping: 14, stiffness: 220 } });
  const size = Math.min(300, 1640 / (w.length * 0.8));
  const skew = interpolate(s, [0, 1], [-18, 0]);
  const x = interpolate(s, [0, 1], [idx % 2 ? -600 : 600, 0]);
  const bar = interpolate(f, [0, PER], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ background: bg, justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
      {/* motion streaks */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 180 + i * 170,
            left: 0,
            height: 3,
            width: `${(1 - s) * 100}%`,
            background: fg,
            opacity: 0.25,
            transform: `translateX(${idx % 2 ? 0 : (1 - s) * 400}px)`,
          }}
        />
      ))}
      <div
        style={{
          fontFamily: display,
          fontWeight: 900,
          fontSize: size,
          letterSpacing: "-0.045em",
          lineHeight: 1,
          color: fg,
          transform: `translateX(${x}px) skewX(${skew}deg) scale(${interpolate(s, [0, 1], [1.25, 1])})`,
          filter: `blur(${(1 - s) * 12}px)`,
        }}
      >
        {w}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 150,
          left: 160,
          right: 160,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: text,
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: "0.3em",
          color: fg,
          opacity: 0.7,
        }}
      >
        <span>0{idx + 1} / 03</span>
        <div style={{ flex: 1, margin: "12px 40px", height: 2, background: fg, opacity: 0.25 }}>
          <div style={{ width: `${bar * 100}%`, height: 2, background: fg }} />
        </div>
        <span>НОЛИНА</span>
      </div>
    </AbsoluteFill>
  );
};

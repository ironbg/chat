import { Trail } from "@remotion/motion-blur";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, display, text } from "./theme";
import { Dust, clamp, ease } from "./ui";

// Rebuild of the Nolina logo as it appears on the business card: orange figure,
// lowercase lime "нолина" wordmark and a lime swoosh, with the card's tagline.
const WORD = "нолина";
const SWOOSH = "M 0 64 C 260 10, 620 -6, 900 20 C 620 8, 280 30, 0 78 Z";

const Figure: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 26, fps, config: { damping: 14, stiffness: 90 } });
  return (
    <Img
      src={staticFile("nolina/figure.png")}
      style={{
        width: 300,
        transform: `translateX(${(1 - s) * -1400}px) rotate(${(1 - s) * -8}deg)`,
        opacity: frame < 26 ? 0 : 1,
      }}
    />
  );
};

export const S7Logo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const open = ease(frame, 4, 26); // white circle opening from the dark
  const flash = interpolate(frame, [0, 4, 16], [0, 0.8, 0], clamp);
  const swoosh = ease(frame, 58, 28);
  const sweep = interpolate(frame, [96, 130], [-30, 140], clamp);
  const tag = ease(frame, 84, 20);
  const cta = ease(frame, 104, 20);
  return (
    <AbsoluteFill style={{ background: C.night }}>
      <Dust count={40} color={C.lime} />
      <AbsoluteFill style={{ background: C.lime, opacity: flash }} />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 45%, #ffffff, ${C.paper} 60%, #eceee4)`,
          clipPath: `circle(${open * 75}% at 50% 50%)`,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "flex-start", marginLeft: -80 }}>
          <div style={{ fontFamily: text, fontSize: 30, fontWeight: 400, letterSpacing: "0.05em", color: C.slate, marginLeft: 330, opacity: ease(frame, 40, 20) }}>
            лечебно-възстановителен център
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 320, display: "flex", justifyContent: "center", marginTop: 60 }}>
              <Trail layers={6} lagInFrames={0.6} trailOpacity={0.5}>
                <Figure />
              </Trail>
            </div>
            <div style={{ display: "flex" }}>
              {WORD.split("").map((ch, i) => {
                const s = spring({ frame: frame - 38 - i * 3, fps, config: { damping: 13, stiffness: 150 } });
                return (
                  <div key={i} style={{ overflow: "hidden", padding: "0 2px" }}>
                    <div
                      style={{
                        fontFamily: display,
                        fontWeight: 400,
                        fontSize: 240,
                        lineHeight: 1.1,
                        letterSpacing: "0.01em",
                        transform: `translateY(${(1 - s) * 110}%)`,
                        backgroundImage: `linear-gradient(100deg, ${C.lime} ${sweep - 16}%, ${C.limeSoft} ${sweep}%, ${C.lime} ${sweep + 16}%)`,
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
            <div style={{ fontFamily: text, fontSize: 28, lineHeight: 1.45, color: C.slate, marginLeft: 36, marginTop: 70, opacity: tag, transform: `translateX(${(1 - tag) * 30}px)` }}>
              Кинезитерапия
              <br />
              Рехабилитация
              <br />
              Масаж
            </div>
          </div>
          <svg width={900} height={90} viewBox="0 0 900 90" style={{ marginLeft: 120, marginTop: -40 }}>
            <defs>
              <clipPath id="sw">
                <rect x={0} y={0} width={900 * swoosh} height={90} />
              </clipPath>
            </defs>
            <path d={SWOOSH} fill={C.lime} clipPath="url(#sw)" />
          </svg>
        </div>
        <div style={{ position: "absolute", bottom: 150, display: "flex", alignItems: "center", gap: 30, fontFamily: text, fontSize: 30, fontWeight: 500, color: C.slate, opacity: cta, transform: `translateY(${(1 - cta) * 24}px)` }}>
          <div style={{ padding: "18px 40px", borderRadius: 40, background: C.lime, color: C.ink, fontWeight: 700, letterSpacing: "0.08em" }}>ЗАПАЗИ ЧАС СЕГА</div>
          <span>+359 883 30 55 56</span>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: C.orange }} />
          <span>nolina-med.eu</span>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: C.orange }} />
          <span>гр. Хисаря</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

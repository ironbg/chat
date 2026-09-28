import { evolvePath } from "@remotion/paths";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, display, text } from "./theme";
import { Label, clamp, ease } from "./ui";

// Services listed on nolina-med.eu.
const SERVICES = [
  { t: "Масаж", s: "Лечебен и релаксиращ", d: "M10 40 C 25 20, 40 60, 55 40 S 85 20, 90 40 M10 58 C 25 38, 40 78, 55 58 S 85 38, 90 58" },
  { t: "Кинезитерапия", s: "Движение и рехабилитация", d: "M50 12 A 36 36 0 1 1 18 32 M18 32 L 14 16 M18 32 L 33 28" },
  { t: "Лимфодренаж", s: "Пресотерапия", d: "M50 10 C 50 10, 22 44, 22 62 A 28 28 0 0 0 78 62 C 78 44, 50 10, 50 10 Z" },
  { t: "Ултразвук", s: "Апаратна терапия", d: "M20 50 A 8 8 0 0 1 20 50.1 M34 30 A 28 28 0 0 1 34 70 M48 18 A 44 44 0 0 1 48 82 M62 8 A 58 58 0 0 1 62 92" },
  { t: "Физиотерапия", s: "Възстановяване", d: "M6 52 L 30 52 L 38 30 L 50 76 L 60 20 L 68 52 L 94 52" },
];

const Card: React.FC<{ i: number }> = ({ i }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - 8 - i * 5;
  const s = spring({ frame: f, fps, config: { damping: 15, stiffness: 140 } });
  const draw = ease(frame, 18 + i * 5, 30);
  const { t, s: sub, d } = SERVICES[i];
  const path = evolvePath(draw, d);
  const hi = i === Math.floor(interpolate(frame, [60, 125], [0, 5], clamp)) % 5 && frame > 60;
  return (
    <div
      style={{
        width: 300,
        height: 420,
        borderRadius: 28,
        padding: 34,
        boxSizing: "border-box",
        background: hi ? C.stone : "rgba(241,235,224,0.06)",
        border: `1.5px solid ${hi ? C.stone : "rgba(163,201,168,0.3)"}`,
        backdropFilter: "blur(10px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transform: `translateY(${(1 - s) * 260 + (hi ? -24 : 0)}px) rotateY(${(1 - s) * -80}deg)`,
        opacity: s,
        boxShadow: hi ? `0 40px 80px rgba(0,0,0,0.45), 0 0 0 8px rgba(70,179,166,0.25)` : "none",
        transition: "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: text, fontSize: 20, fontWeight: 600, color: hi ? C.moss : C.sage, letterSpacing: "0.2em" }}>
        <span>0{i + 1}</span>
        <span>●</span>
      </div>
      <svg viewBox="0 0 100 100" width={120} height={120}>
        <path d={d} fill="none" stroke={hi ? C.teal : C.sage} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={path.strokeDasharray} strokeDashoffset={path.strokeDashoffset} />
      </svg>
      <div>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: t.length > 10 ? 38 : 46, letterSpacing: "-0.03em", color: hi ? C.ink : C.stone }}>{t}</div>
        <div style={{ fontFamily: text, fontSize: 21, marginTop: 8, color: hi ? C.moss : "rgba(241,235,224,0.6)" }}>{sub}</div>
      </div>
    </div>
  );
};

export const S3Services: React.FC = () => {
  const frame = useCurrentFrame();
  const rx = interpolate(frame, [0, 135], [26, 6], clamp);
  const ry = interpolate(frame, [0, 135], [-14, 8], clamp);
  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, ${C.forest}, ${C.deep})` }}>
      <AbsoluteFill style={{ padding: "120px 160px", display: "block" }}>
        <Label>Услуги</Label>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 92, letterSpacing: "-0.035em", color: C.stone, marginTop: 24, opacity: ease(frame, 4, 20) }}>
          Всичко за <span style={{ color: C.sage, fontStyle: "italic", fontWeight: 300 }}>възстановяването</span>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ perspective: 1800, justifyContent: "center", alignItems: "center", paddingTop: 220 }}>
        <div style={{ display: "flex", gap: 28, transform: `rotateX(${rx}deg) rotateY(${ry}deg)`, transformStyle: "preserve-3d" }}>
          {SERVICES.map((_, i) => (
            <Card key={i} i={i} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

import { evolvePath } from "@remotion/paths";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, display, text } from "./theme";
import { Label, clamp, ease } from "./ui";

// The four service boxes on the nolina-med.eu homepage, with the first line of each description.
const SERVICES = [
  { t: "Лечебен масаж", s: "Открийте облекчение от болката и напрежението.", d: "M10 40 C 25 20, 40 60, 55 40 S 85 20, 90 40 M10 58 C 25 38, 40 78, 55 58 S 85 38, 90 58" },
  { t: "Релаксиращ масаж", s: "Потопете се в спокойствие и забравете за стреса.", d: "M50 14 C 30 40, 30 60, 50 86 C 70 60, 70 40, 50 14 M50 30 L 50 86 M20 60 C 30 70, 40 76, 50 86 M80 60 C 70 70, 60 76, 50 86" },
  { t: "Кинезитерапия", s: "Подарете си движение и лекота с индивидуален подход.", d: "M50 12 A 36 36 0 1 1 18 32 M18 32 L 14 16 M18 32 L 33 28" },
  { t: "Лимфодренаж", s: "Почувствайте лекота и свежест с апаратен лимфодренаж.", d: "M50 10 C 50 10, 22 44, 22 62 A 28 28 0 0 0 78 62 C 78 44, 50 10, 50 10 Z" },
];

const Card: React.FC<{ i: number }> = ({ i }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 6 - i * 5, fps, config: { damping: 15, stiffness: 140 } });
  const draw = ease(frame, 16 + i * 5, 28);
  const { t, s: sub, d } = SERVICES[i];
  const path = evolvePath(draw, d);
  const hi = frame > 52 && i === Math.min(3, Math.floor(interpolate(frame, [52, 116], [0, 4], clamp)));
  return (
    <div
      style={{
        width: 370,
        height: 440,
        borderRadius: 28,
        padding: 36,
        boxSizing: "border-box",
        background: hi ? C.lime : "rgba(248,248,248,0.05)",
        border: `1.5px solid ${hi ? C.lime : "rgba(170,190,48,0.3)"}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transform: `translateY(${(1 - s) * 260 + (hi ? -24 : 0)}px) rotateY(${(1 - s) * -80}deg)`,
        opacity: s,
        boxShadow: hi ? `0 40px 80px rgba(0,0,0,0.45), 0 0 0 8px rgba(170,190,48,0.2)` : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: text, fontSize: 20, fontWeight: 600, color: hi ? C.ink : C.lime, letterSpacing: "0.2em" }}>
        <span>0{i + 1}</span>
        <span style={{ color: C.orange }}>●</span>
      </div>
      <svg viewBox="0 0 100 100" width={110} height={110}>
        <path d={d} fill="none" stroke={hi ? C.ink : C.lime} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={path.strokeDasharray} strokeDashoffset={path.strokeDashoffset} />
      </svg>
      <div>
        <div style={{ fontFamily: display, fontWeight: 700, fontSize: 40, lineHeight: 1.05, letterSpacing: "-0.02em", color: hi ? C.ink : C.paper }}>{t}</div>
        <div style={{ fontFamily: text, fontSize: 21, lineHeight: 1.35, marginTop: 12, color: hi ? C.slate : "rgba(248,248,248,0.6)" }}>{sub}</div>
      </div>
    </div>
  );
};

export const S3Services: React.FC = () => {
  const frame = useCurrentFrame();
  const rx = interpolate(frame, [0, 120], [26, 6], clamp);
  const ry = interpolate(frame, [0, 120], [-14, 8], clamp);
  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, ${C.slate}, ${C.night})` }}>
      <AbsoluteFill style={{ padding: "120px 160px", display: "block" }}>
        <Label>Услуги</Label>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 92, letterSpacing: "-0.03em", color: C.paper, marginTop: 24, opacity: ease(frame, 4, 20) }}>
          Масаж, <span style={{ color: C.lime, fontStyle: "italic", fontWeight: 300 }}>кинезитерапия,</span> рехабилитация
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ perspective: 1800, justifyContent: "center", alignItems: "center", paddingTop: 240 }}>
        <div style={{ display: "flex", gap: 30, transform: `rotateX(${rx}deg) rotateY(${ry}deg)`, transformStyle: "preserve-3d" }}>
          {SERVICES.map((_, i) => (
            <Card key={i} i={i} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

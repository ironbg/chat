import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, display, text } from "./theme";
import { Label, Reveal, clamp, ease } from "./ui";

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const SLOTS = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

const Phone: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const day = frame > 38 ? 3 : -1;
  const slot = frame > 62 ? 4 : -1;
  const press = spring({ frame: frame - 86, fps, config: { damping: 9 } });
  const done = spring({ frame: frame - 96, fps, config: { damping: 13 } });
  const tap = (at: number) => {
    const t = interpolate(frame, [at, at + 14], [0, 1], clamp);
    return { scale: 0.4 + t * 1.6, opacity: t > 0 && t < 1 ? 1 - t : 0 };
  };
  return (
    <div style={{ width: 460, height: 940, borderRadius: 70, background: "#050b0a", padding: 16, boxShadow: "0 80px 140px rgba(0,0,0,0.55), inset 0 0 0 2px #2a3a36" }}>
      <div style={{ width: "100%", height: "100%", borderRadius: 56, background: C.stone, overflow: "hidden", position: "relative", fontFamily: text }}>
        <div style={{ position: "absolute", top: 16, left: "50%", marginLeft: -60, width: 120, height: 34, borderRadius: 17, background: "#050b0a" }} />
        <div style={{ padding: "80px 32px 0" }}>
          <div style={{ fontSize: 18, letterSpacing: "0.25em", color: C.moss, fontWeight: 700 }}>NOLINA</div>
          <div style={{ fontFamily: display, fontSize: 46, fontWeight: 800, letterSpacing: "-0.03em", color: C.ink, marginTop: 6 }}>Запазете час</div>
          <div style={{ marginTop: 22, padding: "18px 20px", borderRadius: 18, background: "#fff", display: "flex", justifyContent: "space-between", fontSize: 21, fontWeight: 600, color: C.ink }}>
            <span>Цялостен масаж</span>
            <span style={{ color: C.teal }}>60 мин · 35 €</span>
          </div>
          <div style={{ marginTop: 26, fontSize: 18, fontWeight: 700, color: C.moss, letterSpacing: "0.1em" }}>ДЕН</div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {DAYS.map((d, i) => (
              <div key={d} style={{ flex: 1, height: 84, borderRadius: 16, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: i === day ? C.forest : "#fff", color: i === day ? C.stone : C.ink, fontWeight: 700, fontSize: 18, gap: 4, transform: `scale(${i === day ? 1.06 : 1})` }}>
                <span style={{ opacity: 0.6, fontSize: 15 }}>{d}</span>
                <span style={{ fontSize: 26 }}>{12 + i}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 26, fontSize: 18, fontWeight: 700, color: C.moss, letterSpacing: "0.1em" }}>ЧАС</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 12 }}>
            {SLOTS.map((s, i) => {
              const a = ease(frame, 44 + i * 2, 14);
              return (
                <div key={s} style={{ height: 58, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 19, background: i === slot ? C.teal : "#fff", color: i === slot ? C.deep : C.ink, opacity: a, transform: `translateY(${(1 - a) * 20}px)` }}>
                  {s}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 34, height: 84, borderRadius: 42, background: C.forest, color: C.stone, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 700, transform: `scale(${1 - Math.sin(press * Math.PI) * 0.06})` }}>
            Запази час →
          </div>
        </div>
        {/* tap ripples */}
        {[
          { at: 34, x: 32 + 3 * 66 + 30, y: 400 },
          { at: 58, x: 32 + 30, y: 590 },
          { at: 82, x: 214, y: 740 },
        ].map((t, i) => {
          const r = tap(t.at);
          return <div key={i} style={{ position: "absolute", left: t.x - 40, top: t.y - 40, width: 80, height: 80, borderRadius: 40, background: C.teal, opacity: r.opacity * 0.5, transform: `scale(${r.scale})` }} />;
        })}
        {/* confirmation sheet */}
        <div style={{ position: "absolute", inset: 0, background: C.forest, transform: `translateY(${(1 - done) * 100}%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 26 }}>
          <div style={{ width: 150, height: 150, borderRadius: 75, background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${done})` }}>
            <svg width={80} height={80} viewBox="0 0 24 24">
              <path d="M4 12.5 L10 18 L20 6" fill="none" stroke={C.deep} strokeWidth={3} strokeLinecap="round" strokeDasharray={30} strokeDashoffset={30 * (1 - ease(frame, 104, 16))} />
            </svg>
          </div>
          <div style={{ fontFamily: display, fontSize: 44, fontWeight: 800, color: C.stone }}>Часът е запазен</div>
          <div style={{ fontSize: 24, color: C.sage }}>Чт · 14:00 · Цялостен масаж</div>
        </div>
      </div>
    </div>
  );
};

export const S6Booking: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inn = spring({ frame, fps, config: { damping: 18 } });
  const ry = interpolate(frame, [0, 150], [-34, -12], clamp) + (1 - inn) * -40;
  return (
    <AbsoluteFill style={{ background: `linear-gradient(120deg, ${C.deep}, ${C.forest})`, flexDirection: "row", alignItems: "center", padding: "0 180px", gap: 140 }}>
      <div style={{ flex: 1 }}>
        <Label>Онлайн записване</Label>
        {["Вашият час.", "Един клик."].map((l, i) => (
          <Reveal key={l} delay={6 + i * 7}>
            <div style={{ fontFamily: display, fontWeight: 900, fontSize: 140, letterSpacing: "-0.05em", lineHeight: 1.02, color: i ? C.sage : C.stone }}>{l}</div>
          </Reveal>
        ))}
        <div style={{ display: "flex", gap: 60, marginTop: 50, fontFamily: text, color: C.stone, opacity: ease(frame, 30, 20) }}>
          <div>
            <div style={{ fontSize: 20, letterSpacing: "0.2em", color: C.sage, fontWeight: 600 }}>ПОН – СЪБ</div>
            <div style={{ fontFamily: display, fontSize: 52, fontWeight: 800, marginTop: 6 }}>10:00 – 18:00</div>
          </div>
          <div>
            <div style={{ fontSize: 20, letterSpacing: "0.2em", color: C.sage, fontWeight: 600 }}>ТЕЛЕФОН</div>
            <div style={{ fontFamily: display, fontSize: 52, fontWeight: 800, marginTop: 6 }}>0883 30 55 56</div>
          </div>
        </div>
      </div>
      <div style={{ perspective: 2400 }}>
        <div style={{ transform: `rotateY(${ry}deg) rotateX(6deg) translateY(${(1 - inn) * 400}px)`, transformStyle: "preserve-3d" }}>
          <Phone />
        </div>
      </div>
    </AbsoluteFill>
  );
};

import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, display, text } from "./theme";
import { Label, Reveal, clamp, ease } from "./ui";

// Wording from the lymphatic-drainage entry on nolina-med.eu/цени.
const BENEFITS = ["Извежда излишните течности", "Подобрява кръвообращението", "По-стегната и здрава кожа", "При отоци, тежест и умора в краката"];
const CHAMBERS = 8;

const Boot: React.FC<{ offset: number }> = ({ offset }) => {
  const frame = useCurrentFrame();
  const intro = ease(frame, 4 + offset, 26);
  return (
    <div style={{ display: "flex", flexDirection: "column-reverse", gap: 10, alignItems: "center", transform: `translateY(${(1 - intro) * 500}px)` }}>
      {Array.from({ length: CHAMBERS }).map((_, k) => {
        // compression wave travels upward, bottom chamber first
        const phase = (frame - k * 4 - offset) / 26;
        const p = Math.max(0, Math.sin(phase * Math.PI));
        const w = 150 + (CHAMBERS - k) * 10;
        return (
          <div
            key={k}
            style={{
              width: w * (1 + p * 0.22),
              height: 62,
              borderRadius: 31,
              background: `linear-gradient(90deg, ${C.steel}, ${interpolate(p, [0, 1], [0, 1]) > 0.5 ? C.lime : C.steel})`,
              border: `2px solid rgba(170,190,48,${0.3 + p * 0.7})`,
              boxShadow: `0 0 ${p * 60}px rgba(170,190,48,${p * 0.8})`,
              opacity: interpolate(k, [0, CHAMBERS], [1, 0.75]),
            }}
          />
        );
      })}
    </div>
  );
};

export const S5Lymph: React.FC = () => {
  const frame = useCurrentFrame();
  const active = Math.min(BENEFITS.length - 1, Math.floor(interpolate(frame, [28, 110], [0, BENEFITS.length], clamp)));
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 30% 50%, ${C.steel}, ${C.night} 70%)`, flexDirection: "row", alignItems: "center", padding: "0 160px" }}>
      <div style={{ display: "flex", gap: 40, width: 620, justifyContent: "center" }}>
        <Boot offset={0} />
        <Boot offset={6} />
      </div>
      <div style={{ flex: 1, paddingLeft: 60 }}>
        <Label>Апаратен лимфодренаж</Label>
        <Reveal delay={4}>
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 118, letterSpacing: "-0.04em", color: C.paper, lineHeight: 1.05 }}>Лимфодренаж</div>
        </Reveal>
        <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 16 }}>
          {BENEFITS.map((b, i) => {
            const a = ease(frame, 22 + i * 12, 18);
            const on = i === active;
            return (
              <div key={b} style={{ display: "flex", alignItems: "center", gap: 22, opacity: a * (on ? 1 : 0.45), transform: `translateX(${(1 - a) * 60}px)` }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: on ? C.lime : "transparent", border: `2px solid ${C.lime}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width={22} height={22} viewBox="0 0 24 24">
                    <path d="M4 12.5 L10 18 L20 6" fill="none" stroke={on ? C.night : C.lime} strokeWidth={3} strokeLinecap="round" />
                  </svg>
                </div>
                <div style={{ fontFamily: text, fontSize: 36, fontWeight: on ? 600 : 400, color: C.paper }}>{b}</div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 44, display: "inline-flex", gap: 14, opacity: ease(frame, 60, 20) }}>
          {["15 мин.", "10,00 €"].map((c) => (
            <div key={c} style={{ fontFamily: text, fontSize: 26, fontWeight: 700, padding: "12px 26px", borderRadius: 30, background: C.orange, color: C.night }}>
              {c}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

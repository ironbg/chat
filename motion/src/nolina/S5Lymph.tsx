import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, display, text } from "./theme";
import { Label, Reveal, clamp, ease } from "./ui";

// Benefits as listed on the site's lymphatic-drainage page.
const BENEFITS = ["Премахва хроничната умора", "Детоксикация на организма", "Намалява отоците", "Подобрява имунната защита"];
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
              background: `linear-gradient(90deg, ${C.moss}, ${interpolate(p, [0, 1], [0, 1]) > 0.5 ? C.teal : C.moss})`,
              border: `2px solid rgba(163,201,168,${0.3 + p * 0.7})`,
              boxShadow: `0 0 ${p * 60}px rgba(70,179,166,${p * 0.8})`,
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
    <AbsoluteFill style={{ background: `radial-gradient(circle at 30% 50%, ${C.moss}, ${C.deep} 70%)`, flexDirection: "row", alignItems: "center", padding: "0 160px" }}>
      <div style={{ display: "flex", gap: 40, width: 620, justifyContent: "center" }}>
        <Boot offset={0} />
        <Boot offset={6} />
      </div>
      <div style={{ flex: 1, paddingLeft: 60 }}>
        <Label>Пресотерапия</Label>
        <Reveal delay={4}>
          <div style={{ fontFamily: display, fontWeight: 900, fontSize: 150, letterSpacing: "-0.05em", color: C.stone, lineHeight: 1.05 }}>Лимфодренаж</div>
        </Reveal>
        <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 16 }}>
          {BENEFITS.map((b, i) => {
            const a = ease(frame, 22 + i * 12, 18);
            const on = i === active;
            return (
              <div key={b} style={{ display: "flex", alignItems: "center", gap: 22, opacity: a * (on ? 1 : 0.45), transform: `translateX(${(1 - a) * 60}px)` }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: on ? C.teal : "transparent", border: `2px solid ${C.teal}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width={22} height={22} viewBox="0 0 24 24">
                    <path d="M4 12.5 L10 18 L20 6" fill="none" stroke={on ? C.deep : C.teal} strokeWidth={3} strokeLinecap="round" />
                  </svg>
                </div>
                <div style={{ fontFamily: text, fontSize: 38, fontWeight: on ? 700 : 400, color: C.stone }}>{b}</div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 44, display: "inline-flex", gap: 14, opacity: ease(frame, 60, 20) }}>
          {["15 мин", "10 €"].map((c) => (
            <div key={c} style={{ fontFamily: text, fontSize: 26, fontWeight: 700, padding: "12px 26px", borderRadius: 30, background: C.gold, color: C.deep }}>
              {c}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

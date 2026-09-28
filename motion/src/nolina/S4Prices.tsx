import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, display, text } from "./theme";
import { Label, clamp, ease } from "./ui";

// Price list from the site's "Цени и услуги" page.
const ROWS = [
  { n: "Частичен масаж", m: 15, p: 15 },
  { n: "Цялостен масаж", m: 60, p: 35 },
  { n: "Цялостен масаж + масаж на лице", m: 60, p: 40 },
  { n: "Кинезитерапия", m: 30, p: 20 },
  { n: "Лимфодренаж", m: 15, p: 10 },
];
const PICK = 1;

export const S4Prices: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const win = spring({ frame, fps, config: { damping: 16 } });
  const rowY = (i: number) => 210 + i * 104;
  // cursor path: enters from bottom right, settles on the full-massage row, clicks
  const cx = interpolate(frame, [40, 78], [980, 560], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 3) });
  const cy = interpolate(frame, [40, 78], [900, rowY(PICK) + 40], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 3) });
  const click = spring({ frame: frame - 84, fps, config: { damping: 10 } });
  const picked = frame > 84;
  return (
    <AbsoluteFill style={{ background: C.stone, flexDirection: "row", alignItems: "center", padding: "0 140px", gap: 90 }}>
      <div style={{ width: 560 }}>
        <Label color={C.moss}>Цени и услуги</Label>
        <div style={{ fontFamily: display, fontWeight: 900, fontSize: 200, lineHeight: 0.9, letterSpacing: "-0.06em", color: C.ink, marginTop: 30 }}>
          от {Math.round(interpolate(frame, [6, 40], [0, 10], clamp))}
          <span style={{ color: C.teal }}>€</span>
        </div>
        <div style={{ fontFamily: text, fontSize: 32, color: C.moss, marginTop: 24, lineHeight: 1.35, opacity: ease(frame, 20, 20) }}>
          Лечебни и релаксиращи масажи на достъпни цени.
        </div>
      </div>
      <div
        style={{
          flex: 1,
          height: 780,
          borderRadius: 30,
          background: "#fff",
          boxShadow: "0 60px 120px rgba(14,39,34,0.25)",
          position: "relative",
          overflow: "hidden",
          transform: `perspective(2000px) rotateY(${(1 - win) * -35 - 6}deg) translateX(${(1 - win) * 300}px)`,
          opacity: win,
        }}
      >
        <div style={{ height: 70, background: C.forest, display: "flex", alignItems: "center", padding: "0 28px", gap: 12 }}>
          {["#ff6159", "#ffbd2e", "#28c941"].map((c) => (
            <div key={c} style={{ width: 16, height: 16, borderRadius: 8, background: c }} />
          ))}
          <div style={{ marginLeft: 24, flex: 1, height: 36, borderRadius: 18, background: "rgba(255,255,255,0.1)", color: C.sage, fontFamily: text, fontSize: 18, display: "flex", alignItems: "center", paddingLeft: 20 }}>
            nolina-med.eu/цени
          </div>
        </div>
        <div style={{ padding: "36px 44px 0", fontFamily: display, fontSize: 44, fontWeight: 800, color: C.ink, letterSpacing: "-0.03em" }}>Цени и услуги</div>
        {ROWS.map((r, i) => {
          const a = ease(frame, 12 + i * 5, 22);
          const on = picked && i === PICK;
          return (
            <div
              key={r.n}
              style={{
                position: "absolute",
                left: 28,
                right: 28,
                top: rowY(i),
                height: 86,
                borderRadius: 18,
                padding: "0 26px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                background: on ? C.forest : i % 2 ? "#f7f4ee" : "#fff",
                transform: `translateX(${(1 - a) * 120}px) scale(${on ? 1 + click * 0.03 : 1})`,
                opacity: a,
                fontFamily: text,
              }}
            >
              <div style={{ flex: 1, fontSize: 28, fontWeight: 600, color: on ? C.stone : C.ink }}>{r.n}</div>
              <div style={{ fontSize: 20, fontWeight: 600, padding: "8px 16px", borderRadius: 20, background: on ? C.moss : "#ece6da", color: on ? C.sage : C.moss }}>
                {r.m} мин
              </div>
              <div style={{ width: 110, textAlign: "right", fontFamily: display, fontSize: 38, fontWeight: 800, color: on ? C.gold : C.teal, fontVariantNumeric: "tabular-nums" }}>
                {Math.round(r.p * a)} €
              </div>
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 44, bottom: 40, fontFamily: text, fontSize: 20, color: C.moss, opacity: ease(frame, 40, 20) }}>
          Пон – Съб · 10:00 – 18:00 · С предварително записване
        </div>
        {/* cursor */}
        <svg width={44} height={44} viewBox="0 0 24 24" style={{ position: "absolute", left: cx, top: cy, transform: `scale(${1 - click * 0.15 + (picked ? 0.15 : 0)})` }}>
          <path d="M3 2 L20 12 L12 13.5 L8 21 Z" fill={C.ink} stroke="#fff" strokeWidth={1.5} />
        </svg>
        {picked && (
          <div style={{ position: "absolute", left: cx - 30 * click, top: cy - 30 * click, width: 60 * click, height: 60 * click, borderRadius: "50%", border: `3px solid ${C.teal}`, opacity: 1 - click }} />
        )}
      </div>
    </AbsoluteFill>
  );
};

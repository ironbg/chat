import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, display, text } from "./theme";
import { Label, Reveal, clamp, ease } from "./ui";

// The site books by phone, Viber or WhatsApp; this is the prefilled message from its WhatsApp link.
const MESSAGE = "Здравейте, искам да запазя час за масаж.";
const CHANNELS = ["Телефон", "Viber", "WhatsApp"];

const Phone: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const typed = Math.floor(interpolate(frame, [18, 56], [0, MESSAGE.length], clamp));
  const sent = spring({ frame: frame - 62, fps, config: { damping: 14 } });
  const read = frame > 80;
  const hours = spring({ frame: frame - 86, fps, config: { damping: 14 } });
  const send = spring({ frame: frame - 58, fps, config: { damping: 8 } });
  return (
    <div style={{ width: 460, height: 940, borderRadius: 70, background: "#0b0e13", padding: 16, boxShadow: "0 80px 140px rgba(0,0,0,0.55), inset 0 0 0 2px #3d4556" }}>
      <div style={{ width: "100%", height: "100%", borderRadius: 56, background: "#eef0e6", overflow: "hidden", position: "relative", fontFamily: text }}>
        <div style={{ background: C.slate, padding: "70px 26px 22px", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: 32, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("nolina/figure.png")} style={{ width: 50 }} />
          </div>
          <div>
            <div style={{ color: C.paper, fontSize: 26, fontWeight: 600 }}>Нолина</div>
            <div style={{ color: C.lime, fontSize: 17 }}>+359 883 30 55 56</div>
          </div>
        </div>
        <div style={{ position: "absolute", top: 16, left: "50%", marginLeft: -60, width: 120, height: 34, borderRadius: 17, background: "#0b0e13" }} />
        {/* sent bubble */}
        <div
          style={{
            position: "absolute",
            right: 22,
            top: 200,
            maxWidth: 330,
            padding: "18px 22px 14px",
            borderRadius: "24px 24px 6px 24px",
            background: C.limeSoft,
            color: C.ink,
            fontSize: 24,
            lineHeight: 1.35,
            transform: `translateY(${(1 - sent) * 560}px) scale(${0.6 + sent * 0.4})`,
            transformOrigin: "right bottom",
            opacity: sent,
          }}
        >
          {MESSAGE}
          <div style={{ textAlign: "right", fontSize: 16, marginTop: 6, color: read ? C.limeDark : C.grey, fontWeight: 700 }}>10:05 ✓✓</div>
        </div>
        {/* info card */}
        <div
          style={{
            position: "absolute",
            left: 22,
            right: 22,
            top: 380,
            padding: 24,
            borderRadius: 24,
            background: "#fff",
            boxShadow: "0 20px 40px rgba(35,43,56,0.12)",
            opacity: hours,
            transform: `translateY(${(1 - hours) * 40}px)`,
          }}
        >
          <div style={{ fontSize: 16, letterSpacing: "0.16em", fontWeight: 700, color: C.limeDark }}>РАБОТНО ВРЕМЕ</div>
          <div style={{ fontSize: 26, fontWeight: 600, color: C.ink, marginTop: 8 }}>Понеделник – Събота</div>
          <div style={{ fontFamily: display, fontSize: 48, fontWeight: 800, color: C.ink }}>10:00 – 18:00</div>
          <div style={{ fontSize: 19, color: C.grey, marginTop: 8 }}>гр. Хисаря, ул. „Деветте деца на Еани“ 2</div>
        </div>
        {/* input bar */}
        <div style={{ position: "absolute", left: 18, right: 18, bottom: 30, display: "flex", gap: 12, alignItems: "flex-end" }}>
          <div style={{ flex: 1, minHeight: 64, borderRadius: 32, background: "#fff", padding: "16px 22px", fontSize: 22, lineHeight: 1.35, color: C.ink, boxSizing: "border-box" }}>
            {frame < 62 ? (
              <>
                {MESSAGE.slice(0, typed)}
                <span style={{ opacity: Math.floor(frame / 8) % 2 ? 1 : 0, color: C.limeDark }}>|</span>
              </>
            ) : (
              <span style={{ color: C.grey }}>Съобщение</span>
            )}
          </div>
          <div style={{ width: 64, height: 64, borderRadius: 32, background: C.lime, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${1 - Math.sin(Math.min(1, send) * Math.PI) * 0.2})` }}>
            <svg width={30} height={30} viewBox="0 0 24 24">
              <path d="M3 11 L21 3 L14 21 L11 13 Z" fill={C.ink} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const VoucherBadge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 40, fps, config: { damping: 10 } });
  const label = "ПОДАРЪЧЕН ВАУЧЕР • ПОДАРИ ЗДРАВЕ • ";
  return (
    <div style={{ position: "absolute", right: 660, top: 130, width: 220, height: 220, transform: `scale(${s}) rotate(${frame * 0.8}deg)` }}>
      <svg viewBox="0 0 220 220" width={220} height={220}>
        <defs>
          <path id="badge" d="M110 110 m -84 0 a 84 84 0 1 1 168 0 a 84 84 0 1 1 -168 0" />
        </defs>
        <circle cx={110} cy={110} r={108} fill={C.orange} />
        <text fontFamily={text} fontSize={17} fontWeight={700} letterSpacing={2.6} fill="#fff">
          <textPath href="#badge">{label}</textPath>
        </text>
        <text x={110} y={126} textAnchor="middle" fontFamily={display} fontSize={48} fontWeight={800} fill="#fff" transform={`rotate(${-frame * 0.8} 110 110)`}>
          🎁
        </text>
      </svg>
    </div>
  );
};

export const S6Booking: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inn = spring({ frame, fps, config: { damping: 18 } });
  const ry = interpolate(frame, [0, 120], [-30, -10], clamp) + (1 - inn) * -40;
  return (
    <AbsoluteFill style={{ background: `linear-gradient(120deg, ${C.night}, ${C.slate})`, flexDirection: "row", alignItems: "center", padding: "0 180px", gap: 140 }}>
      <div style={{ flex: 1 }}>
        <Label>Запази час с:</Label>
        {["Запази", "час сега."].map((l, i) => (
          <Reveal key={l} delay={4 + i * 6}>
            <div style={{ fontFamily: display, fontWeight: 800, fontSize: 150, letterSpacing: "-0.04em", lineHeight: 1.02, color: i ? C.lime : C.paper }}>{l}</div>
          </Reveal>
        ))}
        <div style={{ display: "flex", gap: 16, marginTop: 44 }}>
          {CHANNELS.map((c, i) => {
            const a = ease(frame, 18 + i * 6, 16);
            return (
              <div key={c} style={{ fontFamily: text, fontSize: 28, fontWeight: 600, padding: "14px 30px", borderRadius: 40, border: `2px solid ${C.lime}`, color: C.paper, opacity: a, transform: `translateY(${(1 - a) * 30}px)` }}>
                {c}
              </div>
            );
          })}
        </div>
        <div style={{ fontFamily: display, fontSize: 64, fontWeight: 700, color: C.paper, marginTop: 40, opacity: ease(frame, 34, 20) }}>+359 883 30 55 56</div>
      </div>
      <VoucherBadge />
      <div style={{ perspective: 2400 }}>
        <div style={{ transform: `rotateY(${ry}deg) rotateX(6deg) translateY(${(1 - inn) * 400}px)`, transformStyle: "preserve-3d" }}>
          <Phone />
        </div>
      </div>
    </AbsoluteFill>
  );
};

import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, display } from "./theme";
import { Label, clamp } from "./ui";

// Photos from nolina-med.eu, floated in 3D space while the camera dollies through them.
const PHOTOS = [
  { src: "studio.jpg", w: 720, h: 480, x: -560, y: -170, z: -200, ry: 18 },
  { src: "massage.jpg", w: 640, h: 427, x: 560, y: 190, z: -500, ry: -16 },
  { src: "hands.jpg", w: 324, h: 414, x: 640, y: -250, z: 100, ry: -22 },
  { src: "relax.jpg", w: 320, h: 437, x: -660, y: 270, z: 250, ry: 20 },
];
// Nouns lifted from the service descriptions on the homepage.
const WORDS = ["Облекчение.", "Спокойствие.", "Движение.", "Лекота."];

export const SPhotos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dolly = interpolate(frame, [0, 105], [-700, 250], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 2) });
  const idx = Math.min(WORDS.length - 1, Math.floor(frame / 24));
  const w = spring({ frame: frame - idx * 24, fps, config: { damping: 13, stiffness: 200 } });
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 50%, ${C.steel}, ${C.night} 70%)`, perspective: 1400, overflow: "hidden" }}>
      <AbsoluteFill style={{ transformStyle: "preserve-3d", transform: `translateZ(${dolly}px) rotateY(${interpolate(frame, [0, 105], [-6, 6])}deg)` }}>
        {PHOTOS.map((p, i) => {
          const a = spring({ frame: frame - i * 5, fps, config: { damping: 20 } });
          return (
            <div
              key={p.src}
              style={{
                position: "absolute",
                left: 960 - p.w / 2,
                top: 540 - p.h / 2,
                width: p.w,
                height: p.h,
                borderRadius: 24,
                overflow: "hidden",
                transform: `translate3d(${p.x}px, ${p.y + (1 - a) * 200}px, ${p.z}px) rotateY(${p.ry}deg)`,
                opacity: a,
                boxShadow: "0 50px 100px rgba(0,0,0,0.5)",
                outline: `2px solid rgba(170,190,48,0.35)`,
              }}
            >
              <Img
                src={staticFile(`nolina/${p.src}`)}
                style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${1.15 - frame * 0.0012})` }}
              />
            </div>
          );
        })}
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 20 }}>
        <Label>Лечебно-възстановителен център</Label>
        <div
          style={{
            fontFamily: display,
            fontWeight: 800,
            fontSize: 190,
            letterSpacing: "-0.04em",
            color: idx % 2 ? C.lime : C.paper,
            transform: `scale(${interpolate(w, [0, 1], [1.4, 1])})`,
            opacity: w,
            filter: `blur(${(1 - w) * 10}px)`,
            textShadow: "0 20px 60px rgba(0,0,0,0.6)",
          }}
        >
          {WORDS[idx]}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

import { ThreeCanvas } from "@remotion/three";
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, display } from "./theme";
import { Label, Reveal, clamp } from "./ui";

// Hot-stone stack: flattened spheres dropping onto a pool of mineral water.
const STONES = [
  { r: 1.35, c: "#1f2422" },
  { r: 1.1, c: "#2d3330" },
  { r: 0.9, c: "#3b3f3a" },
  { r: 0.72, c: C.limeSoft },
  { r: 0.52, c: "#232826" },
];
const H = 0.36;
const ys: number[] = [];
STONES.reduce((y, s, i) => {
  const cy = i === 0 ? s.r * H : y + s.r * H * 0.92;
  ys.push(cy);
  return cy + s.r * H * 0.92;
}, 0);

const Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const land = 10;
  const ripple = Math.max(0, frame - land);
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 9, 6]} intensity={3} color="#fff1dc" />
      <pointLight position={[-5, 2, 3]} intensity={60} color={C.lime} />
      <pointLight position={[4, 1, -4]} intensity={40} color={C.orange} />
      <group position={[2.6, -1.6, 0]} rotation={[0.12, frame * 0.012 - 0.4, 0]}>
        {STONES.map((s, i) => {
          const d = spring({ frame: frame - i * 9, fps, config: { damping: 13, mass: 0.9 } });
          const y = ys[i] + (1 - d) * 7;
          return (
            <mesh
              key={i}
              position={[Math.sin(i * 2.1) * 0.08, y, Math.cos(i * 1.7) * 0.08]}
              rotation={[Math.sin(i) * 0.08, i * 0.9 + (1 - d) * 2, Math.cos(i * 3) * 0.06]}
              scale={[s.r, s.r * H, s.r * 0.88]}
            >
              <sphereGeometry args={[1, 96, 64]} />
              <meshStandardMaterial color={s.c} roughness={i === 3 ? 0.5 : 0.28} metalness={0.15} />
            </mesh>
          );
        })}
        {/* water surface */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
          <circleGeometry args={[6, 96]} />
          <meshStandardMaterial color={C.slate} roughness={0.12} metalness={0.6} />
        </mesh>
        {[0, 1, 2].map((k) => {
          const t = ((ripple - k * 14) % 60) / 60;
          if (ripple - k * 14 < 0) return null;
          return (
            <mesh key={k} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
              <ringGeometry args={[1.4 + t * 4, 1.44 + t * 4, 128]} />
              <meshBasicMaterial color={C.lime} transparent opacity={(1 - t) * 0.7} />
            </mesh>
          );
        })}
        {/* floating mineral particles */}
        {Array.from({ length: 36 }).map((_, i) => {
          const a = random(`a${i}`) * Math.PI * 2 + frame * 0.01;
          const rad = 2 + random(`r${i}`) * 2.6;
          return (
            <mesh
              key={`p${i}`}
              position={[Math.cos(a) * rad, 0.3 + random(`y${i}`) * 3.5 + Math.sin(frame * 0.05 + i) * 0.15, Math.sin(a) * rad]}
            >
              <sphereGeometry args={[0.03 + random(`s${i}`) * 0.04, 12, 12]} />
              <meshBasicMaterial color={i % 3 ? C.lime : C.orange} />
            </mesh>
          );
        })}
      </group>
    </>
  );
};

export const S2Stones: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const zoom = interpolate(frame, [0, 135], [1.08, 1], clamp);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 70% 55%, ${C.steel} 0%, ${C.night} 70%)` }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <ThreeCanvas width={width} height={height} camera={{ fov: 34, position: [0, 2.2, 10] }}>
          <Scene />
        </ThreeCanvas>
      </AbsoluteFill>
      <AbsoluteFill style={{ padding: "0 160px", justifyContent: "center" }}>
        <Label delay={6}>Твоят спокоен оазис за всеки ден!</Label>
        <div style={{ height: 36 }} />
        {/* Hero line from the homepage */}
        {["Вземи", "здравето си", "в свои ръце!"].map((l, i) => (
          <Reveal key={l} delay={12 + i * 6}>
            <div
              style={{
                fontFamily: display,
                fontWeight: i === 1 ? 300 : 800,
                fontStyle: i === 1 ? "italic" : "normal",
                fontSize: 128,
                lineHeight: 1.02,
                letterSpacing: "-0.035em",
                color: i === 2 ? C.lime : C.paper,
              }}
            >
              {l}
            </div>
          </Reveal>
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

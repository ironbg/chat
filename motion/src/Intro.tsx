import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";
import { Circle, Star } from "@remotion/shapes";
import { noise2D } from "@remotion/noise";
// System font (apt: fonts-inter). The render browser has no proxy, so remote Google Fonts fail.
const fontFamily = "Inter, sans-serif";

const Particles: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill>
      {Array.from({ length: 60 }).map((_, i) => {
        const x = (noise2D("x", i, frame / 120) * 0.5 + 0.5) * width;
        const y = (noise2D("y", i, frame / 120) * 0.5 + 0.5) * height;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, opacity: 0.35 }}>
            <Circle radius={4 + (i % 5) * 3} fill={i % 2 ? "#7c5cff" : "#00d4ff"} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const Title: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 12 } });
  const sub = interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: "#0b0b1a", justifyContent: "center", alignItems: "center", fontFamily }}>
      <Particles />
      <div style={{ transform: `scale(${pop})`, color: "white", fontSize: 150, fontWeight: 800 }}>{title}</div>
      <div style={{ opacity: sub, transform: `translateY(${(1 - sub) * 30}px)`, color: "#9aa0c0", fontSize: 56 }}>
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};

const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 8 } });
  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg,#7c5cff,#00d4ff)", justifyContent: "center", alignItems: "center" }}>
      <div style={{ transform: `rotate(${frame * 2}deg) scale(${s})` }}>
        <Star points={5} innerRadius={90} outerRadius={220} fill="white" />
      </div>
    </AbsoluteFill>
  );
};

export const Intro: React.FC<{ title: string; subtitle: string }> = (props) => (
  <TransitionSeries>
    <TransitionSeries.Sequence durationInFrames={95}>
      <Title {...props} />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={wipe()} timing={linearTiming({ durationInFrames: 20 })} />
    <TransitionSeries.Sequence durationInFrames={75}>
      <Outro />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);

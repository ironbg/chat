import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";
import { slide } from "@remotion/transitions/slide";
import { flip } from "@remotion/transitions/flip";
import { fade } from "@remotion/transitions/fade";
import { S1Kinetic } from "./S1Kinetic";
import { S2Stones } from "./S2Stones";
import { S3Services } from "./S3Services";
import { S4Prices } from "./S4Prices";
import { S5Lymph } from "./S5Lymph";
import { S6Booking } from "./S6Booking";
import { S7Logo } from "./S7Logo";
import { Grain, Hud, Vignette } from "./ui";

const T = 10;
const t = () => springTiming({ durationInFrames: T, config: { damping: 200 } });

// 30s @ 30fps: scene lengths sum to 960, minus 6 transitions × 10 frames = 900.
export const Nolina: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={90}>
        <S1Kinetic />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({ direction: "from-bottom-left" })} timing={t()} />
      <TransitionSeries.Sequence durationInFrames={150}>
        <S2Stones />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={t()} />
      <TransitionSeries.Sequence durationInFrames={135}>
        <S3Services />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={flip({ direction: "from-right" })} timing={t()} />
      <TransitionSeries.Sequence durationInFrames={150}>
        <S4Prices />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({ direction: "from-right" })} timing={t()} />
      <TransitionSeries.Sequence durationInFrames={120}>
        <S5Lymph />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={t()} />
      <TransitionSeries.Sequence durationInFrames={150}>
        <S6Booking />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t()} />
      <TransitionSeries.Sequence durationInFrames={165}>
        <S7Logo />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    <Vignette />
    <Grain />
    <Hud />
  </AbsoluteFill>
);

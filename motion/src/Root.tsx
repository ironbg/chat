import { Composition } from "remotion";
import { Intro } from "./Intro";
import { Nolina } from "./nolina/Nolina";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Intro"
      component={Intro}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ title: "Motion Graphics", subtitle: "Rendered with Remotion" }}
    />
    <Composition id="Nolina" component={Nolina} durationInFrames={900} fps={30} width={1920} height={1080} />
  </>
);

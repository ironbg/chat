# Motion graphics

Videos are written as React components with [Remotion](https://www.remotion.dev) and rendered to MP4 with ffmpeg.

```bash
cd motion
npx remotion render Intro out/intro.mp4        # render the video
npx remotion still Intro out/frame.png --frame=60   # grab one frame
npx remotion studio                            # live preview editor (local machine)
```

Compositions are registered in `src/Root.tsx`; `src/Intro.tsx` is the demo.

## What's installed

| Package | Use |
| --- | --- |
| `remotion`, `@remotion/cli` | Core: `useCurrentFrame`, `interpolate`, `spring`, `Sequence`, rendering |
| `@remotion/transitions` | Scene transitions (fade, wipe, slide, flip, clock-wipe) |
| `@remotion/shapes`, `@remotion/paths` | SVG shapes, path morphing and line drawing |
| `@remotion/noise` | Perlin noise for organic motion |
| `@remotion/motion-blur` | Trails and camera motion blur |
| `@remotion/three`, `three`, `@react-three/fiber` | 3D scenes |
| `@remotion/lottie`, `lottie-web` | After Effects / Lottie animations |
| ffmpeg (system) | Encoding, audio muxing, format conversion |

## Notes for cloud sessions

- `.claude/hooks/setup-motion.sh` reinstalls ffmpeg, fonts and npm deps at session start.
- Remotion can't download its own browser here, so `remotion.config.ts` points it at the pre-installed Playwright headless shell.
- The render browser has no network proxy: use local fonts/assets (put files in `public/` and use `staticFile()`) instead of Google Fonts or remote URLs.

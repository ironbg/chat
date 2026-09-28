import { readdirSync } from "node:fs";
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setChromiumOpenGlRenderer("angle");

// Remotion can't download its own headless browser here; use the pre-installed one.
const pw = "/opt/pw-browsers";
try {
  const dir = readdirSync(pw).find((d) => d.startsWith("chromium_headless_shell-"));
  if (dir) Config.setBrowserExecutable(`${pw}/${dir}/chrome-linux/headless_shell`);
} catch {}

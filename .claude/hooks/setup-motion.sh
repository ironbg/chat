#!/bin/bash
# Installs the motion-graphics toolchain (ffmpeg, fonts, Remotion deps) in remote sessions.
set -euo pipefail
[ "${CLAUDE_CODE_REMOTE:-}" = "true" ] || exit 0

if ! command -v ffmpeg >/dev/null 2>&1 || ! fc-list | grep -q "Inter"; then
  (apt-get update -qq || true) >/dev/null 2>&1
  DEBIAN_FRONTEND=noninteractive apt-get install -y -qq ffmpeg fonts-inter fonts-noto-color-emoji >/dev/null
fi

cd "$CLAUDE_PROJECT_DIR/motion"
npm install --no-audit --no-fund --silent

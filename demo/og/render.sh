#!/usr/bin/env bash
#
# Renders the OG and README images from the HTML beside this script.
#
#   bun run og        (from demo/)
#
# Headless Chrome screenshots each file at its exact pixel size, then cwebp
# converts. Nothing here is committed except the .webp output — edit the HTML
# and re-run rather than touching the images.
#
# Needs: Google Chrome, and cwebp (brew install webp).

set -euo pipefail

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT="$DIR/../public/images"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

if [ ! -x "$CHROME" ]; then
  echo "Chrome not found at $CHROME" >&2
  exit 1
fi
if ! command -v cwebp > /dev/null; then
  echo "cwebp not found — brew install webp" >&2
  exit 1
fi

mkdir -p "$OUT"

shoot() {
  local name="$1" w="$2" h="$3"
  shift 3
  "$CHROME" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    "$@" \
    --screenshot="$TMP/$name.png" \
    --window-size="$w,$h" \
    "file://$DIR/$name.html" > /dev/null 2>&1
}

# Both encode lossless. That is not the obvious call for photos, but these are
# flat fills and smooth gradients, which is exactly where lossy WebP does badly
# — it spends bits chasing gradients and bands them anyway. Measured against the
# source PNGs: the hero at -q 92 -alpha_q 100 came out 63088 B (larger than the
# PNG it came from) at ssim 0.873, and lossless gives 37454 B at ssim 0.969.
# Smaller and better. The OG grows ~1.1 kB versus lossy, which is nothing at
# this size and buys guaranteed-clean gradients.

# Open Graph — 1200x630, opaque. Kept a solid ground because link unfurlers
# composite onto their own backgrounds and alpha is a coin flip there.
shoot og 1200 630
cwebp -quiet -lossless -m 6 "$TMP/og.png" -o "$OUT/og.webp"

# README hero — 1200x420, alpha preserved so it sits on either GitHub theme.
shoot hero 1200 420 --default-background-color=00000000
cwebp -quiet -lossless -m 6 "$TMP/hero.png" -o "$OUT/hero.webp"

echo "wrote:"
for f in og hero; do
  printf '  public/images/%s.webp  %s\n' "$f" "$(du -h "$OUT/$f.webp" | cut -f1 | tr -d ' ')"
done

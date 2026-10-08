// Builds the site's Neramit logo from the client's final artwork,
// "Brand/Polished Golden NERAMIT Emblem.png" (supplied 2026-10-08: 1448x1086, transparent,
// gold mark + NERAMIT wordmark with its own starburst of rays and sparkles).
// The client asked that their logo is never redrawn or restyled, so the artwork is used as
// supplied, keeping its 4:3 shape. Only the top and bottom edges are touched: a few rays reach
// them, so the light fades out over a short band there instead of ending at a hard line. The
// result is resized for high-DPI screens and saved as a palette PNG to keep the header light.
import sharp from 'sharp';

const SRC = 'Brand/Polished Golden NERAMIT Emblem.png';
const OUT = 'public/brand/neramit-logo.png';
const OUT_WIDTH = 640;
const FADE = 0.06; // share of the height that fades out at the top and bottom edges

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const band = H * FADE;
for (let y = 0; y < H; y += 1) {
  const edge = Math.min(y, H - 1 - y);
  if (edge >= band) continue;
  const t = edge / band;
  const f = t * t * (3 - 2 * t);
  for (let x = 0; x < W; x += 1) {
    const i = (y * W + x) * 4 + 3;
    data[i] = Math.round(data[i] * f);
  }
}

const out = await sharp(data, { raw: { width: W, height: H, channels: 4 } })
  .resize({ width: OUT_WIDTH, kernel: 'lanczos3' })
  // Palette PNG with light dithering keeps the file small without banding in the light.
  .png({ compressionLevel: 9, palette: true, quality: 95, dither: 0.6 })
  .toFile(OUT);
console.log(`Built ${OUT} (${out.width}x${out.height}, ${Math.round(out.size / 1024)}KB) from ${SRC}`);

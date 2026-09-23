// Builds the homepage Home Elevator card from the client-supplied Product/homelift.jpg.
//
// The supplied artwork carries an older Neramit mark (a white disc with a "เนรมิตร ลิฟต์" arc
// above it) in the top-right corner. The client asked for that mark to be removed and replaced
// with the Neramit logo held in this repo. This script does both in one pass:
//
//  1. Paints out the old mark by rebuilding that rectangle from the wall behind it. The wall is
//     a smooth gradient, so each row is interpolated between a clean pixel to the left of the
//     patch and a clean pixel to its right; the patch is then feathered on the left, right and
//     bottom edges so it blends into the untouched photo.
//  2. Composites public/brand/neramit-logo-light.png (the knocked-out mark whose "NERA" is
//     ivory, so it reads on a dark surface) where the old disc was.
//
// Geometry below was measured from the 1254x1254 original by scanning for bright pixels:
// the mark spans x 1044..1210, y 23..196, and rows 197..212 are clean wall.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'Product/homelift.jpg';
const OUT = 'public/products/homelift-card.webp';
const LOGO = 'public/brand/neramit-logo-light.png';

// Patch rectangle (inclusive left/top, exclusive right/bottom) and its feather width.
const PATCH = { left: 1024, top: 0, right: 1236, bottom: 210 };
const FEATHER = 12;
// Columns sampled for the per-row gradient. Both must sit on clean wall.
const SAMPLE_LEFT = 1018;
const SAMPLE_RIGHT = 1242;
// Where the replacement logo goes: centred on the space the old mark occupied.
const LOGO_SIZE = 166;
const LOGO_CENTER = { x: 1129, y: 112 };

const w = PATCH.right - PATCH.left;
const h = PATCH.bottom - PATCH.top;

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const at = (x, y) => (y * info.width + x) * info.channels;

const patch = Buffer.alloc(w * h * 4);
for (let y = 0; y < h; y++) {
  const sy = PATCH.top + y;
  const l = at(SAMPLE_LEFT, sy);
  const r = at(SAMPLE_RIGHT, sy);
  // Distance from each feathered edge, in pixels, clamped to the feather width.
  const dBottom = Math.min(FEATHER, PATCH.bottom - 1 - sy);
  for (let x = 0; x < w; x++) {
    const t = (PATCH.left + x - SAMPLE_LEFT) / (SAMPLE_RIGHT - SAMPLE_LEFT);
    const d = Math.min(FEATHER, x, w - 1 - x, dBottom);
    const o = (y * w + x) * 4;
    for (let c = 0; c < 3; c++) patch[o + c] = Math.round(data[l + c] * (1 - t) + data[r + c] * t);
    patch[o + 3] = Math.round(255 * (d / FEATHER));
  }
}

await mkdir('public/products', { recursive: true });
await sharp(SRC)
  .composite([
    { input: patch, raw: { width: w, height: h, channels: 4 }, left: PATCH.left, top: PATCH.top },
    {
      input: await sharp(LOGO).resize(LOGO_SIZE, LOGO_SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer(),
      left: Math.round(LOGO_CENTER.x - LOGO_SIZE / 2),
      top: Math.round(LOGO_CENTER.y - LOGO_SIZE / 2),
    },
  ])
  .webp({ quality: 86 })
  .toFile(OUT);

console.log(`Built ${OUT} from ${SRC} with the Neramit mark replaced.`);

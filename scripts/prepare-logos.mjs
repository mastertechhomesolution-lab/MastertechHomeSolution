// Builds crisp header logos from the supplied originals.
// Mast Tech: transparent padding is trimmed, then resized for high-DPI screens.
// Neramit: the supplied artwork carries a solid white disc inside its gold ring.
// The client's HeroMock.png shows the mark with that disc knocked out, so the white
// background is flood-filled away from seeds inside the ring (the artwork itself is
// untouched; only background pixels connected to those seeds lose their alpha, with a
// soft ramp so the anti-aliased gold edge keeps no white fringe).
import sharp from 'sharp';

const HEIGHT = 360;

async function trimmedResized(src) {
  const trimmed = await sharp(src).trim({ threshold: 1 }).toBuffer();
  return sharp(trimmed)
    .resize({ height: HEIGHT, kernel: 'lanczos3' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
}

function isBackgroundWhite(r, g, b, a) {
  return a > 200 && Math.min(r, g, b) >= 228 && Math.max(r, g, b) - Math.min(r, g, b) <= 14;
}

// Alpha ramp for the anti-aliased rim: fully clear at pure white, fully opaque by 205.
function fringeAlpha(r, g, b) {
  const lo = 205;
  const hi = 246;
  const m = Math.min(r, g, b);
  if (m <= lo) return 1;
  if (m >= hi) return 0;
  return 1 - (m - lo) / (hi - lo);
}

function knockOutWhite(data, width, height) {
  const idx = (x, y) => (y * width + x) * 4;
  const seen = new Uint8Array(width * height);
  const queue = [];

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (seen[p]) return;
    const i = p * 4;
    if (!isBackgroundWhite(data[i], data[i + 1], data[i + 2], data[i + 3])) return;
    seen[p] = 1;
    queue.push(p);
  };

  // Seeds: the image border (in case the disc bleeds to the edge) and a ring of points
  // just inside the gold circle, where the artwork is background only.
  for (let x = 0; x < width; x += 1) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y += 1) {
    push(0, y);
    push(width - 1, y);
  }
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) * 0.42;
  for (let deg = 0; deg < 360; deg += 2) {
    const a = (deg * Math.PI) / 180;
    push(Math.round(cx + r * Math.cos(a)), Math.round(cy + r * Math.sin(a)));
  }

  for (let head = 0; head < queue.length; head += 1) {
    const p = queue[head];
    const x = p % width;
    const y = (p - x) / width;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  let cleared = 0;
  for (let p = 0; p < width * height; p += 1) {
    if (!seen[p]) continue;
    data[p * 4 + 3] = 0;
    cleared += 1;
  }

  // Soften the one-pixel anti-aliased boundary around every cleared region.
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const p = y * width + x;
      if (seen[p]) continue;
      const touchesCleared =
        (x > 0 && seen[p - 1]) ||
        (x < width - 1 && seen[p + 1]) ||
        (y > 0 && seen[p - width]) ||
        (y < height - 1 && seen[p + width]);
      if (!touchesCleared) continue;
      const i = idx(x, y);
      data[i + 3] = Math.round(data[i + 3] * fringeAlpha(data[i], data[i + 1], data[i + 2]));
    }
  }
  return cleared;
}

const mast = await trimmedResized('Company Logo/โลโก้ มาสเทค.png');
await sharp(mast.data, { raw: { width: mast.info.width, height: mast.info.height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile('public/brand/mast-tech-logo.png');
console.log(`public/brand/mast-tech-logo.png: ${mast.info.width}x${mast.info.height}`);

const nera = await trimmedResized('Brand/11zon_cropped (3).png');
const cleared = knockOutWhite(nera.data, nera.info.width, nera.info.height);
await sharp(nera.data, { raw: { width: nera.info.width, height: nera.info.height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile('public/brand/neramit-logo.png');
console.log(
  `public/brand/neramit-logo.png: ${nera.info.width}x${nera.info.height}, cleared ${cleared} background px`,
);

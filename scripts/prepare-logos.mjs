// Builds the crisp Mast Tech header logo from the supplied original: transparent padding is
// trimmed, then the mark is resized for high-DPI screens.
// The Neramit logo is built by scripts/prepare-neramit-logo.mjs (2026-10 artwork).
import sharp from 'sharp';

const HEIGHT = 360;

const trimmed = await sharp('Company Logo/โลโก้ มาสเทค.png').trim({ threshold: 1 }).toBuffer();
const mast = await sharp(trimmed)
  .resize({ height: HEIGHT, kernel: 'lanczos3' })
  .ensureAlpha()
  .png({ compressionLevel: 9 })
  .toFile('public/brand/mast-tech-logo.png');
console.log(`public/brand/mast-tech-logo.png: ${mast.width}x${mast.height}`);

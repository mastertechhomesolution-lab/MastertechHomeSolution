// Light variant of the knocked-out Neramit mark for dark surfaces (page heroes):
// the navy "NERA" letters turn ivory so they stay legible on photography; gold is untouched.
import sharp from 'sharp';
const { data, info } = await sharp('public/brand/neramit-logo.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) {
  const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
  if (!a) continue;
  const y = Math.floor(i / 4 / info.width);
  if (y > info.height * 0.62 && b > r + 18 && b >= g) {
    const shade = 0.82 + 0.18 * (Math.max(r, g, b) / 255);
    data[i] = Math.round(246 * shade);
    data[i + 1] = Math.round(238 * shade);
    data[i + 2] = Math.round(222 * shade);
  }
}
await sharp(data, { raw: info }).png().toFile('public/brand/neramit-logo-light.png');
console.log('Built public/brand/neramit-logo-light.png');

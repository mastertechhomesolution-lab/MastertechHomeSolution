// Builds the homepage hero from the supplied reference mock (Mock/269037.jpg).
// The crop avoids the mock's baked-in Thai copy on the left and the header/category bar,
// then softens decorative mock text that is not real product labelling.
import sharp from 'sharp';

const SRC = 'Mock/269037.jpg';
const crop = { left: 525, top: 76, width: 1147, height: 584 };
// Regions relative to the crop: garbled wall text and the baked-in quote line.
const patches = [
  { left: 1436 - crop.left, top: 262 - crop.top, width: 84, height: 58 },
  { left: 1050 - crop.left, top: 566 - crop.top, width: 262, height: 84 },
];

const { data, info } = await sharp(SRC).extract(crop).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const px = (x, y, c) => data[(y * info.width + x) * 3 + c];
// Wall text: rebuild each column by interpolating the clean pixels just above and below it.
const wall = patches[0];
for (let x = wall.left; x < wall.left + wall.width; x++) {
  const y0 = wall.top - 1;
  const y1 = wall.top + wall.height;
  for (let y = wall.top; y < y1; y++) {
    const t = (y - y0) / (y1 - y0);
    for (let c = 0; c < 3; c++) data[(y * info.width + x) * 3 + c] = px(x, y0, c) * (1 - t) + px(x, y1, c) * t;
  }
}
const base = await sharp(data, { raw: info }).blur(0.3).png().toBuffer();
// Quote line sits on reflective floor: a feathered blur blends it away.
const q = patches[1];
const pad = 18;
const region = { left: q.left - pad, top: q.top - pad, width: q.width + pad * 2, height: Math.min(q.height + pad * 2, crop.height - (q.top - pad)) };
const blurred = await sharp(base).extract(region).blur(16).removeAlpha().toBuffer();
const mask = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${region.width}" height="${region.height}"><rect width="100%" height="100%" fill="#000"/><defs><filter id="f" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter></defs><rect x="${pad}" y="${pad}" width="${q.width}" height="${q.height}" rx="12" fill="#fff" filter="url(#f)"/></svg>`,
);
const alpha = await sharp(mask).resize(region.width, region.height).extractChannel(0).toBuffer();
const input = await sharp(blurred).joinChannel(alpha).png().toBuffer();
await sharp(base).composite([{ input, left: region.left, top: region.top }]).webp({ quality: 88 }).toFile('public/images/hero-mock.webp');
console.log('Prepared hero from supplied mock.');

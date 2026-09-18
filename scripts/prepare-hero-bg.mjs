// Converts the client-supplied hero backgrounds into web-ready WebP.
// Both are composed by the client for their own frame, so neither is cropped here.
// - Mock/HeroBG.png   (landscape) -> desktop / tablet hero.
// - Mock/PhoneBG.png  (portrait)  -> phone hero, art-directed via <picture> so the
//   glass lift stays fully in frame instead of being cropped out of the wide photo.
import sharp from 'sharp';

const sources = [
  { src: 'Mock/HeroBG.png', out: 'public/images/hero-bg.webp', width: 2400 },
  { src: 'Mock/PhoneBG.png', out: 'public/images/hero-bg-mobile.webp', width: 1200 },
];

for (const { src, out, width } of sources) {
  const info = await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile(out);
  console.log(`${out}: ${info.width}x${info.height}`);
}

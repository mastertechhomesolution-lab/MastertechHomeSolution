// Converts the client-supplied hero background (Mock/HeroBG.png) into a web-ready WebP.
// Used full-bleed behind the homepage hero copy; no cropping, the mock is composed for this frame.
import sharp from 'sharp';

await sharp('Mock/HeroBG.png')
  .resize({ width: 2400, withoutEnlargement: true })
  .webp({ quality: 86 })
  .toFile('public/images/hero-bg.webp');
console.log('Prepared hero background from Mock/HeroBG.png');

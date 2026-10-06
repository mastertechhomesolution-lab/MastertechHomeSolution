// Builds product imagery from the two supplementary catalogs the client supplied on 2026-10-06:
// - Mock/ลิฟต์คนพิการ.pdf                    Barrier-free lift catalog (A4 portrait, 10 pages)
// - Mock/home elevator_260908_132627.pdf  Residential elevator catalog (20 spreads)
// Both PDFs are image-only. Products are sold under the company's own brand, Neramit, so only
// crops are produced, never full pages: every spread of the home catalog carries the supplier's
// name in its header, and the MINI Lift renders carry the supplier's logo (those are not used).
// Also left out on purpose: the supplier's company / factory / service pages, its client logos and
// installation case photos, and any image showing a person (client rule: product-only imagery).
// Boxes are in pixels of the embedded page raster (home spread 2480x1754, barrier-free page
// 1241x1755). Output: public/products/<name>.webp, up to 2400px so table text stays legible.
import * as mupdf from 'mupdf';
import sharp from 'sharp';
import { readFile, mkdir } from 'node:fs/promises';

const sources = {
  home: { file: 'Mock/home elevator_260908_132627.pdf', width: 2480 },
  access: { file: 'Mock/ลิฟต์คนพิการ.pdf', width: 1241 },
};
const crops = [
  // [source, page, output name, x0, y0, x1, y1]
  ['access', 2, 'rack-lift', 308, 313, 713, 717],
  ['access', 3, 'rack-lift-photo', 43, 269, 546, 900],
  ['access', 3, 'rack-lift-drawing', 40, 905, 1200, 1620],
  ['access', 4, 'rack-lift-components', 35, 345, 1199, 1365],
  ['access', 2, 'sprocket-lift', 742, 758, 1148, 1160],
  ['access', 5, 'sprocket-lift-photo', 40, 251, 523, 871],
  ['access', 5, 'sprocket-lift-drawing', 80, 905, 1170, 1560],
  ['access', 6, 'sprocket-lift-components', 60, 257, 1175, 1450],
  ['access', 2, 'mini-lift', 308, 1201, 713, 1605],
  ['access', 2, 'mini-lift-house', 742, 1201, 1148, 1605],
  ['access', 7, 'mini-lift-photo', 60, 229, 507, 753],
  ['access', 7, 'mini-lift-photo-2', 660, 806, 1168, 1485],
  ['home', 5, 'hydraulic-home-elevator', 1240, 130, 2480, 720],
  ['home', 5, 'hydraulic-components', 1330, 760, 2400, 1640],
  ['home', 6, 'traction-gantry-backpack', 760, 20, 1240, 590],
  ['home', 6, 'traction-gantry-render', 760, 640, 1100, 1650],
  ['home', 18, 'traction-layouts', 60, 150, 2420, 1700],
  ['home', 19, 'hydraulic-platform-layouts', 60, 150, 2420, 1700],
  ['home', 9, 'platform-home-elevator', 1870, 380, 2420, 1670],
  ['home', 13, 'shaft-frame', 60, 150, 1240, 1640],
  ['home', 13, 'door-opening-way', 1300, 420, 2420, 1640],
  ['home', 7, 'home-lc-v100', 0, 150, 2480, 1720],
  ['home', 7, 'home-lc-v106', 2040, 170, 2380, 790],
  ['home', 8, 'home-lc-v200', 0, 150, 2480, 1720],
  ['home', 8, 'home-lc-v205', 1515, 170, 1845, 790],
  ['home', 10, 'stone-back-plate', 1880, 180, 2370, 1620],
  ['home', 10, 'stone-back-plates', 70, 180, 2420, 1620],
  ['home', 11, 'touch-screen-lc', 1760, 380, 2380, 905],
  ['home', 12, 'hmi-lc-cop-lop', 60, 150, 2420, 1700],
  ['home', 12, 'hmi-lc-cop', 1360, 380, 2400, 1000],
  ['home', 14, 'landing-door-lc', 1360, 280, 2420, 1640],
  ['home', 14, 'landing-door-lc-semi', 60, 280, 1180, 1640],
  ['home', 15, 'ceiling-floor-lc', 60, 150, 1180, 1640],
  ['home', 15, 'door-handle-handrail-lc', 1340, 150, 2420, 1640],
];

await mkdir('public/products', { recursive: true });
const docs = {};
const cache = new Map();
async function render(src, n) {
  const key = src + n;
  if (!cache.has(key)) {
    docs[src] ??= mupdf.Document.openDocument(await readFile(sources[src].file), 'application/pdf');
    const page = docs[src].loadPage(n - 1);
    const scale = sources[src].width / page.getBounds()[2];
    const pix = page.toPixmap(mupdf.Matrix.scale(scale, scale), mupdf.ColorSpace.DeviceRGB, false, true);
    cache.set(key, Buffer.from(pix.asPNG()));
  }
  return cache.get(key);
}
for (const [src, n, name, x0, y0, x1, y1] of crops) {
  const buf = await render(src, n);
  const { width, height } = await sharp(buf).metadata();
  await sharp(buf)
    .extract({ left: x0, top: y0, width: Math.min(width, x1) - x0, height: Math.min(height, y1) - y0 })
    .resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(`public/products/${name}.webp`);
}
console.log(`Prepared ${crops.length} product images from the supplementary catalogs.`);

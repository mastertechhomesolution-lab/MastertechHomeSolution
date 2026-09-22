// Builds product imagery from the company's own catalog PDF
// (Product/ข้อมูลบริษัทสินค้า.pdf, "THE ELEVATOR GENERAL CATALOG" 2026.8).
// - public/catalog/page-XX.webp : full catalog spreads used as the "catalog page" gallery images
// - public/products/<name>.webp : crops of the product renders/photos, boxes are in PDF points
// Crops avoid the "Car Show" QR codes. The supplied PDF is never modified.
// Supplier names printed in the catalog are covered on the rendered pages: the company
// imports these products and sells them under its own brand, Neramit.
import * as mupdf from 'mupdf';
import sharp from 'sharp';
import { readFile, mkdir } from 'node:fs/promises';

const SCALE = 4.1667; // ~300 dpi, matches the raster resolution embedded in the PDF
const PAGE_WIDTH = 2400;

const crops = [
  // [page, output name, x0, y0, x1, y1] in PDF points (spread is 1190 x 842)
  [3, 'company-office', 330, 120, 1190, 568],
  [4, 'production-hall', 50, 574, 527, 791],
  [5, 'core-component', 0, 0, 596, 278],
  [9, 'small-machine-room-passenger', 50, 194, 349, 370],
  [9, 'machine-roomless-passenger', 654, 193, 942, 370],
  [10, 'passenger-k010', 48, 139, 411, 684],
  [11, 'passenger-k004', 50, 121, 386, 662],
  [12, 'passenger-k007', 49, 121, 384, 662],
  [12, 'passenger-k008', 656, 90, 891, 447],
  [14, 'panoramic-g003', 664, 76, 847, 458],
  [15, 'hospital-y001', 652, 154, 978, 645],
  [16, 'operation-panel', 76, 150, 470, 577],
  [17, 'landing-door', 48, 108, 540, 745],
  [18, 'ceiling-series', 46, 108, 549, 458],
  [18, 'handrail-floor', 648, 400, 1160, 780],
  [19, 'traction-home-elevator', 50, 193, 273, 370],
  [19, 'steel-belt-home-lift', 654, 193, 943, 370],
  [20, 'home-v104', 49, 119, 305, 664],
  [21, 'home-v201', 50, 119, 305, 661],
  [22, 'home-v204', 49, 119, 305, 661],
  [23, 'home-v301', 50, 121, 305, 662],
  [24, 'home-v401', 95, 131, 297, 658],
  [24, 'home-v403', 934, 406, 1147, 772],
  [25, 'hall-door', 32, 120, 562, 798],
  [25, 'hall-door-collection', 652, 162, 1133, 676],
  [27, 'man-machine-interface', 34, 95, 560, 795],
  [27, 'touch-screen-panel', 653, 401, 1137, 775],
  [28, 'ceiling-handrail-floor', 58, 173, 537, 678],
  [30, 'machine-roomless-freight', 33, 44, 563, 797],
  [31, 'large-tonnage-freight', 32, 44, 756, 798],
  [32, 'freight-f01', 49, 146, 551, 554],
  [35, 'escalator', 34, 44, 563, 797],
  [36, 'public-traffic-escalator', 911, 236, 1140, 363],
  [37, 'moving-walk', 914, 193, 1140, 334],
];
// Product-only imagery: regions of catalog photos that contained people are replaced with
// Codex-edited versions (people removed, scene kept) from Mock/edited/<name>.png; the
// untouched source crop sits next to each as <name>-source.png. [page, name, x0, y0, x1, y1]
const cleaned = [
  [24, 'p24-person', 430, 350, 610, 600],
  [31, 'p31-doorway', 200, 200, 540, 580],
  [37, 'p37-walk', 914, 193, 1140, 334],
];
// [page, x0, y0, x1, y1, replacement text, font size, color] in PDF points
const redactions = [
  [13, 664, 145, 711, 162, 'NERAMIT', 10.5, '#595959'],
  [29, 751, 339, 782, 355, 'Neramit', 9.6, '#6f6f6f'],
  [43, 132, 808, 155, 828, 'Neramit', 6.3, '#6f6f6f'],
  [43, 736, 784, 759, 805, 'Neramit', 6.3, '#6f6f6f'],
  [44, 408, 789, 426, 804, 'the', 6.5, '#6f6f6f'],
  [44, 1009, 789, 1028, 804, 'the', 6.5, '#6f6f6f'],
];
const pages = [5, 9, 10, 11, 12, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 30, 32, 33, 34, 35, 38, 39, 41, 42, 43, 44, 45, 46, 47, 48];

await mkdir('public/products', { recursive: true });
await mkdir('public/catalog', { recursive: true });
const doc = mupdf.Document.openDocument(await readFile('Product/ข้อมูลบริษัทสินค้า.pdf'), 'application/pdf');
const cache = new Map();
function render(pageNumber) {
  if (!cache.has(pageNumber)) {
    const page = doc.loadPage(pageNumber - 1);
    const pix = page.toPixmap(mupdf.Matrix.scale(SCALE, SCALE), mupdf.ColorSpace.DeviceRGB, false, true);
    cache.set(pageNumber, Buffer.from(pix.asPNG()));
  }
  return cache.get(pageNumber);
}
for (const [n, name, x0, y0, x1, y1] of cleaned) {
  const [left, top, width, height] = [x0, y0, x1 - x0, y1 - y0].map((v) => Math.round(v * SCALE));
  const patch = await sharp(`Mock/edited/${name}.png`).resize(width, height, { fit: 'fill' }).toBuffer();
  cache.set(n, await sharp(render(n)).composite([{ input: patch, left, top }]).png().toBuffer());
}
for (const n of new Set(redactions.map((r) => r[0]))) {
  const { width, height } = await sharp(render(n)).metadata();
  const marks = redactions
    .filter((r) => r[0] === n)
    .map(([, x0, y0, x1, y1, text, size, color]) => {
      const [x, y, w, h] = [x0, y0, x1 - x0, y1 - y0].map((v) => v * SCALE);
      return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff"/><text x="${x}" y="${y + h * 0.78}" font-family="Arial, sans-serif" font-size="${size * SCALE}" fill="${color}">${text}</text>`;
    })
    .join('');
  const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${marks}</svg>`);
  cache.set(n, await sharp(render(n)).composite([{ input: svg }]).png().toBuffer());
}
for (const n of pages) {
  await sharp(render(n))
    .resize({ width: PAGE_WIDTH })
    .webp({ quality: 80 })
    .toFile(`public/catalog/page-${String(n).padStart(2, '0')}.webp`);
}
for (const [n, name, x0, y0, x1, y1] of crops) {
  const img = sharp(render(n));
  const { width, height } = await img.metadata();
  const left = Math.max(0, Math.round(x0 * SCALE));
  const top = Math.max(0, Math.round(y0 * SCALE));
  await sharp(render(n))
    .extract({
      left,
      top,
      width: Math.min(width - left, Math.round((x1 - x0) * SCALE)),
      height: Math.min(height - top, Math.round((y1 - y0) * SCALE)),
    })
    .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(`public/products/${name}.webp`);
}
console.log(`Prepared ${pages.length} catalog pages and ${crops.length} product images from the company catalog PDF.`);

import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';
for (const dir of ['products','brand','images','catalog','contact']) await mkdir(`public/${dir}`,{recursive:true});
await copyFile('Company Logo/โลโก้ มาสเทค.png','public/brand/mast-tech.png');
await copyFile('Brand/11zon_cropped (3).png','public/brand/neramit.png');
await copyFile('Company Contact/107384.jpg','public/contact/line-qr.jpg');
for(let id=106882;id<=106893;id++) await copyFile(`Product/${id}_0.jpg`,`public/catalog/${id}_0.jpg`);
const crops = [
 ['Product/106885_0.jpg','products/panorama',30,160,385,680],
 ['Product/106887_0.jpg','products/modern',45,158,405,810],
 ['Product/106888_0.jpg','products/graphite',52,155,385,770],
 ['Product/106889_0.jpg','products/champagne',56,159,367,795],
 ['Product/106890_0.jpg','products/classic',60,156,375,770],
 ['Product/106886_0.jpg','products/hall-door',0,76,683,915],
 ['Product/106883_0.jpg','products/door-collection',64,163,630,714],
 ['Product/106891_0.jpg','products/landing-door',64,159,675,827],
 ['Product/106882_0.jpg','products/finishes',62,157,628,711],
 ['Product/106892_0.jpg','products/accessories',69,160,634,800],
 ['Product/106884_0.jpg','products/controls',845,201,604,760],
 ['Product/106893_0.jpg','products/traction',482,151,233,827],
 ['Mock/269037.jpg','products/smart-lock',1385,333,280,229],
 ['Mock/269037.jpg','products/automatic-door',1151,115,249,423],
];
for (const [src,name,left,top,width,height] of crops) await sharp(src).extract({left,top,width,height}).webp({quality:90}).toFile(`public/${name}.webp`);
console.log(`Prepared ${crops.length} assets from supplied originals.`);
await import('./prepare-hero.mjs');

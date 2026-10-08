import { mkdir, copyFile } from 'node:fs/promises';
for (const dir of ['products','brand','images','catalog','contact']) await mkdir(`public/${dir}`,{recursive:true});
await copyFile('Company Logo/โลโก้ มาสเทค.png','public/brand/mast-tech.png');
await copyFile('Brand/11zon_cropped (3).png','public/brand/neramit.png');
await copyFile('Company Contact/107384.jpg','public/contact/line-qr.jpg');
console.log('Copied supplied logos and LINE QR.');
// Product imagery and catalog pages come from the company catalog PDF.
await import('./prepare-catalog-images.mjs');
// Barrier-free lift and Residential Elevator Series catalogs (2026-10, Mock/*.pdf).
await import('./prepare-new-catalogs.mjs');
await import('./prepare-page-heroes.mjs');
await import('./prepare-neramit-logo.mjs');
await import('./prepare-hero.mjs');
await import('./prepare-homelift-card.mjs');

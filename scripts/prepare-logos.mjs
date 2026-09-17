// Builds crisp header logos from the supplied originals without altering the artwork:
// only transparent padding is trimmed, then the logo is resized for high-DPI screens.
import sharp from 'sharp';

const logos = [
  { src: 'Company Logo/โลโก้ มาสเทค.png', out: 'public/brand/mast-tech-logo.png', height: 360 },
  { src: 'Brand/11zon_cropped (3).png', out: 'public/brand/neramit-logo.png', height: 360 },
];

for (const logo of logos) {
  const trimmed = await sharp(logo.src).trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
  const { data, info } = await sharp(trimmed.data)
    .resize({ height: logo.height, kernel: 'lanczos3' })
    .png({ compressionLevel: 9 })
    .toBuffer({ resolveWithObject: true });
  await sharp(data).toFile(logo.out);
  console.log(`${logo.out}: ${info.width}x${info.height}`);
}

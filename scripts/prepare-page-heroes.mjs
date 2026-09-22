// Inner-page hero backgrounds. Sources in Mock/generated/ were generated with Codex using the
// approved homepage hero (public/images/hero-bg.webp) as the style reference. They are ambient
// architecture scenes only, never presented as specific products or delivered projects.
import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
await mkdir('public/images/heroes', { recursive: true });
const files = (await readdir('Mock/generated')).filter((f) => /^hero-.*\.png$/.test(f));
for (const f of files) {
  await sharp(`Mock/generated/${f}`)
    .resize({ width: 1774, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(`public/images/heroes/${f.replace(/\.png$/, '.webp')}`);
}
console.log(`Prepared ${files.length} page hero images.`);

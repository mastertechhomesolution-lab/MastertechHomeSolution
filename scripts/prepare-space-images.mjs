// Homepage "SOLUTIONS FOR EVERY SPACE" card photos. Sources are AI-generated ambient scenes
// (client decision 2026-09-29) saved as Mock/generated/space-<id>.png, where <id> is one of
// residential, condominium, workplace, healthcare, industrial, commercial. They show the type of
// space only — never a specific product, installation or delivered project.
import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
await mkdir('public/images/spaces', { recursive: true });
const files = (await readdir('Mock/generated')).filter((f) => /^space-.*\.(png|jpe?g|webp)$/.test(f));
for (const f of files) {
  await sharp(`Mock/generated/${f}`)
    .resize({ width: 1000, height: 1250, fit: 'cover', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(`public/images/spaces/${f.replace(/^space-/, '').replace(/\.(png|jpe?g|webp)$/, '.webp')}`);
}
console.log(`Prepared ${files.length} space images.`);

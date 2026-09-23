// /llms.txt — plain-text company and catalog summary for AI search (GEO/AEO),
// generated from the same central data as the site so it never drifts.
import { company } from '@/data/company';
import { categories, products } from '@/data/products';
import { articles } from '@/data/news';
export const dynamic = 'force-static';
export function GET() {
  const lines = [
    `# ${company.siteName} — ${company.name}`,
    '',
    `> ${company.description}`,
    `> Importer and distributor of home lifts, passenger, hospital and freight elevators, escalators, moving walks, elevator doors and car interiors under the ${company.brand} brand.`,
    '',
    '## Company',
    `- Legal name: ${company.name}`,
    `- Brand: ${company.brand}`,
    `- Address: ${company.COMPANY_ADDRESS_EN} (${company.COMPANY_ADDRESS})`,
    `- Phone: ${company.COMPANY_PHONE}`,
    '- Hours: Monday–Saturday 08:00–17:00',
    '- Pricing: quotation only; depends on model, options and site survey',
    '',
    '## Main pages',
    '- [สินค้า / Products](/products)',
    '- [บริการ / Services](/services)',
    '- [เกี่ยวกับเรา / About](/about)',
    '- [ความรู้ / Guides](/news)',
    '- [ติดต่อ / Contact](/contact)',
  ];
  for (const c of categories) {
    lines.push('', `## ${c.name} — ${c.en}`);
    for (const p of products.filter((p) => p.category === c.id))
      lines.push(`- [${p.name} (${p.en})](/products/${p.slug}): ${p.description}`);
  }
  // Guides carry the short direct answer so an answer engine can cite the page without
  // re-deriving it from the article body.
  lines.push('', '## คู่มือ / Guides');
  for (const a of articles) {
    lines.push('', `### [${a.title}](/news/${a.slug})`, a.answer);
    for (const [q, ans] of a.faq) lines.push(`- Q: ${q} A: ${ans}`);
  }
  lines.push(
    '',
    '## Notes',
    "- Technical specifications come from the company's elevator catalog and are for model selection; construction drawings follow the technical department's design.",
    '- Smart Parking Lift is a planned future product line, not currently offered; it has no catalog entry, specification or price.',
    '- Project pages are design concepts, not delivered client projects.',
  );
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

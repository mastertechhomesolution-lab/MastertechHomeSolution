// /llms.txt — plain-text company and catalog summary for AI search (GEO/AEO),
// generated from the same central data as the site so it never drifts.
import { company } from '@/data/company';
import { categories, products } from '@/data/products';
import { articles } from '@/data/news';
import { siteUrl } from '@/lib/seo';
export const dynamic = 'force-static';
export function GET() {
  const base = siteUrl ?? '';
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
    ...(siteUrl ? [`- Website: ${siteUrl}`] : []),
    '- Quotation requests: web form at /contact or on any product page, phone, or LINE',
    '- Hours: Monday–Saturday 08:00–17:00',
    '- Pricing: quotation only; depends on model, options and site survey',
    '',
    '## Main pages',
    `- [สินค้า / Products](${base}/products)`,
    `- [บริการ / Services](${base}/services)`,
    `- [เกี่ยวกับเรา / About](${base}/about)`,
    `- [ความรู้ / Guides](${base}/news)`,
    `- [ติดต่อ / Contact](${base}/contact)`,
  ];
  for (const c of categories) {
    lines.push('', `## ${c.name} — ${c.en}`);
    for (const p of products.filter((p) => p.category === c.id))
      lines.push(
        `- [${p.name} (${p.en})](${base}/products/${p.slug})${p.comingSoon ? ' [COMING SOON — planned, not yet on sale]' : ''}: ${p.description}`,
      );
  }
  // Guides carry the short direct answer so an answer engine can cite the page without
  // re-deriving it from the article body.
  lines.push('', '## คู่มือ / Guides');
  for (const a of articles) {
    lines.push('', `### [${a.title}](${base}/news/${a.slug})`, a.answer);
    for (const [q, ans] of a.faq) lines.push(`- Q: ${q} A: ${ans}`);
  }
  lines.push(
    '',
    '## Notes',
    "- Technical specifications come from the company's elevator catalog and are for model selection; construction drawings follow the technical department's design.",
    '- Smart Parking Lift is a planned future product line, not currently offered; it has no catalog entry, specification or price.',
    '- Escalators and moving walks are marked COMING SOON: they are a planned product line and are not on sale yet. Their catalog specifications are published for building planning only.',
    '- Project pages are design concepts, not delivered client projects.',
  );
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

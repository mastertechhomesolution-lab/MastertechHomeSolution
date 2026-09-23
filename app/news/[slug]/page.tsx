import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { articles } from '@/data/news';
import { products } from '@/data/products';
import { Cta, Eyebrow, JsonLd } from '@/components/ui';
import { pageMeta, breadcrumbs, siteUrl } from '@/lib/seo';
import { company } from '@/data/company';
export const generateStaticParams = () => articles.map((a) => ({ slug: a.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  return a ? pageMeta(a.metaTitle ?? a.title, a.intro, '/news/' + slug) : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  const linked = a.related.map((s) => products.find((p) => p.slug === s)).filter((p) => !!p);
  // Same-category guides first so every article does not point at the same two.
  const more = articles
    .filter((x) => x.slug !== a.slug)
    .sort((x, y) => Number(y.category === a.category) - Number(x.category === a.category))
    .slice(0, 3);
  return (
    <>
      <JsonLd
        data={breadcrumbs([
          { name: 'ข่าวสาร', path: '/news' },
          { name: a.title, path: '/news/' + a.slug },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          // headline mirrors the visible H1; metaTitle only ever shortens <title>.
          headline: a.title,
          description: a.intro,
          abstract: a.answer,
          articleSection: a.category,
          inLanguage: 'th',
          keywords: a.sections.map(([heading]) => heading).join(', '),
          about: linked.map((p) => ({
            '@type': 'Product',
            name: p.name,
            alternateName: p.en,
            brand: { '@type': 'Brand', name: company.brand },
          })),
          articleBody: [a.answer, ...a.sections.map(([heading, body]) => heading + ': ' + body)].join('\n'),
          // Matches the visible byline. No individual author is invented, and no
          // datePublished/dateModified is emitted until real dates exist (see HANDOFF).
          author: { '@type': 'Organization', name: company.name, alternateName: company.siteName },
          publisher: { '@type': 'Organization', name: company.name, alternateName: company.siteName },
          ...(siteUrl
            ? {
                url: siteUrl + '/news/' + a.slug,
                mainEntityOfPage: { '@type': 'WebPage', '@id': siteUrl + '/news/' + a.slug },
                image: siteUrl + '/products/' + a.image + '.webp',
              }
            : {}),
        }}
      />
      {/* Visible Q&A block, also emitted for answer engines. FAQ rich results are limited to
          government and health sites, so this is a retrieval signal, not a SERP feature. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          inLanguage: 'th',
          mainEntity: a.faq.map(([q, ans]) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: ans },
          })),
        }}
      />
      <article className="article container">
        <div className="breadcrumb">
          <Link href="/news">ข่าวสารและความรู้</Link>
          <span>/</span>
          <span>{a.category}</span>
        </div>
        <header>
          <Eyebrow>{a.category}</Eyebrow>
          <h1>{a.title}</h1>
          <p className="lead">{a.intro}</p>
          <div className="article-answer">
            <strong>คำตอบโดยสรุป</strong>
            <p>{a.answer}</p>
          </div>
          <p className="article-byline">MASTERTECHHOMESOLUTION · คู่มือเบื้องต้นจากแค็ตตาล็อกสินค้า</p>
        </header>
        <div className="article-image">
          <Image
            src={'/products/' + a.image + '.webp'}
            alt={a.alt}
            fill
            priority
            sizes="(max-width:800px) 90vw, 800px"
          />
        </div>
        <div className="article-body">
          <nav className="article-toc" aria-label="สารบัญบทความ">
            <strong>ในบทความนี้</strong>
            {a.sections.map(([t], i) => (
              <a key={t} href={'#section-' + i}>
                {t}
              </a>
            ))}
            <a href="#faq">คำถามที่พบบ่อย</a>
          </nav>
          {a.sections.map(([t, p], i) => (
            <section id={'section-' + i} key={t}>
              <h2>{t}</h2>
              <p>{p}</p>
            </section>
          ))}
          {linked.length > 0 && (
            <section className="article-related" aria-labelledby="related-products">
              <h2 id="related-products">ผลิตภัณฑ์ที่เกี่ยวข้องกับบทความนี้</h2>
              <ul>
                {linked.map((p) => (
                  <li key={p.slug}>
                    <Link href={'/products/' + p.slug}>
                      {p.name} — {p.en}
                    </Link>
                    <span>{p.description}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section id="faq" className="article-faq">
            <h2>คำถามที่พบบ่อย</h2>
            <dl>
              {a.faq.map(([q, ans]) => (
                <div key={q}>
                  <dt>{q}</dt>
                  <dd>{ans}</dd>
                </div>
              ))}
            </dl>
          </section>
          <aside className="article-note">
            บทความความรู้เบื้องต้นสำหรับการนำเสนอ ข้อมูลทางเทคนิค รหัสรุ่น และตัวเลขทั้งหมดอ้างอิงแค็ตตาล็อกสินค้าของบริษัท
            รายละเอียดการติดตั้งและฟังก์ชันต้องอ้างอิงคู่มือรุ่นจริงและการประเมินจากผู้เชี่ยวชาญ
          </aside>
          <Link className="text-link" href="/products">
            ดูสินค้าทั้งหมดในแค็ตตาล็อกลิฟต์ Neramit →
          </Link>
          <h2>อ่านต่อ</h2>
          {more.map((x) => (
            <Link className="related-article" key={x.slug} href={'/news/' + x.slug}>
              {x.title} ↗
            </Link>
          ))}
        </div>
      </article>
      <Cta />
    </>
  );
}

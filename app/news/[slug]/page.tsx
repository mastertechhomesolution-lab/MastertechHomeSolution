import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { articles } from '@/data/news';
import { Cta, Eyebrow, JsonLd } from '@/components/ui';
import { pageMeta, breadcrumbs, siteUrl } from '@/lib/seo';
import { company } from '@/data/company';
export const generateStaticParams = () => articles.map((a) => ({ slug: a.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  return a ? pageMeta(a.title, a.intro, '/news/' + slug) : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
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
          headline: a.title,
          description: a.intro,
          articleSection: a.category,
          inLanguage: 'th',
          about: a.sections.map(([heading]) => heading),
          articleBody: a.sections.map(([heading, body]) => heading + ': ' + body).join('\n'),
          publisher: { '@type': 'Organization', name: company.name, alternateName: company.siteName },
          ...(siteUrl ? { url: siteUrl + '/news/' + a.slug, image: siteUrl + '/products/' + a.image + '.webp' } : {}),
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
          <p className="article-byline">MASTERTECHHOMESOLUTION · คู่มือเบื้องต้น</p>
        </header>
        <div className="article-image">
          <Image
            src={'/products/' + a.image + '.webp'}
            alt={a.title}
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
          </nav>
          {a.sections.map(([t, p], i) => (
            <section id={'section-' + i} key={t}>
              <h2>{t}</h2>
              <p>{p}</p>
            </section>
          ))}
          <aside className="article-note">
            บทความความรู้เบื้องต้นสำหรับการนำเสนอ
            รายละเอียดการติดตั้งและฟังก์ชันต้องอ้างอิงคู่มือรุ่นจริงและการประเมินจากผู้เชี่ยวชาญ
          </aside>
          <Link className="text-link" href="/products">
            สำรวจผลิตภัณฑ์ที่เหมาะกับคุณ →
          </Link>
          <h2>อ่านต่อ</h2>
          {articles
            .filter((x) => x.slug !== a.slug)
            .slice(0, 2)
            .map((x) => (
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

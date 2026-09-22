import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { products, categories, productImage } from '@/data/products';
import { ProductGallery } from '@/components/catalog';
import { QuoteButton } from '@/components/website';
import { Eyebrow, FeatureList, ProductCard, SectionHeading, JsonLd, GoldLayers } from '@/components/ui';
import { pageMeta, breadcrumbs, siteUrl } from '@/lib/seo';
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  return p
    ? pageMeta((p.name + ' — ' + p.en).length <= 60 ? p.name + ' — ' + p.en : p.name, p.description, '/products/' + p.slug)
    : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  if (!p) notFound();
  const category = categories.find((c) => c.id === p.category)!;
  return (
    <>
      <JsonLd
        data={breadcrumbs([
          { name: 'สินค้า', path: '/products' },
          { name: p.name, path: '/products/' + p.slug },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: p.name,
          alternateName: p.en,
          description: p.description,
          brand: { '@type': 'Brand', name: 'Neramit' },
          ...(p.models ? { model: p.models.map((m) => m.code).join(', ') } : {}),
          category: category.name,
          ...(siteUrl ? { image: siteUrl + productImage(p), url: siteUrl + '/products/' + p.slug } : {}),
        }}
      />
      <div className="container section">
        <div className="breadcrumb">
          <Link href="/">หน้าแรก</Link>
          <span>/</span>
          <Link href="/products">สินค้า</Link>
          <span>/</span>
          <span>{p.name}</span>
        </div>
        <div className="product-detail">
          <ProductGallery image={p.image} pages={p.pages} name={p.name} />
          <div className="product-info">
            <Eyebrow>{category.en} · {p.en}</Eyebrow>
            <h1>{p.name}</h1>
            <p className="lead">{p.description}</p>
            {p.rendered && (
              <p className="concept-note">
                ภาพจากแค็ตตาล็อกเป็นภาพกราฟิกคอมพิวเตอร์ สินค้าจริงอาจแตกต่างเล็กน้อย (The picture is drawn by computer)
              </p>
            )}
            <FeatureList items={p.features} />
            <div className="detail-cta">
              <QuoteButton product={p.name} className="button button-gold">
                <GoldLayers />
                <span className="gold-label">ขอใบเสนอราคา</span> <ArrowUpRight size={18} />
              </QuoteButton>
              <QuoteButton product={p.name} className="button button-outline">
                ปรึกษาผู้เชี่ยวชาญ
              </QuoteButton>
            </div>
            <p className="privacy-note">ราคาและรายละเอียดขึ้นอยู่กับรุ่น ตัวเลือก และพื้นที่ติดตั้ง ข้อมูลทางเทคนิคใช้เพื่ออ้างอิงในการเลือกรุ่น แบบก่อสร้างจริงยึดตามแบบของฝ่ายเทคนิค</p>
            <div className="product-accordions">
              {p.specs && (
                <details open>
                  <summary>
                    ข้อมูลทางเทคนิค (Specification) <span>+</span>
                  </summary>
                  <table className="spec-table">
                    <tbody>
                      {p.specs.map(([k, v]) => (
                        <tr key={k}>
                          <th scope="row">{k}</th>
                          <td>{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </details>
              )}
              {p.models && (
                <details open={!p.specs}>
                  <summary>
                    รุ่นและวัสดุ (Models) <span>+</span>
                  </summary>
                  <div className="model-list">
                    {p.models.map((m) => (
                      <div key={m.code}>
                        <p className="model-code">
                          {m.code}
                          {m.tag && <small> ({m.tag})</small>}
                        </p>
                        <ul>
                          {m.spec.map((x) => (
                            <li key={x}>{x}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </details>
              )}
              <details>
                <summary>
                  พื้นที่และการใช้งาน <span>+</span>
                </summary>
                <p>
                  {p.applications ??
                    'บ้านพักอาศัย อาคาร และโครงการ โดยประเมินประเภทอาคาร ขนาดพื้นที่ และความต้องการของผู้ใช้งานก่อนเสนอผลิตภัณฑ์'}
                </p>
              </details>
              <details>
                <summary>
                  แค็ตตาล็อกต้นฉบับ <span>+</span>
                </summary>
                <p>
                  ข้อมูลจาก THE ELEVATOR GENERAL CATALOG ของ MASTER SCIENCE AND TECHNOLOGY CO., LTD. หน้า{' '}
                  {p.pages.join(', ')} — กดภาพย่อด้านซ้ายเพื่อดูหน้าแค็ตตาล็อก
                </p>
              </details>
              <details>
                <summary>
                  ติดตั้งและดูแลหลังการขาย <span>+</span>
                </summary>
                <p>ปรึกษาเรื่องการสำรวจพื้นที่ งานระบบ การส่งมอบ และแผนบำรุงรักษากับทีมงาน</p>
                <Link className="text-link" href="/services">
                  ดูบริการของเรา <ArrowUpRight size={16} />
                </Link>
              </details>
            </div>
          </div>
        </div>
      </div>
      <section className="section secondary-section">
        <div className="container">
          <SectionHeading eyebrow="EXPLORE MORE" title="ผลิตภัณฑ์ที่เกี่ยวข้อง" href="/products" />
          <div className="product-grid">
            {products
              .filter((x) => x.slug !== p.slug && x.category === p.category)
              .concat(products.filter((x) => x.category !== p.category))
              .slice(0, 3)
              .map((x) => (
                <ProductCard key={x.slug} product={x} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

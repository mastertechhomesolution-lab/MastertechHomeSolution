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
  return p ? pageMeta(p.name, p.description, '/products/' + p.slug) : {};
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
      {!p.concept && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: p.name,
            description: p.description,
            category: category.name,
            ...(siteUrl ? { image: siteUrl + productImage(p), url: siteUrl + '/products/' + p.slug } : {}),
          }}
        />
      )}
      <div className="container section">
        <div className="breadcrumb">
          <Link href="/">หน้าแรก</Link>
          <span>/</span>
          <Link href="/products">สินค้า</Link>
          <span>/</span>
          <span>{p.name}</span>
        </div>
        <div className="product-detail">
          <ProductGallery image={p.image} catalog={p.catalog} name={p.name} />
          <div className="product-info">
            <Eyebrow>{category.en}</Eyebrow>
            <h1>{p.name}</h1>
            <p className="lead">{p.description}</p>
            {p.concept && (
              <p className="concept-note">
                ภาพแนวคิดจากแบบอ้างอิง ไม่ใช่การระบุรุ่นสินค้าจริง กรุณาปรึกษาทีมงานเพื่อเลือกรุ่นและฟังก์ชัน
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
            <p className="privacy-note">ราคาและรายละเอียดขึ้นอยู่กับรุ่น ตัวเลือก และพื้นที่ติดตั้ง</p>
            <div className="product-accordions">
              <details open>
                <summary>
                  ภาพรวมผลิตภัณฑ์ <span>+</span>
                </summary>
                <p>{p.description} ทีมงานพร้อมให้คำปรึกษาเพื่อเลือกผลิตภัณฑ์ให้เหมาะกับการใช้งานจริง</p>
              </details>
              <details>
                <summary>
                  พื้นที่และการใช้งาน <span>+</span>
                </summary>
                <p>
                  บ้านพักอาศัย อาคาร และโครงการ โดยประเมินประเภทอาคาร ขนาดพื้นที่
                  และความต้องการของผู้ใช้งานก่อนเสนอผลิตภัณฑ์
                </p>
              </details>
              <details>
                <summary>
                  ดีไซน์และวัสดุ <span>+</span>
                </summary>
                <p>ดูตัวอย่างการตกแต่งในภาพประกอบและแค็ตตาล็อก ตัวเลือกสี วัสดุ และขนาดต้องยืนยันตามรุ่นที่เสนอจริง</p>
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

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Check } from 'lucide-react';
import { Product, productImage, categories } from '@/data/products';
import { QuoteButton } from './website';
export { GoldLayers } from './website';

export function JsonLd({ data }: { data: unknown }) {
  return data ? (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  ) : null;
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  label = 'ดูทั้งหมด',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
        {description && <p className="muted">{description}</p>}
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {label}
          <ArrowUpRight size={18} />
        </Link>
      )}
    </div>
  );
}
/** Full-bleed inner-page hero, styled after the homepage hero. Backgrounds live in
 *  public/images/heroes/<image>.webp (built by scripts/prepare-page-heroes.mjs). */
export function PageHero({
  label,
  title,
  description,
  image,
  alt,
  kicker = 'NERAMIT · MASTER SCIENCE & TECHNOLOGY',
}: {
  label: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  kicker?: string;
}) {
  const [first, ...rest] = title.split('\n');
  return (
    <section className="page-hero">
      <div className="page-hero-visual">
        <Image src={`/images/heroes/${image}.webp`} alt={alt} fill sizes="100vw" priority />
      </div>
      <div className="page-hero-scrim" aria-hidden="true" />
      <div className="container page-hero-content">
        <div className="page-hero-copy">
          <div className="breadcrumb">
            <Link href="/">หน้าแรก</Link>
            <span>/</span>
            <span>{label}</span>
          </div>
          <p className="page-hero-eyebrow">{label}</p>
          <h1>
            {first}
            {rest.length > 0 && (
              <>
                <br />
                <span>{rest.join(' ')}</span>
              </>
            )}
          </h1>
          <p className="page-hero-description">{description}</p>
          <p className="page-hero-kicker">{kicker}</p>
        </div>
      </div>
    </section>
  );
}
/** Overlay for a planned product line. Sits on the image itself so the status travels with the
 *  product wherever its picture is shown. Purely decorative — the Thai status line next to it
 *  is what a screen reader announces, so this is hidden from the accessibility tree. */
export function ComingSoon() {
  return (
    <span className="coming-soon" aria-hidden="true">
      <span>Coming Soon</span>
    </span>
  );
}
export function ProductCard({ product: p }: { product: Product }) {
  return (
    <article className="product-card">
      <Link href={`/products/${p.slug}`} className="product-picture">
        <Image
          src={productImage(p)}
          alt={p.name}
          fill
          sizes="(max-width: 600px) 85vw, (max-width: 1000px) 45vw, 30vw"
        />
        <span className="image-index">
          <Image src="/brand/neramit-logo.png" width={360} height={360} alt="" unoptimized />
          NERAMIT COLLECTION
        </span>
        {p.comingSoon && <ComingSoon />}
        <span className="round-arrow">
          <ArrowUpRight size={20} />
        </span>
      </Link>
      <div className="product-card-body">
        <p className="micro">{categories.find((c) => c.id === p.category)?.en}</p>
        <h3>
          <Link href={`/products/${p.slug}`}>{p.name}</Link>
        </h3>
        {p.comingSoon && <p className="coming-soon-note">เตรียมจำหน่าย — อยู่ในแผนผลิตภัณฑ์ลำดับถัดไป</p>}
        <p className="muted">{p.description}</p>
        <div className="card-actions">
          <Link href={`/products/${p.slug}`}>
            ดูรายละเอียด <ArrowRight size={15} />
          </Link>
          <QuoteButton product={p.name} className="small-inquiry">
            {p.comingSoon ? 'สอบถามข้อมูล' : 'สอบถามราคา'}
          </QuoteButton>
        </div>
      </div>
    </article>
  );
}
export const steps = [
  { th: 'พูดคุยความต้องการ', en: 'CONSULTATION', text: 'รับฟังการใช้งาน จำนวนชั้น และงบประมาณ' },
  { th: 'สำรวจพื้นที่', en: 'SITE SURVEY', text: 'วัดขนาดปล่อง ความลึกบ่อ และความสูงชั้นจริง' },
  { th: 'แนะนำผลิตภัณฑ์และออกแบบ', en: 'DESIGN', text: 'เลือกรุ่น วัสดุ และแบบห้องโดยสารที่ใช่' },
  { th: 'เสนอราคา', en: 'QUOTATION', text: 'สรุปรุ่น ขอบเขตงาน และราคาอย่างชัดเจน' },
  { th: 'ติดตั้ง', en: 'INSTALLATION', text: 'ติดตั้งตามแบบของฝ่ายเทคนิคอย่างเป็นระบบ' },
  { th: 'ตรวจสอบและส่งมอบ', en: 'HANDOVER', text: 'ทดสอบระบบและแนะนำการใช้งานก่อนส่งมอบ' },
  { th: 'บริการหลังการขาย', en: 'AFTER-SALES', text: 'ดูแลและบำรุงรักษาอย่างต่อเนื่อง' },
];
export function Process() {
  return (
    <section className="section process-section">
      <div className="container">
        <SectionHeading
          eyebrow="FROM VISION TO REALITY"
          title="ขั้นตอนการทำงาน"
          description="ดูแลทุกรายละเอียด ให้ทุกขั้นตอนเป็นเรื่องง่ายสำหรับคุณ"
        />
        <ol className="process">
          {steps.map((s, i) => (
            <li key={s.en}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <p className="process-en">{s.en}</p>
              <h3>{s.th}</h3>
              <p className="process-text">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
export function Cta() {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div>
          <Eyebrow>LET’S CREATE SOMETHING BETTER</Eyebrow>
          <h2>
            พื้นที่ที่ดีกว่า
            <br />
            เริ่มต้นจากบทสนทนา
          </h2>
          <p>ให้เราช่วยเลือกโซลูชันที่เหมาะกับคุณ</p>
        </div>
        <QuoteButton className="button button-light">
          ปรึกษาผู้เชี่ยวชาญ <ArrowUpRight size={20} />
        </QuoteButton>
      </div>
    </section>
  );
}
export function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="feature-list">
      {items.map((item) => (
        <li key={item}>
          <Check size={18} />
          {item}
        </li>
      ))}
    </ul>
  );
}

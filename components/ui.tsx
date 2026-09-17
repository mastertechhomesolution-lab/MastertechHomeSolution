import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Check } from 'lucide-react';
import { Product, productImage, categories } from '@/data/products';
import { QuoteButton } from './website';
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
export function PageHero({
  label,
  title,
  description,
  image = 'hall-door',
}: {
  label: string;
  title: string;
  description: string;
  image?: string;
}) {
  return (
    <section className="page-hero">
      <div className="container page-hero-inner">
        <div>
          <div className="breadcrumb">
            <Link href="/">หน้าแรก</Link>
            <span>/</span>
            <span>{label}</span>
          </div>
          <Eyebrow>{label}</Eyebrow>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="page-hero-image">
          <Image src={`/products/${image}.webp`} alt={title} fill sizes="(max-width: 700px) 100vw, 40vw" priority />
        </div>
      </div>
    </section>
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
        <span className="image-index">{p.concept ? 'CONCEPT COLLECTION' : 'MASTER COLLECTION'}</span>
        <span className="round-arrow">
          <ArrowUpRight size={20} />
        </span>
      </Link>
      <div className="product-card-body">
        <p className="micro">{categories.find((c) => c.id === p.category)?.en}</p>
        <h3>
          <Link href={`/products/${p.slug}`}>{p.name}</Link>
        </h3>
        <p className="muted">{p.description}</p>
        <div className="card-actions">
          <Link href={`/products/${p.slug}`}>
            ดูรายละเอียด <ArrowRight size={15} />
          </Link>
          <QuoteButton product={p.name} className="small-inquiry">
            สอบถามราคา
          </QuoteButton>
        </div>
      </div>
    </article>
  );
}
export const steps = [
  'พูดคุยความต้องการ',
  'สำรวจพื้นที่',
  'แนะนำผลิตภัณฑ์และออกแบบ',
  'เสนอราคา',
  'ติดตั้ง',
  'ตรวจสอบและส่งมอบ',
  'บริการหลังการขาย',
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
            <li key={s}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <h3>{s}</h3>
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

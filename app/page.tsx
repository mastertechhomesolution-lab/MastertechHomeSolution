import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  ShieldCheck,
  Gem,
  ChevronRight,
  Headset,
  Building2,
  Globe2,
  MoveUpRight,
  House,
  Hotel,
  BriefcaseBusiness,
  Store,
  Layers3,
} from 'lucide-react';
import { categories, products } from '@/data/products';
import { articles } from '@/data/news';
import { Cta, Eyebrow, SectionHeading, ProductCard, Process, GoldLayers, JsonLd } from '@/components/ui';
import { ProjectGrid } from '@/components/catalog';
import { pageMeta } from '@/lib/seo';
// The root layout's title template does not apply to the root page segment, so the brand
// is spelled out here; every other route inherits "%s | MasterTechhomesolution".
export const metadata = pageMeta(
  'ลิฟต์บ้าน ลิฟต์โดยสาร บันไดเลื่อน | MasterTechhomesolution',
  'นำเข้าและจำหน่ายลิฟต์บ้าน ลิฟต์โดยสาร ลิฟต์โรงพยาบาล ลิฟต์ขนส่งสินค้า บันไดเลื่อน ทางเลื่อน และประตูลิฟต์ แบรนด์ Neramit โดย MASTER SCIENCE AND TECHNOLOGY',
  '/',
);
const strip = [
  { icon: Gem, title: 'วัสดุคุณภาพระดับพรีเมียม' },
  { icon: ShieldCheck, title: 'ดีไซน์หรู ทันสมัย' },
  { icon: Headset, title: 'บริการมืออาชีพ' },
  { icon: Globe2, title: 'ลิฟต์ครบทุกประเภทอาคาร' },
];
const faqs = [
  [
    'ต้องเตรียมอะไรบ้างก่อนติดตั้งลิฟต์บ้าน?',
    'เตรียมแบบอาคาร จำนวนชั้น และภาพพื้นที่ที่ต้องการติดตั้ง ทีมงานจะประเมินโครงสร้างและงานระบบก่อนแนะนำผลิตภัณฑ์ที่เหมาะสม',
  ],
  [
    'สามารถเลือกสีและวัสดุประตูลิฟต์ได้หรือไม่?',
    'ได้ ประตูหน้าชั้นมี 24 แบบ (NY-M101–M124) ทั้งเหล็กพ่นสี สเตนเลสแฮร์ไลน์ สเตนเลสกัดลาย และลายไม้ โดยต้องยืนยันความเข้ากันได้กับรุ่นลิฟต์ก่อนสั่งซื้อ',
  ],
  [
    'บริษัทมีลิฟต์ประเภทใดบ้าง?',
    'ลิฟต์บ้าน (Traction และ Steel Belt) ลิฟต์โดยสารแบบห้องเครื่องเล็กและไม่มีห้องเครื่อง ลิฟต์แก้ว ลิฟต์โรงพยาบาล ลิฟต์ขนส่งสินค้า ลิฟต์รถยนต์ รวมถึงบันไดเลื่อนและทางเลื่อน',
  ],
  [
    'ขอใบเสนอราคาได้อย่างไร?',
    'ติดต่อ 02-956-9876 หรือสแกน QR LINE พร้อมแจ้งประเภทสินค้าและพื้นที่ติดตั้ง หรือกรอกแบบฟอร์มขอใบเสนอราคาบนเว็บไซต์ ทีมงานจะติดต่อกลับในวันและเวลาทำการ',
  ],
];
export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map(([q, a]) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        }}
      />
      <section className="hero">
        {/* Art-directed hero photo: phones get the client's portrait PhoneBG so the
            glass lift stays in frame; wider screens keep the approved landscape HeroBG. */}
        <picture className="hero-visual">
          <source media="(max-width: 820px)" srcSet="/images/hero-bg-mobile.webp" width={941} height={1672} />
          <img
            src="/images/hero-bg.webp"
            alt="บ้านโมเดิร์นพร้อมลิฟต์บ้านกระจก ประตูไม้ และระบบล็อคอัจฉริยะ ในบรรยากาศยามเย็น"
            width={1774}
            height={887}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="hero-scrim" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="hero-eyebrow">MAST TECH &times; NERAMIT</p>
            <h1>
              มากกว่าเพียงสินค้า
              <br />
              <span>คือความมั่นใจ</span>
              <br />
              ในทุกการใช้งาน
            </h1>
            <p className="hero-description">
              ลิฟต์บ้าน ลิฟต์โดยสาร บันไดเลื่อน และอุปกรณ์ตกแต่ง
              <br />
              ตอบโจทย์ทุกพื้นที่ของคุณ
            </p>
            <p className="hero-kicker">
              SMART SOLUTIONS
              <br />
              FOR EVERY SPACE
            </p>
            <div className="hero-actions">
              <Link className="button button-gold" href="/products">
                <GoldLayers />
                <span className="gold-label">เลือกชมสินค้า</span>
                <ChevronRight size={20} aria-hidden="true" />
              </Link>
              <Link className="button button-ghost" href="/contact">
                ติดต่อทีมงาน <ChevronRight size={20} />
              </Link>
            </div>
          </div>
          <p className="hero-lifestyle" aria-hidden="true">
            <span>ELEVATE</span>
            <span>YOUR</span>
            <span>LIFESTYLE</span>
          </p>
        </div>
        <div className="container hero-categories" id="collections">
          <h2 className="sr-only">หมวดหมู่สินค้าและบริการ</h2>
          <ul className="category-bar">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={'/products?category=' + c.id} className="category-item">
                  <span className="category-thumb">
                    <Image src={'/products/' + c.image + '.webp'} alt="" fill sizes="96px" />
                  </span>
                  <span className="category-text">
                    <strong>{c.name}</strong>
                    <small>{c.en}</small>
                    <span className="category-go" aria-hidden="true">
                      <ChevronRight size={16} />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="trust-section" aria-label="จุดเด่นของเรา">
        <div className="container">
          <div className="trust-inner">
            {strip.map((t) => (
              <div key={t.title}>
                <t.icon size={34} strokeWidth={1.4} />
                <p>{t.title}</p>
              </div>
            ))}
            <p className="trust-quote">&ldquo;ด้วยเทคโนโลยี เพื่อชีวิตที่ดีกว่า&rdquo;</p>
          </div>
        </div>
      </section>
      <section className="section featured-section">
        <div className="container">
          <SectionHeading
            eyebrow="CURATED FOR YOUR SPACE"
            title="ผลิตภัณฑ์แนะนำ"
            description="เลือกโซลูชันที่เหมาะกับพื้นที่และการใช้งานของคุณ"
            href="/products"
            label="สำรวจคอลเลกชัน"
          />
          <div className="product-grid featured-grid">
            {['sightseeing-home-elevator', 'passenger-elevator', 'panoramic-elevator', 'escalator']
              .map((slug) => products.find((p) => p.slug === slug)!)
              .map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
      {/* 2026-09-23: the client removed the editorial showcase and the escalator/hall-door
          pair — they repeated the category bar above. This single supplied card replaces both.
          The artwork is built by scripts/prepare-homelift-card.mjs, which paints out the old
          Neramit mark on the photo and composites public/brand/neramit-logo-light.png instead. */}
      <section className="section homelift-section">
        <div className="container">
          <SectionHeading
            eyebrow="HOME ELEVATOR COLLECTION"
            title="ลิฟต์บ้าน Neramit"
            description="ห้องโดยสารซีรีส์ V100–V400 เลือกฝ้า ผนัง และพื้นได้ตามการตกแต่งของบ้าน"
            href="/products?category=elevators"
            label="ดูลิฟต์บ้านทั้งหมด"
          />
          <Link href="/products?category=elevators" className="homelift-card">
            <Image
              src="/products/homelift-card.webp"
              width={1254}
              height={1254}
              sizes="(max-width: 900px) 92vw, 1000px"
              alt="ห้องโดยสารลิฟต์บ้าน Neramit รุ่น NY-V204, NY-V206 และ NY-V205 พร้อมรายละเอียดวัสดุฝ้า ผนัง และพื้นของแต่ละรุ่น"
            />
          </Link>
        </div>
      </section>
      <section className="section solutions-section">
        <div className="container">
          <SectionHeading
            eyebrow="SOLUTIONS FOR EVERY SPACE"
            title="โซลูชันสำหรับทุกพื้นที่"
            description="เข้าใจความแตกต่างของทุกพื้นที่ เพื่อเลือกเทคโนโลยีที่เหมาะสม"
          />
          <div className="solutions-grid">
            {[
              {
                icon: House,
                title: 'บ้านพักอาศัย',
                en: 'LUXURY HOME',
                text: 'ลิฟต์บ้าน · ห้องโดยสารซีรีส์ V',
                category: 'elevators',
              },
              {
                icon: Layers3,
                title: 'คอนโดมิเนียม',
                en: 'CONDOMINIUM',
                text: 'ลิฟต์โดยสาร · ประตูลิฟต์',
                category: 'passenger',
              },
              {
                icon: BriefcaseBusiness,
                title: 'อาคารสำนักงาน',
                en: 'WORKPLACE',
                text: 'ลิฟต์โดยสาร · ลิฟต์ MRL',
                category: 'passenger',
              },
              { icon: Hotel, title: 'โรงพยาบาล', en: 'HEALTHCARE', text: 'ลิฟต์โรงพยาบาล · ลิฟต์เตียง', category: 'passenger' },
              {
                icon: Building2,
                title: 'โรงงาน / คลังสินค้า',
                en: 'INDUSTRIAL',
                text: 'ลิฟต์ขนส่งสินค้า · ลิฟต์รถยนต์',
                category: 'freight',
              },
              {
                icon: Store,
                title: 'ห้าง / ระบบขนส่ง',
                en: 'COMMERCIAL & TRANSIT',
                text: 'บันไดเลื่อน · ทางเลื่อน · ลิฟต์แก้ว',
                category: 'escalators',
              },
            ].map((s) => (
              <Link href={'/products?category=' + s.category} className="solution-card" key={s.en}>
                <s.icon size={30} />
                <p className="micro">{s.en}</p>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section why-section">
        <div className="container why-inner">
          <div>
            <Eyebrow>THE MASTER DIFFERENCE</Eyebrow>
            <h2>
              เพราะรายละเอียด
              <br />
              <span>สร้างความแตกต่าง</span>
            </h2>
            <p>ทำไมต้อง MASTER SCIENCE & TECHNOLOGY</p>
            <Link href="/about" className="text-link">
              รู้จักเรามากขึ้น <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="why-list">
            {[
              ['โซลูชันครบวงจร', 'ตั้งแต่การให้คำปรึกษา เลือกผลิตภัณฑ์ ออกแบบ ติดตั้ง และดูแลหลังการขาย'],
              ['ใส่ใจมาตรฐานความปลอดภัย', 'ระบบป้องกัน UCMP ม่านแสง 3D light curtain อุปกรณ์กันความเร็วเกิน safety gear และ buffer ตามแค็ตตาล็อกสินค้า'],
              ['ดีไซน์ที่เข้ากับสถาปัตยกรรม', 'เลือกวัสดุ สี และรูปแบบให้เข้ากับบ้าน อาคาร หรือโครงการ'],
              ['ดูแลโครงการอย่างเป็นระบบ', 'ให้คำแนะนำและประสานงานในทุกขั้นตอนของโครงการ'],
              ['บริการหลังการขาย', 'วางแผนตรวจสอบ บำรุงรักษา และดูแลผลิตภัณฑ์หลังติดตั้ง'],
            ].map(([t, d], i) => (
              <div key={t}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
                <MoveUpRight size={18} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Process />
      <section className="section projects-preview">
        <div className="container">
          <SectionHeading
            eyebrow="SPACES THAT INSPIRE"
            title="ผลงานของเรา"
            description="แนวคิดการประยุกต์ใช้ผลิตภัณฑ์จากแค็ตตาล็อกในพื้นที่หลากรูปแบบ"
            href="/projects"
          />
          <ProjectGrid preview />
          <p className="section-note">
            ภาพแนวคิดจากแค็ตตาล็อกสินค้า เพื่อแสดงแนวทางการออกแบบ ไม่ใช่ภาพโครงการลูกค้าที่ส่งมอบแล้ว
          </p>
        </div>
      </section>
      <section className="service-banner">
        <div className="container">
          <Headset size={48} />
          <div>
            <Eyebrow>WITH YOU, EVERY STEP</Eyebrow>
            <h2>
              ดูแลตั้งแต่การเลือก
              <br />
              จนถึงหลังการติดตั้ง
            </h2>
            <p>ให้คำปรึกษา · ออกแบบ · ติดตั้ง · บำรุงรักษา</p>
          </div>
          <Link className="button button-outline" href="/services">
            บริการของเรา <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="JOURNAL & INSIGHTS"
            title="แนวคิดเพื่อการอยู่อาศัยที่ดีกว่า"
            href="/news"
            label="อ่านบทความทั้งหมด"
          />
          <div className="news-grid">
            {articles.slice(0, 3).map((a) => (
              <Link key={a.slug} href={'/news/' + a.slug} className="news-card">
                <div className="news-image">
                  <Image
                    src={'/products/' + a.image + '.webp'}
                    alt={a.alt}
                    fill
                    sizes="(max-width:600px) 90vw, 30vw"
                  />
                </div>
                <p className="micro">{a.category}</p>
                <h3>{a.title}</h3>
                <span className="text-link">
                  อ่านบทความ <ArrowUpRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section faq-section">
        <div className="container faq-inner">
          <div>
            <Eyebrow>GOOD QUESTIONS. CLEAR ANSWERS.</Eyebrow>
            <h2>เริ่มต้นอย่างมั่นใจ</h2>
            <p>คำถามที่พบบ่อยก่อนเลือกโซลูชัน</p>
          </div>
          <div>
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span>+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}

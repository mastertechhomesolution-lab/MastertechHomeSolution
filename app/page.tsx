import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Gem,
  Settings,
  Users,
  BadgeCheck,
  FileText,
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
import { QuoteButton } from '@/components/website';
import { Cta, Eyebrow, SectionHeading, ProductCard, Process } from '@/components/ui';
import { ProjectGrid } from '@/components/catalog';
import { pageMeta } from '@/lib/seo';
export const metadata = pageMeta(
  'ลิฟต์บ้าน ประตูลิฟต์ และ Smart Living',
  'MasterTechhomesolution โซลูชันลิฟต์บ้าน ประตูลิฟต์ Smart Lock และระบบประตู พร้อมให้คำปรึกษา ติดตั้ง และดูแลหลังการขาย',
  '/',
);
const benefits = [
  { icon: ShieldCheck, title: 'ใส่ใจความปลอดภัย', text: 'ในทุกการใช้งาน' },
  { icon: Gem, title: 'ดีไซน์ทันสมัย', text: 'หรูหรา' },
  { icon: Settings, title: 'เทคโนโลยี', text: 'เพื่อการอยู่อาศัย' },
  { icon: Users, title: 'บริการครบวงจร', text: 'ติดตั้งและดูแล' },
];
const trust = [
  { icon: Building2, title: 'เหมาะสำหรับบ้าน', text: 'คอนโด อาคารสำนักงาน' },
  { icon: BadgeCheck, title: 'ใส่ใจคุณภาพวัสดุ', text: 'ดีไซน์หลากหลาย' },
  { icon: Headset, title: 'ทีมงานดูแลโครงการ', text: 'และบริการหลังการขาย' },
  { icon: Globe2, title: 'ปรึกษาพื้นที่ให้บริการ', text: 'ทั่วประเทศไทย' },
];
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-visual">
          <Image
            src="/images/hero-mock.webp"
            alt="แนวคิดทางเข้าสถาปัตยกรรม ลิฟต์ ประตู และ Smart Lock จากภาพอ้างอิงของบริษัท"
            fill
            priority
            sizes="(max-width:1000px) 100vw, 72vw"
          />
        </div>
        <div className="hero-glow" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1>
              ยกระดับ
              <br />
              <span>ทุกพื้นที่ของคุณ</span>
            </h1>
            <p className="hero-description">
              ลิฟต์ ประตูลิฟต์ ระบบล็อคประตู
              <br />
              ดีไซน์สวย ปลอดภัย ทันสมัย
            </p>
            <p className="hero-divider">
              <span />
              LIFT YOUR LIFE
              <span />
            </p>
            <ul className="hero-benefits">
              {benefits.map((b) => (
                <li key={b.title}>
                  <span className="hero-benefit-icon">
                    <b.icon size={26} />
                  </span>
                  <strong>{b.title}</strong>
                  <span>{b.text}</span>
                </li>
              ))}
            </ul>
            <div className="hero-actions">
              <Link className="button" href="/products">
                เลือกดูสินค้า <ChevronRight size={20} />
              </Link>
              <Link className="button button-ghost" href="/contact">
                ติดต่อเรา <ChevronRight size={20} />
              </Link>
            </div>
          </div>
          <p className="hero-quote">
            “มากกว่าการเดินทาง
            <br />
            คือความปลอดภัยในทุกวัน”
          </p>
        </div>
        <div className="container hero-categories" id="collections">
          <h2 className="sr-only">หมวดหมู่สินค้าและบริการ</h2>
          <ul className="category-bar">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={c.id === 'services' ? '/services' : '/products?category=' + c.id} className="category-item">
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
            {trust.map((t) => (
              <div key={t.title}>
                <t.icon size={38} />
                <p>
                  {t.title}
                  <span>{t.text}</span>
                </p>
              </div>
            ))}
            <QuoteButton className="trust-cta">
              <FileText size={34} />
              <span>
                ขอใบเสนอราคา
                <strong>ฟรี !</strong>
              </span>
              <ChevronRight size={26} />
            </QuoteButton>
          </div>
          <p className="trust-tagline">
            MAST TECH <i>|</i> NERAMIT <i>|</i> ELEVATOR &amp; DOOR SOLUTIONS <i>|</i> A SAFER, SMARTER TOMORROW
          </p>
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
            {[products[0], products[2], products[6], products[9]].map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
      <section className="editorial-showcase">
        <div className="showcase-image">
          <Image
            src="/products/champagne.webp"
            fill
            sizes="(max-width:700px) 100vw, 50vw"
            alt="ห้องโดยสารลิฟต์คอลเลกชันแชมเปญ"
          />
          <span>THE ART OF EVERYDAY LIVING</span>
        </div>
        <div className="showcase-content">
          <Eyebrow>HOME ELEVATOR COLLECTION</Eyebrow>
          <h2>
            ยกระดับการใช้ชีวิต
            <br />
            <span>อย่างมีสไตล์</span>
          </h2>
          <p>
            ให้ทุกการเดินทางภายในบ้าน เป็นส่วนหนึ่งของประสบการณ์ที่พิเศษ
            ด้วยลิฟต์ที่ผสานความสะดวกเข้ากับรายละเอียดทางสถาปัตยกรรมอย่างลงตัว
          </p>
          <div className="showcase-detail">
            <span>01</span>
            <div>
              <h3>ออกแบบให้เป็นส่วนหนึ่งของบ้าน</h3>
              <p>เลือกวัสดุ โทนสี และรูปแบบที่สะท้อนตัวตนของคุณ</p>
            </div>
          </div>
          <Link href="/products?category=elevators" className="text-link">
            ค้นพบลิฟต์สำหรับบ้านคุณ <ArrowUpRight size={19} />
          </Link>
          <div className="partner-mark">
            <Image src="/brand/neramit-logo.png" width={360} height={360} alt="Neramit" unoptimized />
            <span>
              CRAFTED FOR
              <br />
              EXCEPTIONAL SPACES
            </span>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container dual-showcase">
          {[
            {
              image: 'smart-lock',
              label: 'SMART LOCK',
              title: 'ความปลอดภัย\nที่เริ่มต้นตั้งแต่หน้าประตู',
              href: '/products?category=locks',
            },
            {
              image: 'hall-door',
              label: 'ELEVATOR DOOR',
              title: 'ทุกรายละเอียด\nสะท้อนคุณภาพ',
              href: '/products?category=doors',
            },
          ].map((x) => (
            <Link href={x.href} key={x.label} className="mini-showcase">
              <Image src={'/products/' + x.image + '.webp'} alt={x.label} fill sizes="(max-width:700px) 90vw, 45vw" />
              <div>
                <p className="micro">{x.label}</p>
                <h2>{x.title}</h2>
                <span className="text-link">
                  ค้นพบคอลเลกชัน <ArrowUpRight size={19} />
                </span>
              </div>
            </Link>
          ))}
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
                text: 'ลิฟต์บ้าน · Smart Lock',
                category: 'elevators',
              },
              {
                icon: Layers3,
                title: 'คอนโดมิเนียม',
                en: 'CONDOMINIUM',
                text: 'ลิฟต์โดยสาร · ประตูลิฟต์',
                category: 'doors',
              },
              {
                icon: BriefcaseBusiness,
                title: 'อาคารสำนักงาน',
                en: 'WORKPLACE',
                text: 'ระบบประตู · ระบบเข้าออก',
                category: 'automatic',
              },
              { icon: Hotel, title: 'โรงแรม', en: 'HOSPITALITY', text: 'ประตูลิฟต์ · งานตกแต่ง', category: 'doors' },
              {
                icon: Building2,
                title: 'โครงการอสังหาริมทรัพย์',
                en: 'DEVELOPMENT',
                text: 'โซลูชันลิฟต์และประตูครบวงจร',
                category: 'elevators',
              },
              {
                icon: Store,
                title: 'ร้านค้า / Commercial',
                en: 'COMMERCIAL',
                text: 'ประตูอัตโนมัติ · Smart Lock',
                category: 'automatic',
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
              ['ใส่ใจมาตรฐานความปลอดภัย', 'พิจารณาคุณภาพ ความปลอดภัย และความเหมาะสมกับการใช้งานของแต่ละพื้นที่'],
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
            description="แนวคิดการประยุกต์ใช้ผลิตภัณฑ์ในพื้นที่หลากรูปแบบ"
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
                    alt={a.title}
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
            {[
              [
                'ต้องเตรียมอะไรบ้างก่อนติดตั้งลิฟต์บ้าน?',
                'เตรียมแบบอาคาร จำนวนชั้น และภาพพื้นที่ที่ต้องการติดตั้ง ทีมงานจะประเมินโครงสร้างและงานระบบก่อนแนะนำผลิตภัณฑ์ที่เหมาะสม',
              ],
              [
                'สามารถเลือกสีและวัสดุประตูลิฟต์ได้หรือไม่?',
                'มีตัวเลือกในแค็ตตาล็อก เช่น โทนโลหะและลวดลายตกแต่ง โดยต้องยืนยันความพร้อมและความเข้ากันได้กับรุ่นที่เลือกก่อนสั่งซื้อ',
              ],
              [
                'ขอใบเสนอราคาได้อย่างไร?',
                'ติดต่อ 02-956-9876 หรือสแกน QR LINE พร้อมแจ้งประเภทสินค้าและพื้นที่ติดตั้ง แบบฟอร์มบนเว็บไซต์เวอร์ชันนี้เป็นการสาธิตเท่านั้น',
              ],
            ].map(([q, a]) => (
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

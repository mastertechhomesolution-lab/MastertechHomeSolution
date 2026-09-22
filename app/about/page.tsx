import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero, Eyebrow, SectionHeading, Cta } from '@/components/ui';
import { company } from '@/data/company';
import { pageMeta } from '@/lib/seo';
// Company introduction, values and technology copy are translated from the company's own
// catalog (Product/ข้อมูลบริษัทสินค้า.pdf). Product-spec figures stay attributed to the catalog.
export const metadata = pageMeta(
  'เกี่ยวกับเรา',
  'รู้จัก MASTER SCIENCE AND TECHNOLOGY CO., LTD. ผู้นำเสนอโซลูชันวิทยาศาสตร์และเทคโนโลยี ลิฟต์บ้าน ลิฟต์โดยสาร ลิฟต์ขนส่งสินค้า บันไดเลื่อน และ Smart Parking Lift ภายใต้แบรนด์ Neramit สำหรับบ้าน อาคาร และธุรกิจ',
  '/about',
);
export default function Page() {
  return (
    <>
      <PageHero
        label="ABOUT MASTERTECH"
        title={'ขับเคลื่อนอนาคต\nด้วยวิทยาศาสตร์และเทคโนโลยี'}
        description={company.name + ' — ' + company.slogan}
        image="hero-about"
        alt="อาคารสถาปัตยกรรมกระจกและบรอนซ์ร่วมสมัยในแสงยามเย็น"
      />
      <section className="section container about-intro">
        <div>
          <Eyebrow>COMPANY INTRODUCTION</Eyebrow>
          <h2>
            เทคโนโลยีที่ช่วยสร้าง
            <br />
            พื้นที่ที่ชาญฉลาดกว่า
          </h2>
        </div>
        <div>
          <p className="lead">
            {company.name} มุ่งมั่นนำโซลูชันด้านวิทยาศาสตร์และเทคโนโลยีที่เป็นนวัตกรรม
            มาสู่การอยู่อาศัยและสภาพแวดล้อมทางธุรกิจยุคใหม่
          </p>
          <p>
            เรามุ่งเน้นโซลูชันขั้นสูงที่เพิ่มความสะดวก ประสิทธิภาพ ความปลอดภัย และการใช้พื้นที่อย่างคุ้มค่า
            กลุ่มผลิตภัณฑ์ของเราประกอบด้วย Smart Parking Lift และ Home Lift ที่ออกแบบให้ตอบความต้องการของอาคารสมัยใหม่
            ที่พักอาศัย และพื้นที่เชิงพาณิชย์ รวมถึงลิฟต์โดยสาร ลิฟต์โรงพยาบาล ลิฟต์ขนส่งสินค้า บันไดเลื่อน และทางเลื่อน
            โดยบริษัทนำเข้าผลิตภัณฑ์และจัดจำหน่ายภายใต้แบรนด์ของเราเอง Neramit
          </p>
          <p>Driving innovation. Creating smarter spaces. Shaping the future.</p>
          <div className="about-brands">
            <Image src="/brand/mast-tech-logo.png" width={495} height={360} alt="Mast Tech" unoptimized />
            <span />
            <Image src="/brand/neramit-logo.png" width={360} height={360} alt="Neramit" unoptimized />
          </div>
        </div>
      </section>
      <section className="section secondary-section">
        <div className="container mission-grid">
          <article>
            <span className="micro">OUR MISSION</span>
            <h2>พันธกิจของเรา</h2>
            <p>
              นำโซลูชันด้านวิทยาศาสตร์และเทคโนโลยีที่เป็นนวัตกรรม มาช่วยเพิ่มความสะดวก ประสิทธิภาพ ความปลอดภัย
              และการใช้พื้นที่อย่างคุ้มค่า ให้กับที่พักอาศัย อาคาร และธุรกิจ
            </p>
          </article>
          <article>
            <span className="micro">OUR VISION</span>
            <h2>วิสัยทัศน์ของเรา</h2>
            <p>
              เราเชื่อว่าเทคโนโลยีไม่ควรเพียงก้าวตามโลกที่เปลี่ยนไป แต่ควรช่วยกำหนดสิ่งที่จะเกิดขึ้นต่อไป
              เพื่อสร้างพื้นที่ที่ชาญฉลาดกว่า และพาสังคมไปสู่อนาคตที่มีประสิทธิภาพและเชื่อมต่อกันมากขึ้น
            </p>
          </article>
        </div>
      </section>
      <section className="section container">
        <SectionHeading eyebrow="WHAT WE BELIEVE" title="คุณค่าที่เราให้ความสำคัญ" />
        <div className="values-grid">
          {[
            ['CRAFTSMANSHIP', 'คัดสรรสินค้าคุณภาพที่ผลิตอย่างประณีต'],
            ['INTELLIGENCE', 'ก้าวทันยุคสมัยด้วยเทคโนโลยีอัจฉริยะ'],
            ['BRIGHT FUTURE', 'บริการหลังการขายที่ช่วยประหยัดเวลาและแรง'],
            ['INNOVATION', 'ขับเคลื่อนด้วยนวัตกรรม'],
            ['SMARTER SPACES', 'สร้างพื้นที่ที่ชาญฉลาดกว่า'],
            ['FUTURE', 'ร่วมกำหนดอนาคต'],
          ].map(([en, th], i) => (
            <div key={en}>
              <span>0{i + 1}</span>
              <h3>{en}</h3>
              <p>{th}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section container history-section">
        <SectionHeading eyebrow="TECHNOLOGY INSIDE" title="เทคโนโลยีในผลิตภัณฑ์" />
        <div className="history-line">
          {[
            [
              'ระบบควบคุมและเครื่องลากรุ่นใหม่',
              'ระบบควบคุม CAN bus พร้อม VVVF และหน่วยประมวลผล 32-bit DSP ทำงานร่วมกับเครื่องลาก Permanent magnet synchronous gearless ที่เงียบ ไม่ต้องเปลี่ยนน้ำมันหล่อลื่น',
            ],
            [
              'ความปลอดภัยหลายชั้น',
              'Overspeed Limit Device, Safety Gear, Buffer, ระบบ UCMP และม่านแสง 3D light curtain รวมถึงฟังก์ชันความปลอดภัยมาตรฐานอีกหลายรายการ',
            ],
            [
              'ประหยัดพลังงานและรักษาสิ่งแวดล้อม',
              'ไฟ LED ในห้องโดยสาร ระบบปิดไฟและพัดลมอัตโนมัติเมื่อไม่มีการใช้งาน และระบบ Energy feedback (ตัวเลือก) ที่ป้อนพลังงานกลับสู่อาคาร',
            ],
          ].map(([t, d]) => (
            <div key={t}>
              <span className="history-dot" />
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
        <p className="section-note">
          ข้อมูลเทคโนโลยีและฟังก์ชันอ้างอิงจากแค็ตตาล็อกสินค้าของบริษัท ฟังก์ชันที่ติดตั้งจริงขึ้นอยู่กับรุ่นและตัวเลือกที่สั่งซื้อ
        </p>
      </section>
      <section className="section secondary-section">
        <div className="container about-intro">
          <div className="company-media">
            <Image
              src="/products/production-hall.webp"
              alt="สายการผลิตชิ้นส่วนลิฟต์ผลิตภัณฑ์ Neramit จากแค็ตตาล็อกบริษัท"
              fill
              sizes="(max-width: 700px) 100vw, 45vw"
            />
          </div>
          <div>
            <Eyebrow>PRODUCTION & QUALITY</Eyebrow>
            <h2>คุณภาพที่ผ่านการขัดเกลา</h2>
            <p>
              ผลิตภัณฑ์ Neramit ที่เรานำเข้า ผลิตด้วยเครื่องจักรอย่างเครื่องพับดิจิทัล เครื่องปั๊มหลายสถานี
              และเครื่องตัดแผ่นโลหะดิจิทัล ตรวจสอบคุณภาพตามมาตรฐานการจัดการตั้งแต่ชิ้นส่วนเล็ก ๆ จนถึงลิฟต์ทั้งชุด
              ก่อนส่งถึงงานติดตั้งหน้างานโดยทีมงานของเรา
            </p>
            <Link href="/products" className="text-link">
              ดูผลิตภัณฑ์ทั้งหมด <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}

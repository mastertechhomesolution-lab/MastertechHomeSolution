import { MessageSquare, ScanLine, PenTool, Wrench, ShieldCheck, Settings, Headset } from 'lucide-react';
import { PageHero, SectionHeading, Process, Cta } from '@/components/ui';
import { QuoteButton } from '@/components/website';
import { pageMeta } from '@/lib/seo';
export const metadata = pageMeta(
  'บริการติดตั้งและบำรุงรักษา',
  'ให้คำปรึกษา สำรวจพื้นที่ ออกแบบ ติดตั้ง ตรวจสอบ และบำรุงรักษาลิฟต์บ้าน ลิฟต์โดยสาร ลิฟต์ขนส่งสินค้า บันไดเลื่อน และทางเลื่อน',
  '/services',
);
export default function Page() {
  return (
    <>
      <PageHero
        label="SERVICE & CARE"
        title={'บริการครบวงจร\nตั้งแต่การออกแบบจนถึงการดูแล'}
        description="เข้าใจพื้นที่ ใส่ใจผู้ใช้งาน และดูแลทุกรายละเอียดของโครงการ"
        image="hero-services"
        alt="ห้องเครื่องลิฟต์พร้อมเครื่องลากแบบ gearless และรางนำ"
      />
      <section className="section container">
        <SectionHeading eyebrow="EXPERTISE AT EVERY STEP" title="ดูแลด้วยความเข้าใจ" />
        <div className="service-grid">
          {[
            {
              icon: MessageSquare,
              name: 'ให้คำปรึกษา',
              text: 'รับฟังความต้องการและแนะนำแนวทางผลิตภัณฑ์ให้เหมาะกับพื้นที่และงบประมาณ',
            },
            {
              icon: ScanLine,
              name: 'สำรวจหน้างาน',
              text: 'ตรวจสอบสภาพพื้นที่และข้อจำกัด เพื่อเตรียมข้อมูลสำหรับการวางแผน',
            },
            {
              icon: PenTool,
              name: 'ออกแบบและวางระบบ',
              text: 'ประสานงานรูปแบบ วัสดุ และระบบที่เกี่ยวข้องกับงานสถาปัตยกรรม',
            },
            { icon: Wrench, name: 'ติดตั้ง', text: 'วางแผนดำเนินงานและประสานความพร้อมของพื้นที่ก่อนเข้าติดตั้ง' },
            { icon: ShieldCheck, name: 'ตรวจสอบระบบ', text: 'ตรวจสอบการทำงานและแนะนำวิธีใช้งานก่อนส่งมอบ' },
            {
              icon: Settings,
              name: 'บำรุงรักษา',
              text: 'วางแผนตรวจสอบตามรุ่นผลิตภัณฑ์ สภาพแวดล้อม และความถี่การใช้งาน',
            },
            {
              icon: Headset,
              name: 'บริการหลังการขาย',
              text: 'รับเรื่องและประสานทีมบริการ พร้อมให้คำแนะนำในการดูแลผลิตภัณฑ์',
            },
          ].map((s, i) => (
            <article key={s.name} className="service-card">
              <span className="service-number">0{i + 1}</span>
              <s.icon size={30} />
              <h2>{s.name}</h2>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </section>
      <div id="process">
        <Process />
      </div>
      <section className="section container care-section" id="care">
        <div>
          <SectionHeading
            eyebrow="LONG-TERM PEACE OF MIND"
            title="ความใส่ใจที่ไม่จบในวันส่งมอบ"
            description="บริษัทยึดแนวทาง Customer focus ดูแลตั้งแต่ช่วงก่อสร้างโครงการตลอดอายุการใช้งานของผลิตภัณฑ์ แจ้งประเภทผลิตภัณฑ์ อาการที่พบ และสถานที่ติดตั้ง เพื่อให้ทีมงานประเมินและประสานบริการได้อย่างเหมาะสม"
          />
          <QuoteButton product="บริการบำรุงรักษา">นัดหมายปรึกษาทีมบริการ</QuoteButton>
        </div>
        <div className="care-box">
          <h3>เตรียมข้อมูลก่อนนัดหมาย</h3>
          <ol>
            <li>ชื่อรุ่นหรือภาพผลิตภัณฑ์</li>
            <li>สถานที่และผู้ติดต่อหน้างาน</li>
            <li>รายละเอียดอาการหรือบริการที่ต้องการ</li>
            <li>วันและเวลาที่สะดวก</li>
          </ol>
          <p>ขอบเขตบริการและค่าใช้จ่ายจะยืนยันหลังประเมินข้อมูล</p>
        </div>
      </section>
      <Cta />
    </>
  );
}

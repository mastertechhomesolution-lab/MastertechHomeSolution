import Image from 'next/image';
import { PageHero, Eyebrow, SectionHeading, Cta } from '@/components/ui';
import { company } from '@/data/company';
import { pageMeta } from '@/lib/seo';
export const metadata = pageMeta(
  'เกี่ยวกับเรา',
  'รู้จัก MASTER SCIENCE AND TECHNOLOGY และแนวคิดโซลูชันลิฟต์ ประตู และ Smart Living ที่ผสานดีไซน์ เทคโนโลยี และการบริการ',
  '/about',
);
export default function Page() {
  return (
    <>
      <PageHero
        label="ABOUT MASTERTECH"
        title={'เทคโนโลยีที่ออกแบบ\nเพื่อคุณภาพชีวิตที่ดีกว่า'}
        description={company.name}
        image="panorama"
      />
      <section className="section container about-intro">
        <div>
          <Eyebrow>DESIGN. TECHNOLOGY. PEOPLE.</Eyebrow>
          <h2>
            เราเชื่อว่าเทคโนโลยีที่ดี
            <br />
            ควรเข้ากับชีวิตของคุณ
          </h2>
        </div>
        <div>
          <p className="lead">
            MasterTechhomesolution นำเสนอแนวทางด้านลิฟต์ ประตูลิฟต์ ระบบล็อค และระบบประตู สำหรับบ้าน อาคาร และโครงการ
          </p>
          <p>
            เราให้ความสำคัญกับการเลือกผลิตภัณฑ์ที่ตอบโจทย์ทั้งการใช้งานและงานสถาปัตยกรรม ตั้งแต่ทำความเข้าใจพื้นที่
            ให้คำปรึกษา วางแผนติดตั้ง ไปจนถึงการดูแลหลังส่งมอบ เพื่อให้ทุกองค์ประกอบทำงานร่วมกันอย่างเหมาะสม
          </p>
          <div className="about-brands">
            <Image src="/brand/mast-tech.png" width={100} height={100} alt="Mast Tech" />
            <span />
            <Image src="/brand/neramit.png" width={100} height={100} alt="Neramit" />
          </div>
        </div>
      </section>
      <section className="section secondary-section">
        <div className="container mission-grid">
          <article>
            <span className="micro">OUR MISSION</span>
            <h2>พันธกิจของเรา</h2>
            <p>ส่งมอบโซลูชันด้านลิฟต์ ประตู และระบบความปลอดภัย ที่ผสานเทคโนโลยี ดีไซน์ และการบริการอย่างมืออาชีพ</p>
          </article>
          <article>
            <span className="micro">OUR VISION</span>
            <h2>วิสัยทัศน์ของเรา</h2>
            <p>พัฒนาโซลูชัน Smart Living ที่ทำให้ทุกพื้นที่ปลอดภัย สะดวก และสวยงามยิ่งขึ้น</p>
          </article>
        </div>
      </section>
      <section className="section container">
        <SectionHeading eyebrow="WHAT WE BELIEVE" title="คุณค่าที่เราให้ความสำคัญ" />
        <div className="values-grid">
          {[
            ['QUALITY', 'ใส่ใจคุณภาพ'],
            ['SAFETY', 'คำนึงถึงความปลอดภัย'],
            ['DESIGN', 'ออกแบบอย่างเข้าใจ'],
            ['TECHNOLOGY', 'เทคโนโลยีที่เหมาะสม'],
            ['SERVICE', 'ดูแลอย่างต่อเนื่อง'],
            ['TRUST', 'ความไว้วางใจ'],
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
        <SectionHeading eyebrow="OUR NEXT CHAPTER" title="เส้นทางของเรา" />
        <div className="history-line">
          {['จุดเริ่มต้นของบริษัท', 'การพัฒนาผลิตภัณฑ์และบริการ', 'ก้าวต่อไปของ Smart Living'].map((t) => (
            <div key={t}>
              <span className="history-dot" />
              <h3>{t}</h3>
              <p>เตรียมเพิ่มเติมข้อมูลจากบริษัท</p>
            </div>
          ))}
        </div>
        <p className="section-note">ประวัติและเหตุการณ์สำคัญจะเผยแพร่เมื่อได้รับการยืนยันจากบริษัท</p>
      </section>
      <Cta />
    </>
  );
}

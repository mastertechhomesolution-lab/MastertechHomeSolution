import { PageHero, Cta } from '@/components/ui';
import { ProjectGrid } from '@/components/catalog';
import { pageMeta } from '@/lib/seo';
export const metadata = pageMeta(
  'ผลงานและแนวคิดการออกแบบ',
  'แนวคิดการนำลิฟต์และระบบประตูมาใช้กับบ้าน คอนโด สำนักงาน และโรงแรม',
  '/projects',
);
export default function Page() {
  return (
    <>
      <PageHero
        label="SPACES & POSSIBILITIES"
        title="ทุกพื้นที่ มีเรื่องราวของตัวเอง"
        description="สำรวจแนวทางที่เทคโนโลยีและสถาปัตยกรรมสร้างประสบการณ์ร่วมกัน"
        image="champagne"
      />
      <section className="section container">
        <p className="concept-note">
          คอลเลกชันแนวคิดสำหรับการนำเสนอ ใช้ภาพผลิตภัณฑ์ที่บริษัทจัดเตรียม ยังไม่ใช่ผลงานลูกค้าที่ได้รับการยืนยัน
        </p>
        <ProjectGrid />
      </section>
      <Cta />
    </>
  );
}

import { PageHero, Eyebrow, JsonLd } from '@/components/ui';
import { InquiryForm, ContactDetails } from '@/components/website';
import { company } from '@/data/company';
import { pageMeta, siteUrl } from '@/lib/seo';
export const metadata = pageMeta(
  'ติดต่อเรา',
  'ติดต่อ MASTER SCIENCE AND TECHNOLOGY (MasterTechhomesolution) โทร 02-956-9876 สำนักงาน 36/33 หมู่ 1 ซอยเลียบวารี 61 แขวงโคกแฝด เขตหนองจอก กรุงเทพฯ 10530 จันทร์–เสาร์ 08.00–17.00 น.',
  '/contact',
);
export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: company.siteName,
          legalName: company.name,
          telephone: company.COMPANY_PHONE,
          address: company.postalAddress,
          openingHoursSpecification: company.openingHoursSpecification,
          ...(siteUrl ? { url: siteUrl, image: siteUrl + '/brand/mast-tech.png' } : {}),
          ...(company.GOOGLE_BUSINESS_URL ? { sameAs: [company.GOOGLE_BUSINESS_URL] } : {}),
        }}
      />
      <PageHero
        label="LET’S TALK"
        title={'พูดคุยกับ\nทีมของเรา'}
        description="ไม่ว่าจะเป็นบ้านหนึ่งหลัง หรือโครงการใหม่ เรายินดีช่วยคุณเลือกโซลูชันที่เหมาะสม"
        image="hero-contact"
        alt="โถงต้อนรับหรูหราโทนหินอ่อนและทองแชมเปญพร้อมประตูลิฟต์"
      />
      <section className="section container contact-layout">
        <div>
          <Eyebrow>WE’RE HERE TO HELP</Eyebrow>
          <h2>เริ่มต้นโครงการของคุณ</h2>
          <ContactDetails />
          <p className="privacy-note">กรุณานัดหมายก่อนเข้าพบทีมงาน</p>
        </div>
        <div className="contact-form-card">
          <h2>บอกเราเกี่ยวกับพื้นที่ของคุณ</h2>
          <p className="muted">กรอกข้อมูลเพื่อทดลองขั้นตอนการสอบถาม</p>
          <InquiryForm contact />
        </div>
      </section>
    </>
  );
}

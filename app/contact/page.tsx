import { PageHero, Eyebrow, JsonLd } from '@/components/ui';
import { InquiryForm, ContactDetails } from '@/components/website';
import { company } from '@/data/company';
import { pageMeta, siteUrl } from '@/lib/seo';
export const metadata = pageMeta(
  'ติดต่อเรา',
  'ติดต่อ MasterTechhomesolution โทร 02-956-9876 สำนักงานแขวงโคกแฝด เขตหนองจอก กรุงเทพฯ จันทร์–เสาร์ 08.00–17.00 น.',
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
          address: {
            '@type': 'PostalAddress',
            streetAddress: '36/19 หมู่ 1 ถนนเลียบวารี ซอยเลียบวารี 61',
            addressLocality: 'แขวงโคกแฝด เขตหนองจอก',
            addressRegion: 'กรุงเทพมหานคร',
            addressCountry: 'TH',
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              opens: '08:00',
              closes: '17:00',
            },
          ],
          ...(siteUrl ? { url: siteUrl, image: siteUrl + '/brand/mast-tech.png' } : {}),
          ...(company.GOOGLE_BUSINESS_URL ? { sameAs: [company.GOOGLE_BUSINESS_URL] } : {}),
        }}
      />
      <PageHero
        label="LET’S TALK"
        title="พูดคุยกับทีมของเรา"
        description="ไม่ว่าจะเป็นบ้านหนึ่งหลัง หรือโครงการใหม่ เรายินดีช่วยคุณเลือกโซลูชันที่เหมาะสม"
        image="modern"
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

import { Catalog } from '@/components/catalog';
import { PageHero, Cta, JsonLd } from '@/components/ui';
import { pageMeta, breadcrumbs } from '@/lib/seo';
export const metadata = pageMeta(
  'สินค้าและโซลูชัน',
  'สำรวจลิฟต์บ้าน ประตูลิฟต์ Smart Lock ระบบประตูอัตโนมัติ และอุปกรณ์ตกแต่ง พร้อมปรึกษาการเลือกผลิตภัณฑ์',
  '/products',
);
export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: 'สินค้า', path: '/products' }])} />
      <PageHero
        label="OUR COLLECTIONS"
        title="เทคโนโลยีที่ลงตัวกับทุกพื้นที่"
        description="คัดสรรรายละเอียดที่ใช่ เพื่อการอยู่อาศัยที่สะดวก ปลอดภัย และสวยงาม"
        image="panorama"
      />
      <Catalog />
      <Cta />
    </>
  );
}

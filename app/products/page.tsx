import { Catalog } from '@/components/catalog';
import { PageHero, Cta, JsonLd } from '@/components/ui';
import { pageMeta, breadcrumbs } from '@/lib/seo';
export const metadata = pageMeta(
  'สินค้าและโซลูชัน',
  'ลิฟต์บ้าน ลิฟต์โดยสาร ลิฟต์แก้ว ลิฟต์โรงพยาบาล ลิฟต์ขนส่งสินค้า บันไดเลื่อน ทางเลื่อน ประตูลิฟต์ และอุปกรณ์ตกแต่งห้องโดยสาร จากแค็ตตาล็อกแบรนด์ Neramit',
  '/products',
);
export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: 'สินค้า', path: '/products' }])} />
      <PageHero
        label="OUR COLLECTIONS"
        title={'เทคโนโลยีที่ลงตัว\nกับทุกพื้นที่'}
        description="ลิฟต์บ้าน ลิฟต์โดยสาร ลิฟต์ขนส่งสินค้า บันไดเลื่อน ประตูลิฟต์ และอุปกรณ์ตกแต่ง แบรนด์ Neramit"
        image="hero-products"
        alt="โถงลิฟต์หินอ่อนพร้อมประตูลิฟต์สีทองแชมเปญในแสงยามเย็น"
      />
      <Catalog />
      <Cta />
    </>
  );
}

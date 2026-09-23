import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { articles } from '@/data/news';
import { PageHero, Cta, JsonLd } from '@/components/ui';
import { pageMeta, siteUrl } from '@/lib/seo';
export const metadata = pageMeta(
  'ข่าวสารและความรู้',
  'คู่มือเลือกลิฟต์บ้าน ลิฟต์โดยสาร ประตูลิฟต์ และบันไดเลื่อน สรุปจากแค็ตตาล็อกสินค้าของบริษัท พร้อมตัวเลขพื้นที่ ขนาดปล่อง รหัสรุ่น และคำถามที่พบบ่อย',
  '/news',
);
export default function Page() {
  return (
    <>
      <JsonLd
        data={
          siteUrl
            ? {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'คู่มือและความรู้เรื่องลิฟต์',
                itemListElement: articles.map((a, i) => ({
                  '@type': 'ListItem',
                  position: i + 1,
                  url: siteUrl + '/news/' + a.slug,
                  name: a.title,
                })),
              }
            : null
        }
      />
      <PageHero
        label="JOURNAL & INSIGHTS"
        title={'แรงบันดาลใจ\nสำหรับพื้นที่ที่ดีกว่า'}
        description="เรื่องน่ารู้เกี่ยวกับดีไซน์ เทคโนโลยี และการดูแลบ้านของคุณ"
        image="hero-news"
        alt="ห้องนั่งเล่นเพดานสูงพร้อมลิฟต์บ้านกระจกในแสงยามเย็น"
      />
      <section className="section container">
        <p className="news-intro">
          คู่มือทุกบทความสรุปจากแค็ตตาล็อกสินค้าของบริษัท ทั้งตัวเลขขนาดปล่อง พิกัดน้ำหนัก รหัสรุ่น และวัสดุตกแต่ง
          เพื่อให้เปรียบเทียบผลิตภัณฑ์ได้ก่อนนัดสำรวจพื้นที่จริง
        </p>
        <div className="news-grid">
          {articles.map((a) => (
            <Link href={'/news/' + a.slug} className="news-card" key={a.slug}>
              <div className="news-image">
                <Image src={'/products/' + a.image + '.webp'} alt={a.alt} fill sizes="(max-width:600px) 90vw, 33vw" />
              </div>
              <p className="micro">{a.category}</p>
              <h2>{a.title}</h2>
              <p>{a.intro}</p>
              <span className="text-link">
                อ่านบทความ <ArrowUpRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <Cta />
    </>
  );
}

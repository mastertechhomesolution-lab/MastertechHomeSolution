import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { articles } from '@/data/news';
import { PageHero, Cta } from '@/components/ui';
import { pageMeta } from '@/lib/seo';
export const metadata = pageMeta(
  'ข่าวสารและความรู้',
  'ความรู้เรื่องลิฟต์บ้าน ลิฟต์โดยสาร ประตูลิฟต์ และบันไดเลื่อน จากข้อมูลแค็ตตาล็อกสินค้า เพื่อช่วยเลือกผลิตภัณฑ์ให้เหมาะกับอาคาร',
  '/news',
);
export default function Page() {
  return (
    <>
      <PageHero
        label="JOURNAL & INSIGHTS"
        title={'แรงบันดาลใจ\nสำหรับพื้นที่ที่ดีกว่า'}
        description="เรื่องน่ารู้เกี่ยวกับดีไซน์ เทคโนโลยี และการดูแลบ้านของคุณ"
        image="hero-news"
        alt="ห้องนั่งเล่นเพดานสูงพร้อมลิฟต์บ้านกระจกในแสงยามเย็น"
      />
      <section className="section container">
        <div className="news-grid">
          {articles.map((a) => (
            <Link href={'/news/' + a.slug} className="news-card" key={a.slug}>
              <div className="news-image">
                <Image src={'/products/' + a.image + '.webp'} alt={a.title} fill sizes="(max-width:600px) 90vw, 33vw" />
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

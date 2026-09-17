import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { Cta, Eyebrow } from '@/components/ui';
import { pageMeta } from '@/lib/seo';
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return p ? { ...pageMeta(p.name, p.scope, '/projects/' + slug), robots: { index: false, follow: true } } : {};
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <>
      <section className="section container">
        <div className="breadcrumb">
          <Link href="/projects">ผลงานของเรา</Link>
          <span>/</span>
          <span>{p.name}</span>
        </div>
        <div className="project-detail">
          <div className="project-detail-image">
            <Image
              src={'/products/' + p.image + '.webp'}
              alt={'แนวคิด ' + p.name}
              fill
              priority
              sizes="(max-width:700px) 90vw, 50vw"
            />
          </div>
          <div>
            <Eyebrow>DESIGN CONCEPT</Eyebrow>
            <h1>{p.name}</h1>
            <p className="lead">{p.scope}</p>
            <p className="concept-note">ตัวอย่างแนวคิดสำหรับนำเสนอ ไม่ใช่โครงการลูกค้าจริง</p>
            <dl className="spec-list">
              <div>
                <dt>ประเภทโครงการ</dt>
                <dd>{p.thai}</dd>
              </div>
              <div>
                <dt>ผลิตภัณฑ์ประกอบแนวคิด</dt>
                <dd>{p.product}</dd>
              </div>
              <div>
                <dt>ขอบเขตงาน</dt>
                <dd>{p.scope}</dd>
              </div>
              <div>
                <dt>สถานที่</dt>
                <dd>ยังไม่ระบุ — โครงการแนวคิด</dd>
              </div>
              <div>
                <dt>สถานะ</dt>
                <dd>แนวคิดการออกแบบ</dd>
              </div>
            </dl>
            <Link className="text-link" href="/products">
              สำรวจผลิตภัณฑ์ →
            </Link>
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}

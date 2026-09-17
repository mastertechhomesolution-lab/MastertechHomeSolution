import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="empty-state container">
      <p className="eyebrow">404 — PAGE NOT FOUND</p>
      <h1>ไม่พบหน้าที่คุณกำลังมองหา</h1>
      <p>กลับไปสำรวจผลิตภัณฑ์และโซลูชันของเรา</p>
      <Link className="button" href="/">
        กลับหน้าแรก
      </Link>
    </section>
  );
}

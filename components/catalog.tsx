'use client';
import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { categories, products, catalogPage } from '@/data/products';
import { projects } from '@/data/projects';
import { ProductCard, ComingSoon } from './ui';
export function Catalog() {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(false);
  useEffect(() => {
    const value = new URLSearchParams(location.search).get('category');
    if (value && categories.some((c) => c.id === value)) setCategory(value);
  }, []);
  function select(id: string) {
    setCategory(id);
    setFilters(false);
    const url = new URL(location.href);
    if (id === 'all') url.searchParams.delete('category');
    else url.searchParams.set('category', id);
    history.replaceState(null, '', url);
  }
  const visible = products.filter(
    (p) =>
      (category === 'all' || p.category === category) &&
      (p.name + ' ' + p.en + ' ' + p.description + ' ' + categories.find((c) => c.id === p.category)?.name)
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <div className="container section">
      <div className="catalog-toolbar">
        <button
          className="filter-toggle button button-outline"
          aria-expanded={filters}
          onClick={() => setFilters(!filters)}
        >
          <SlidersHorizontal size={17} />
          หมวดสินค้า
        </button>
        <div className={'filter-tabs ' + (filters ? 'filters-open' : '')} aria-label="ประเภทสินค้า">
          {[{ id: 'all', name: 'ทั้งหมด' }, ...categories].map((c) => (
            <button
              key={c.id}
              aria-pressed={category === c.id}
              className={category === c.id ? 'active' : ''}
              onClick={() => select(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
        <label className="search-field">
          <Search size={18} />
          <input
            placeholder="ค้นหาสินค้า"
            aria-label="ค้นหาสินค้า"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <h2 className="sr-only">รายการสินค้าทั้งหมด</h2>
      <p className="result-count" aria-live="polite">
        คอลเลกชันของเรา <span>{visible.length} รายการ</span>
      </p>
      <div className="product-grid">
        {visible.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
      {!visible.length && (
        <div className="empty-state">
          <h2>ไม่พบสินค้าที่ตรงกับคำค้น</h2>
          <p>ลองเปลี่ยนคำค้น หรือดูผลิตภัณฑ์ทั้งหมด</p>
          <button
            className="button"
            onClick={() => {
              setQuery('');
              select('all');
            }}
          >
            ดูสินค้าทั้งหมด
          </button>
        </div>
      )}
    </div>
  );
}
export function ProjectGrid({ preview = false }: { preview?: boolean }) {
  const [filter, setFilter] = useState('ทั้งหมด');
  const visible = preview ? projects.slice(0, 3) : projects.filter((p) => filter === 'ทั้งหมด' || p.type === filter);
  return (
    <>
      {!preview && (
        <div className="filter-tabs project-filters">
          {['ทั้งหมด', 'Residential', 'Condominium', 'Commercial', 'Hospital', 'Other'].map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              className={filter === f ? 'active' : ''}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      )}
      {!preview && <h2 className="sr-only">ผลงานและแนวคิดการออกแบบ</h2>}
      <div className="project-grid">
        {visible.map((p) => (
          <Link href={'/projects/' + p.slug} className="project-card" key={p.slug}>
            <div className="project-image">
              <Image
                src={'/products/' + p.image + '.webp'}
                alt={'แนวคิด ' + p.thai + ' — ' + p.product}
                fill
                sizes="(max-width:600px) 90vw, 33vw"
              />
              <span>DESIGN CONCEPT</span>
            </div>
            <div>
              <p className="micro">{p.thai}</p>
              <h3>
                {p.name}
                <ArrowUpRight size={18} />
              </h3>
              <p>แนวทางการออกแบบ · ภาพประกอบจากคอลเลกชัน</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
export function ProductGallery({
  image,
  pages = [],
  name,
  comingSoon = false,
}: {
  image: string;
  pages?: number[];
  name: string;
  comingSoon?: boolean;
}) {
  const [active, setActive] = useState(0);
  const images = ['/products/' + image + '.webp', ...pages.map(catalogPage)];
  return (
    <div className="gallery">
      <div className={'gallery-main ' + (active > 0 ? 'catalog-image' : '')}>
        {comingSoon && <ComingSoon />}
        <Image
          key={active}
          src={images[active]}
          alt={active === 0 ? name : 'หน้าแค็ตตาล็อก ' + name + ' หน้า ' + pages[active - 1]}
          fill
          sizes="(max-width:800px) 90vw, 50vw"
          priority={active === 0}
        />
      </div>
      <div className="gallery-thumbnails">
        {images.map((src, i) => (
          <button
            key={src}
            className={active === i ? 'active' : ''}
            aria-label={i === 0 ? 'ดูภาพสินค้า' : 'ดูหน้าแค็ตตาล็อก ' + pages[i - 1]}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            <Image src={src} width={72} height={72} alt="" />
          </button>
        ))}
        {active > 0 && (
          <a className="text-link" href={images[active]} target="_blank" rel="noopener noreferrer">
            เปิดภาพขนาดเต็ม <ArrowUpRight size={16} />
          </a>
        )}
      </div>
    </div>
  );
}

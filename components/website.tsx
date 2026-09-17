'use client';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowUpRight,
  Search,
  Menu,
  X,
  Phone,
  MessageCircle,
  Check,
  Palette,
  ArrowRight,
  Mail,
  MapPin,
  Clock,
  Monitor,
  FileText,
} from 'lucide-react';
import { company } from '@/data/company';
import { navigation } from '@/data/navigation';
import { categories, products } from '@/data/products';
import { submitInquiry } from '@/lib/inquiry';
const SiteContext = createContext<{ openQuote: (product?: string) => void; openLine: () => void }>({
  openQuote: () => {},
  openLine: () => {},
});
export function QuoteButton({
  children,
  product,
  className = 'button',
}: {
  children: ReactNode;
  product?: string;
  className?: string;
}) {
  const { openQuote } = useContext(SiteContext);
  return (
    <button className={className} onClick={() => openQuote(product)}>
      {children}
    </button>
  );
}
export function LineButton({ className = 'button button-outline' }: { className?: string }) {
  const { openLine } = useContext(SiteContext);
  return (
    <button className={className} onClick={openLine}>
      <MessageCircle size={18} /> LINE
    </button>
  );
}
function Dialog({
  children,
  title,
  onClose,
  wide = false,
}: {
  children: ReactNode;
  title: string;
  onClose: () => void;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = ref.current;
    const active = document.activeElement as HTMLElement | null;
    el?.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      el?.close();
      document.body.style.overflow = old;
      active?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-label={title}
      className={'dialog ' + (wide ? 'dialog-wide' : '')}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dialog-content">
        <button className="icon-button dialog-close" aria-label="ปิดหน้าต่าง" onClick={onClose}>
          <X />
        </button>
        <h2>{title}</h2>
        {children}
      </div>
    </dialog>
  );
}
export function InquiryForm({ product = '', contact = false }: { product?: string; contact?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    try {
      const result = await submitInquiry(new FormData(e.currentTarget));
      setMessage(result.message);
      setStatus('success');
    } catch {
      setStatus('error');
      setMessage('ยังไม่สามารถดำเนินการได้ กรุณาลองอีกครั้ง');
    }
  }
  if (status === 'success')
    return (
      <div className="form-success" role="status">
        <span className="success-icon">
          <Check />
        </span>
        <h3>ขอบคุณที่ให้ความสนใจ</h3>
        <p>{message}</p>
        <LineButton />
        <button className="text-link" onClick={() => setStatus('idle')}>
          กรอกข้อมูลใหม่ <ArrowRight size={16} />
        </button>
      </div>
    );
  return (
    <form className="inquiry-form" onSubmit={submit}>
      <p className="form-note">แบบฟอร์มสาธิตสำหรับนำเสนอ ข้อมูลจะไม่ถูกบันทึกหรือส่งออก</p>
      <div className="form-grid">
        <label>
          ชื่อผู้ติดต่อ <span>*</span>
          <input name="name" autoComplete="name" required maxLength={120} placeholder="ชื่อและนามสกุล" />
        </label>
        <label>
          บริษัท / โครงการ
          <input name="company" autoComplete="organization" maxLength={160} placeholder="ชื่อบริษัทหรือโครงการ" />
        </label>
        <label>
          เบอร์โทรศัพท์ <span>*</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            pattern="[0-9+\(\) .\-]{8,20}"
            maxLength={20}
            placeholder="เบอร์โทรศัพท์ที่ติดต่อได้"
          />
        </label>
        <label>
          Email{contact && ' *'}
          <input
            name="email"
            type="email"
            autoComplete="email"
            required={contact}
            maxLength={160}
            placeholder="your@email.com"
          />
        </label>
        <label>
          สินค้าที่สนใจ
          <select name="product" defaultValue={product}>
            <option value="">กรุณาเลือก</option>
            {product && !categories.some((c) => c.name === product) && <option>{product}</option>}
            {categories.map((c) => (
              <option key={c.id}>{c.name}</option>
            ))}
          </select>
        </label>
        <label>
          ประเภทอาคาร
          <select name="building">
            <option value="">กรุณาเลือก</option>
            {[
              'บ้านพักอาศัย',
              'คอนโดมิเนียม',
              'อาคารสำนักงาน',
              'โรงแรม',
              'โครงการอสังหาริมทรัพย์',
              'ร้านค้า / Commercial',
              'อื่น ๆ',
            ].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          จังหวัด / สถานที่ติดตั้ง
          <input name="location" maxLength={180} placeholder="จังหวัดหรือพื้นที่โครงการ" />
        </label>
        <label>
          ช่องทางติดต่อที่สะดวก
          <select name="preferred">
            <option>โทรศัพท์</option>
            <option>Email</option>
            <option>LINE</option>
          </select>
        </label>
        <label className="full-width">
          รายละเอียดโครงการ
          <textarea
            name="message"
            rows={3}
            maxLength={3000}
            placeholder="บอกเราเกี่ยวกับพื้นที่และสิ่งที่คุณกำลังมองหา"
          />
        </label>
      </div>
      {status === 'error' && <p role="alert">{message}</p>}
      <button className="button" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'กำลังดำเนินการ…' : contact ? 'ส่งข้อมูล' : 'ขอใบเสนอราคา'}
        <ArrowUpRight size={18} />
      </button>
      <p className="privacy-note">ยังไม่มีการเก็บข้อมูลส่วนบุคคลในเวอร์ชันนำเสนอนี้</p>
    </form>
  );
}
export function ContactDetails() {
  return (
    <div className="contact-details">
      <div>
        <Phone />
        <div>
          <h3>โทรหาเรา</h3>
          {company.COMPANY_PHONE ? (
            <a href={'tel:' + company.COMPANY_PHONE}>{company.COMPANY_PHONE}</a>
          ) : (
            <p>สอบถามผ่าน LINE</p>
          )}
        </div>
      </div>
      <div>
        <Mail />
        <div>
          <h3>Email</h3>
          {company.COMPANY_EMAIL ? (
            <a href={'mailto:' + company.COMPANY_EMAIL}>{company.COMPANY_EMAIL}</a>
          ) : (
            <p>สอบถามช่องทางอีเมลกับทีมงานทางโทรศัพท์หรือ LINE</p>
          )}
        </div>
      </div>
      <div>
        <MapPin />
        <div>
          <h3>สำนักงาน</h3>
          <p>{company.COMPANY_ADDRESS}</p>
          <a
            className="text-link"
            target="_blank"
            rel="noopener noreferrer"
            href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(company.COMPANY_ADDRESS)}
          >
            ดูแผนที่ <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
      <div>
        <Clock />
        <div>
          <h3>เวลาทำการ</h3>
          <p>{company.openingHours}</p>
        </div>
      </div>
      <div>
        <MessageCircle />
        <div>
          <h3>LINE</h3>
          <p>สแกน QR เพื่อพูดคุยกับทีมงาน</p>
          <LineButton className="text-link" />
        </div>
      </div>
    </div>
  );
}
export function Website({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState('midnight');
  const [panel, setPanel] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [quote, setQuote] = useState<string | null>(null);
  const [line, setLine] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [presentation, setPresentation] = useState(false);
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || 'midnight');
    setPresentation(new URLSearchParams(window.location.search).get('presentation') === 'true');
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    setMenu(false);
    setSearch(false);
  }, [pathname]);
  function changeTheme(value: string) {
    setTheme(value);
    document.documentElement.dataset.theme = value;
    try {
      localStorage.setItem('mastertech-theme', value);
    } catch {}
  }
  function togglePresentation() {
    const next = !presentation;
    setPresentation(next);
    const u = new URL(window.location.href);
    if (next) u.searchParams.set('presentation', 'true');
    else u.searchParams.delete('presentation');
    window.history.replaceState(null, '', u);
  }
  const results = products.filter((p) =>
    (p.name + ' ' + p.description + ' ' + categories.find((c) => c.id === p.category)?.name)
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <SiteContext.Provider value={{ openQuote: (p = '') => setQuote(p), openLine: () => setLine(true) }}>
      <div className={presentation ? 'site presentation' : 'site'}>
        <a className="skip-link" href="#main">
          ข้ามไปยังเนื้อหา
        </a>
        <header className={'header' + (scrolled ? ' scrolled' : '') + (pathname === '/' ? ' header-home' : '')}>
          <div className="container nav-inner">
            <Link href="/" className="brand" aria-label="MasterTechhomesolution หน้าแรก">
              <span className="brand-logos">
                <Image src="/brand/mast-tech.png" width={96} height={96} alt="Mast Tech" priority />
                <i aria-hidden="true" />
                <Image src="/brand/neramit.png" width={96} height={96} alt="Neramit" priority />
              </span>
              <span className="brand-tagline">ELEVATOR &amp; DOOR SOLUTIONS</span>
            </Link>
            <div className="nav-panel">
              <nav className="desktop-nav" aria-label="เมนูหลัก">
                {navigation.map((n) => (
                  <Link
                    aria-current={pathname === n.href ? 'page' : undefined}
                    className={pathname === n.href ? 'active' : ''}
                    key={n.href}
                    href={n.href}
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
              <div className="nav-actions">
                <button className="search-pill" aria-label="ค้นหาสินค้า" onClick={() => setSearch(true)}>
                  <Search size={19} />
                  <span>ค้นหาสินค้า...</span>
                </button>
                <QuoteButton className="button header-quote">
                  <FileText size={18} /> <span>ขอใบเสนอราคา</span>
                </QuoteButton>
                <button
                  className="icon-button hamburger"
                  aria-label="เปิดเมนู"
                  aria-expanded={menu}
                  onClick={() => setMenu(!menu)}
                >
                  {menu ? <X /> : <Menu />}
                </button>
              </div>
            </div>
          </div>
        </header>
        {menu && (
          <Dialog title="เมนูเว็บไซต์" onClose={() => setMenu(false)}>
            <nav className="mobile-nav">
              {navigation.map((n) => (
                <Link key={n.href} href={n.href} onClick={() => setMenu(false)}>
                  {n.label}
                  <ArrowUpRight size={18} />
                </Link>
              ))}
            </nav>
          </Dialog>
        )}
        <main id="main">{children}</main>
        <footer>
          <div className="container">
            <div className="footer-top">
              <div>
                <p className="micro">MASTERTECHHOMESOLUTION</p>
                <h2>
                  SMARTER SPACES.
                  <br />
                  <span>SAFER LIVING.</span>
                </h2>
                <p className="footer-company">{company.name}</p>
                <p>เทคโนโลยีที่ออกแบบเพื่อคุณภาพชีวิตที่ดีกว่า</p>
              </div>
              <QuoteButton className="button button-outline">
                เริ่มต้นโครงการของคุณ <ArrowUpRight size={18} />
              </QuoteButton>
            </div>
            <div className="footer-columns">
              <div>
                <h3>ผลิตภัณฑ์</h3>
                {categories.slice(0, 5).map((c) => (
                  <Link key={c.id} href={'/products?category=' + c.id}>
                    {c.name}
                  </Link>
                ))}
              </div>
              <div>
                <h3>บริการของเรา</h3>
                <Link href="/services">ให้คำปรึกษาและออกแบบ</Link>
                <Link href="/services#process">สำรวจพื้นที่และติดตั้ง</Link>
                <Link href="/services#care">บำรุงรักษาและดูแล</Link>
                <Link href="/contact">นัดหมายทีมงาน</Link>
              </div>
              <div>
                <h3>รู้จักเรา</h3>
                <Link href="/about">เกี่ยวกับบริษัท</Link>
                <Link href="/projects">ผลงานของเรา</Link>
                <Link href="/news">ข่าวสารและความรู้</Link>
                <Link href="/contact">ติดต่อเรา</Link>
              </div>
              <div>
                <h3>พูดคุยกับเรา</h3>
                <a href={'tel:' + company.COMPANY_PHONE}>{company.COMPANY_PHONE}</a>
                {company.COMPANY_EMAIL && <a href={'mailto:' + company.COMPANY_EMAIL}>{company.COMPANY_EMAIL}</a>}
                <p>{company.COMPANY_ADDRESS}</p>
                <LineButton className="text-link" />
              </div>
            </div>
            <div className="footer-bottom">
              <span>
                © {new Date().getFullYear()} {company.siteName}.
              </span>
              <button onClick={togglePresentation}>
                <Monitor size={13} />
                {presentation ? 'ออกจาก Presentation Mode' : 'Presentation Mode'}
              </button>
              <span>DESIGNED FOR A BETTER EVERYDAY.</span>
            </div>
          </div>
        </footer>
        <div className="floating-tools">
          <button className="design-toggle" onClick={() => setPanel(true)}>
            <Palette size={17} />
            <span>เลือกดีไซน์</span>
            <b>{theme === 'midnight' ? 'A' : 'B'}</b>
          </button>
          <button className="floating-line" aria-label="ติดต่อผ่าน LINE" onClick={() => setLine(true)}>
            <MessageCircle size={21} />
          </button>
        </div>
        <div className="mobile-contact">
          <a href={'tel:' + company.COMPANY_PHONE}>
            <Phone size={17} />
            โทร
          </a>
          <button onClick={() => setLine(true)}>
            <MessageCircle size={18} />
            LINE
          </button>
          <QuoteButton>
            ขอใบเสนอราคา <ArrowUpRight size={16} />
          </QuoteButton>
        </div>
        {panel && (
          <Dialog title="เลือกแนวทางเว็บไซต์" onClose={() => setPanel(false)} wide>
            <p className="muted">สองมุมมองของแบรนด์ เพื่อพื้นที่และการใช้ชีวิตที่ดีกว่า</p>
            <div className="theme-options">
              {[
                {
                  id: 'midnight',
                  label: 'Design A',
                  name: 'MIDNIGHT NEON',
                  sub: 'Technology / Futuristic',
                  desc: 'โทนกรมท่าเข้ม แสงนีออนฟ้า-ชมพู ภาพลักษณ์ Smart Solution ที่ทันสมัย',
                  colors: ['#061538', '#1F6FE5', '#F2459B', '#C85BF0'],
                },
                {
                  id: 'luxury',
                  label: 'Design B',
                  name: 'BRIGHT LIVING',
                  sub: 'Light / Modern Living',
                  desc: 'โทนขาวสว่าง ชมพูอมม่วง ดูเป็นมิตร เหมาะกับบ้านพักอาศัยและโครงการที่อยู่อาศัย',
                  colors: ['#FBF9FE', '#1D2150', '#E23E8E', '#A657E8'],
                },
              ].map((t) => (
                <article className={'theme-option ' + t.id + (theme === t.id ? ' selected' : '')} key={t.id}>
                  <span className="theme-label">
                    {t.label}
                    {theme === t.id && <Check size={17} />}
                  </span>
                  <div className="theme-sample">
                    <span />
                    <span />
                    <span />
                  </div>
                  <h3>{t.name}</h3>
                  <small>
                    {t.label} — {t.sub}
                  </small>
                  <p>{t.desc}</p>
                  <div className="swatches">
                    {t.colors.map((c) => (
                      <i style={{ background: c }} key={c} />
                    ))}
                  </div>
                  <button className="button" onClick={() => changeTheme(t.id)} aria-pressed={theme === t.id}>
                    {theme === t.id ? 'กำลังใช้ดีไซน์นี้' : 'ใช้ดีไซน์นี้'}
                    <ArrowRight size={16} />
                  </button>
                </article>
              ))}
            </div>
          </Dialog>
        )}
        {quote !== null && (
          <Dialog title="เริ่มต้นพื้นที่ที่ดีกว่าของคุณ" onClose={() => setQuote(null)} wide>
            <p className="muted">ขอใบเสนอราคา / ปรึกษาโซลูชันสำหรับโครงการ</p>
            <InquiryForm product={quote} />
          </Dialog>
        )}
        {line && (
          <Dialog title="พูดคุยกับเราทาง LINE" onClose={() => setLine(false)}>
            <p className="muted">สแกน QR Code เพื่อเพิ่มเพื่อนและสอบถามทีมงาน</p>
            <Image
              className="line-qr"
              src={company.lineQR}
              width={300}
              height={300}
              alt="QR Code LINE ที่บริษัทจัดเตรียม"
            />
            {company.COMPANY_LINE && (
              <a className="button" href={company.COMPANY_LINE} target="_blank" rel="noopener noreferrer">
                เปิด LINE <ArrowUpRight size={18} />
              </a>
            )}
            <p className="privacy-note">QR Code จากข้อมูลติดต่อที่บริษัทจัดเตรียม</p>
          </Dialog>
        )}
        {search && (
          <Dialog title="ค้นหาโซลูชันของคุณ" onClose={() => setSearch(false)} wide>
            <label className="search-field">
              <Search size={20} />
              <input
                aria-label="ค้นหาชื่อหรือประเภทสินค้า"
                placeholder="ค้นหาลิฟต์ ประตู Smart Lock…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <div className="search-results">
              {results.length ? (
                results.map((p) => (
                  <Link key={p.slug} href={'/products/' + p.slug} onClick={() => setSearch(false)}>
                    <Image src={'/products/' + p.image + '.webp'} width={50} height={60} alt="" />
                    <span>
                      <strong>{p.name}</strong>
                      <small>{categories.find((c) => c.id === p.category)?.name}</small>
                    </span>
                    <ArrowUpRight size={18} />
                  </Link>
                ))
              ) : (
                <p>ไม่พบสินค้าที่ตรงกับคำค้น ลองใช้คำอื่นหรือติดต่อทีมงาน</p>
              )}
            </div>
          </Dialog>
        )}
      </div>
    </SiteContext.Provider>
  );
}

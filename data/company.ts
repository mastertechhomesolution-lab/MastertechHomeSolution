// Central company identity. Legal name, address and company introduction come from the
// company's own catalog (Product/ข้อมูลบริษัทสินค้า.pdf, 2026.8); the address there was
// confirmed by the user on 2026-09-22 and replaces the legacy-site house number (36/19).
// Phone and opening hours come from the legacy site, approved by the user for reuse.
export const company = {
  siteName: 'MasterTechhomesolution',
  // Production domain registered on Vercel (confirmed by the user 2026-09-24).
  url: 'https://neramit-lifting.com',
  name: 'MASTER SCIENCE AND TECHNOLOGY CO., LTD.',
  shortName: 'MASTER SCIENCE & TECHNOLOGY',
  COMPANY_PHONE: '02-956-9876',
  COMPANY_EMAIL: '',
  COMPANY_ADDRESS: '36/33 หมู่ 1 ซอยเลียบวารี 61 ถนนเลียบวารี แขวงโคกแฝด เขตหนองจอก กรุงเทพมหานคร 10530',
  COMPANY_ADDRESS_EN: '36/33 Moo 1 Soi Liabvaree 61, Liabvaree Rd., Kokfad, Nongjok, Bangkok 10530, Thailand',
  postalAddress: {
    '@type': 'PostalAddress',
    streetAddress: '36/33 หมู่ 1 ซอยเลียบวารี 61 ถนนเลียบวารี',
    addressLocality: 'แขวงโคกแฝด เขตหนองจอก',
    addressRegion: 'กรุงเทพมหานคร',
    postalCode: '10530',
    addressCountry: 'TH',
  },
  COMPANY_LINE: '',
  GOOGLE_BUSINESS_URL: '',
  openingHours: 'จันทร์–เสาร์ 08.00–17.00 น.',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
  lineQR: '/contact/line-qr.jpg',
  brand: 'Neramit',
  slogan: 'Driving the Future Through Science and Technology',
  description:
    'ลิฟต์บ้าน ลิฟต์โดยสาร ลิฟต์โรงพยาบาล ลิฟต์ขนส่งสินค้า บันไดเลื่อน ทางเลื่อน ประตูลิฟต์ และอุปกรณ์ตกแต่งห้องโดยสาร แบรนด์ Neramit พร้อมให้คำปรึกษาและติดตั้ง',
  contactSource: 'https://www.mastercraneandlift.com/contact-us/',
};

// Product data from the company's catalog "THE ELEVATOR GENERAL CATALOG" (2026.8),
// supplied as Product/ข้อมูลบริษัทสินค้า.pdf. Model codes, finishes and technical specs are
// kept in the catalog's original English; only general copy is written in Thai.
// Images are built by scripts/prepare-catalog-images.mjs; `pages` point to public/catalog/page-XX.webp.
// 2026-09-29: the client removed the escalator & moving walk line from the whole product catalog.
// Its entries stay below (allCategories / allProducts) so it can be switched back on by editing
// `removed`; every page reads only the filtered `categories` and `products`.
const removed = ['escalators'];
const allCategories = [
  { id: 'elevators', name: 'ลิฟต์บ้าน', en: 'Home Elevator', image: 'home-v201', collection: 'NERAMIT HOME' },
  { id: 'passenger', name: 'ลิฟต์โดยสาร', en: 'Passenger Elevator', image: 'passenger-k007', collection: 'NERAMIT PASSENGER' },
  { id: 'freight', name: 'ลิฟต์ขนส่งสินค้า', en: 'Freight Elevator', image: 'machine-roomless-freight', collection: 'NERAMIT FREIGHT' },
  { id: 'accessibility', name: 'ลิฟต์คนพิการ', en: 'Barrier-free Lift', image: 'rack-lift', collection: 'NERAMIT CARE' },
  { id: 'escalators', name: 'บันไดเลื่อน', en: 'Escalator & Moving Walk', image: 'escalator', collection: 'NERAMIT ESCALATOR' },
  { id: 'doors', name: 'ประตูลิฟต์', en: 'Elevator Door', image: 'hall-door', collection: 'NERAMIT DOOR' },
  { id: 'accessories', name: 'ตกแต่งและแผงควบคุม', en: 'Interior & Control', image: 'operation-panel', collection: 'NERAMIT INTERIOR' },
];
export const categories = allCategories.filter((c) => !removed.includes(c.id));
export type Model = { code: string; tag?: string; spec: string[] };
export type Product = {
  slug: string;
  name: string;
  en: string;
  category: string;
  image: string;
  description: string;
  features: string[];
  pages: number[];
  specs?: [string, string][];
  models?: Model[];
  applications?: string;
  /** Catalog renders carry "The picture is drawn by computer" */
  rendered?: boolean;
  /** Planned product line, not on sale yet (client decision, 2026-09-23). Draws a "Coming Soon"
   *  badge on every image of the product and keeps the page honest about availability. */
  comingSoon?: boolean;
  /** Card badge when it differs from the category's collection label. */
  collection?: string;
  /** Products from the 2026-10 supplementary catalogs: extra crops in public/products/ shown in
   *  the gallery instead of general-catalog pages, plus the catalog they came from. */
  gallery?: string[];
  source?: string;
  /** Short <title> when the name is too long for the 60-char SERP limit (the template adds 25). */
  metaTitle?: string;
};
// Supplementary catalogs supplied 2026-10-06 (Mock/*.pdf), built by scripts/prepare-new-catalogs.mjs.
const homeCatalog2026 = 'แค็ตตาล็อก Residential Elevator Series';
const accessCatalog = 'แค็ตตาล็อก Barrier-free Lift';
const accessSpecs: [string, string][] = [
  ['Loading', 'Standard 250KG, Max 500KG'],
  ['Power supply', 'AC 220V/50HZ'],
  ['Pedal size', 'Standard 1100×800mm / Min 1000×500mm / Max 1200×900mm'],
  ['Guide material', 'Aluminum / 304 Stainless steel'],
  ['Speed', '0 – 0.15m/s'],
  ['Standard safety features', 'Acousto-optic alarm / Guardrail collision prevention / Emergency manual folding / Limit switch'],
  ['Optional safety features', 'Remote monitoring / Flap anti-collision / Base plate anti-collision / Overload alarm / Anti-fall system / Manual operation mode / UPS'],
];
const accessComponents =
  'Handrail, guardrail, 5-inch IPS LCD, braille buttons, lightweight aluminum shell, cold-rolled sheet integrated body, aluminum folding pedal and flap, PVC non-slip mat';
const lcLayout = (tag: string, rows: [string, string][]): Model => ({ code: tag, spec: rows.map(([k, v]) => k + ': ' + v) });

const homeLayout: Model[] = [
  { code: 'Layout 1', tag: 'Overhead height ≥ 3100mm', spec: ['Capacity: 250kg, 320kg, 400kg', 'Hoistway HW×HD 1600×1200 — Car CW×CD, OP 1000×900, 700', 'Hoistway HW×HD 1650×1350 — Car CW×CD, OP 1050×1050, 700', 'Hoistway HW×HD 1800×1350 — Car CW×CD, OP 1200×1050, 800'] },
  { code: 'Layout 2', tag: 'Overhead height ≥ 3300mm', spec: ['Capacity: 320kg, 400kg', 'Hoistway HW×HD 1400×1650 — Car CW×CD, OP 1000×1050, 600', 'Hoistway HW×HD 1600×1700 — Car CW×CD, OP 1200×1150, 700'] },
];
const homeSpecs: [string, string][] = [
  ['Speed', '0.4m/s'],
  ['Pit depth', '≥ 450mm'],
  ['Car height', '2300mm'],
  ['Traveling height', '≤ 20000mm'],
  ['Door opening height', '2100mm'],
  ['Note', 'Minimum floor spacing is 2.6 meters'],
];
const homeCar = 'ห้องโดยสารลิฟต์บ้านจากแค็ตตาล็อก เลือกวัสดุผนัง ฝ้า และพื้นได้ตามรุ่น เพื่อให้เข้ากับการตกแต่งภายในบ้าน';

const allProducts: Product[] = [
  // ---------- Home elevator ----------
  {
    slug: 'traction-home-elevator',
    name: 'ลิฟต์บ้านระบบ Traction',
    en: 'Traction Type Home Elevator',
    category: 'elevators',
    image: 'traction-home-elevator',
    description:
      'ลิฟต์บ้านที่สืบทอดเทคโนโลยีลิฟต์ส่วนบุคคลจากยุโรป ผสานศิลปะ การใช้งาน และความร่วมสมัย เหมาะกับวิลล่าและบ้านพักอาศัยระดับพรีเมียม',
    features: [
      'ไม่ต้องมีห้องเครื่อง ช่วยประหยัดค่าก่อสร้าง',
      'เลือกโครงสร้างแบบ counter level หรือ gantry ตามรูปแบบการเปิดประตูของบ้าน',
      'ฐานเครื่องลากยึดกับรางนำ ตัวอาคารไม่ต้องรับน้ำหนัก',
      'มี UPS สำรองไฟ ช่วยนำผู้โดยสารออกเมื่อไฟดับ',
    ],
    specs: [
      ['Drive', 'VVVF — home elevator dedicated micro-computer control'],
      ['Door operator', 'Automatic, variable frequency energy-saving'],
      ['Backup', 'UPS releases passengers during power failure'],
      ['Total rated power', '1.5KW (including 1.1KW for drive system)'],
      ...homeSpecs,
    ],
    models: homeLayout,
    applications: 'บ้านพักอาศัย วิลล่า ทาวน์โฮม และอาคารพักอาศัยส่วนบุคคล',
    pages: [19, 44],
  },
  {
    slug: 'steel-belt-home-lift',
    name: 'ลิฟต์บ้านระบบสายพานเหล็ก',
    en: 'Steel Belt Home Lift',
    category: 'elevators',
    image: 'steel-belt-home-lift',
    description:
      'ลิฟต์บ้านระบบ traction แบบสายพานเหล็กรุ่นใหม่ ห้องโดยสารตกแต่งแบบฝัง 3 ด้าน ถอดเปลี่ยนแผงกลางได้ รองรับวัสดุหลากหลายตามความต้องการเฉพาะของแต่ละบ้าน',
    features: [
      'สายพานเหล็กเคลือบ PU ไม่ต้องหล่อลื่น',
      'อายุการใช้งานสูงกว่าลวดสลิงแบบเดิม 2–3 เท่า ช่วยลดค่าบำรุงรักษา',
      'โค้งงอได้ดี เพิ่มพื้นที่สัมผัสกับล้อขับ ทำงานมีประสิทธิภาพและประหยัดพลังงาน',
      'ระบบสามารถแจ้งเตือนความผิดปกติล่วงหน้า',
    ],
    specs: [
      ['Traction media', 'Steel band with Polyurethane (PU) layer, no lubrication'],
      ['Service life', '2–3 times that of traditional wire rope'],
      ['Car decoration', '3-side inlaid type, removable center decoration'],
      ...homeSpecs,
    ],
    models: homeLayout,
    applications: 'บ้านพักอาศัยทั้งบ้านสร้างใหม่และบ้านที่ต้องการติดตั้งเพิ่ม (ต้องสำรวจพื้นที่ก่อน)',
    pages: [19, 44],
  },
  {
    slug: 'home-elevator-v100',
    name: 'ห้องโดยสารลิฟต์บ้าน ซีรีส์ V100',
    en: 'Home Elevator NY-V104 / V105 / V106',
    category: 'elevators',
    image: 'home-v104',
    description: 'ห้องโดยสารโทนแชมเปญโกลด์และสเตนเลสเงา สำหรับบ้านที่ต้องการความหรูหราและสว่างโปร่ง',
    features: ['โทนแชมเปญโกลด์ (NY-V104)', 'สเตนเลสกระจกและแฮร์ไลน์ (NY-V105, NY-V106)', 'พื้นหินอ่อนตามรุ่น'],
    models: [
      { code: 'NY-V104', tag: 'optional', spec: ['Ceiling: Mirror stainless steel champagne gold + downlight (NY-DD110)', 'Front wall: Hairline stainless steel champagne gold', 'Side wall: Hairline stainless steel champagne gold', 'Rear wall: Hairline stainless steel champagne gold, Etching', 'Car door: Hairline stainless steel champagne gold', 'Floor: Marble (NY-DB108)'] },
      { code: 'NY-V105', tag: 'optional', spec: ['Ceiling: Mirror stainless steel, acrylic translucent plate (NY-DD111)', 'Rear wall: Mirror-etched stainless steel, hairline stainless steel on both sides', 'Side wall: Hairline stainless steel', 'Front wall: Hairline stainless steel', 'Car door: Hairline stainless steel', 'Floor: Marble (NY-DB109)'] },
      { code: 'NY-V106', tag: 'optional', spec: ['Ceiling: Hairline stainless steel, LED flat square lamp (NY-DD101)', 'Rear wall: Middle mirror stainless steel, sides hairline stainless steel', 'Side wall: Hairline stainless steel', 'Front wall: Hairline stainless steel', 'Floor: Marble (NY-DB110)'] },
    ],
    applications: homeCar,
    rendered: true,
    pages: [20],
  },
  {
    slug: 'home-elevator-v200',
    name: 'ห้องโดยสารลิฟต์บ้าน ซีรีส์ V200',
    en: 'Home Elevator NY-V201 – V206',
    category: 'elevators',
    image: 'home-v201',
    description: 'ห้องโดยสารลิฟต์บ้าน 6 รูปแบบ ตั้งแต่โทนแชมเปญโกลด์ ลายไม้ขาว ไปจนถึงบรอนซ์และแบล็กไทเทเนียม',
    features: ['6 รุ่นให้เลือกในซีรีส์เดียว', 'ผสมผสานสเตนเลส ลายไม้ และกระจกกัดลาย', 'ไฟ LED และฝ้าตกแต่งตามรุ่น'],
    models: [
      { code: 'NY-V201', tag: 'optional', spec: ['Ceiling: Mirror stainless steel champagne gold + downlight (NY-DD105)', 'Front wall / Side wall / Car door: Hairline stainless steel champagne gold', 'Rear wall: Hairline stainless steel champagne gold, Etching', 'Floor: Marble (NY-DB104)'] },
      { code: 'NY-V202', tag: 'optional', spec: ['Ceiling: White Wood Grain Panel, cross flow fan, LED lighting (NY-DD112)', 'Rear wall: White wood grain with rear wall mirror', 'Side wall: White wood grain', 'Front wall: Hairline stainless steel', 'Floor: Marble (NY-DB111)'] },
      { code: 'NY-V203', tag: 'optional', spec: ['Ceiling: Solid wood multi-layer board mixed with oil white, LED tube light (NY-DD113)', 'Rear wall: Bronze stainless steel, antique bronze mirror stainless steel', 'Side wall: Bronze stainless steel, wood grain steel plate', 'Front wall / Car door: Bronze stainless steel'] },
      { code: 'NY-V204', tag: 'optional', spec: ['Ceiling: Mirror stainless steel, LED downlight, acrylic board (NY-DD114)', 'Rear wall: Champagne gold mirror etching in the middle, hairline stainless steel on both sides, black titanium decorative strips', 'Front wall: Hairline stainless steel', 'Floor: Marble (NY-DB109)'] },
      { code: 'NY-V205', tag: 'optional', spec: ['Ceiling: Steel plate white paint, bronze stainless steel rim, hidden lamp belt, LED downlight (NY-DD115)', 'Rear wall: Mirror stainless steel, bronze hairline stainless steel, LED strip', 'Front wall: Bronze hairline stainless steel'] },
      { code: 'NY-V206', tag: 'optional', spec: ['Ceiling: Black titanium mirror stainless steel, concealed light strip, spotlight lighting (NY-DD116)', 'Rear wall: Black titanium mirror etched stainless steel', 'Side wall: Wood veneer', 'Front wall: Hairline stainless steel'] },
    ],
    applications: homeCar,
    rendered: true,
    pages: [21, 22],
  },
  {
    slug: 'home-elevator-v300',
    name: 'ห้องโดยสารลิฟต์บ้าน ซีรีส์ V300',
    en: 'Home Elevator NY-V301 / V302 / V303',
    category: 'elevators',
    image: 'home-v301',
    description: 'ห้องโดยสารที่ผสานผนังลายหินอ่อน ลายไม้ และโทนโรสโกลด์ ให้บรรยากาศอบอุ่นแบบบ้านพักอาศัย',
    features: ['ผนังลายหินอ่อนและลายไม้', 'โทนโรสโกลด์ (NY-V303)', 'ไฟ LED ตกแต่งฝ้า'],
    models: [
      { code: 'NY-V301', tag: 'optional', spec: ['Ceiling: Painted steel, black stainless steel inserts, LED downlights (NY-DD117)', 'Front wall: Yellow bronze stainless steel', 'Side wall: Wood grain steel plate, mirror stainless steel', 'Rear wall: Wood grain steel plate, marble texture', 'Floor: Marble (NY-DB115)'] },
      { code: 'NY-V302', tag: 'optional', spec: ['Ceiling: Mirrored stainless steel frame, LED lights (NY-DD118)', 'Rear wall: Decorative painting, wood veneer', 'Side wall: Wood veneer, titanium stainless steel molding', 'Front wall: Titanium stainless steel', 'Floor: Marble (NY-DB105)'] },
      { code: 'NY-V303', tag: 'optional', spec: ['Ceiling: Steel plate spraying + LED lighting fixture (NY-DD119)', 'Rear wall: Mirror rose gold etching, hair pattern rose gold', 'Side wall: Mirror rose gold, hair pattern rose gold', 'Front wall: Hairline rose gold', 'Car door: Mirror rose gold stainless steel', 'Floor: Marble (NY-DB116)'] },
    ],
    applications: homeCar,
    rendered: true,
    pages: [23],
  },
  {
    slug: 'sightseeing-home-elevator',
    name: 'ลิฟต์บ้านกระจก ซีรีส์ V400',
    en: 'Home Elevator NY-V401 / V402 / V403',
    category: 'elevators',
    image: 'home-v403',
    description: 'ห้องโดยสารกระจกแบบ sightseeing ทั้งทรงเหลี่ยมและทรงกลม เปิดมุมมองให้ลิฟต์เป็นส่วนหนึ่งของสถาปัตยกรรมบ้าน',
    features: ['โครงอะลูมิเนียมอัลลอย เปลี่ยนสีได้ (NY-V401)', 'กระจกนิรภัยลามิเนต', 'ทรงกลมพร้อมราวจับรอบห้อง (NY-V403)'],
    models: [
      { code: 'NY-V401', tag: 'optional', spec: ['All aluminum alloy sightseeing car (color can be changed to champagne gold, ice coffee gray)', 'Ceiling: Black titanium mirror, acrylic plate (NY-DD106)', 'Rear wall: Sightseeing glass + aluminum alloy frame', 'Side: Sightseeing glass + aluminum alloy frame + black titanium mirror', 'Front wall: Black titanium stainless steel', 'Floor: Marble (NY-DB117)'] },
      { code: 'NY-V402', tag: 'optional', spec: ['Ceiling: champagne gold stainless steel, LED (NY-DD120)', 'Rear wall: champagne gold stainless steel, safety laminated glass', 'Car wall: champagne gold stainless steel, wood grain steel plate, safety laminated glass', 'Front wall: champagne gold stainless steel', 'Car door: champagne gold stainless steel, safety laminated glass', 'Floor: marble (NY-DB114)'] },
      { code: 'NY-V403', tag: 'optional', spec: ['Upper and lower cover: Hairline stainless steel', 'Decorative top: acrylic transparent board, stainless steel mirror, lamp (NY-DD121)', 'Car wall: Hairline stainless steel, laminated glass', 'Armrest stainless steel pipe', 'Floor: Marble (NY-DB115)'] },
    ],
    applications: 'บ้านที่มีโถงสูงหรือพื้นที่เปิดโล่ง ต้องการให้ลิฟต์เป็นจุดเด่นของบ้าน',
    rendered: true,
    pages: [24],
  },
  // ---------- Home elevator: Residential Elevator Series (2026-10) ----------
  {
    slug: 'hydraulic-home-elevator',
    name: 'ลิฟต์บ้านระบบไฮดรอลิก',
    en: 'Hydraulic Drive Home Elevator',
    category: 'elevators',
    image: 'hydraulic-home-elevator',
    description:
      'ลิฟต์บ้านระบบไฮดรอลิก ปรับความเร็วต่อเนื่องด้วยวาล์วสัดส่วน ลิฟต์ทำงานนุ่มนวล ไม่ต้องมีห้องเครื่องด้านบนปล่อง วางห้องเครื่องข้างปล่องได้ ไม่ต้องใช้น้ำหนักถ่วง',
    features: [
      'ไม่ต้องมีห้องเครื่องด้านบนปล่องลิฟต์ ปล่องสูงได้ถึงหลังคา',
      'วางห้องเครื่องข้างปล่องได้ ใช้พื้นที่เพียง 2–3 ตร.ม.',
      'ไม่ต้องใช้น้ำหนักถ่วง ใช้พื้นที่ปล่องได้เต็มประสิทธิภาพ',
      'น้ำหนักลงสู่พื้นผ่านกระบอกสูบ ผนังและหลังคาปล่องรับแรงน้อย',
    ],
    specs: [
      ['Drive', 'Hydraulic — oil cylinder, pump station and control valve imported from Italy (catalog)'],
      ['Rated load', '≤ 400kg'],
      ['Rated speed', '≤ 0.3m/s'],
      ['Landing door', 'Swing door, opening 500–900 × 2000–2100mm'],
      ['Max. lifting height', '12m'],
      ['Min. pit', '0mm'],
      ['Min. top floor height', '2400mm'],
      ['Machine room', 'Beside the well, 2–3 m²'],
      ['Components', 'Safety emergency switch device, power distribution box, nylon pulleys, silent pumping station with frequency converter, safety gear, car light curtain, emergency power supply (descends to the first floor on power failure)'],
    ],
    models: [
      lcLayout('Side backpack', [['Min. shaft (W×D)', '960×710mm'], ['Min. cabin (W×D)', '600×600mm'], ['Max. shaft (W×D)', '1560×1300mm'], ['Max. cabin (W×D)', '1200×1200mm']]),
      lcLayout('Rear backpack', [['Min. shaft (W×D)', '740×930mm'], ['Min. cabin (W×D)', '600×600mm'], ['Max. shaft (W×D)', '1340×1530mm'], ['Max. cabin (W×D)', '1200×1200mm']]),
    ],
    applications: 'บ้านพักอาศัยที่ต้องการลิฟต์โดยไม่ทำห้องเครื่องด้านบน หรือมีข้อจำกัดเรื่องความลึกบ่อลิฟต์และโครงสร้างปล่อง',
    gallery: ['hydraulic-components', 'hydraulic-platform-layouts'],
    source: homeCatalog2026,
    pages: [],
  },
  {
    slug: 'traction-gantry-backpack-home-elevator',
    metaTitle: 'ลิฟต์บ้าน Traction Gantry/Backpack',
    name: 'ลิฟต์บ้าน Traction โครงสร้าง Gantry / Backpack',
    en: 'Traction Home Elevator — Gantry & Backpack Frame',
    category: 'elevators',
    image: 'traction-gantry-backpack',
    description:
      'ลิฟต์บ้านระบบ Traction เลือกได้ 2 โครงสร้าง: Gantry รางหลักซ้าย-ขวา รับแรงสมดุล และ Backpack รางหลักกับน้ำหนักถ่วงอยู่ด้านเดียว เหมาะกับปล่องที่มีข้อจำกัด',
    features: [
      'Gantry: รับแรงสองด้านเท่ากัน ลิฟต์วิ่งนุ่มนวล เลือกได้ทั้งสายพานเหล็กคอมโพสิตและลวดสลิง',
      'ระบบช่วยเหลือเมื่อไฟดับ (ARD) พาลิฟต์ไปชั้นที่ใกล้ที่สุดและเปิดประตู',
      'ม่านแสงในห้องโดยสาร หยุดการปิดประตูทันทีเมื่อมีสิ่งกีดขวาง',
      'ปุ่มขอความช่วยเหลือแบบกดครั้งเดียวผ่านโมดูล IoT (มาตรฐาน)',
    ],
    specs: [
      ['Machine', 'Aluminum shell, imported bearings, low noise, 220V/380V'],
      ['Running noise', 'Less than 43dB (catalog)'],
      ['Control cabinet', 'Integrated controller, serial communication, built-in ARD, Internet of Things, lifting height ≤ 12m, speed ≤ 0.4m/s, AC220V/AC380V optional'],
      ['Rated load', '≤ 400kg'],
      ['Rated speed', '≤ 0.4m/s'],
      ['Max. lifting height (layout tables)', 'No limit'],
    ],
    models: [
      lcLayout('Gantry — side counterweight, center sliding door', [['Landing door', 'Automatic center sliding, opening 600–800 × 2000–2100mm'], ['Shaft (W×D)', 'min 1300×1050 / max 1900×1500mm'], ['Cabin (W×D)', 'min 700×750 / max 1300×1200mm'], ['Min. pit / top floor height', '100mm / 2900mm']]),
      lcLayout('Gantry — rear counterweight, center sliding door', [['Landing door', 'Automatic center sliding, opening 600–800 × 2000–2100mm'], ['Shaft (W×D)', 'min 1300×1150 / max 1700×1650mm'], ['Cabin (W×D)', 'min 900×700 / max 1300×1200mm'], ['Min. pit / top floor height', '100mm / 2900mm']]),
      lcLayout('Backpack — side counterweight, manual swing door', [['Landing door', 'Manual swing, opening 500–900 × 2000–2100mm'], ['Shaft (W×D)', 'min 1000×1100 / max 1590×1300mm'], ['Cabin (W×D)', 'min 510×900 / max 1100×1100mm'], ['Min. pit / top floor height', '150mm / 2700mm']]),
      lcLayout('Backpack — rear counterweight, manual swing door', [['Landing door', 'Manual swing, opening 500–900 × 2000–2100mm'], ['Shaft (W×D)', 'min 1100×1000 / max 1240×1540mm'], ['Cabin (W×D)', 'min 960×560 / max 1100×1100mm'], ['Min. pit / top floor height', '150mm / 2700mm']]),
    ],
    applications: 'บ้านพักอาศัยและวิลล่า เลือกโครงสร้างและตำแหน่งน้ำหนักถ่วงตามขนาดปล่องและรูปแบบประตูที่ต้องการ',
    gallery: ['traction-gantry-render', 'traction-layouts'],
    source: homeCatalog2026,
    pages: [],
  },
  {
    slug: 'platform-home-elevator',
    name: 'ลิฟต์บ้าน Platform ปล่องกระจก',
    en: 'Platform Home Elevator',
    category: 'elevators',
    image: 'platform-home-elevator',
    description:
      'ลิฟต์บ้านสำหรับพื้นที่ราว 1 ตร.ม. ขับเคลื่อนด้วยสายพานเหล็กและน้ำหนักถ่วง ปล่องโครงอะลูมิเนียมหุ้มกระจกลามิเนตนิรภัย ซ่อนรางและสายไฟ เหมาะกับบ้าน 2–7 ชั้น',
    features: [
      'ปล่องกระจกเทมเปอร์ลามิเนต 2 ชั้นรอบด้าน ลดความเสี่ยงจากกระจกแตก',
      'ซ่อนราง ขายึด และสายไฟในปล่อง ดูเรียบ โปร่ง สวยงาม',
      'ระบบป้องกันการหนีบ: ประตูหยุดปิดเมื่อมีแรงต้าน พร้อมม่านแสงอินฟราเรด',
      'ระบบช่วยเหลือเมื่อไฟดับ (ARD) และอุปกรณ์กันตกแบบอิเล็กทรอนิกส์',
    ],
    specs: [
      ['Drive / structure', 'Steel belt traction drive and counterweight system'],
      ['Floors', '2 – 7 floors'],
      ['Landing door', 'Manual single swing / Auto single swing / Auto dual swing'],
      ['Minimum shaft size', '800 × 950mm (non-standard sizes on consultation)'],
      ['Overhead', '≥ 2300mm'],
      ['Pit depth', '≥ 60mm'],
      ['Rated load / speed (layout tables)', '≤ 400kg / ≤ 0.4m/s'],
      ['Shaft frame color', 'Black sand texture, Melted gold, Shiny white, Quantum silver gray, Glacier silver, Rose gold, Champagne gold, Vintage dark green, Haze blue gray'],
      ['Frame glass', 'Fully transparent / Frosted / Brown'],
    ],
    models: [
      lcLayout('Side counterweight', [['Landing door', 'Swing, opening 500–900 × 2000–2100mm'], ['Shaft (W×D)', 'min 1000×1000 / max 1400×1220mm'], ['Cabin (W×D)', 'min 600×880 / max 1000×1100mm'], ['Min. pit / top floor height', '100mm / 2300mm']]),
      lcLayout('Rear counterweight', [['Landing door', 'Swing, opening 500–900 × 2000–2100mm'], ['Shaft (W×D)', 'min 1000×1000 / max 1260×1420mm'], ['Cabin (W×D)', 'min 840×580 / max 1100×1000mm'], ['Min. pit / top floor height', '100mm / 2300mm']]),
    ],
    applications: 'บ้านเดี่ยว ทาวน์โฮม ดูเพล็กซ์ วิลล่า และบ้านที่ต้องการติดตั้งลิฟต์ในพื้นที่จำกัด เช่น ข้างบันไดหรือโถงบ้าน',
    rendered: true,
    gallery: ['shaft-frame', 'door-opening-way', 'hydraulic-platform-layouts'],
    source: homeCatalog2026,
    pages: [],
  },
  {
    slug: 'home-elevator-lc-v100',
    name: 'ห้องโดยสารลิฟต์บ้าน ซีรีส์ LC-V100',
    en: 'Home Elevator Car LC-V101 – V108',
    category: 'elevators',
    image: 'home-lc-v106',
    description: 'ห้องโดยสารลิฟต์บ้าน 8 แบบ โทนสเตนเลสแฮร์ไลน์ โรสโกลด์ ไทเทเนียม และไทเทเนียมโกลด์ บางรุ่นผนังข้างเป็นกระจกเทมเปอร์หรือกระจกชมวิว',
    features: ['ผนังสเตนเลสกัดลายและกระจกตามรุ่น', 'ฝ้าสเตนเลสพร้อมอะคริลิกและไฟดาวน์ไลต์', 'พื้น PVC (LC-V108 เลือกหินอ่อนได้)'],
    models: [
      { code: 'LC-V101', spec: ['Ceiling: hairline stainless steel + acrylic + downlight', 'Side wall: aluminum alloy frame + tempered glass', 'Back wall: mirror stainless steel + etching', 'Floor: PVC'] },
      { code: 'LC-V102', spec: ['Ceiling: hairline stainless steel + acrylic', 'Side wall: aluminum alloy frame + tempered glass', 'Back wall: hairline stainless steel + mirror etched stainless steel', 'Floor: PVC'] },
      { code: 'LC-V103', spec: ['Ceiling: titanium mirror stainless steel + acrylic + downlight', 'Side wall: titanium stainless steel', 'Back wall: titanium mirror stainless steel + etching', 'Floor: PVC'] },
      { code: 'LC-V104', spec: ['Ceiling: titanium mirror stainless steel + acrylic + downlight', 'Side wall: titanium stainless steel + titanium mirror stainless steel etching', 'Back wall: titanium stainless steel + titanium mirror stainless steel etching', 'Floor: PVC'] },
      { code: 'LC-V105', spec: ['Ceiling: rose gold stainless steel + acrylic', 'Side wall: rose gold stainless steel', 'Back wall: rose gold mirror stainless steel + etching', 'Floor: PVC'] },
      { code: 'LC-V106', spec: ['Ceiling: mirror stainless steel + acrylic + downlight', 'Side wall: hairline stainless steel', 'Rear wall: hairline stainless steel + mirror stainless steel etching', 'Floor: PVC'] },
      { code: 'LC-V107', spec: ['Ceiling: rose gold mirror stainless steel + acrylic + downlight', 'Side wall: sightseeing glass', 'Rear wall: rose gold mirror stainless steel + etching', 'Floor: PVC'] },
      { code: 'LC-V108', spec: ['Ceiling: titanium gold mirror stainless steel + acrylic + downlight', 'Side wall: titanium gold stainless steel', 'Rear wall: titanium gold stainless steel, titanium gold mirror stainless steel etching', 'Floor: PVC (optional marble)'] },
    ],
    applications: homeCar,
    rendered: true,
    gallery: ['home-lc-v100'],
    source: homeCatalog2026,
    pages: [],
  },
  {
    slug: 'home-elevator-lc-v200',
    name: 'ห้องโดยสารลิฟต์บ้าน ซีรีส์ LC-V200',
    en: 'Home Elevator Car LC-V201 – V208',
    category: 'elevators',
    image: 'home-lc-v205',
    description: 'ห้องโดยสารลิฟต์บ้านระดับพรีเมียม 8 แบบ ผสานไม้วอลนัท เมทัลแชมเปญ โรสโกลด์ และไฟแอมเบียนต์ รวมถึงห้องโดยสารกระจกโครงโรสโกลด์และโครงอะลูมิเนียมลายไม้',
    features: ['ไฟซ่อนและไฟแอมเบียนต์ตามรุ่น', 'ผนังไม้วอลนัท เมทัลแชมเปญ และสเตนเลสลายศิลป์', 'ห้องโดยสารกระจก LC-V207 / LC-V208'],
    models: [
      { code: 'LC-V201', spec: ['Ceiling: steel plate white paint, bronze stainless steel rim, hidden lamp belt, LED downlight', 'Car wall: mirror stainless steel back wall and side middle wall, bronze hairline stainless steel auxiliary plate, LED strip', 'Front wall: bronze hairline stainless steel', 'Floor: PVC'] },
      { code: 'LC-V202', spec: ['Ceiling: hairline stainless steel, LED lighting', 'Rear / Side wall: hairline stainless steel on both sides, mirror stainless steel in the middle', 'Front wall / Car door: hairline stainless steel', 'Floor: PVC'] },
      { code: 'LC-V203', spec: ['Ceiling: white paint-free steel plate, LED light strip, LED downlight', 'Rear wall: light champagne metal decorative panel, champagne gold mirror etched hidden light bar', 'Side walls: light champagne metal trim panels, champagne gold inserts, champagne gold mirror stainless steel', 'Front wall / Car doors: light champagne metal panels', 'Floor: PVC'] },
      { code: 'LC-V204', spec: ['Ceiling: steel plate white paint, LED downlight', 'Rear / Side wall: rose gold mirror etching / mirror stainless steel in the middle, rose gold hairline stainless steel + black titanium decorative strip on both sides', 'Front wall / Car door: rose gold hairline stainless steel', 'Floor: standard PVC (optional marble)'] },
      { code: 'LC-V205', spec: ['Ceiling: metallic white car paint, ambient lighting, LED lighting', 'Rear wall: walnut veneer on both sides, ambient lighting, Jazz white art stainless steel in the middle', 'Side walls: walnut veneer on both sides, mirrored stainless steel in the middle', 'Front wall / Car door: mirror stainless steel', 'Floor: PVC'] },
      { code: 'LC-V206', spec: ['Suspended ceiling: mirror-etched stainless steel, LED spotlights, hidden ambient lights', 'Rear wall: rose gold cross-overlapping stainless steel art painting on both sides', 'Side walls: rose gold cross-laminated stainless steel on both sides, black titanium mirror stainless steel in the middle', 'Front wall / Car door: rose gold cross-laminated stainless steel', 'Floor: PVC'] },
      { code: 'LC-V207', spec: ['Ceiling: rose gold mirror stainless steel + acrylic arched roof + LED downlight', 'Rear / Side wall: rose gold stainless steel + glass', 'Front wall: rose gold stainless steel', 'Car door: rose gold stainless steel + glass', 'Floor: PVC'] },
      { code: 'LC-V208', spec: ['Ceiling: aluminum alloy frame, starry sky lighting', 'Rear wall: aluminum alloy frame, tempered laminated glass', 'Side wall: wood grain steel plate, aluminum alloy edge, tempered laminated glass', 'Front wall: wood grain steel plate', 'Car door: aluminum alloy frame, tempered laminated glass', 'Floor: PVC'] },
    ],
    applications: homeCar,
    rendered: true,
    gallery: ['home-lc-v200'],
    source: homeCatalog2026,
    pages: [],
  },
  // ---------- Passenger elevator ----------
  {
    slug: 'passenger-elevator',
    name: 'ลิฟต์โดยสาร ซีรีส์ K',
    en: 'Passenger Elevator NY-K010 / K004 – K009',
    category: 'passenger',
    image: 'passenger-k007',
    description:
      'ห้องโดยสารลิฟต์สำหรับอาคารพักอาศัย สำนักงาน และอาคารพาณิชย์ รุ่นมาตรฐาน NY-K010 และรุ่นเลือกเพิ่ม 6 แบบ ตั้งแต่สเตนเลสแฮร์ไลน์ถึงไทเทเนียมและโรสโกลด์',
    features: [
      'ระบบควบคุมรุ่นใหม่ CAN bus และหน่วยประมวลผล 32-bit DSP',
      'เครื่องลากแบบ Permanent magnet synchronous gearless',
      'ม่านแสงอินฟราเรด 3D light curtain เป็นมาตรฐาน',
      'ระบบป้องกัน UCMP เมื่อลิฟต์เคลื่อนที่ผิดปกติขณะประตูเปิด',
    ],
    specs: [
      ['Control system', 'CAN bus serial communication, VVVF frequency converter, double 32-bit ARM chip'],
      ['Traction machine', 'Permanent magnet synchronous gearless — energy saving more than 40% (catalog)'],
      ['Door operator', 'Digital permanent magnet door operator, infrared screen barrier'],
      ['Safety', 'UCMP protection, overspeed governor, safety gear, buffer'],
      ['COP (standard)', 'NY-COP201 Partition COP — Hairline stainless steel, 8" Segment display'],
      ['LOP (standard)', 'NY-LOP201 — Hairline stainless steel, 4.3" Segment display'],
      ['Landing door (standard)', 'NY-M204 — first landing door hairline stainless steel, other doors painted steel'],
    ],
    models: [
      { code: 'NY-K010', tag: 'standard', spec: ['Ceiling: Stainless steel + acrylic + downlights (NY-DD201)', 'Rear / Side / Front wall: Hairline stainless steel', 'Car door: Hairline stainless steel', 'Floor: PVC (NY-DB203)'] },
      { code: 'NY-K004', tag: 'optional', spec: ['Ceiling: Stainless steel + acrylic (NY-DD214)', 'Rear wall: Hairline stainless steel + Mirror stainless steel', 'Side / Front wall, Car door: Hairline stainless steel', 'Floor: Standard PVC / optional marble (NY-DB209)'] },
      { code: 'NY-K005', tag: 'optional', spec: ['Ceiling: hairline stainless steel + downlights (NY-DD215)', 'Rear wall: mirror stainless steel + mirror etching stainless steel', 'Handrail: hairline stainless steel round', 'Floor: Standard PVC / optional marble (NY-DB210)'] },
      { code: 'NY-K006', tag: 'optional', spec: ['Ceiling: mirror stainless steel + acrylic (NY-DD216)', 'Rear / Side wall: mirror stainless steel + mirror etching stainless steel', 'Handrail: stainless steel round', 'Floor: Standard PVC / optional marble (NY-DB211)'] },
      { code: 'NY-K007', tag: 'optional', spec: ['Ceiling: Titanium hairline stainless steel + light strip + LED downlight (NY-DD209)', 'Back / Side wall: Titanium hairline stainless steel + mirror stainless steel', 'Handrail: Titanium stainless steel triple round tube', 'Floor: Standard PVC / optional marble (NY-DB204)'] },
      { code: 'NY-K008', tag: 'optional', spec: ['Ceiling: Rose-gold mirror stainless steel + acrylic (NY-DD217)', 'Rear / Side wall: Rose-gold hairline stainless steel + rose-gold mirror stainless steel', 'Handrail: Rose gold round stainless steel tube', 'Floor: Standard PVC / marble optional (NY-DB212)'] },
      { code: 'NY-K009', tag: 'optional', spec: ['Ceiling: Bronze mirror stainless steel + transparent film (NY-DD218)', 'Rear / Side wall: Bronze hairline stainless steel + bronze mirror stainless steel', 'Handrail: hairline stainless steel plated in titanium bronze square handrail (arc head)', 'Floor: Standard PVC / marble optional (NY-DB213)'] },
    ],
    applications: 'คอนโดมิเนียม อาคารสำนักงาน โรงแรม และอาคารพาณิชย์',
    rendered: true,
    pages: [5, 10, 11, 12, 33, 34],
  },
  {
    slug: 'small-machine-room-passenger-elevator',
    name: 'ลิฟต์โดยสารห้องเครื่องเล็ก',
    en: 'Small Machine Room Passenger Elevator',
    category: 'passenger',
    image: 'small-machine-room-passenger',
    description:
      'ใช้เครื่องลากแบบจานพร้อมมอเตอร์แม่เหล็กถาวร ห้องเครื่องเป็นเพียงส่วนต่อขยายของปล่องลิฟต์ ก่อสร้างง่าย ต้นทุนต่ำ และเหลือพื้นที่สำหรับอุปกรณ์อื่นมากขึ้น',
    features: ['ลดพื้นที่ห้องเครื่องได้ 50% เทียบกับห้องเครื่องลิฟต์ทั่วไป', 'ก่อสร้างง่ายและประหยัดต้นทุน', 'เพิ่มความยืดหยุ่นในการใช้พื้นที่อาคาร'],
    specs: [
      ['Traction machine', 'Disk type traction machine with permanent-magnet motor'],
      ['Machine room', 'Saving 50% of machine room area'],
      ['Technical parameters', 'See well arrangement diagram (catalog)'],
    ],
    applications: 'อาคารพักอาศัยและอาคารพาณิชย์ที่ต้องการห้องเครื่องขนาดกะทัดรัด',
    pages: [9, 41],
  },
  {
    slug: 'machine-roomless-passenger-elevator',
    name: 'ลิฟต์โดยสารไม่มีห้องเครื่อง (MRL)',
    en: 'Machine-roomless Passenger Elevator',
    category: 'passenger',
    image: 'machine-roomless-passenger',
    description:
      'ต้องการเพียงปล่องลิฟต์อิสระโดยไม่ต้องมีห้องเครื่อง ออกแบบภายใต้แนวคิดประหยัดพลังงานและลดพื้นที่ก่อสร้าง เพิ่มอิสระในการออกแบบอาคาร',
    features: ['ไม่ต้องมีห้องเครื่อง ใช้เพียงปล่องลิฟต์', 'ประหยัดพลังงานไฟฟ้า 40% และพื้นที่อาคาร 10% เทียบกับลิฟต์ทั่วไปที่รับน้ำหนักเท่ากัน (ตามแค็ตตาล็อก)', 'ออกแบบห้องเครื่องและปล่องแบบรวม'],
    specs: [
      ['Machine room', 'Machine-roomless, independent shaft only'],
      ['Energy', 'Saves 40% of electric energy vs. traditional elevators with the same load (catalog)'],
      ['Building area', 'Saves 10% of building area (catalog)'],
    ],
    applications: 'อาคารที่ต้องการลดพื้นที่ดาดฟ้าหรือมีข้อจำกัดความสูงอาคาร',
    pages: [9, 41],
  },
  {
    slug: 'panoramic-elevator',
    name: 'ลิฟต์แก้ว (Panoramic)',
    en: 'Panoramic Elevator NY-G001 – G004',
    category: 'passenger',
    image: 'panoramic-g003',
    description:
      'ลิฟต์ชมวิวที่ผสานความสวยงาม รสนิยม และความสะดวกสบาย สร้างภูมิทัศน์ใหม่ให้อาคาร ออกแบบรูปทรงและโครงสร้างให้เข้ากับสถาปัตยกรรมของแต่ละพื้นที่',
    features: ['รูปทรงครึ่งวงกลม ทรงเหลี่ยม ทรงเพชร และแบบชมวิวเต็มด้าน', 'ครอบห้องโดยสารวัสดุ FRP (glass fiber reinforced plastic)', 'ชมวิวภายนอกได้หลายมุมระหว่างโดยสาร'],
    specs: [
      ['Capacity', '450 – 3200 kg (square type), 825 – 2000 kg (semicircle / diamond type)'],
      ['Speed', '1.0 / 1.5 / 1.75 / 2.0 / 2.5 m/s'],
      ['Structure cover', 'FRP (high-precision glass fiber reinforced plastic)'],
      ['Note', 'Construction drawings are subject to design drawings of technical department'],
    ],
    models: [
      { code: 'NY-G001', tag: 'optional', spec: ['Upper and lower covers: simple upper and lower covers', 'Ceiling: mirror stainless steel + acrylic + downlights (NY-DD219)', 'Rear wall: hairline stainless steel + laminated glass', 'Side / Front wall: hairline stainless steel', 'Floor: PVC (NY-DB202)'] },
      { code: 'NY-G002', tag: 'optional', spec: ['Upper and lower covers: powder coated steel panel + acrylic', 'Ceiling: hairline stainless steel + acrylic (NY-DD220)', 'Rear wall: hairline stainless steel + laminated glass', 'Floor: PVC (NY-DB202)'] },
      { code: 'NY-G003', tag: 'optional', spec: ['Ceiling: hairline stainless steel + acrylic lighting + downlight (NY-DD221)', 'Back wall: Safety laminated glass', 'Handrail: Brushed stainless steel round tube', 'Floor: Standard PVC (Optional marble) (NY-DB214)'] },
      { code: 'NY-G004', tag: 'optional', spec: ['Ceiling: Hairline stainless steel + acrylic lamp decoration (NY-DD222)', 'Front / Side wall: Hairline stainless steel + safety laminated glass', 'Handrail: Round brushed stainless steel tube', 'Floor: Standard PVC (Optional marble) (NY-DB215)'] },
    ],
    applications: 'ห้างสรรพสินค้า โรงแรม อาคารสำนักงาน และอาคารที่ต้องการลิฟต์เป็นจุดเด่นทางสถาปัตยกรรม',
    rendered: true,
    pages: [14, 42],
  },
  {
    slug: 'hospital-elevator',
    name: 'ลิฟต์โรงพยาบาล',
    en: 'Hospital Elevator NY-Y001',
    category: 'passenger',
    image: 'hospital-y001',
    description:
      'ลิฟต์เตียงสำหรับโรงพยาบาล ศูนย์การแพทย์ สถานพักฟื้น และศูนย์สุขภาพ ใช้ fuzzy logic และระบบควบคุมกลุ่มเพื่อลดเวลารอของผู้ป่วยให้มากที่สุด',
    features: [
      'ออกแบบห้องโดยสารให้เงียบ สบาย และรองรับเตียงผู้ป่วย',
      'ตั้งเวลาหน่วงปิดประตู ให้ผู้ป่วยและบุคลากรเข้าออกสะดวก',
      'ตัวเลขแสดงผลขนาดใหญ่ เหมาะกับผู้สูงอายุและผู้มีปัญหาด้านสายตา',
      'อุปกรณ์ฉุกเฉิน (ตัวเลือก) พาลิฟต์เข้าชั้นและเปิดประตูเมื่อไฟดับ',
    ],
    specs: [
      ['Capacity', '1600 / 2000 / 2500 / 3200 kg'],
      ['Speed', '1.0 / 1.5 / 1.75 / 2.0 / 2.5 m/s'],
      ['COP', 'NY-COP206'],
      ['Door', 'Side opening / Center-opening (by capacity)'],
    ],
    models: [
      { code: 'NY-Y001', tag: 'standard', spec: ['Ceiling: Hairline stainless steel + LED light + acrylic lighting (NY-DD223)', 'Front / Side wall: Hairline stainless steel', 'Rear wall: hairline stainless steel + mirror stainless steel', 'Handrails: Stainless steel flat armrests with hairlines on three sides', 'Floor: Artificial marble flooring (NY-DB216)'] },
    ],
    applications: 'โรงพยาบาล คลินิก ศูนย์การแพทย์ และสถานดูแลผู้สูงอายุ',
    rendered: true,
    pages: [42],
  },
  // ---------- Freight elevator ----------
  {
    slug: 'freight-elevator',
    name: 'ลิฟต์ขนส่งสินค้า',
    en: 'Freight Elevator NY-F01',
    category: 'freight',
    image: 'freight-f01',
    description:
      'ลิฟต์ขนส่งสินค้าโครงสร้างห้องโดยสารแข็งแรง ใช้งานปลอดภัยและติดตั้งสะดวก เหมาะกับโรงงาน คลังสินค้า ซูเปอร์มาร์เก็ต และศูนย์กระจายสินค้า',
    features: [
      'รูปแบบการเปิดประตู 4 แบบ: เปิดข้าง เปิดกลางพับสองชั้น ทางเดียว และสองทาง',
      'โหมดสแตนด์บายตัดไฟส่องสว่างและพัดลมอัตโนมัติ',
      'ตู้ควบคุมรวมระบบควบคุมลิฟต์และการขับเคลื่อนไว้ด้วยกัน',
    ],
    specs: [
      ['Capacity (construction parameters)', '1000 – 20000 kg'],
      ['Speed', '0.5 / 1.0 m/s (by capacity)'],
      ['Door opening mode', 'Two panel sliding / Center-opening & double-folded / Single way / Double way'],
      ['Color standard', 'NY-P01 Light grey, NY-P02 Beige, NY-P03 Bright apple green'],
      ['Floor', 'Powder-coated patterned steel plate / Stainless steel checked plate (optional)'],
    ],
    models: [
      { code: 'NY-F01', tag: 'standard', spec: ['Ceiling: Paint steel (color optional) (NY-DD301)', 'Car wall / Car door: Paint steel (color optional)', 'Floor: Checkered steel plate (NY-DB301)', 'Sill: Steel plate ridge', 'Lighting: Energy-saving downlight', 'Ventilation mode: Circular fan', 'Door opening mode: Double folded center opening'] },
      { code: 'Landing door', spec: ['NY-M20 Center opening', 'NY-M21 Side opening', 'NY-M22 Center-opening & double folded type'] },
      { code: 'Operation panel', spec: ['NY-COP204 Partition COP', 'NY-LOP207'] },
    ],
    applications: 'โรงงาน คลังสินค้า ห้างสรรพสินค้า ศูนย์การค้า และศูนย์กระจายสินค้า',
    rendered: true,
    pages: [32, 43],
  },
  {
    slug: 'machine-roomless-freight-elevator',
    name: 'ลิฟต์ขนส่งสินค้าไม่มีห้องเครื่อง',
    en: 'Machine Roomless Freight Elevator',
    category: 'freight',
    image: 'machine-roomless-freight',
    description:
      'ลิฟต์ขนส่งสินค้าที่ต้องการเพียงปล่องลิฟต์ ไม่ต้องมีห้องเครื่อง ช่วยประหยัดพื้นที่อาคารและเพิ่มอิสระในการออกแบบ ติดตั้งง่ายเพื่อให้งานก่อสร้างเดินหน้าได้ตามแผน',
    features: ['ประหยัดพื้นที่อาคาร 10% เทียบกับลิฟต์ขนส่งสินค้าแบบมีห้องเครื่องที่รับน้ำหนักเท่ากัน (ตามแค็ตตาล็อก)', 'มีแผนการติดตั้งที่ง่ายและมีประสิทธิภาพ', 'ใช้งานได้หลากหลายกว่าลิฟต์ขนส่งแบบมีห้องเครื่อง'],
    specs: [
      ['Capacity (construction parameters)', 'up to 10000 kg'],
      ['Speed', '0.5 m/s'],
      ['Door', 'Center-opening & double-folded'],
      ['Note', 'The schematic drawing is for reference only'],
    ],
    applications: 'คลังสินค้า โรงงาน และอาคารที่ไม่สะดวกสร้างห้องเครื่องบนหลังคา',
    pages: [30, 43],
  },
  {
    slug: 'large-tonnage-freight-elevator',
    name: 'ลิฟต์ขนส่งน้ำหนักมาก / ลิฟต์รถยนต์',
    en: 'Large Tonnage Freight Elevator',
    category: 'freight',
    image: 'large-tonnage-freight',
    description:
      'ลิฟต์ขนส่งขนาดใหญ่ รองรับขนาดและน้ำหนักของรถยนต์ ใช้ขนรถระหว่างชั้นจอด เหมาะกับอาคารจอดรถขนาดใหญ่และโชว์รูมรถยนต์',
    features: ['โครงห้องโดยสารความแข็งแรงสูง จับคู่กับแชสซีเสริมพิเศษ', 'ห้องโดยสารกว้างและสว่าง ขนสินค้าขนาดใหญ่เข้าออกได้สะดวก', 'ยืดอายุการใช้งานของห้องโดยสาร'],
    specs: [
      ['Capacity (construction parameters)', 'up to 20000 kg'],
      ['Door', 'Center-opening & double-folded'],
    ],
    applications: 'อาคารจอดรถ โชว์รูมรถยนต์ (4S stores) และคลังสินค้าขนาดใหญ่',
    pages: [43],
  },
  // ---------- Barrier-free lift (2026-10) ----------
  {
    slug: 'rack-inclined-platform-lift',
    metaTitle: 'ลิฟต์คนพิการ Rack Lift',
    name: 'ลิฟต์คนพิการแบบรางบันไดตรง (Rack Lift)',
    en: 'Inclined Platform Lift — Rack Lift',
    category: 'accessibility',
    image: 'rack-lift',
    description:
      'ลิฟต์ขึ้นลงบันไดสำหรับผู้ใช้รถเข็น วิ่งบนรางที่ติดตั้งตามแนวบันไดตรง ขับเคลื่อนด้วยระบบแร็กแอนด์พิเนียน แท่นพับเก็บได้อัตโนมัติ ไม่กีดขวางทางเดินเมื่อไม่ใช้งาน',
    features: [
      'แท่นยืนพับเก็บอัตโนมัติ พร้อมแผ่นปิดปลายและแผ่นกันลื่น PVC',
      'แผงควบคุมจอ LCD 5 นิ้ว และปุ่มกดอักษรเบรลล์',
      'ติดตั้งได้ทั้งแบบยึดผนัง ยึดเสา หรือแบบผสม',
      'สัญญาณเตือนแสง-เสียง ระบบกันชนราวกั้น และพับเก็บด้วยมือได้ในกรณีฉุกเฉิน',
    ],
    specs: [['Drive type', 'Rack and pinion'], ['Fixing mode', 'Wall / Column mounted / Hybrid'], ...accessSpecs, ['Components', accessComponents]],
    applications: 'บันไดตรงในอาคารสาธารณะ สถานีขนส่ง พิพิธภัณฑ์ โรงเรียน โรงพยาบาล อาคารสำนักงาน และบ้านพักอาศัยที่มีผู้ใช้รถเข็น',
    gallery: ['rack-lift-photo', 'rack-lift-components', 'rack-lift-drawing'],
    source: accessCatalog,
    pages: [],
  },
  {
    slug: 'sprocket-inclined-platform-lift',
    metaTitle: 'ลิฟต์คนพิการ Sprocket Lift',
    name: 'ลิฟต์คนพิการแบบรางโค้งต่อเนื่อง (Sprocket Lift)',
    en: 'Inclined Platform Lift — Sprocket Lift',
    category: 'accessibility',
    image: 'sprocket-lift',
    description:
      'ลิฟต์ขึ้นลงบันไดสำหรับผู้ใช้รถเข็น ขับเคลื่อนด้วยระบบเฟืองโซ่ รางวิ่งต่อเนื่องเลี้ยวโค้งตามบันไดหักมุมหรือบันไดหลายช่วงได้ในชุดเดียว พร้อมตู้ควบคุมหัว-ท้ายราง',
    features: [
      'รางโค้งต่อเนื่องผ่านชานพักบันได ไม่ต้องเปลี่ยนเครื่องระหว่างช่วง',
      'แท่นยืนพับเก็บได้ พร้อมแผ่นปิดปลายอะลูมิเนียมและแผ่นกันลื่น PVC',
      'ปุ่มกดอักษรเบรลล์ ราวจับ และราวกั้นบนตัวเครื่อง',
      'ตัวเลือกความปลอดภัย เช่น เตือนน้ำหนักเกิน ระบบกันตก และ UPS',
    ],
    specs: [['Drive type', 'Sprocket'], ...accessSpecs, ['Components', 'Upper and lower housing (cold-rolled sheet), upper and lower guide rails, columns, braille buttons, guardrail, aluminum folding pedal and flap, PVC non-slip mat']],
    applications: 'บันไดหักมุม บันไดหลายช่วง และบันไดวนในอาคารสาธารณะ อาคารสำนักงาน และบ้านพักอาศัย',
    gallery: ['sprocket-lift-photo', 'sprocket-lift-components', 'sprocket-lift-drawing'],
    source: accessCatalog,
    pages: [],
  },
  {
    slug: 'mini-vertical-platform-lift',
    name: 'ลิฟต์คนพิการแนวตั้ง (MINI Lift)',
    en: 'Vertical Platform Lift — MINI Lift',
    category: 'accessibility',
    image: 'mini-lift',
    description:
      'ลิฟต์แท่นยกแนวตั้งระบบไฮดรอลิก ยกผู้ใช้รถเข็นขึ้นลงระดับต่างกันได้สูงสุด 5 เมตร ติดตั้งได้ทั้งภายในและภายนอกอาคาร เข้า-ออกได้ 90°, 180° หรือประตูเดียวกัน',
    features: [
      'ประตูอัตโนมัติป้องกันการหนีบ และปุ่มลดระดับฉุกเฉิน',
      'กำหนดขนาดแท่นได้ ยาว 1100–1500mm กว้าง 700–1200mm',
      'ทางลาดอะลูมิเนียม พื้นผิว PVC และรีโมตคอนโทรลมาตรฐาน',
      'ตรวจจับการเปิดประตูโดยไม่ได้รับอนุญาต และที่เปิดประตูฉุกเฉินแบบมือ',
    ],
    specs: [
      ['Drive type', 'Hydraulic'],
      ['Loading', '250KG'],
      ['Power supply', 'AC 220V/50HZ'],
      ['Pedal size', 'Length 1100–1500mm, Width 700–1200mm'],
      ['Height', '≤ 5000mm'],
      ['Entry and exit', '90° / 180° / The same door'],
      ['Overall power', '2.8KW'],
      ['Speed', '0 – 120mm/s'],
      ['Safety features', 'Base plate anti-collision / Emergency descent button / Anti-pinch automatic door / Emergency manual door opener / Unauthorized door opening detection'],
      ['Components', 'Aluminum guide rail, Q235B platform, automatic platform and floor doors (aluminum + acrylic), fence, aluminum pedal and ramp, PVC surface, call boxes, standard remote control'],
    ],
    applications: 'ทางเข้าอาคารที่มีขั้นบันไดหรือระดับพื้นต่างกัน บ้านพักอาศัย ร้านค้า คลินิก และอาคารสาธารณะ',
    gallery: ['mini-lift-house', 'mini-lift-photo', 'mini-lift-photo-2'],
    source: accessCatalog,
    pages: [],
  },
  // ---------- Escalator & moving walk ----------
  {
    slug: 'escalator',
    name: 'บันไดเลื่อน',
    en: 'Escalator',
    category: 'escalators',
    image: 'escalator',
    description:
      'บันไดเลื่อนที่ผสานความปลอดภัย การใช้งาน ความทนทาน และความสวยงาม ดีไซน์เส้นสายลื่นไหลกลมกลืนกับสถาปัตยกรรมโดยรอบ ควบคุมด้วยระบบไมโครคอมพิวเตอร์',
    features: ['โครงถัก (truss) ขนาดใหญ่ แข็งแรง ต้านการบิดตัว', 'ระบบความปลอดภัยมาตรฐานครบ เช่น ปุ่มหยุดฉุกเฉิน ป้องกันราวมือจับ และแผ่นหวี', 'โหมดความเร็วต่ำอัตโนมัติเมื่อไม่มีผู้ใช้งาน ช่วยประหยัดพลังงาน'],
    specs: [
      ['Inclination', '30° / 35°'],
      ['Step width', '600 / 800 / 1000 mm'],
      ['Rated speed (optional)', '0.4 / 0.45 / 0.5 m/s'],
      ['Arrangement', 'Single unit / Continuous / Interrupted / Multi-level parallel / Multi-level criss-cross'],
    ],
    models: [
      { code: '30° / 35° escalator', spec: ['600 — Center distance of handrail 838, outer width 1140, load-bearing beam ≥ 1200', '800 — Center distance of handrail 1038, outer width 1340, load-bearing beam ≥ 1400', '1000 — Center distance of handrail 1238, outer width 1540, load-bearing beam ≥ 1600'] },
    ],
    applications: 'ห้างสรรพสินค้า อาคารสำนักงาน สนามบิน และอาคารสาธารณะ',
    comingSoon: true,
    pages: [35, 38, 39, 45, 46],
  },
  {
    slug: 'public-traffic-escalator',
    name: 'บันไดเลื่อนสำหรับระบบขนส่งสาธารณะ',
    en: 'Public Traffic Escalator',
    category: 'escalators',
    image: 'public-traffic-escalator',
    description:
      'บันไดเลื่อนงานหนักสำหรับพื้นที่ภายนอก สถานีรถไฟฟ้า ตลาดใต้ดิน และสะพานลอย ทนแดด ฝน ลม และฝุ่น รองรับการใช้งานต่อเนื่องภายใต้โหลดสูง',
    features: ['กันน้ำ ทนการกัดกร่อน และกันฝุ่น', 'ทำงานต่อเนื่องภายใต้โหลดสูงและมีอายุการใช้งานยาวนาน', 'ตัวเลือกสำหรับงานภายนอก เช่น สวิตช์ระดับน้ำ และตัวแยกน้ำมัน-น้ำ'],
    specs: [
      ['Inclination', '30°'],
      ['Step width', '800 / 1000 mm'],
      ['Escalator outer width', '1400 / 1600 mm'],
      ['Center distance of handrail', '1110 / 1310 mm'],
    ],
    applications: 'สถานีรถไฟฟ้า สะพานลอย ทางเชื่อมสาธารณะ และพื้นที่กลางแจ้ง',
    comingSoon: true,
    pages: [39, 47],
  },
  {
    slug: 'moving-walk',
    name: 'ทางเลื่อน',
    en: 'Moving Walk',
    category: 'escalators',
    image: 'moving-walk',
    description:
      'ทางเลื่อนออกแบบโดยคำนึงถึงผู้ใช้งาน รองรับผู้โดยสารจำนวนมากในพื้นที่สาธารณะ โครงถักโลหะความแม่นยำสูง แข็งแรงและปลอดภัย',
    features: ['เลือกอุปกรณ์เสริมตามสภาพแวดล้อมการใช้งาน', 'โครงสร้างแข็งแรง รับน้ำหนักได้ดี', 'ตัวเลือกระบบขับเคลื่อน variable frequency ช่วยประหยัดพลังงาน'],
    specs: [
      ['Inclination', '10° – 12°'],
      ['Step width', '800 / 1000 mm'],
      ['Center distance of handrail', '1038 / 1238 mm'],
      ['Rated speed', '0.5 m/s'],
    ],
    applications: 'สนามบิน ห้างสรรพสินค้า ไฮเปอร์มาร์เก็ต และอาคารสาธารณะ',
    comingSoon: true,
    pages: [38, 48],
  },
  // ---------- Doors ----------
  {
    slug: 'hall-door',
    name: 'ประตูหน้าชั้นลิฟต์ (Hall Door)',
    en: 'Hall Door Design NY-M101 – M124',
    category: 'doors',
    image: 'hall-door-collection',
    description:
      'ประตูลิฟต์หน้าชั้น 24 แบบ ตั้งแต่เหล็กพ่นสีมาตรฐาน สเตนเลสแฮร์ไลน์หลากสี สเตนเลสกัดลาย ไปจนถึงเหล็กลายไม้และประตูกรอบกระจก',
    features: ['รุ่นมาตรฐานเหล็กพ่นสี แชมเปญโกลด์ / ขาวนม / เทา', 'สเตนเลสแฮร์ไลน์ โรสโกลด์ แชมเปญโกลด์ บรอนซ์ แบล็กไทเทเนียม', 'สเตนเลสกัดลาย เหล็กลายไม้ และประตูกระจก'],
    models: [
      { code: 'Standard', spec: ['NY-M101 steel plate spraying (champagne gold)', 'NY-M102 steel plate spraying (milky white)', 'NY-M103 steel plate spraying (cinerite)', 'NY-M117 Titanium gold mirror stainless steel etching', 'NY-M118 Shallow champagne blonde stainless steel etching', 'NY-M119 Shallow bronze hairline stainless steel etching'] },
      { code: 'Optional — Hairline', spec: ['NY-M104 Sandblasted titanium gold stainless steel', 'NY-M105 Rose gold hairline stainless steel', 'NY-M106 Champagne gold hairline stainless steel', 'NY-M107 Bronze hairline stainless steel', 'NY-M108 Black titanium hairline stainless steel'] },
      { code: 'Optional — Etching', spec: ['NY-M109 / M110 Hairline stainless steel etching', 'NY-M111 / M112 Rose gold hairline stainless steel etching', 'NY-M116 Black titanium mirror etched stainless steel', 'NY-M121 / M123 Titanium gold mirror stainless steel etching', 'NY-M122 Shallow champagne blonde stainless steel etching'] },
      { code: 'Optional — Wood grain & glass', spec: ['NY-M113 / M114 / M115 Wood grain steel plate', 'NY-M120 Champagne gold stainless steel (framed glass door)', 'NY-M124 Hairline stainless steel glass'] },
    ],
    applications: 'ลิฟต์บ้าน ลิฟต์โดยสาร และโถงลิฟต์ของอาคาร เลือกให้เข้ากับงานตกแต่งภายใน',
    rendered: true,
    pages: [25, 26],
  },
  {
    slug: 'landing-door',
    name: 'ประตูชานพักลิฟต์ (Landing Door)',
    en: 'Landing Door NY-M201 – M219',
    category: 'doors',
    image: 'landing-door',
    description: 'ประตูชานพักลิฟต์ 18 แบบ รุ่นมาตรฐาน 3 แบบ และรุ่นเลือกเพิ่มทั้งโทนโลหะ ลายกัดกระจก และลายไม้',
    features: ['รุ่นมาตรฐาน NY-M201, NY-M202, NY-M203', 'โทนแฮร์ไลน์ โรสโกลด์ โกลด์ และแบล็ก', 'ลายกัดตกแต่งและลายไม้'],
    models: [
      { code: 'Standard', spec: ['NY-M201', 'NY-M202', 'NY-M203'] },
      { code: 'Optional', spec: ['NY-M204 – NY-M209', 'NY-M210 – NY-M211', 'NY-M213 – NY-M219'] },
    ],
    applications: 'ลิฟต์โดยสารและลิฟต์บ้าน',
    rendered: true,
    pages: [17],
  },
  {
    slug: 'home-landing-door-lc',
    name: 'ประตูหน้าชั้นลิฟต์บ้าน ซีรีส์ LC-M',
    en: 'Home Lift Landing Door LC-M01 – M21',
    category: 'doors',
    image: 'landing-door-lc',
    description: 'ประตูหน้าชั้นสำหรับลิฟต์บ้าน ทั้งซีรีส์กึ่งอัตโนมัติกรอบกระจก 6 สี และประตูแบบ Gantry สเตนเลสแฮร์ไลน์ สเตนเลสกัดลาย และประตูกรอบกระจก',
    features: ['ซีรีส์กึ่งอัตโนมัติ LC-M01 – M06 กรอบกระจก 6 สี', 'Gantry มาตรฐาน LC-M07 – M11 สเตนเลสแฮร์ไลน์หลายโทน', 'Gantry เลือกเพิ่ม: สเตนเลสกัดลายและประตูกรอบกระจก'],
    models: [
      { code: 'Semi-automatic series', spec: ['LC-M01 Matte black', 'LC-M02 Rose gold', 'LC-M03 Champagne gold', 'LC-M04 Redwood grain', 'LC-M05 Smoke gray', 'LC-M06 Pearl white'] },
      { code: 'Gantry standard landing door', spec: ['LC-M07 Sandblasted titanium gold stainless steel', 'LC-M08 Rose gold hairline stainless steel', 'LC-M09 Champagne gold hairline stainless steel', 'LC-M10 Bronze hairline stainless steel', 'LC-M11 Hairline stainless steel'] },
      { code: 'Gantry optional landing door', spec: ['LC-M17 Titanium gold stainless steel framed glass door', 'LC-M13 Rose gold hairline stainless steel etching', 'LC-M14 Light champagne blonde stainless steel etching', 'LC-M15 Light bronze hairline stainless steel etching', 'LC-M21 Black titanium stainless steel framed glass door'] },
    ],
    applications: 'ลิฟต์บ้านระบบ Traction, ไฮดรอลิก และ Platform เลือกให้เข้ากับงานตกแต่งโถงบ้าน',
    rendered: true,
    gallery: ['landing-door-lc-semi'],
    source: homeCatalog2026,
    pages: [],
  },
  // ---------- Interior & control ----------
  {
    slug: 'operation-panel',
    collection: 'NERAMIT SMART',
    name: 'แผงควบคุมและจอแสดงผล (COP / LOP)',
    en: 'Operation Panel, Display & Buttons',
    category: 'accessories',
    image: 'operation-panel',
    description: 'แผงควบคุมในห้องโดยสาร (COP) ปุ่มเรียกหน้าชั้น (LOP) จอแสดงผลขนาด 4.3" ถึง 12.1" ปุ่มกด ไฟแสดงชั้น และตัวบอกตำแหน่ง',
    features: ['จอแสดงผล 4.3" มาตรฐาน และจอ 7"–12.1" เป็นตัวเลือก', 'แผงควบคุมแบบ Partition และแบบ Integrated', 'ปุ่มกด ไฟชานพัก และตัวบอกตำแหน่งหลายรูปแบบ'],
    models: [
      { code: 'COP', spec: ['NY-COP202 Partition COP (Standard)', 'NY-COP203 / COP204 Partition COP (Optional)', 'NY-COP205 Integrated operation panel (Optional)'] },
      { code: 'Hall Buttons', spec: ['NY-LOP202 (Standard)', 'NY-LOP203 – LOP206 (Optional)'] },
      { code: 'Display', spec: ['NY-X01 – X06 4.3" (Standard)', 'NY-X07 / X08 4.3" (Optional)', 'NY-X09 / X10 7", NY-X11 8", NY-X12 10.4", NY-X13 12.1" (Optional)'] },
      { code: 'Buttons & indicators', spec: ['Buttons NY-AN01 / AN02 / AN03 (Optional)', 'Landing Light NY-L01 / L02 (Optional)', 'Position Indicators NY-CX01 / CX02 (Optional)'] },
    ],
    rendered: true,
    pages: [16],
  },
  {
    slug: 'touch-screen-panel',
    collection: 'NERAMIT SMART',
    name: 'แผงควบคุมระบบสัมผัส',
    en: 'COP & LOP — Touch Screen Series',
    category: 'accessories',
    image: 'touch-screen-panel',
    description: 'แผงควบคุมลิฟต์บ้านและปุ่มเรียกหน้าชั้น ทั้งแบบปุ่มกดมาตรฐานและซีรีส์หน้าจอสัมผัส ดีไซน์ร่วมสมัย',
    features: ['ชุดมาตรฐาน NY-C101 / C102 คู่กับ NY-L101', 'ซีรีส์หน้าจอสัมผัส NY-C103 – C106', 'ปุ่มเรียกหน้าชั้น NY-L103 – L106'],
    models: [
      { code: 'Standard', spec: ['NY-C101', 'NY-C102', 'NY-L101'] },
      { code: 'Touch screen series (Optional)', spec: ['NY-C103 / NY-L103', 'NY-C104 / NY-L104', 'NY-C105 / NY-L105', 'NY-C106 / NY-L106'] },
    ],
    rendered: true,
    pages: [27],
  },
  {
    slug: 'ceiling-series',
    name: 'ฝ้าเพดานห้องโดยสาร',
    en: 'Ceiling Series NY-DD101 – DD106, DD201 – DD210',
    category: 'accessories',
    image: 'ceiling-series',
    description: 'ฝ้าเพดานห้องโดยสารลิฟต์ ทั้งสเตนเลสแฮร์ไลน์ สเตนเลสกระจก บรอนซ์ และแบล็กไทเทเนียม พร้อมไฟ LED และอะคริลิก',
    features: ['ไฟดาวน์ไลต์และไฟเส้น LED', 'วัสดุสเตนเลสหลายโทน', 'ใช้ร่วมกับห้องโดยสารลิฟต์บ้านและลิฟต์โดยสาร'],
    models: [
      { code: 'NY-DD101 – DD106', spec: ['NY-DD101 Hairline stainless steel, acrylic', 'NY-DD102 Mirror stainless steel, LED downlight, acrylic', 'NY-DD103 Mirror stainless steel, acrylic', 'NY-DD104 Mirror stainless steel, LED light strip, hairline stainless steel', 'NY-DD105 Bronze stainless steel, LED light strip', 'NY-DD106 Black titanium mirror, acrylic'] },
      { code: 'NY-DD201 – DD210', tag: 'optional', spec: ['NY-DD201 – NY-DD210 Ceiling series (optional)'] },
    ],
    rendered: true,
    pages: [18, 28],
  },
  {
    slug: 'handrail-floor',
    name: 'ราวจับและพื้นห้องโดยสาร',
    en: 'Handrail & Floor',
    category: 'accessories',
    image: 'handrail-floor',
    description: 'ราวจับสเตนเลสและไม้ พร้อมพื้นห้องโดยสารทั้ง PVC และลายหินอ่อน เติมรายละเอียดให้ห้องโดยสารครบสมบูรณ์',
    features: ['ราวจับสเตนเลสแฮร์ไลน์ ไทเทเนียมโกลด์ และไม้ผสมโลหะ', 'พื้น PVC สีพื้น ลายปาร์เก้ และลายไม้', 'พื้นลายหินอ่อน NY-DB201 – DB206'],
    models: [
      { code: 'Handrail', spec: ['NY-H101 Hairline stainless steel mono-tube', 'NY-H102 Titanium gold mirror stainless steel mono-tube', 'NY-H103 short grain stainless steel, arc head', 'NY-H104 Combination of round wood and titanium gold', 'NY-H201 – NY-H206 (optional)'] },
      { code: 'Floor', spec: ['NY-DB101 Monochrome PVC, beige', 'NY-DB102 Monochrome PVC, grey', 'NY-DB103 – DB105 Parquet PVC', 'NY-DB106 Imitation wood grain PVC', 'NY-DB201 – NY-DB206 (optional)'] },
    ],
    rendered: true,
    pages: [18, 28],
  },
  // ---------- Interior & control: Residential Elevator Series (2026-10) ----------
  {
    slug: 'home-lift-hmi-lc',
    metaTitle: 'แผงควบคุมลิฟต์บ้าน COP / LOP',
    collection: 'NERAMIT SMART',
    name: 'แผงควบคุมลิฟต์บ้าน COP / LOP และจอสัมผัส ซีรีส์ LC',
    en: 'Home Lift Human-machine Interface LC-C / LC-L',
    category: 'accessories',
    image: 'hmi-lc-cop',
    description: 'แผงควบคุมในห้องโดยสาร (COP) ปุ่มเรียกหน้าชั้น (LOP) และแผงจอสัมผัสสำหรับลิฟต์บ้าน มีทั้งแบบปุ่มกดแนวตั้ง แนวนอน และหน้าจอสัมผัสดีไซน์ร่วมสมัย',
    features: ['แผงจอสัมผัส LC-C301 (มาตรฐาน) และ LC-C302 – C305', 'COP ซีรีส์ LC-C100 และ LC-C200', 'LOP ซีรีส์ LC-L100 และ LC-L200'],
    models: [
      { code: 'Touch screen', spec: ['LC-C301 (Standard)', 'LC-C302 / C303 / C304 / C305 (Optional)'] },
      { code: 'COP', spec: ['LC-C101 / C102 (Standard)', 'LC-C103 / C104 / C105 (Optional)', 'LC-C201 / C202 / C203 (Standard)', 'LC-C204 / C205 (Optional)'] },
      { code: 'LOP', spec: ['LC-L101 / L102 (Standard)', 'LC-L103 / L104 / L105 / L106 / L07 / L08 (Optional)', 'LC-L201 / L202 / L203 (Standard)', 'LC-L204 / L205 / L206 / L207 (Optional)'] },
    ],
    rendered: true,
    gallery: ['touch-screen-lc', 'hmi-lc-cop-lop'],
    source: homeCatalog2026,
    pages: [],
  },
  {
    slug: 'luminous-stone-back-plate',
    metaTitle: 'แผงผนังหินเรืองแสง LC-V300',
    name: 'แผงผนังหลังหินเรืองแสง ซีรีส์ LC-V300',
    en: 'Slate & Stone Luminous Back Plate LC-V301 – V306',
    category: 'accessories',
    image: 'stone-back-plate',
    description: 'แผงผนังหลังห้องโดยสารจากหินสเลทและหินคุณภาพสูงแบบมีไฟส่องจากด้านหลัง สั่งทำลวดลายได้ เปลี่ยนผนังลิฟต์บ้านให้เป็นงานตกแต่งชิ้นเด่น',
    features: ['6 ลวดลาย LC-V301 – LC-V306', 'แผ่นหลังเรืองแสง สั่งทำได้ตามแบบ', 'เนื่องจากหินแต่ละแผ่นมีลายต่างกัน ให้ยึดตามตัวอย่างวัสดุจริง'],
    models: [{ code: 'LC-V301 – LC-V306', spec: ['Slate and high-end stone, luminous back plate, avant-garde customization', 'Note: physical samples prevail due to the variety of slate and stone'] }],
    rendered: true,
    gallery: ['stone-back-plates'],
    source: homeCatalog2026,
    pages: [],
  },
  {
    slug: 'starry-ceiling-floor-lc',
    metaTitle: 'ฝ้าลายท้องฟ้าและพื้น ซีรีส์ LC',
    name: 'ฝ้าเพดานลายท้องฟ้าและพื้นห้องโดยสาร ซีรีส์ LC',
    en: 'Starry Sky Ceiling & Floor LC-CL / LC-D',
    category: 'accessories',
    image: 'ceiling-floor-lc',
    description: 'ฝ้าเพดานห้องโดยสารลิฟต์บ้านลายท้องฟ้าดาว (Starry sky) และลายภาพสีเงาสูง พร้อมพื้นหินสเลทและพรม PVC ทอ',
    features: ['ฝ้าลายท้องฟ้าดาว LC-CL07 – CL10', 'ฝ้าภาพสีเงาสูง LC-CL11 – CL14', 'พื้นหินสเลท LC-D05 – D07 และพรม PVC ทอ LC-D09 – D11'],
    models: [
      { code: 'Ceiling', spec: ['LC-CL07 – CL10 Starry sky top optional pattern', 'LC-CL11 – CL14 Colorful / high-gloss starry sky top optional pattern'] },
      { code: 'Floor', spec: ['LC-D05 / D06 / D07 Slate floor (pit depth 120mm)', 'LC-D09 / D10 / D11 PVC woven carpet'] },
    ],
    rendered: true,
    source: homeCatalog2026,
    pages: [],
  },
  {
    slug: 'door-handle-handrail-lc',
    metaTitle: 'มือจับประตูและราวจับ LC-F',
    name: 'มือจับประตูและราวจับลิฟต์บ้าน ซีรีส์ LC-F',
    en: 'Door Handle & Handrail LC-F01 – F14',
    category: 'accessories',
    image: 'door-handle-handrail-lc',
    description: 'มือจับประตูลิฟต์บ้านอะลูมิเนียมอัลลอยหลายทรงและหลายสี พร้อมราวจับห้องโดยสารแบบสเตนเลสและไทเทเนียมโกลด์ผสมไม้',
    features: ['มือจับมาตรฐาน LC-F05 – F14', 'สีอะลูมิเนียม โรสโกลด์ ดำ และพอร์ซเลนโกลด์', 'ราวจับเลือกเพิ่ม LC-F01 – F03'],
    models: [
      { code: 'Door handle (Standard)', spec: ['LC-F05 / F08 / F11 Aluminium alloy', 'LC-F06 / F14 Rose gold aluminium alloy', 'LC-F07 / F10 / F13 Black aluminium alloy', 'LC-F09 / F12 Porcelain gold aluminium alloy'] },
      { code: 'Handrail (Optional)', spec: ['LC-F01 Rose gold hairline stainless steel mono-tube', 'LC-F02 Hairline stainless steel, arc head', 'LC-F03 Titanium gold + wood'] },
    ],
    rendered: true,
    source: homeCatalog2026,
    pages: [],
  },
];
export const products = allProducts.filter((p) => !removed.includes(p.category));
/** Collection badge on product cards, matching the homepage NERAMIT COLLECTION labels. */
export const productCollection = (p: Product) =>
  p.collection ?? allCategories.find((c) => c.id === p.category)?.collection ?? 'NERAMIT';
export const productImage = (p: { image: string }) => `/products/${p.image}.webp`;
export const catalogPage = (n: number) => `/catalog/page-${String(n).padStart(2, '0')}.webp`;

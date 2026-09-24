// Quote/contact form endpoint. Sends each inquiry to the company inbox through Resend
// (https://resend.com). Configure on Vercel: RESEND_API_KEY (required), INQUIRY_TO_EMAIL
// and RESEND_FROM (optional). Without a key the endpoint answers 503 and the form tells
// the visitor to call or use LINE instead, so nothing is ever reported as sent when it wasn't.
import { company } from '@/data/company';

const DEFAULT_TO = 'materscitech.dp2024@gmail.com';
const DEFAULT_FROM = `${company.siteName} <onboarding@resend.dev>`;
const FIELDS: [key: string, label: string, max: number][] = [
  ['name', 'ชื่อผู้ติดต่อ', 120],
  ['company', 'บริษัท / โครงการ', 160],
  ['phone', 'เบอร์โทรศัพท์', 20],
  ['email', 'Email', 160],
  ['product', 'สินค้าที่สนใจ', 200],
  ['building', 'ประเภทอาคาร', 80],
  ['location', 'จังหวัด / สถานที่ติดตั้ง', 180],
  ['preferred', 'ช่องทางติดต่อที่สะดวก', 40],
  ['message', 'รายละเอียดโครงการ', 3000],
  ['page', 'ส่งจากหน้า', 300],
];
const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const reply = (status: number, message: string) => Response.json({ message }, { status });

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply(400, 'ข้อมูลไม่ถูกต้อง กรุณาลองอีกครั้ง');
  }
  // Honeypot: real visitors never see or fill this field.
  if (String(form.get('website') ?? '')) return reply(200, 'ได้รับข้อมูลแล้ว');

  const data = Object.fromEntries(
    FIELDS.map(([key, , max]) => [key, String(form.get(key) ?? '').trim().slice(0, max)]),
  );
  const emailOk = !data.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
  if (!data.name || !/^[0-9+() .\-]{8,20}$/.test(data.phone) || !emailOk)
    return reply(400, 'กรุณากรอกชื่อ เบอร์โทรศัพท์ และอีเมลให้ถูกต้อง');

  const key = process.env.RESEND_API_KEY;
  if (!key) return reply(503, `ระบบส่งแบบฟอร์มยังไม่พร้อมใช้งาน กรุณาโทร ${company.COMPANY_PHONE} หรือติดต่อผ่าน LINE`);

  const kind = form.get('kind') === 'contact' ? 'ติดต่อสอบถาม' : 'ขอใบเสนอราคา';
  const rows = FIELDS.filter(([k]) => data[k]);
  const html = `<h2>${kind} จากเว็บไซต์ ${escape(company.siteName)}</h2><table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif">${rows
    .map(
      ([k, label]) =>
        `<tr><th align="left" valign="top" style="border-bottom:1px solid #ddd">${label}</th><td style="border-bottom:1px solid #ddd;white-space:pre-wrap">${escape(data[k])}</td></tr>`,
    )
    .join('')}</table>`;
  const text = rows.map(([k, label]) => `${label}: ${data[k]}`).join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || DEFAULT_FROM,
        to: (process.env.INQUIRY_TO_EMAIL || DEFAULT_TO).split(',').map((s) => s.trim()),
        ...(data.email ? { reply_to: data.email } : {}),
        subject: `[${kind}] ${data.name}${data.product ? ' — ' + data.product : ''}`,
        html,
        text,
      }),
    });
    if (!res.ok) {
      console.error('Resend error', res.status, await res.text());
      throw new Error('send failed');
    }
  } catch {
    return reply(502, `ส่งข้อมูลไม่สำเร็จ กรุณาลองอีกครั้ง หรือโทร ${company.COMPANY_PHONE}`);
  }
  return reply(200, 'ทีมงานได้รับข้อมูลของคุณแล้ว และจะติดต่อกลับโดยเร็วในวันและเวลาทำการ');
}

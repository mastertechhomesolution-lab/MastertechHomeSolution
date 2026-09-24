// Posts the quote/contact form to /api/inquiry, which emails the company inbox.
// Throws with the server's message when the inquiry was not delivered.
export async function submitInquiry(data: FormData) {
 const res = await fetch('/api/inquiry', { method: 'POST', body: data });
 const body = await res.json().catch(() => ({})) as { message?: string };
 if (!res.ok) throw new Error(body.message || 'ส่งข้อมูลไม่สำเร็จ กรุณาลองอีกครั้ง');
 return { message: body.message || 'ทีมงานได้รับข้อมูลของคุณแล้ว' };
}

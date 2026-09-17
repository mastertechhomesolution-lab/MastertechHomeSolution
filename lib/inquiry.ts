// Replace this adapter with a server endpoint when the backend is ready.
// Demo inquiries are never stored or sent to a third party.
export async function submitInquiry(_data: FormData) {
 return {mode:'demo',message:'ส่งแบบฟอร์มตัวอย่างสำเร็จ — ข้อมูลยังไม่ได้ส่งถึงบริษัท กรุณาติดต่อผ่าน LINE เพื่อสอบถามจริง'};
}

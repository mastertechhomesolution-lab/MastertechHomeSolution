export const categories = [
 {id:'elevators',name:'ลิฟต์บ้าน',en:'Home Elevator',image:'panorama'},
 {id:'doors',name:'ประตูลิฟต์',en:'Elevator Door',image:'hall-door'},
 {id:'locks',name:'ระบบล็อคประตู',en:'Smart Lock',image:'smart-lock'},
 {id:'automatic',name:'ประตูอัตโนมัติ',en:'Automatic Door',image:'automatic-door'},
 {id:'accessories',name:'อุปกรณ์ตกแต่ง',en:'Interior & Accessories',image:'accessories'},
 {id:'services',name:'ติดตั้งและดูแล',en:'Installation & Service',image:'modern'},
];
export type Product = {slug:string; name:string; category:string; image:string; description:string; catalog?:string; concept?:boolean; features:string[]};
export const products: Product[] = [
 {slug:'panoramic-home-elevator',name:'Panoramic Home Elevator',category:'elevators',image:'panorama',description:'เปิดมุมมองใหม่ของการอยู่อาศัย ด้วยลิฟต์กระจกที่เป็นส่วนหนึ่งของสถาปัตยกรรม',catalog:'106885_0',features:['ห้องโดยสารกระจกโปร่ง','รูปแบบเข้ากับบ้านร่วมสมัย','ปรึกษาการเลือกวัสดุและสีได้']},
 {slug:'modern-home-elevator',name:'Modern Home Elevator',category:'elevators',image:'modern',description:'เส้นสายเรียบสะอาด ผสานวัสดุและแสงสว่างเพื่อการใช้งานในทุกวัน',catalog:'106887_0',features:['ดีไซน์ร่วมสมัย','ตัวเลือกการตกแต่งห้องโดยสาร','วางแผนติดตั้งตามพื้นที่จริง']},
 {slug:'champagne-residential-elevator',name:'Champagne Collection',category:'elevators',image:'champagne',description:'โทนแชมเปญและแสงอบอุ่น เติมความสง่างามให้พื้นที่พักอาศัย',catalog:'106889_0',features:['โทนสีแชมเปญ','รายละเอียดการตกแต่ง','เลือกองค์ประกอบให้เข้ากับอาคาร']},
 {slug:'graphite-elevator',name:'Graphite Collection',category:'elevators',image:'graphite',description:'ห้องโดยสารโทนเข้ม ให้ความรู้สึกสุขุมและเป็นเอกลักษณ์',catalog:'106888_0',features:['โทนกราไฟต์','ดีไซน์เรียบหรู','สำหรับงานสถาปัตยกรรมร่วมสมัย']},
 {slug:'classic-elevator',name:'Classic Residence Collection',category:'elevators',image:'classic',description:'การตกแต่งที่ให้ความสำคัญกับสัดส่วน วัสดุ และบรรยากาศภายใน',catalog:'106890_0',features:['การตกแต่งโทนอบอุ่น','รูปแบบสำหรับที่พักอาศัย','ให้คำปรึกษาตามการใช้งาน']},
 {slug:'traction-home-elevator',name:'Home Lift Systems',category:'elevators',image:'traction',description:'ระบบลิฟต์สำหรับบ้าน วางแผนเลือกโครงสร้างและระบบร่วมกับผู้เชี่ยวชาญ',catalog:'106893_0',features:['มีแนวทางระบบให้เลือก','สำรวจพื้นที่ก่อนเสนอรุ่น','ออกแบบตามความเหมาะสมของอาคาร']},
 {slug:'architectural-hall-door',name:'Architectural Hall Door',category:'doors',image:'hall-door',description:'ประตูลิฟต์ที่เชื่อมต่อความปลอดภัยเข้ากับความงามของพื้นที่',catalog:'106886_0',features:['ผิวสัมผัสหลากหลาย','จับคู่กับงานตกแต่งภายใน','ตรวจสอบความเข้ากันได้กับระบบลิฟต์']},
 {slug:'decorative-elevator-door',name:'Decorative Door Collection',category:'doors',image:'door-collection',description:'คอลเลกชันบานประตูพร้อมรายละเอียดสำหรับสถาปัตยกรรมหลากสไตล์',catalog:'106883_0',features:['ลวดลายและสีให้เลือก','รายละเอียดงานตกแต่ง','ให้คำปรึกษาก่อนเลือกใช้งาน']},
 {slug:'landing-door',name:'Landing Door Collection',category:'doors',image:'landing-door',description:'องค์ประกอบทางเข้าลิฟต์ที่กลมกลืนกับงานออกแบบอาคาร',catalog:'106891_0',features:['รูปแบบหลากหลาย','เลือกให้เข้ากับห้องโดยสาร','สำรวจขนาดหน้างานก่อนติดตั้ง']},
 {slug:'smart-door-lock',name:'Smart Door Lock',category:'locks',image:'smart-lock',description:'แนวทางระบบล็อคอัจฉริยะ เพื่อความสะดวกและความเป็นส่วนตัวในทุกวัน',concept:true,features:['ปรึกษารูปแบบการเข้าออก','เลือกให้เหมาะกับประเภทประตู','ยืนยันฟังก์ชันตามรุ่นที่เสนอ']},
 {slug:'automatic-door-system',name:'Automatic Door Solutions',category:'automatic',image:'automatic-door',description:'วางแผนระบบประตูให้สอดคล้องกับการสัญจรและลักษณะพื้นที่',concept:true,features:['ประเมินรูปแบบการสัญจร','ออกแบบตามพื้นที่ติดตั้ง','ปรึกษาการดูแลระบบระยะยาว']},
 {slug:'interior-finishes',name:'Interior Finishes',category:'accessories',image:'finishes',description:'องค์ประกอบฝ้า พื้น และราวจับ สำหรับห้องโดยสารที่มีเอกลักษณ์',catalog:'106882_0',features:['ตัวเลือกฝ้าเพดาน','ตัวเลือกพื้นห้องโดยสาร','ตัวเลือกราวจับ']},
 {slug:'ceiling-accessories',name:'Ceiling & Accessories',category:'accessories',image:'accessories',description:'รายละเอียดเล็ก ๆ ที่ช่วยเติมเต็มภาพรวมของห้องโดยสาร',catalog:'106892_0',features:['รูปแบบฝ้าและแสง','วัสดุตกแต่งให้เลือก','ตรวจสอบตัวเลือกตามรุ่นลิฟต์']},
 {slug:'elevator-control-panel',name:'Elevator Control Panels',category:'accessories',image:'controls',description:'แผงควบคุมและองค์ประกอบการใช้งานสำหรับระบบลิฟต์',catalog:'106884_0',features:['แผงควบคุมหลายรูปแบบ','จัดวางเพื่อการใช้งานสะดวก','เลือกรุ่นที่เข้ากับระบบ']},
];
export const productImage = (p: {image:string}) => `/products/${p.image}.webp`;

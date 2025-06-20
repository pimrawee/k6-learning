import faker from 'https://cdn.jsdelivr.net/gh/Marak/faker.js@master/examples/browser/js/faker.js';
// faker.js เป็นไลบรารี JavaScript ที่ใช้สำหรับสร้างข้อมูลปลอมหลากหลายประเภท เช่น ชื่อ, ที่อยู่, เบอร์โทรศัพท์, ข้อมูลทางการเงิน, และอื่นๆ
// ซึ่งมีประโยชน์อย่างมากสำหรับการสร้างข้อมูลทดสอบ (test data) หรือข้อมูลตัวอย่างสำหรับการพัฒนา

export default function() {
    console.log(faker.name.jobTitle());
    console.log(faker.name.jobDescriptor());
    console.log(faker.name.jobArea());
    console.log(faker.name.jobType());
}
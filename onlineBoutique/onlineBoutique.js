import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';


export let options = {
  stages: [
    { duration: '5s', target: 1 },  // Ramp-up to 1 user over 5 seconds
    { duration: '30s', target: 3 }, // Stay at 3 users for 30 seconds
    { duration: '5s', target: 1 },  // Ramp-down to 1 user over 5 seconds
  ],
  // Workload Model ด้วย stages: 
  // การทดสอบนี้จะเริ่มด้วยผู้ใช้ 0 คน, เพิ่มเป็น 1 คนใน 5 วินาทีแรก, จากนั้นเพิ่มเป็น 3 คนใน 30 วินาทีถัดไป, และสุดท้ายลดลงเหลือ 1 คนใน 5 วินาทีสุดท้าย
  // รวมระยะเวลาการทดสอบทั้งหมดคือ 5 + 30 + 5 = 40 วินาที.

  thresholds: {
    // 99% of requests must finish within 1000ms.
    http_req_duration: ['p(99) < 1000'],
  },
  // Threshold: 
  // การทดสอบจะถือว่า ผ่าน ก็ต่อเมื่อ 99% ของการร้องขอ HTTP ทั้งหมดมีระยะเวลาตอบสนองน้อยกว่า 1 วินาที
  // หากมีมากกว่า 1% ของการร้องขอที่มีระยะเวลาตอบสนองเท่ากับหรือมากกว่า 1 วินาที การทดสอบจะถูกพิจารณาว่า ล้มเหลว
};


export default function () {
  let homepage = http.get('https://onlineboutique.dev');

    check(homepage, {
      'status is 200': (r) => r.status === 200,
    });
    // check จะตรวจสอบการตอบกลับของ HTTP request
    // หากการตอบกลับไม่เป็นไปตามเงื่อนไขที่กำหนดไว้ จะมีการบันทึกผลลัพธ์ในรายงานของ k6 แต่ script จะยังคงทำงานต่อไป
    // หากต้องการให้การทดสอบล้มเหลวเมื่อไม่ผ่านเกณฑ์บางอย่าง จะต้องใช้ thresholds แทน

  const homePageResponse  =  homepage.body;             // ดึงเนื้อหาของหน้าแรกที่ได้รับจากการร้องขอ HTTP
  const linkpattern = /<a href="\/product\/(.+?)">/g;   // ใช้ Regular Expression เพื่อค้นหาลิงก์ผลิตภัณฑ์ในเนื้อหาของหน้าแรก

  const matches = homePageResponse.matchAll(linkpattern);                     // ใช้ matchAll เพื่อค้นหาทุกลิงก์ผลิตภัณฑ์ที่ตรงกับรูปแบบที่กำหนด
  const matchesCount =  (homePageResponse.match(linkpattern) || []).length;   // นับจำนวนลิงก์ผลิตภัณฑ์ทั้งหมดที่พบในหน้าแรก
  let allProducts = [];
  for (const match of matches){   // วนลูปผ่านทุกลิงก์ผลิตภัณฑ์ที่พบ
      console.log(match[1]);
      allProducts.push(match[1]); // เก็บลิงก์ผลิตภัณฑ์ในอาร์เรย์ allProducts
  }
  console.log(allProducts[1]);
  const randomLink = Math.floor(Math.random() * matchesCount)+1;  // สุ่มเลือกลิงก์ผลิตภัณฑ์จากอาร์เรย์ allProducts โดยใช้ Math.random() เพื่อสร้างตัวเลขสุ่มระหว่าง 0 ถึง matchesCount-1
  console.log("Random Number is: " + randomLink);

  let productLink = "https://onlineboutique.dev" + "/product/" + allProducts[randomLink];   // สร้างลิงก์ผลิตภัณฑ์โดยใช้ลิงก์พื้นฐานและลิงก์ผลิตภัณฑ์ที่สุ่มเลือก
  let productLinkClick = http.get(productLink);   // ส่งคำขอ HTTP GET ไปยังลิงก์ผลิตภัณฑ์ที่สุ่มเลือก

  console.log(productLinkClick.url);

  check(productLinkClick, {
    'status is 200': (r) => r.status === 200,
  });


  // Add to Cart
  let cartLink = "https://onlineboutique.dev/cart";
  let cartParams = cartLink + "?product_id=" + allProducts[randomLink] + "&quantity=1";   // สร้าง URL สำหรับการเพิ่มสินค้าลงตะกร้า โดยใช้ product_id ที่สุ่มได้และกำหนด quantity เป็น 1

  let addToCart = http.post(cartParams);  // ส่งคำขอ HTTP POST ไปยัง URL ที่สร้างขึ้นเพื่อเพิ่มสินค้าลงตะกร้า
  console.log(cartParams);
  console.log(addToCart.url);
  console.log(addToCart.status);


  //Checkout
  let checkoutParams = "?email=someone%40example.com&street_address=1600+Amphitheatre+Parkway&zip_code=94043&city=Mountain+View&state=CA&country=United+States&credit_card_number=4432-8015-6152-0454&credit_card_expiration_month=1&credit_card_expiration_year=2022&credit_card_cvv=672";
  let checkoutLink = "https://onlineboutique.dev/cart/checkout" + checkoutParams;

  let checkout = http.post(checkoutLink); // ส่งคำขอ HTTP POST ไปยัง URL สำหรับการชำระเงิน โดยใช้ข้อมูลที่กำหนดไว้ใน checkoutParams

  console.log(checkout.status); // แสดงสถานะของการตอบกลับ HTTP
  console.log(checkout.body);   // แสดงเนื้อหาของการตอบกลับ HTTP

  check(checkout, {
    'status is 200': (r) => r.status === 200,
    'Order Complete Check': (r) => r.html('h3').text().includes('Your order is complete!'), // ตรวจสอบว่าหน้าแสดงข้อความ "Your order is complete!" หรือไม่
  });


  sleep(1); // หยุดการทำงานของ virtual user เป็นเวลา 1 วินาที ก่อนที่จะเริ่มรอบถัดไป
}
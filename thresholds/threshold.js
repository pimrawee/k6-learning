import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    thresholds: {
        checks: ['rate>0.99'],          // อัตราการตรวจสอบต้องมากกว่า 99%
        http_req_blocked: [{            // เวลาที่คำขอ HTTP ถูกบล็อก
            threshold: 'max < 500',     // ค่าต่ำสุดที่ยอมรับได้คือ 500 มิลลิวินาที
            abortOnFail: true,          // ถ้าค่าผิดพลาดจะหยุดการทดสอบ
        }],
        http_req_duration: [{           // เวลาที่ใช้ในการตอบสนองของคำขอ HTTP
            threshold: 'p(95) < 1000',  // ค่าต่ำสุดที่ยอมรับได้คือ 1000 มิลลิวินาที
            abortOnFail: true,          // ถ้าค่าผิดพลาดจะหยุดการทดสอบ
        }],
        http_req_failed: ['rate<0.01'], // อัตราการล้มเหลวของคำขอ HTTP ต้องน้อยกว่า 1% 
        http_reqs: ['count > 0'],       // จำนวนคำขอ HTTP ต้องมากกว่า 0
        http_req_connecting: [{         // เวลาที่ใช้ในการเชื่อมต่อคำขอ HTTP
            threshold: 'max < 200',     // ค่าต่ำสุดที่ยอมรับได้คือ 200 มิลลิวินาที
            abortOnFail: true,          // ถ้าค่าผิดพลาดจะหยุดการทดสอบ
        }],
    },
};

export default function () {
    const res = http.get("https://www.google.com/");

    check(res, {
        'is status 200': r => r.status === 200,
        'is not status 404': r => r.status !== 404,
        // 'has data': r => (JSON.parse(r.body)).data.length > 0,
        // 'body size is less than 1030': r => r.body.length <= 1030,
    });

    sleep(1);
}
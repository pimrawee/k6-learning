import http from "k6/http";
import { check, sleep } from "k6";

export default function () {
    const res = http.get("https://reqres.in/api/users?page=2");

    check(res, {
        'is status 200': r => r.status === 200,
        'is not status 404': r => r.status !== 404,
        'has data': r => (JSON.parse(r.body)).data.length > 0,
        'body size is less than 1030': r => r.body.length <= 1030,
    });
    // การทำงานของ Checks
    // สิ่งที่สำคัญคือ Checks จะไม่หยุดการทำงานของสคริปต์ แม้ว่าการตรวจสอบจะไม่ผ่าน (fail) การดำเนินการของสคริปต์ก็จะยังคงดำเนินต่อไป
    // Checks จะเก็บผลลัพธ์ไว้และเปรียบเทียบค่าที่ได้จริง (actual) กับค่าที่คาดหวัง (expected)

    console.log(res.body)

    sleep(1);
}
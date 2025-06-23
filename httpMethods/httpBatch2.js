import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // กำหนด dictionary ของ requests โดยใช้ชื่อสำหรับแต่ละ request (named requests)
    const requests = {
        // 1. GET Request (URL หน้าหลัก)
        'get_homepage': {
            method: 'GET',
            url: 'https://test.k6.io/', // ตัวอย่าง URL
        },

        // 2. GET Request (URL สำหรับหน้า Pricing)
        'get_pricing_page': {
            method: 'GET',
            url: 'https://k6.io/pricing/',
        },

        // 3. POST Request (สร้างข้อมูลผู้ใช้ใหม่)
        'create_user': {
        method: 'POST',
            url: 'https://reqres.in/api/users', // ตัวอย่าง URL สำหรับ POST
            body: JSON.stringify({ name: 'Alice', job: 'QA Engineer' }), // Payload ในรูปแบบ JSON string
            params: {
                headers: { 'Content-Type': 'application/json' }, // กำหนด Content-Type header
            },
        },

        // 4. PUT Request (อัปเดตข้อมูลผู้ใช้ที่มีอยู่)
        'update_user': {
            method: 'PUT',
            url: 'https://reqres.in/api/users/2', // ตัวอย่าง URL สำหรับ PUT
            body: JSON.stringify({ name: 'Alice Smith', job: 'Senior QA Engineer' }), // Payload ที่ใช้ในการอัปเดต
            params: {
                headers: { 'Content-Type': 'application/json' }, // กำหนด Content-Type header
            },
        },

        // 5. DELETE Request (ลบข้อมูลผู้ใช้)
        'delete_user': {
            method: 'DELETE',
            url: 'https://reqres.in/api/users/2', // ตัวอย่าง URL สำหรับ DELETE
        },
    };

    // ส่งคำขอทั้งหมดใน requests object ไปพร้อมกัน
    const responses = http.batch(requests);

    // ตรวจสอบผลลัพธ์ของแต่ละคำขอ
    check(responses.get_homepage, {
        'Homepage status is 200': (r) => r.status === 200,
    });

    check(responses.create_user, {
        'Create User status is 201': (r) => r.status === 201, // 201 Created เป็นสถานะที่พบบ่อยสำหรับ POST ที่สำเร็จ
        'Created user has correct name': (r) => JSON.parse(r.body).name === 'Alice',
    });

    check(responses.update_user, {
        'Update User status is 200': (r) => r.status === 200, // 200 OK เป็นสถานะที่พบบ่อยสำหรับ PUT ที่สำเร็จ
        'Updated user has correct job': (r) => JSON.parse(r.body).job === 'Senior QA Engineer',
    });

    check(responses.delete_user, {
        'Delete User status is 204': (r) => r.status === 204, // 204 No Content เป็นสถานะที่พบบ่อยสำหรับ DELETE ที่สำเร็จ
    });

    sleep(1);
}
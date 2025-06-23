# 📘 k6 Scenarios & Executors

## 🎯 Scenarios คืออะไร?
Scenarios คือชุดของสคริปต์หรือธุรกรรมที่ออกแบบมาเพื่อ **จำลองสถานการณ์จริง** ที่ผู้ใช้อาจพบเจอ เพื่อทดสอบประสิทธิภาพของระบบอย่างมีประสิทธิภาพ โดยสามารถรวมหลายสถานการณ์ในสคริปต์เดียวได้เพื่อจำลองพฤติกรรมที่ซับซ้อน

### ✅ วิธีใช้งาน Scenarios:
- ไม่ต้อง import ไลบรารีเพิ่มเติม
- กำหนด `scenarios` ภายใน `options` ในสคริปต์
- แต่ละ scenario ต้องมีชื่อไม่ซ้ำกัน (unique scenario name)
- ระบุ `executor` เพื่อกำหนดลักษณะการทำงานของ Virtual Users (VUs) และ Iterations
- สามารถรวมหลาย scenario ในไฟล์เดียวได้

---

## ⚙️ Executors คืออะไร?
Executors คือกลไกที่ควบคุมพฤติกรรมของ Virtual Users (VUs) และ Iterations โดย k6 มี executor หลายประเภทให้เลือกใช้ตามวัตถุประสงค์ของการทดสอบ

### 🔢 ประเภทของ Executors ที่ควรรู้จัก
### 1. `per-vu-iterations` – **Per VU Scenario**
- **ทำงาน:** แต่ละ VU จะทำงานตามจำนวน Iteration ที่กำหนด
- **พารามิเตอร์หลัก:**
  - `vus`
  - `iterations`
  - `start_time`
- **ตัวอย่าง:** `vus: 5`, `iterations: 5` → รวมทั้งหมด 25 iterations
- **ประโยชน์:** เหมาะสำหรับทดสอบฟังก์ชันเฉพาะให้ครบทุก VU
### 2. `shared-iterations` – **Shared Scenario**
- **ทำงาน:** Iterations ทั้งหมดจะถูกแบ่งให้ VUs
- **พารามิเตอร์หลัก:** 
  - `vus`
  - `iterations`
- **ตัวอย่าง:** `vus: 5`, `iterations: 5` → VU แต่ละตัวรับไปทำงานรวมกัน 5 ครั้ง
- **ประโยชน์:** จำลองโหลดแบบแบ่งงานกันทำ
### 3. `constant-vus` – **Constant Scenario**
- **ทำงาน:** รันด้วยจำนวน VUs คงที่ในระยะเวลาที่กำหนด
- **พารามิเตอร์หลัก:** 
  - `vus`
  - `duration`
- **ประโยชน์:** ทดสอบระบบเมื่อมีผู้ใช้ใช้งานพร้อมกันในจำนวนคงที่
### 4. `ramping-vus` – **Ramping VU Scenario**
- **ทำงาน:** เพิ่ม/ลดจำนวน VUs ตาม stages ที่กำหนด
- **พารามิเตอร์หลัก:**
  - `stages` (เช่น: `{ duration: "10s", target: 5 }`)
- **ประโยชน์:** ทดสอบความสามารถของระบบเมื่อโหลดเพิ่มขึ้นหรือลดลง
### 5. `constant-arrival-rate` – **Constant Arrival Scenario**
- **ทำงาน:** รักษาอัตราการมาถึงของ Iterations ให้คงที่
- **พารามิเตอร์หลัก:**
  - `rate`, `timeUnit`, `duration`, `preAllocatedVUs`, `maxVUs`
- **ประโยชน์:** ทดสอบ throughput (จำนวน iterations หรือ requests ที่ executors สร้างได้ต่อหน่วยเวลา) ของระบบ
### 6. `ramping-arrival-rate` – **Ramping Arrival Scenario**
- **ทำงาน:** เปลี่ยนอัตราการมาถึงตาม stages ที่กำหนด
- **พารามิเตอร์หลัก:**
  - `stages`, `startRate`, `target`, `duration`, `preAllocatedVUs`, `maxVUs`
- **ประโยชน์:** จำลองรูปแบบโหลดที่เปลี่ยนแปลงตามเวลา
### 7. `externally-controlled` – **Externally Controlled Scenario**
- **ทำงาน:** ควบคุมจำนวน VU และสถานะการรันได้จากภายนอก (เช่น CLI หรือ API)
- **พารามิเตอร์หลัก:**
  - `vus`, `maxVUs`, `duration`
- **วิธีควบคุม:**
  - ใช้คำสั่ง CLI เช่น `k6 scale --vus 10`, `k6 pause`, `k6 resume`
- **ประโยชน์:** เหมาะสำหรับการใช้งานในระบบ CI/CD หรือควบคุม runtime แบบ manual

---

## 📚 อ้างอิงเพิ่มเติม
- [k6 Documentation – Scenarios](https://grafana.com/docs/k6/latest/using-k6/scenarios/)
- [Executors Overview](https://k6.io/docs/using-k6/scenarios/executors/)
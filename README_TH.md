# MOLEVERSE X — PHASE 2

โปรเจกต์เว็บแอปเคมี ม.4 แบบ **แยกไฟล์และแยกระบบจริง** สำหรับการสืบค้น ทดลองและฝึกโจทย์ให้สอดคล้องกับแบบฝึกหัด 4.2–4.4 (PDF 8 หน้า)

## เปิดใช้งาน

เนื่องจากเป็นเว็บแบบ JavaScript ES Modules ต้องเปิดผ่าน HTTP server (การดับเบิลคลิก index.html ผ่าน file:// อาจติดข้อจำกัด CORS)

```bash
cd MOLEVERSE_X_PHASE2
python3 -m http.server 8080
```

เปิด `http://localhost:8080`

**Windows:** คลิก `start_windows.bat` หากติดตั้ง Python แล้ว (หรือใช้คำสั่ง `py -m http.server 8080`)

**Mac/Linux:** รัน `./start_mac_linux.sh`

บน GitHub Pages ให้อัปโหลด **ทุกไฟล์และโฟลเดอร์** ไปยัง root ของ repository แล้วตั้งค่า Settings → Pages → Deploy from a branch → main / (root) โดยไม่ต้องใช้ npm build

## ระบบในโปรเจกต์

- Marble Research Lab: จำลองลูกแก้ว 100 เล็ก / 20 ใหญ่ พร้อมบันทึกการชั่งจริง
- Particle Reality Studio: โมเดลพิกัด 3D วาดด้วย Canvas 2D และหมุนด้วยการลาก; แสดงภาพอนุภาคตัวแทนเคลื่อนที่
- Mole Conversion Core: มวล ↔ โมล ↔ อนุภาค ↔ ปริมาตรแก๊สที่ STP, เปรียบเทียบสาร A/B
- Worksheet Quest: โจทย์ฝึก **16 ข้อใหม่** เชื่อมทักษะและบท 4.2–4.4, คำใบ้ 3 ระดับ, ตรวจตัวเลขและหน่วยคำตอบที่ระบุ
- Research Desk: ฐานคำอธิบาย 7 หัวข้อ บันทึกความรู้ที่สืบค้น
- Progress Studio: บันทึกผลฝึกใน localStorage และส่งออก CSV

## โครงสร้างไฟล์

```
index.html
assets/styles.css
src/main.js
src/core/chemistry.js
src/core/storage.js
src/data/molecules.js
src/data/worksheet.js
src/features/particleCanvas.js
src/ui/views.js
tests/chemistry.test.js
package.json
start_windows.bat
start_mac_linux.sh
docs/worksheet_mole_4.2-4.4.pdf
README_TH.md
```

## ทดสอบ

ใช้ Node.js 20+:

```bash
npm test
npm run check
```

ไม่มี dependencies ภายนอกที่จำเป็นต่อการทำงาน (Google Fonts เป็นส่วนเสริมและ fallback ไปที่ฟอนต์บนเครื่องได้เมื่อออฟไลน์)

## ข้อจำกัดและสิ่งที่ยังไม่ใช่ระบบสมบูรณ์

- 3D เป็นการฉายพิกัดสามมิติลง Canvas 2D ไม่ใช่เอนจิน WebGL/Three.js; เน้นการเรียนรู้แบบง่ายและรันบนเครื่องทั่วไป
- ห้องอนุภาคใช้จุดตัวแทน ไม่สามารถแสดงอะตอมหรือโมเลกุล 6.02 × 10²³ ตัวได้จริง
- ระบบฝึกมีโจทย์ที่เขียนขึ้นใหม่ 16 ข้อและแผนที่เชื่อมไปยังใบงาน ไม่ได้บรรจุโจทย์ทุกข้อจาก PDF เต็มรูปแบบ
- ข้อมูลความก้าวหน้าเก็บเฉพาะเบราว์เซอร์ปัจจุบัน; ยังไม่มีระบบสมาชิก ครูออนไลน์ หรือ Multiplayer
- ไม่ได้ใช้ React/Vite เพราะไม่สามารถติดตั้ง dependencies ผ่าน npm ในสภาพแวดล้อมจัดทำนี้; โครงสร้างแยกโมดูลพร้อมย้ายไป React ในอนาคต
- ภาพโมเลกุลใช้โมเดลเชิงสัญลักษณ์ ไม่ใช่แบบจำลองควอนตัมหรือมาตราส่วนจริง
- STP ในใบงานยึด 0 °C และ 1 atm; Vₘ ≈ 22.4 L/mol ในแบบจำลองแก๊สอุดมคติ

## อ้างอิงเนื้อหา

ใบงานผู้ใช้: `แบบฝึกหัดเรื่องโมล.pdf` (8 หน้า) และคู่มือครูเคมี ม.4 เล่ม 2 สสวท. สำหรับหัวข้อ 4.2–4.4

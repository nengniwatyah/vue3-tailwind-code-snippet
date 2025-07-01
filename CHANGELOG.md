# Changelog

## 2025-07-02

### Added
- **Add new component `CardReview`** (Commit: `eebe02ae1bafa725bf35e9df8131644b775c83d7`)
  - เพิ่มคอมโพเนนต์ Vue ใหม่ `src/components/CardReview.vue` ซึ่งเป็นคอมโพเนนต์สำหรับแสดงรายละเอียดการรีวิว เช่น หมายเลขคำสั่งซื้อ, รายการสินค้า, จำนวน, บัญชี, ชื่อ, เบอร์มือถือ, Wallet ID, จำนวนเงิน, ค่าธรรมเนียม และยอดรวม
  - คอมโพเนนต์นี้มีการใช้ `el-button` จาก Element Plus และมีการนำเข้าไอคอน `iconcheck.svg` ใหม่ที่ `src/assets/icons/iconcheck.svg`
  - มีการเพิ่มการใช้งาน `CardReview` ใน `src/views/UiLibrary.vue` เพื่อแสดงผลในหน้า UI Library
  - มีการเพิ่มไฟล์ทดสอบ `tests/components/CardReview.test.js` เพื่อทดสอบการเรนเดอร์คอมโพเนนต์ด้วย props เริ่มต้นและ props ที่กำหนดเอง

### Changed
- **Edit card content padding** (Commit: `1070510e09deb570013de9258fdcf5abbfdd4e83`)
  - ปรับเปลี่ยน padding ของเนื้อหาการ์ดในคอมโพเนนต์ `src/components/CardReview.vue`
  - เดิม `padding: 0 16px;` ถูกเปลี่ยนเป็น `padding: 0 32px;` สำหรับ `.card-content`
  - นอกจากนี้ยังมีการปรับ padding สำหรับ `.card-content` ใน media query สำหรับหน้าจอขนาดเล็ก (max-width: 375px) จาก `padding: 0 12px;` เป็น `padding: 0 32px;` เพื่อให้มีระยะห่างที่สอดคล้องกันมากขึ้น
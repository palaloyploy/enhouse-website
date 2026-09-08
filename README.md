# enhouse.digital — Payload CMS + Next.js (โปรเจกต์ทดลอง)

โปรเจกต์นี้คือโครง Payload CMS + Next.js ที่ตั้งค่าไว้ตาม requirement ที่คุยกันไว้ ใช้ SQLite เป็นฐานข้อมูล (ไฟล์เดียว ไม่ต้องติดตั้ง database server แยก) เพื่อให้ลองรันได้ทันทีบนเครื่อง

## สิ่งที่ทำไว้ให้แล้ว

- **Pages collection** พร้อม SEO fields (meta title, meta description, OG image) และ **Blocks** สำหรับเพิ่ม Section เอง 3 แบบ: "รูปซ้าย/Text ขวา", "รูปบน/Text ล่าง", "Text อย่างเดียว"
- **Leads collection** สำหรับ Lead Form + วันที่/เวลาที่ลูกค้าเลือกจอง พร้อม hook ที่ยิง Email แจ้งเตือนอัตโนมัติเมื่อมี Lead ใหม่ (ต่อกับ Resend API — ใส่ API key เพื่อเปิดใช้งานจริง)
- **Site Settings (global)** ให้กรอก Google Analytics 4, Google Tag Manager, Google Search Console, Facebook Pixel, TikTok Pixel, LINE Tag ได้เองจากหลังบ้าน โดย GTM จะถูกฝังในหน้าเว็บอัตโนมัติ
- หน้าเว็บตัวอย่าง (`/`) ที่ดึงข้อมูลจาก Pages collection มาแสดงจริง พร้อม Lead Form ที่ยิงตรงไป Payload REST API
- สร้างหน้า "home" ตัวอย่างให้อัตโนมัติตอนรันครั้งแรก (ผ่าน `onInit` hook)

## วิธีรัน

ต้องมี Node.js เวอร์ชัน 18.20.2 ขึ้นไป

```bash
npm install
npm run dev
```

จากนั้นเปิดเบราว์เซอร์:

- หน้าเว็บ: http://localhost:3000
- หลังบ้าน (Admin): http://localhost:3000/admin — ครั้งแรกจะให้สร้างบัญชี admin ก่อน

ฐานข้อมูลจะถูกสร้างเป็นไฟล์ `enhouse.db` อัตโนมัติ ไม่ต้องตั้งค่าอะไรเพิ่ม

## ทดสอบ Lead Form / Booking

กรอกฟอร์มในหน้าแรก แล้วดูที่:
1. Terminal ที่รัน `npm run dev` — จะเห็น log แจ้งว่ามี Lead ใหม่เข้ามา (เพราะยังไม่ได้ใส่ RESEND_API_KEY)
2. หลังบ้าน → เมนู Leads — จะเห็นข้อมูลที่กรอกเข้ามาจริง

## เปิดใช้งาน Email แจ้งเตือนจริง

แก้ไขไฟล์ `.env` ใส่:

```
RESEND_API_KEY=ใส่ key จาก resend.com
NOTIFY_FROM_EMAIL=noreply@enhouse.digital
NOTIFY_TO_EMAIL=marketing@enhouse.digital
```

## โครงสร้างไฟล์สำคัญ

```
src/
  collections/
    Pages.ts       -> หน้าเว็บ + SEO + Blocks
    Leads.ts       -> Lead form + booking + email hook
    Media.ts       -> คลังรูปภาพ
    Users.ts       -> บัญชีผู้ดูแลหลังบ้าน
  globals/
    SiteSettings.ts -> ตั้งค่า Pixel/Tracking ต่างๆ
  blocks/
    RenderBlocks.tsx -> แปลง Block จาก CMS เป็นหน้าเว็บจริง
  components/
    LeadForm.tsx    -> ฟอร์มฝั่งหน้าเว็บ
  app/(frontend)/    -> หน้าเว็บที่ลูกค้าเห็น
  app/(payload)/     -> หลังบ้าน Payload (auto-generated, ไม่ต้องแก้)
  payload.config.ts  -> จุดตั้งค่าหลักของ Payload
```

## หมายเหตุ

- นี่คือ **โครงทดลอง (proof of concept)** เพื่อยืนยันว่า requirement ทำได้จริงกับ Payload CMS ยังไม่ใช่ดีไซน์หน้าตาจริง (ดู mockup ที่ทำแยกไว้ก่อนหน้า)
- Production จริงแนะนำเปลี่ยนจาก SQLite เป็น Postgres และ deploy ผ่าน Docker ตามที่ระบุใน Scope Document

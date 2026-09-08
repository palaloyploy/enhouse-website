import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    group: 'ร้านค้า',
    useAsTitle: 'name',
    defaultColumns: ['name', 'rating', 'verified', 'updatedAt'],
    description:
      'รีวิวจากลูกค้าจริงเท่านั้น กรอกโดยแอดมินหลังได้รับความยินยอมจากลูกค้า — ห้ามใส่รีวิวสมมติ จะแสดงในหน้าร้านค้าเมื่อมีอย่างน้อย 1 รายการ',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'ชื่อลูกค้า' },
    { name: 'quote', type: 'textarea', required: true, label: 'ข้อความรีวิว' },
    { name: 'rating', type: 'number', min: 1, max: 5, defaultValue: 5, label: 'คะแนน (1-5)' },
    { name: 'avatar', type: 'upload', relationTo: 'media', label: 'รูปโปรไฟล์ (ถ้ามี)' },
    { name: 'verified', type: 'checkbox', label: 'ยืนยันว่าซื้อสินค้าจริง' },
  ],
}

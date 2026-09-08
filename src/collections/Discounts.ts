import type { CollectionConfig } from 'payload'

export const Discounts: CollectionConfig = {
  slug: 'discounts',
  admin: {
    group: 'ร้านค้า',
    useAsTitle: 'code',
    defaultColumns: ['code', 'type', 'value', 'active', 'expiresAt'],
    description: 'โค้ดส่วนลดที่ลูกค้าใช้ตอนสั่งซื้อในตะกร้า',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      label: 'โค้ดส่วนลด',
      admin: { description: 'ลูกค้าจะพิมพ์โค้ดนี้ในตะกร้า เช่น "SALE10"' },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'percentage',
      options: [
        { label: 'เปอร์เซ็นต์ (%)', value: 'percentage' },
        { label: 'จำนวนเงิน (บาท)', value: 'fixed' },
      ],
    },
    { name: 'value', type: 'number', required: true, label: 'มูลค่าส่วนลด' },
    { name: 'active', type: 'checkbox', defaultValue: true, label: 'เปิดใช้งาน' },
    { name: 'expiresAt', type: 'date', label: 'วันหมดอายุ (ถ้ามี)' },
  ],
}

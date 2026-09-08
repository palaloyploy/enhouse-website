import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    group: 'ร้านค้า',
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'totalOrders', 'totalSpent', 'lastOrderAt'],
    description: 'ข้อมูลลูกค้า รวบรวมอัตโนมัติจากออเดอร์ที่เข้ามา',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'ชื่อ-นามสกุล' },
    { name: 'phone', type: 'text', required: true, unique: true, label: 'เบอร์โทรศัพท์' },
    { name: 'email', type: 'email' },
    { name: 'address', type: 'textarea', label: 'ที่อยู่' },
    { name: 'totalOrders', type: 'number', defaultValue: 0, label: 'จำนวนออเดอร์' },
    { name: 'totalSpent', type: 'number', defaultValue: 0, label: 'ยอดใช้จ่ายรวม (บาท)' },
    { name: 'lastOrderAt', type: 'date', label: 'สั่งซื้อล่าสุด' },
  ],
}

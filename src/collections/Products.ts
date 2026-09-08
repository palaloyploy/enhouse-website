import type { CollectionConfig } from 'payload'
import { COLOR_OPTIONS } from '@/lib/colors'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    group: 'ร้านค้า',
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'inStock', 'updatedAt'],
    description: 'รายการสินค้าที่ขายในร้าน',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'ชื่อสินค้า' },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (URL)',
      admin: { description: 'เช่น "wooden-chair"' },
    },
    { name: 'sku', type: 'text', label: 'รหัสสินค้า (SKU)' },
    { name: 'price', type: 'number', required: true, label: 'ราคา (บาท)' },
    { name: 'compareAtPrice', type: 'number', label: 'ราคาก่อนลด (ถ้ามี)' },
    { name: 'category', type: 'relationship', relationTo: 'categories', label: 'หมวดหมู่' },
    {
      name: 'color',
      type: 'select',
      label: 'สี',
      options: COLOR_OPTIONS.map((c) => ({ label: c.name, value: c.slug })),
    },
    {
      name: 'tags',
      type: 'array',
      label: 'แท็ก',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      type: 'row',
      fields: [
        { name: 'width', type: 'number', label: 'ความกว้าง (ซม.)', admin: { width: '33%' } },
        { name: 'height', type: 'number', label: 'ความสูง (ซม.)', admin: { width: '33%' } },
        { name: 'depth', type: 'number', label: 'ความลึก (ซม.)', admin: { width: '33%' } },
      ],
    },
    {
      name: 'images',
      type: 'array',
      label: 'รูปสินค้า',
      minRows: 1,
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    { name: 'shortDescription', type: 'textarea', label: 'คำอธิบายสั้น (แสดงในหน้ารายการ)' },
    { name: 'description', type: 'textarea', label: 'รายละเอียดสินค้า' },
    {
      name: 'highlights',
      type: 'array',
      label: 'จุดเด่นสินค้า',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'inStock', type: 'checkbox', label: 'มีสินค้าพร้อมขาย', defaultValue: true },
    { name: 'featured', type: 'checkbox', label: 'สินค้าแนะนำ' },
    { name: 'bestseller', type: 'checkbox', label: 'สินค้าขายดี' },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 5,
      label: 'คะแนนรีวิวเฉลี่ย (0-5)',
      admin: { description: 'กรอกเองจากรีวิวจริง ถ้ายังไม่มีปล่อยว่างไว้ได้' },
    },
  ],
}

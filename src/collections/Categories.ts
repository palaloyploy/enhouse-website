import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    group: 'ร้านค้า',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
    description: 'หมวดหมู่สินค้าในร้าน',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'ชื่อหมวดหมู่' },
    { name: 'slug', type: 'text', required: true, unique: true, label: 'Slug (URL)' },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'รูปหมวดหมู่ (แสดงในหน้าร้านค้า)',
    },
  ],
}

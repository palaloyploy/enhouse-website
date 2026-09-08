import type { CollectionConfig } from 'payload'

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  admin: {
    group: 'ร้านค้า',
    useAsTitle: 'email',
    defaultColumns: ['email', 'createdAt'],
    description: 'อีเมลที่สมัครรับข่าวสาร/โปรโมชันจากหน้าร้านค้า',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [{ name: 'email', type: 'email', required: true, unique: true }],
}

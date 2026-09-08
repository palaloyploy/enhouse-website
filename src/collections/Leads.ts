import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    group: 'เว็บไซต์',
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'bookingDate', 'bookingTime', 'createdAt'],
    description: 'Lead ที่กรอกจากหน้าเว็บ พร้อมวันที่ที่เลือกจองใน Calendar',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'ชื่อ-นามสกุล' },
    { name: 'phone', type: 'text', required: true, label: 'เบอร์โทรศัพท์' },
    { name: 'email', type: 'email', label: 'อีเมล' },
    { name: 'business', type: 'text', label: 'ธุรกิจ' },
    { name: 'interestedService', type: 'text', label: 'บริการที่สนใจ' },
    { name: 'bookingDate', type: 'date', label: 'วันที่จอง' },
    { name: 'bookingTime', type: 'text', label: 'เวลาที่จอง' },
    {
      name: 'consentPDPA',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      label: 'ยินยอมตาม PDPA',
    },
    { name: 'utmSource', type: 'text' },
    { name: 'utmMedium', type: 'text' },
    { name: 'utmCampaign', type: 'text' },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation !== 'create') return doc

        // ตัวอย่างการส่ง Email แจ้งเตือนทีม Enhouse ผ่าน Resend
        // ใส่ RESEND_API_KEY ใน .env เพื่อเปิดใช้งานจริง
        if (process.env.RESEND_API_KEY) {
          try {
            await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                from: process.env.NOTIFY_FROM_EMAIL || 'noreply@enhouse.digital',
                to: process.env.NOTIFY_TO_EMAIL || 'marketing@enhouse.digital',
                subject: `Lead ใหม่จากเว็บไซต์: ${doc.name}`,
                text: [
                  `ชื่อ: ${doc.name}`,
                  `โทร: ${doc.phone}`,
                  `ธุรกิจ: ${doc.business || '-'}`,
                  `บริการที่สนใจ: ${doc.interestedService || '-'}`,
                  `วันที่จอง: ${doc.bookingDate || '-'} ${doc.bookingTime || ''}`,
                  `UTM: ${doc.utmSource || '-'} / ${doc.utmMedium || '-'} / ${doc.utmCampaign || '-'}`,
                ].join('\n'),
              }),
            })
          } catch (err) {
            console.error('ส่ง Email แจ้งเตือนไม่สำเร็จ:', err)
          }
        } else {
          console.log('[Lead ใหม่ — ยังไม่ได้ตั้งค่า RESEND_API_KEY ใน .env]', {
            name: doc.name,
            phone: doc.phone,
            bookingDate: doc.bookingDate,
            bookingTime: doc.bookingTime,
          })
        }

        return doc
      },
    ],
  },
}

import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    group: 'ร้านค้า',
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'phone', 'totalAmount', 'paymentMethod', 'status', 'createdAt'],
    description: 'คำสั่งซื้อที่ลูกค้าส่งมาจากตะกร้าสินค้าหน้าเว็บ',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    { name: 'customerName', type: 'text', required: true, label: 'ชื่อ-นามสกุล' },
    { name: 'phone', type: 'text', required: true, label: 'เบอร์โทรศัพท์' },
    { name: 'email', type: 'email', label: 'อีเมล' },
    { name: 'address', type: 'textarea', label: 'ที่อยู่จัดส่ง (ถ้ามี)' },
    { name: 'note', type: 'textarea', label: 'หมายเหตุ' },
    {
      name: 'items',
      type: 'array',
      label: 'รายการสินค้า',
      required: true,
      minRows: 1,
      fields: [
        { name: 'product', type: 'relationship', relationTo: 'products' },
        { name: 'productName', type: 'text', required: true, label: 'ชื่อสินค้า (ณ เวลาสั่งซื้อ)' },
        { name: 'unitPrice', type: 'number', required: true, label: 'ราคาต่อชิ้น (ณ เวลาสั่งซื้อ)' },
        { name: 'quantity', type: 'number', required: true, defaultValue: 1 },
      ],
    },
    {
      name: 'paymentMethod',
      type: 'select',
      defaultValue: 'bank_transfer',
      label: 'วิธีการชำระเงิน',
      options: [
        { label: 'โอนผ่านธนาคาร/พร้อมเพย์', value: 'bank_transfer' },
        { label: 'เก็บเงินปลายทาง (COD)', value: 'cod' },
      ],
    },
    { name: 'discountCode', type: 'text', label: 'โค้ดส่วนลดที่ใช้' },
    { name: 'discountAmount', type: 'number', label: 'ส่วนลด (บาท)' },
    { name: 'totalAmount', type: 'number', required: true, label: 'ยอดรวม (บาท)' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'ออเดอร์ใหม่', value: 'new' },
        { label: 'ติดต่อแล้ว', value: 'contacted' },
        { label: 'ยืนยันแล้ว', value: 'confirmed' },
        { label: 'ยกเลิก', value: 'cancelled' },
      ],
    },
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
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return doc

        try {
          const existing = await req.payload.find({
            collection: 'customers',
            where: { phone: { equals: doc.phone } },
            limit: 1,
          })

          if (existing.docs.length > 0) {
            const customer = existing.docs[0]
            await req.payload.update({
              collection: 'customers',
              id: customer.id,
              data: {
                name: doc.customerName,
                email: doc.email || customer.email,
                address: doc.address || customer.address,
                totalOrders: (customer.totalOrders || 0) + 1,
                totalSpent: (customer.totalSpent || 0) + (doc.totalAmount || 0),
                lastOrderAt: new Date().toISOString(),
              },
            })
          } else {
            await req.payload.create({
              collection: 'customers',
              data: {
                name: doc.customerName,
                phone: doc.phone,
                email: doc.email || undefined,
                address: doc.address || undefined,
                totalOrders: 1,
                totalSpent: doc.totalAmount || 0,
                lastOrderAt: new Date().toISOString(),
              },
            })
          }
        } catch (err) {
          console.error('อัปเดตข้อมูลลูกค้าไม่สำเร็จ:', err)
        }

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
                subject: `ออเดอร์ใหม่จากเว็บไซต์: ${doc.customerName} (${doc.totalAmount} บาท)`,
                text: [
                  `ชื่อ: ${doc.customerName}`,
                  `โทร: ${doc.phone}`,
                  `ที่อยู่: ${doc.address || '-'}`,
                  `รายการ: ${(doc.items || [])
                    .map((i: any) => `${i.productName} x${i.quantity} (${i.unitPrice} บาท)`)
                    .join(', ')}`,
                  `ยอดรวม: ${doc.totalAmount} บาท`,
                ].join('\n'),
              }),
            })
          } catch (err) {
            console.error('ส่ง Email แจ้งเตือนออเดอร์ไม่สำเร็จ:', err)
          }
        } else {
          console.log('[ออเดอร์ใหม่ — ยังไม่ได้ตั้งค่า RESEND_API_KEY ใน .env]', {
            customerName: doc.customerName,
            phone: doc.phone,
            totalAmount: doc.totalAmount,
          })
        }

        return doc
      },
    ],
  },
}

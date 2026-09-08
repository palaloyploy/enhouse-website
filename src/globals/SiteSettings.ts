import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'ตั้งค่าเว็บไซต์ / Tracking',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'siteName', type: 'text', label: 'ชื่อเว็บไซต์ (โลโก้ตัวอักษร)', defaultValue: 'enhouse.digital' },
    {
      name: 'navLinks',
      type: 'array',
      label: 'เมนู Navbar',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      type: 'group',
      name: 'tracking',
      label: 'Tracking & Ads',
      fields: [
        {
          name: 'ga4Id',
          type: 'text',
          label: 'Google Analytics 4 ID',
          admin: { placeholder: 'G-XXXXXXX' },
        },
        {
          name: 'gtmId',
          type: 'text',
          label: 'Google Tag Manager ID',
          admin: { placeholder: 'GTM-XXXXXXX' },
        },
        {
          name: 'gscVerification',
          type: 'text',
          label: 'Google Search Console verification code',
        },
        { name: 'fbPixelId', type: 'text', label: 'Facebook Pixel ID' },
        { name: 'tiktokPixelId', type: 'text', label: 'TikTok Pixel ID' },
        { name: 'linePixelId', type: 'text', label: 'LINE Tag ID' },
      ],
    },
    {
      type: 'group',
      name: 'payment',
      label: 'วิธีการชำระเงิน (โอน/พร้อมเพย์)',
      admin: {
        description:
          'กรอกข้อมูลบัญชีจริงของร้าน เพื่อแสดงในหน้าตะกร้าให้ลูกค้าโอนเงิน — ถ้าปล่อยว่าง ระบบจะแจ้งลูกค้าว่าทีมงานจะติดต่อแจ้งภายหลัง',
      },
      fields: [
        { name: 'bankName', type: 'text', label: 'ชื่อธนาคาร' },
        { name: 'accountName', type: 'text', label: 'ชื่อบัญชี' },
        { name: 'accountNumber', type: 'text', label: 'เลขบัญชี' },
        { name: 'promptPayId', type: 'text', label: 'พร้อมเพย์ (เบอร์โทร/เลขบัตร ปชช.)' },
        {
          name: 'qrImage',
          type: 'upload',
          relationTo: 'media',
          label: 'รูป QR พร้อมเพย์ (อัปโหลดจากแอปธนาคารของร้าน)',
        },
      ],
    },
    {
      type: 'group',
      name: 'contact',
      label: 'ข้อมูลติดต่อ',
      fields: [
        { name: 'companyName', type: 'text', label: 'ชื่อบริษัท' },
        { name: 'address', type: 'textarea', label: 'ที่อยู่' },
        { name: 'phone', type: 'text' },
        { name: 'lineUrl', type: 'text', label: 'ลิงก์ LINE OA' },
        { name: 'email', type: 'email' },
      ],
    },
  ],
}

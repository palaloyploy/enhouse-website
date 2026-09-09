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
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'โลโก้ (ถ้ามี จะใช้แทนโลโก้ตัวอักษรทั้งเว็บ)',
    },
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
      name: 'footerServices',
      type: 'array',
      label: 'Footer: คอลัมน์ "บริการ"',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'footerPortfolio',
      type: 'array',
      label: 'Footer: คอลัมน์ "ผลงาน"',
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
        { name: 'phoneIcon', type: 'upload', relationTo: 'media', label: 'ไอคอนเบอร์โทร (ถ้ามี)' },
        { name: 'lineUrl', type: 'text', label: 'ลิงก์ LINE OA' },
        { name: 'lineLabel', type: 'text', label: 'LINE (ข้อความแสดง)' },
        { name: 'lineIcon', type: 'upload', relationTo: 'media', label: 'ไอคอน LINE (ถ้ามี)' },
        { name: 'email', type: 'email' },
      ],
    },
    {
      type: 'group',
      name: 'socialLinks',
      label: 'โซเชียลมีเดีย',
      fields: [
        { name: 'facebookUrl', type: 'text', label: 'Facebook URL' },
        { name: 'facebookLabel', type: 'text', label: 'Facebook (ข้อความแสดง)', defaultValue: 'enhouse.digital' },
        { name: 'facebookIcon', type: 'upload', relationTo: 'media', label: 'ไอคอน Facebook (ถ้ามี)' },
        { name: 'instagramUrl', type: 'text', label: 'Instagram URL' },
        { name: 'instagramLabel', type: 'text', label: 'Instagram (ข้อความแสดง)', defaultValue: 'enhouse.digital' },
        { name: 'instagramIcon', type: 'upload', relationTo: 'media', label: 'ไอคอน Instagram (ถ้ามี)' },
        { name: 'tiktokUrl', type: 'text', label: 'TikTok URL' },
        { name: 'tiktokLabel', type: 'text', label: 'TikTok (ข้อความแสดง)', defaultValue: 'enhouse.digital' },
        { name: 'tiktokIcon', type: 'upload', relationTo: 'media', label: 'ไอคอน TikTok (ถ้ามี)' },
        { name: 'youtubeUrl', type: 'text', label: 'YouTube URL' },
        { name: 'youtubeLabel', type: 'text', label: 'YouTube (ข้อความแสดง)', defaultValue: 'enhouse.digital' },
        { name: 'youtubeIcon', type: 'upload', relationTo: 'media', label: 'ไอคอน YouTube (ถ้ามี)' },
      ],
    },
    {
      type: 'group',
      name: 'headerCta',
      label: 'ปุ่ม CTA บน Header (มือถือ)',
      fields: [
        { name: 'label', type: 'text', label: 'ข้อความปุ่ม', defaultValue: 'นัดหมายปรึกษา' },
        { name: 'url', type: 'text', label: 'ลิงก์ปุ่ม', defaultValue: '/contact' },
      ],
    },
  ],
}

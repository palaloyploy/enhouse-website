import type { CollectionConfig, Field } from 'payload'

const ctaFields: Field[] = [
  { name: 'ctaLabel', type: 'text', label: 'ปุ่ม (ถ้ามี)' },
  { name: 'ctaUrl', type: 'text', label: 'ลิงก์ปุ่ม' },
]

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    group: 'เว็บไซต์',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'สร้างและแก้ไขหน้าเว็บ พร้อมเพิ่ม Section เองได้จาก layout ด้านล่าง',
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'ชื่อหน้า',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (URL)',
      admin: {
        description: 'เช่น "about", "csr" — หน้าแรกให้ใช้ "home"',
      },
    },
    {
      type: 'group',
      name: 'meta',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text', label: 'Meta title' },
        { name: 'metaDescription', type: 'textarea', label: 'Meta description' },
        { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'OG image' },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'เนื้อหาในหน้า (Section)',
      labels: {
        singular: 'Section',
        plural: 'Sections',
      },
      blocks: [
        // ---------- Basic image/text blocks (มีอยู่เดิม) ----------
        {
          slug: 'imageLeftTextRight',
          labels: { singular: 'รูปซ้าย / Text ขวา', plural: 'รูปซ้าย / Text ขวา' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'heading', type: 'text', required: true },
            { name: 'text', type: 'textarea' },
            ...ctaFields,
          ],
        },
        {
          slug: 'imageTopTextBottom',
          labels: { singular: 'รูปบน / Text ล่าง', plural: 'รูปบน / Text ล่าง' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'heading', type: 'text', required: true },
            { name: 'text', type: 'textarea' },
            ...ctaFields,
          ],
        },
        {
          slug: 'imageGallery',
          labels: { singular: 'Gallery (หลายรูป)', plural: 'Gallery (หลายรูป)' },
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'text', type: 'textarea' },
            {
              name: 'images',
              type: 'array',
              label: 'รูปภาพ',
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media' },
                { name: 'caption', type: 'text', label: 'คำบรรยายใต้รูป (ถ้ามี)' },
              ],
            },
          ],
        },
        {
          slug: 'imageBanner',
          labels: { singular: 'Banner เต็มจอ + Text ทับรูป', plural: 'Banner เต็มจอ + Text ทับรูป' },
          fields: [
            {
              name: 'layout',
              type: 'select',
              defaultValue: 'single',
              label: 'รูปแบบ',
              options: [
                { label: 'รูปเดียวเต็มจอ', value: 'single' },
                { label: 'คอลลาจหลายรูป + การ์ดข้อความทับ', value: 'collage' },
              ],
            },
            { name: 'image', type: 'upload', relationTo: 'media', label: 'รูปภาพ (แบบรูปเดียว)' },
            {
              name: 'collageImages',
              type: 'array',
              label: 'รูปภาพ (แบบคอลลาจ ใส่ได้สูงสุด 6 รูป)',
              maxRows: 6,
              fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
            },
            { name: 'heading', type: 'text', required: true },
            { name: 'text', type: 'textarea' },
            ...ctaFields,
            {
              name: 'overlayColor',
              type: 'select',
              label: 'สีทับรูป (สำหรับให้ตัวหนังสืออ่านง่าย, แบบรูปเดียวเท่านั้น)',
              defaultValue: 'dark',
              options: [
                { label: 'เข้ม (Dark)', value: 'dark' },
                { label: 'แบรนด์ (Gold)', value: 'gold' },
              ],
            },
          ],
        },
        {
          slug: 'textOnly',
          labels: { singular: 'Text อย่างเดียว', plural: 'Text อย่างเดียว' },
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'text', type: 'textarea' },
          ],
        },

        // ---------- Section blocks ใหม่ (ตาม design enhouse.digital) ----------
        {
          slug: 'hero',
          labels: { singular: 'Hero (หัวหน้า)', plural: 'Hero (หัวหน้า)' },
          fields: [
            { name: 'eyebrow', type: 'text', label: 'ป้ายกำกับหมวดหมู่ (เช่น "เกี่ยวกับเรา")' },
            { name: 'tag', type: 'text', label: 'Eyebrow / แท็กเล็กด้านบน' },
            { name: 'heading', type: 'text', required: true, label: 'หัวข้อหลัก' },
            {
              name: 'highlightText',
              type: 'text',
              label: 'คำที่ต้องการเน้นสีทอง (ต้องเป็นข้อความย่อยของหัวข้อหลัก)',
            },
            { name: 'subheading', type: 'textarea', label: 'คำอธิบายรอง' },
            {
              name: 'layout',
              type: 'select',
              defaultValue: 'centered',
              label: 'รูปแบบ Hero',
              options: [
                { label: 'กึ่งกลาง (Centered)', value: 'centered' },
                { label: '2 คอลัมน์ ข้อความซ้าย-รูปขวา (Split)', value: 'split' },
              ],
            },
            {
              name: 'visualStyle',
              type: 'select',
              defaultValue: 'photo',
              label: 'ฝั่งขวา (เฉพาะแบบ Split)',
              options: [
                { label: 'รูปภาพ', value: 'photo' },
                { label: 'โลโก้แบรนด์ (ตกแต่งอัตโนมัติ)', value: 'brandMark' },
              ],
            },
            { name: 'image', type: 'upload', relationTo: 'media' },
            {
              name: 'imageStyle',
              type: 'select',
              defaultValue: 'rounded',
              options: [
                { label: 'มุมโค้ง', value: 'rounded' },
                { label: 'วงกลม', value: 'circle' },
              ],
            },
            { name: 'primaryCtaLabel', type: 'text', label: 'ปุ่มหลัก' },
            { name: 'primaryCtaUrl', type: 'text', label: 'ลิงก์ปุ่มหลัก' },
            { name: 'secondaryCtaLabel', type: 'text', label: 'ปุ่มรอง' },
            { name: 'secondaryCtaUrl', type: 'text', label: 'ลิงก์ปุ่มรอง' },
          ],
        },
        {
          slug: 'logoStrip',
          labels: { singular: 'แถบโลโก้ลูกค้า', plural: 'แถบโลโก้ลูกค้า' },
          fields: [
            { name: 'heading', type: 'text', label: 'หัวข้อ เช่น "กลุ่มธุรกิจที่เรารู้จัก"' },
            {
              name: 'logos',
              type: 'array',
              label: 'โลโก้',
              fields: [
                { name: 'logo', type: 'upload', relationTo: 'media', required: true },
                { name: 'url', type: 'text', label: 'ลิงก์ (ถ้ามี)' },
              ],
            },
          ],
        },
        {
          slug: 'iconFeatureGrid',
          labels: { singular: 'การ์ดไอคอน + รายการ (บริการ/จุดเด่น)', plural: 'การ์ดไอคอน + รายการ' },
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'subheading', type: 'textarea' },
            {
              name: 'columns',
              type: 'select',
              defaultValue: '3',
              options: [
                { label: '2 คอลัมน์', value: '2' },
                { label: '3 คอลัมน์', value: '3' },
                { label: '4 คอลัมน์', value: '4' },
              ],
            },
            {
              name: 'items',
              type: 'array',
              required: true,
              minRows: 1,
              fields: [
                { name: 'icon', type: 'upload', relationTo: 'media' },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
                {
                  name: 'points',
                  type: 'array',
                  label: 'รายการย่อย (ถ้ามี)',
                  fields: [{ name: 'text', type: 'text', required: true }],
                },
              ],
            },
            { name: 'footnote', type: 'text', label: 'ข้อความปิดท้าย (ถ้ามี)' },
            {
              name: 'sideImages',
              type: 'array',
              label: 'รูปภาพประกอบด้านข้าง (ถ้าใส่ จะเปลี่ยนเป็น layout รายการเลข + รูปภาพ แทนกริดการ์ด)',
              fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
            },
            ...ctaFields,
          ],
        },
        {
          slug: 'featureShowcase',
          labels: {
            singular: 'จุดเด่นบริการ + รูปประกอบ (Cross Channel)',
            plural: 'จุดเด่นบริการ + รูปประกอบ',
          },
          fields: [
            { name: 'eyebrow', type: 'text' },
            { name: 'heading', type: 'text', required: true },
            { name: 'text', type: 'textarea' },
            {
              name: 'points',
              type: 'array',
              fields: [{ name: 'text', type: 'text', required: true }],
            },
            {
              name: 'images',
              type: 'array',
              label: 'รูปประกอบ (เช่น ภาพหน้าจอมือถือ)',
              fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
            },
            ...ctaFields,
          ],
        },
        {
          slug: 'processSteps',
          labels: { singular: 'ขั้นตอนทำงาน (พื้นเข้ม, มีลำดับ)', plural: 'ขั้นตอนทำงาน (พื้นเข้ม)' },
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'subheading', type: 'textarea' },
            {
              name: 'steps',
              type: 'array',
              required: true,
              minRows: 1,
              fields: [
                { name: 'number', type: 'text', label: 'ลำดับ เช่น "01"' },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
              ],
            },
            ...ctaFields,
          ],
        },
        {
          slug: 'bookingPromo',
          labels: { singular: 'โปรโมทจองคิว + ปฏิทิน', plural: 'โปรโมทจองคิว + ปฏิทิน' },
          fields: [
            { name: 'heading', type: 'text', required: true, label: 'หัวข้อบนสุด' },
            {
              name: 'freeSlotsLabel',
              type: 'text',
              defaultValue: 'เหลือสิทธิ์ตรวจฟรี',
              label: 'ข้อความก่อนจำนวนสิทธิ์ที่เหลือ',
            },
            { name: 'totalSlots', type: 'number', defaultValue: 15, label: 'จำนวนสิทธิ์ทั้งหมด' },
            { name: 'bookedSlots', type: 'number', defaultValue: 9, label: 'จำนวนที่จองแล้ว' },
            { name: 'rightTitle', type: 'text', label: 'หัวข้อฝั่งขวา เช่น "Enhouse Leakage Audit"' },
            { name: 'rightDescription', type: 'textarea', label: 'คำอธิบายฝั่งขวา' },
            {
              name: 'features',
              type: 'array',
              label: 'รายการจุดเด่น (มีหัวข้อ + คำอธิบาย)',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'text' },
              ],
            },
            { name: 'originalPrice', type: 'text', label: 'ราคาปกติ เช่น "9,900"' },
            { name: 'badgeText', type: 'text', label: 'ป้ายโปรโมชัน เช่น "ฟรี 15 เคส"' },
            ...ctaFields,
          ],
        },
        {
          slug: 'leadFormSection',
          labels: { singular: 'ฟอร์มจองคิว/นัดหมาย', plural: 'ฟอร์มจองคิว/นัดหมาย' },
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'subheading', type: 'textarea' },
            {
              name: 'businessListHeading',
              type: 'text',
              defaultValue: 'ธุรกิจที่เราดูแล',
              label: 'หัวข้อลิสต์ฝั่งซ้าย',
            },
            {
              name: 'businessTypes',
              type: 'array',
              label: 'ประเภทธุรกิจ (แสดงเป็นลิสต์เลขฝั่งซ้าย)',
              fields: [
                { name: 'title', type: 'text', required: true },
                {
                  name: 'points',
                  type: 'array',
                  fields: [{ name: 'text', type: 'text', required: true }],
                },
              ],
            },
            {
              name: 'serviceLabel',
              type: 'text',
              defaultValue: 'คุณคือธุรกิจ',
              label: 'หัวข้อเหนือปุ่มเลือกประเภทธุรกิจในฟอร์ม',
            },
            {
              name: 'serviceOptions',
              type: 'array',
              label: 'ตัวเลือกที่แสดงเป็นปุ่มเลือกในฟอร์ม',
              fields: [{ name: 'label', type: 'text', required: true }],
            },
          ],
        },
        {
          slug: 'timeline',
          labels: { singular: 'ไทม์ไลน์ (ปีต่อปี)', plural: 'ไทม์ไลน์ (ปีต่อปี)' },
          fields: [
            { name: 'heading', type: 'text' },
            {
              name: 'items',
              type: 'array',
              required: true,
              minRows: 1,
              fields: [
                { name: 'year', type: 'text', required: true },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
              ],
            },
          ],
        },
        {
          slug: 'caseStudyList',
          labels: { singular: 'รายการผลงาน (รูปหลายใบ + รายละเอียด)', plural: 'รายการผลงาน' },
          fields: [
            { name: 'heading', type: 'text' },
            {
              name: 'items',
              type: 'array',
              required: true,
              minRows: 1,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
                {
                  name: 'points',
                  type: 'array',
                  fields: [{ name: 'text', type: 'text', required: true }],
                },
                { name: 'footnote', type: 'text', label: 'ข้อความปิดท้าย (แสดงใต้รายการ)' },
                {
                  name: 'images',
                  type: 'array',
                  label: 'รูปภาพ (แสดงเป็นชุดคอลลาจ)',
                  fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
                },
                { name: 'linkLabel', type: 'text' },
                { name: 'linkUrl', type: 'text' },
              ],
            },
          ],
        },
        {
          slug: 'faq',
          labels: { singular: 'คำถามที่พบบ่อย (FAQ)', plural: 'คำถามที่พบบ่อย (FAQ)' },
          fields: [
            { name: 'heading', type: 'text', defaultValue: 'คำถามที่พบบ่อย' },
            {
              name: 'items',
              type: 'array',
              required: true,
              minRows: 1,
              fields: [
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          slug: 'ctaBanner',
          labels: { singular: 'แบนเนอร์ชวนทำนัด (CTA)', plural: 'แบนเนอร์ชวนทำนัด (CTA)' },
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'text', type: 'textarea' },
            ...ctaFields,
            {
              name: 'theme',
              type: 'select',
              defaultValue: 'gold',
              options: [
                { label: 'ทอง', value: 'gold' },
                { label: 'เข้ม', value: 'dark' },
              ],
            },
            {
              name: 'size',
              type: 'select',
              defaultValue: 'full',
              options: [
                { label: 'เต็มความกว้าง', value: 'full' },
                { label: 'กล่องเล็ก', value: 'compact' },
              ],
            },
          ],
        },
        {
          slug: 'pricingPackages',
          labels: { singular: 'แพ็กเกจราคา', plural: 'แพ็กเกจราคา' },
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'subheading', type: 'textarea' },
            {
              name: 'packages',
              type: 'array',
              required: true,
              minRows: 1,
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'subtitle', type: 'text' },
                { name: 'priceNote', type: 'text', label: 'ข้อความราคา' },
                {
                  name: 'features',
                  type: 'array',
                  fields: [{ name: 'text', type: 'text', required: true }],
                },
                { name: 'ctaLabel', type: 'text' },
                { name: 'ctaUrl', type: 'text' },
                { name: 'highlighted', type: 'checkbox', label: 'เน้น (พื้นเข้ม)' },
              ],
            },
            {
              type: 'group',
              name: 'additionalNote',
              label: 'แบนเนอร์บริการเสริม (ด้านล่าง)',
              fields: [
                { name: 'heading', type: 'text' },
                { name: 'text', type: 'textarea' },
                { name: 'ctaLabel', type: 'text' },
                { name: 'ctaUrl', type: 'text' },
              ],
            },
          ],
        },
        {
          slug: 'dualDiagram',
          labels: { singular: 'ไดอะแกรมเปรียบเทียบ 2 คอลัมน์', plural: 'ไดอะแกรมเปรียบเทียบ 2 คอลัมน์' },
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'subheading', type: 'textarea' },
            { name: 'leftLabel', type: 'text', label: 'หัวข้อเล็กเหนือรูปฝั่งซ้าย' },
            { name: 'leftImage', type: 'upload', relationTo: 'media', required: true, label: 'รูปฝั่งซ้าย' },
            { name: 'rightLabel', type: 'text', label: 'หัวข้อเล็กเหนือรูปฝั่งขวา' },
            { name: 'rightImage', type: 'upload', relationTo: 'media', required: true, label: 'รูปฝั่งขวา' },
          ],
        },
        {
          slug: 'diagramImage',
          labels: { singular: 'ไดอะแกรม/ภาพประกอบเต็มความกว้าง', plural: 'ไดอะแกรม/ภาพประกอบ' },
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'subheading', type: 'textarea' },
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
            { name: 'caption', type: 'text' },
          ],
        },
        {
          slug: 'productGrid',
          labels: { singular: 'สินค้าจากร้านค้า (Product Grid)', plural: 'สินค้าจากร้านค้า' },
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'subheading', type: 'textarea' },
            {
              name: 'mode',
              type: 'select',
              defaultValue: 'featured',
              options: [
                { label: 'สินค้าแนะนำ', value: 'featured' },
                { label: 'สินค้าล่าสุดทั้งหมด', value: 'all' },
                { label: 'เลือกสินค้าเอง', value: 'selected' },
              ],
            },
            { name: 'limit', type: 'number', defaultValue: 4, label: 'จำนวนที่แสดง (โหมดแนะนำ/ล่าสุด)' },
            {
              name: 'products',
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
              label: 'เลือกสินค้า (โหมดเลือกเอง)',
            },
            ...ctaFields,
          ],
        },
        {
          slug: 'adsPortfolioGrid',
          labels: { singular: 'กริดผลงานโฆษณา (Ads Portfolio)', plural: 'กริดผลงานโฆษณา' },
          fields: [
            { name: 'heading', type: 'text' },
            {
              name: 'images',
              type: 'array',
              required: true,
              minRows: 1,
              fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
            },
          ],
        },
        {
          slug: 'contactInfo',
          labels: { singular: 'ข้อมูลติดต่อ (ที่อยู่ + โซเชียล)', plural: 'ข้อมูลติดต่อ' },
          fields: [
            { name: 'heading', type: 'text', required: true, defaultValue: 'ติดต่อเรา' },
            {
              name: 'text',
              type: 'textarea',
              defaultValue:
                'ทีมงานของเราพร้อมให้คำแนะนำและช่วยเหลือเพื่อเพิ่มประสิทธิภาพด้านการตลาดให้กับธุรกิจคุณ',
              admin: {
                description:
                  'บริษัท/ที่อยู่/เบอร์โทร/LINE/โซเชียล ดึงมาจาก "ตั้งค่าเว็บไซต์ > ข้อมูลติดต่อ / โซเชียลมีเดีย" โดยอัตโนมัติ ไม่ต้องกรอกซ้ำที่นี่',
              },
            },
          ],
        },
        {
          slug: 'symptomChecklist',
          labels: { singular: 'Checklist ปัญหาธุรกิจ (ยังไม่ต้องจ้าง Enhouse)', plural: 'Checklist ปัญหาธุรกิจ' },
          fields: [
            { name: 'promoHeading', type: 'text', required: true, defaultValue: 'ยังไม่ต้องจ้าง Enhouse' },
            {
              name: 'promoHighlight',
              type: 'text',
              label: 'ข้อความที่ต้องการไฮไลต์ในหัวข้อ (จะแสดงเป็น gradient สีทอง)',
              defaultValue: 'ไม่ต้องจ้าง Enhouse',
            },
            {
              name: 'promoText',
              type: 'textarea',
              defaultValue: 'ก่อนเปลี่ยนทีมตลาด\nลองรู้ก่อนว่าปัญหาจริงอยู่ตรงไหน',
            },
            {
              name: 'checklistHeading',
              type: 'text',
              required: true,
              defaultValue: 'ธุรกิจของคุณ มีอาการเหล่านี้ไหม?',
            },
            {
              name: 'checklistHighlight',
              type: 'text',
              label: 'ข้อความที่ต้องการไฮไลต์ในหัวข้อ checklist',
              defaultValue: 'มีอาการเหล่านี้ไหม?',
            },
            {
              name: 'items',
              type: 'array',
              required: true,
              minRows: 1,
              fields: [{ name: 'text', type: 'text', required: true }],
              defaultValue: [
                { text: 'มีคนทัก แล้วเงียบ' },
                { text: 'คุยอยู่ แต่ไม่ขอราคา' },
                { text: 'เซลบอก Lead ไม่มีคุณภาพ' },
                { text: 'คนทักมา แต่ไม่ใช่กลุ่มเป้าหมาย' },
                { text: 'Engagement ดี แต่ยอดทักน้อย' },
                { text: 'หมุนคอนเทนต์สร้างเรื่อง แต่ไม่มีติดต่อ' },
                { text: 'ขายราคาแพง แต่ไม่กล้าตัดสินใจ' },
                { text: 'หมุนคอนเทนต์สร้างเรื่อง แต่ไม่มีติดต่อ' },
              ],
            },
            { name: 'thresholdText', type: 'text', defaultValue: 'มากกว่า 3 ข้อ' },
            { name: 'thresholdCta', type: 'text', defaultValue: 'ลองทำ Analysis & Checking ดูก่อน' },
          ],
        },
      ],
    },
  ],
}

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Leads } from './collections/Leads'
import { Products } from './collections/Products'
import { Orders } from './collections/Orders'
import { Categories } from './collections/Categories'
import { Discounts } from './collections/Discounts'
import { Customers } from './collections/Customers'
import { Testimonials } from './collections/Testimonials'
import { NewsletterSubscribers } from './collections/NewsletterSubscribers'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeDashboard: ['/components/admin/OrdersSummary#OrdersSummary'],
    },
  },
  collections: [
    Users,
    Media,
    Pages,
    Leads,
    Products,
    Orders,
    Categories,
    Discounts,
    Customers,
    Testimonials,
    NewsletterSubscribers,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  localization: {
    locales: ['th', 'en'],
    fallback: true,
    defaultLocale: 'th',
  },
  onInit: async (payload) => {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'pages',
        data: {
          title: 'enhouse.digital',
          slug: 'home',
          meta: {
            metaTitle: 'enhouse.digital — Marketing Operation Partner',
            metaDescription: 'มองเห็นรอยรั่วของรายได้ ก่อนเสียงบโฆษณาเพิ่ม',
          },
          layout: [
            {
              blockType: 'imageLeftTextRight',
              heading: 'มองเห็นรอยรั่วของรายได้ ก่อนเสียงบโฆษณาเพิ่ม',
              text: 'ธุรกิจส่วนใหญ่คิดว่าปัญหาอยู่ที่ Ads แต่จริงๆ แล้วรายได้อาจรั่วอยู่ในหลายจุดของ Customer Journey เราตรวจ 9 จุดสำคัญ ตั้งแต่ Traffic Source ไปจนถึง Chat & Consult เพื่อหาว่า Lead หลุดตรงไหนก่อนเสียงบเพิ่มโดยไม่รู้สาเหตุ',
              ctaLabel: 'ดูวิธีการตรวจ',
              ctaUrl: '/audit-process',
            },
            {
              blockType: 'imageTopTextBottom',
              heading: 'จาก Audit สู่ Marketing Operations ที่ทำงานเองได้',
              text: 'เริ่มจาก Audit Revenue Leakage เพื่อหาจุดรั่ว ต่อด้วย Build Marketing Operations วางระบบให้ Marketing, Sales และ Data ทำงานเชื่อมกัน และปิดท้ายด้วย Revenue Optimization Process วัดผลและปรับปรุงอย่างต่อเนื่อง',
            },
            {
              blockType: 'imageGallery',
              heading: 'ธุรกิจที่เราดูแลอยู่',
              text: 'ตลอดหลายปีที่ผ่านมา เราทำงานร่วมกับธุรกิจสินค้าราคาสูงที่มีขั้นตอนการขายซับซ้อน กว่า 90+ เคส',
              images: [
                { caption: 'Niche Furniture' },
                { caption: 'Premium Home Product' },
                { caption: 'Automotive Showroom' },
                { caption: 'Hospitality Project' },
              ],
            },
            {
              blockType: 'imageBanner',
              heading: 'เราโตไปพร้อมสังคม',
              text: 'ทุกไตรมาส ทีมงานสละเวลาไปช่วยงานด้านการตลาดให้มูลนิธิที่เราเชื่อมั่น โดยไม่คิดค่าใช้จ่าย',
              ctaLabel: 'อ่านเรื่องราว CSR ของเรา',
              ctaUrl: '/csr',
              overlayColor: 'gold',
            },
          ],
        },
      })
      payload.logger.info('สร้างหน้า "home" ตัวอย่างให้แล้ว — เข้าไปแก้ไขได้ที่ /admin')
    }
  },
})

import React, { Suspense } from 'react'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { getSiteSettings } from '@/lib/site-settings'
import { Footer } from '@/components/Footer'
import { ShopNavbar } from './ShopNavbar'
import '@/app/(frontend)/styles.css'
import '@/app/(frontend)/shop/shop.css'

export async function ShopChrome({ children }: { children: React.ReactNode }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [{ settings, siteName, navLinks }, categoriesResult, saleResult, discountResult] = await Promise.all([
    getSiteSettings(),
    payload.find({ collection: 'categories', limit: 100, sort: 'name' }),
    payload.find({ collection: 'products', where: { compareAtPrice: { greater_than: 0 } }, limit: 1 }),
    payload.find({ collection: 'discounts', where: { active: { equals: true } }, limit: 1, sort: '-createdAt' }),
  ])

  const categories = categoriesResult.docs.map((c: any) => ({ name: c.name, slug: c.slug }))
  const activeDiscount = discountResult.docs[0] as any

  return (
    <div className="shopland">
      {activeDiscount && (
        <div className="shop-announce">
          ใช้โค้ด <strong>{activeDiscount.code}</strong>{' '}
          {activeDiscount.type === 'percentage' ? `ลด ${activeDiscount.value}%` : `ลด ฿${activeDiscount.value}`}{' '}
          ตอนเช็คเอาต์ — <a href="/cart">ไปที่ตะกร้า</a>
        </div>
      )}
      <Suspense fallback={null}>
        <ShopNavbar siteName={siteName} categories={categories} hasSale={saleResult.totalDocs > 0} />
      </Suspense>
      <main>{children}</main>
      <Footer
        siteName={siteName}
        navLinks={navLinks}
        companyName={settings?.contact?.companyName}
        address={settings?.contact?.address}
        phone={settings?.contact?.phone}
        lineUrl={settings?.contact?.lineUrl}
        email={settings?.contact?.email}
      />
    </div>
  )
}

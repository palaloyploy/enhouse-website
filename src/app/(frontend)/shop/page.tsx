import { getPayload } from 'payload'
import React, { Suspense } from 'react'

import config from '@/payload.config'
import { ShopProductCard } from '@/components/shop/ShopProductCard'
import { ShopFilterSidebar, type ShopFilters } from '@/components/shop/ShopFilterSidebar'
import { SortSelect } from '@/components/shop/SortSelect'
import { Stars } from '@/components/shop/Stars'
import { NewsletterForm } from '@/components/shop/NewsletterForm'
import type { ProductSummary } from '@/components/ProductCard'

export const metadata = {
  title: 'ร้านค้า — enhouse.digital',
}

function resolveImage(image: unknown) {
  if (!image || typeof image === 'string') return null
  return (image as { url?: string }).url || null
}

function toSummary(doc: any): ProductSummary & { rating?: number | null } {
  return {
    id: String(doc.id),
    slug: doc.slug,
    name: doc.name,
    price: doc.price,
    compareAtPrice: doc.compareAtPrice,
    image: resolveImage(doc.images?.[0]?.image),
    inStock: doc.inStock,
    rating: doc.rating,
    sku: doc.sku,
  }
}

function toArrayParam(value?: string | string[]): string[] {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

const SORT_MAP: Record<string, string> = {
  popular: '-createdAt',
  newest: '-createdAt',
  'price-asc': 'price',
  'price-desc': '-price',
}

type RawSearchParams = {
  category?: string
  q?: string
  sale?: string
  sort?: string
  minPrice?: string
  maxPrice?: string
  minWidth?: string
  maxWidth?: string
  minHeight?: string
  maxHeight?: string
  minDepth?: string
  maxDepth?: string
  color?: string | string[]
  tag?: string | string[]
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
  const raw = await searchParams
  const color = toArrayParam(raw.color)
  const tag = toArrayParam(raw.tag)

  const filters: ShopFilters = {
    q: raw.q,
    category: raw.category,
    sale: raw.sale,
    sort: raw.sort,
    minPrice: raw.minPrice,
    maxPrice: raw.maxPrice,
    minWidth: raw.minWidth,
    maxWidth: raw.maxWidth,
    minHeight: raw.minHeight,
    maxHeight: raw.maxHeight,
    minDepth: raw.minDepth,
    maxDepth: raw.maxDepth,
    color,
    tag,
  }

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const where: any[] = []
  if (raw.category) where.push({ 'category.slug': { equals: raw.category } })
  if (raw.q) where.push({ name: { like: raw.q } })
  if (raw.minPrice) where.push({ price: { greater_than_equal: Number(raw.minPrice) } })
  if (raw.maxPrice) where.push({ price: { less_than_equal: Number(raw.maxPrice) } })
  if (raw.minWidth) where.push({ width: { greater_than_equal: Number(raw.minWidth) } })
  if (raw.maxWidth) where.push({ width: { less_than_equal: Number(raw.maxWidth) } })
  if (raw.minHeight) where.push({ height: { greater_than_equal: Number(raw.minHeight) } })
  if (raw.maxHeight) where.push({ height: { less_than_equal: Number(raw.maxHeight) } })
  if (raw.minDepth) where.push({ depth: { greater_than_equal: Number(raw.minDepth) } })
  if (raw.maxDepth) where.push({ depth: { less_than_equal: Number(raw.maxDepth) } })
  if (raw.sale === '1') where.push({ compareAtPrice: { greater_than: 0 } })
  if (color.length > 0) where.push({ color: { in: color } })
  if (tag.length > 0) where.push({ 'tags.text': { in: tag } })

  const hasFilters = where.length > 0
  const sort = SORT_MAP[raw.sort || 'popular'] || '-createdAt'

  const [productsResult, categoriesResult, newArrivalsResult, bestsellersResult, testimonialsResult, allForFacets] =
    await Promise.all([
      payload.find({ collection: 'products', limit: 100, sort, where: hasFilters ? { and: where } : undefined }),
      payload.find({ collection: 'categories', limit: 100, sort: 'name' }),
      payload.find({ collection: 'products', limit: 4, sort: '-createdAt' }),
      payload.find({ collection: 'products', where: { bestseller: { equals: true } }, limit: 4 }),
      payload.find({ collection: 'testimonials', limit: 8, sort: '-createdAt' }),
      payload.find({ collection: 'products', limit: 200 }),
    ])

  const products = productsResult.docs.map(toSummary)
  const newArrivals = newArrivalsResult.docs.map(toSummary)
  const bestsellers = (bestsellersResult.docs.length > 0 ? bestsellersResult.docs : newArrivalsResult.docs).map(
    toSummary,
  )

  const availableTags = Array.from(
    new Set(allForFacets.docs.flatMap((d: any) => (d.tags || []).map((t: any) => t.text).filter(Boolean))),
  ) as string[]

  return (
    <>
      {!hasFilters && (
        <>
          <section className="shop-hero">
            <div>
              <h1>สินค้าที่ใช่ สไตล์ที่ชอบ</h1>
              <p>
                เลือกช้อปเฟอร์นิเจอร์และของแต่งบ้านที่คัดสรรมาอย่างดี ใช้งานได้จริง ทนทาน
                ตอบโจทย์ทุกสไตล์การแต่งบ้านของคุณ
              </p>
              <a href="#catalog" className="shop-btn-black">
                ช้อปเลย
              </a>
              <div className="shop-stats">
                <div>
                  <strong>{productsResult.totalDocs}+</strong>
                  <span>สินค้าให้เลือก</span>
                </div>
                <div>
                  <strong>{categoriesResult.totalDocs}</strong>
                  <span>หมวดหมู่สินค้า</span>
                </div>
              </div>
            </div>
            <div className="shop-hero-image">
              {newArrivals[0]?.image && <img src={newArrivals[0].image} alt={newArrivals[0].name} />}
            </div>
          </section>

          <div className="shop-trust-strip">
            <span>จัดส่งฟรีทั่วไทย</span>
            <span>รับประกันสินค้า</span>
            <span>เก็บเงินปลายทางได้</span>
            <span>คืนสินค้าได้ใน 7 วัน</span>
          </div>

          {newArrivals.length > 0 && (
            <section className="shop-section shop-section--plain">
              <div className="shop-section__container">
                <div className="shop-section-head">
                  <span className="shop-eyebrow">มาใหม่ล่าสุด</span>
                  <h2>สินค้ามาใหม่</h2>
                </div>
                <div className="grid grid-4">
                  {newArrivals.map((p) => (
                    <ShopProductCard key={p.id} product={p} />
                  ))}
                </div>
                <a href="#catalog" className="shop-view-all">
                  ดูทั้งหมด
                </a>
              </div>
            </section>
          )}

          {bestsellers.length > 0 && (
            <section className="shop-section shop-section--alt">
              <div className="shop-section__container">
                <div className="shop-section-head">
                  <span className="shop-eyebrow shop-eyebrow--black">ขายดีต่อเนื่อง</span>
                  <h2>สินค้าขายดี</h2>
                </div>
                <div className="grid grid-4">
                  {bestsellers.map((p) => (
                    <ShopProductCard key={p.id} product={p} />
                  ))}
                </div>
                <a href="#catalog" className="shop-view-all">
                  ดูทั้งหมด
                </a>
              </div>
            </section>
          )}

          {categoriesResult.docs.length > 0 && (
            <section className="shop-section">
              <div className="shop-section__container">
                <div className="shop-section-head">
                  <span className="shop-eyebrow">เลือกให้ตรงใจ</span>
                  <h2>เลือกซื้อตามหมวดหมู่</h2>
                </div>
                <div className="shop-category-grid">
                  {categoriesResult.docs.map((cat: any) => {
                    const img = resolveImage(cat.image)
                    return (
                      <a key={cat.id} href={`/shop?category=${cat.slug}#catalog`} className="shop-category-tile">
                        {img && <img src={img} alt={cat.name} />}
                        <span>{cat.name}</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <section className="shop-section" id="catalog">
        <div className="shop-section__container">
          <div className="shop-section-head">
            <span className="shop-eyebrow shop-eyebrow--black">{hasFilters ? 'ผลการค้นหา' : 'เลือกดูทั้งร้าน'}</span>
            <h2>{raw.q ? `ผลการค้นหา "${raw.q}"` : 'สินค้าทั้งหมด'}</h2>
          </div>

          <div className="shop-catalog-layout">
            <ShopFilterSidebar filters={filters} availableTags={availableTags} />

            <div>
              <div className="shop-catalog-toolbar">
                <Suspense fallback={null}>
                  <SortSelect />
                </Suspense>
              </div>

              {products.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--shop-gray-text)' }}>ไม่พบสินค้าตามเงื่อนไขที่เลือก</p>
              ) : (
                <div className="grid grid-3">
                  {products.map((product) => (
                    <ShopProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {!hasFilters && testimonialsResult.docs.length > 0 && (
        <section className="shop-section shop-section--alt">
          <div className="shop-section__container">
            <div className="shop-section-head">
              <span className="shop-eyebrow shop-eyebrow--black">ลูกค้าพูดถึงเรา</span>
              <h2>รีวิวจากลูกค้า</h2>
            </div>
            <div className="shop-testimonials">
              {testimonialsResult.docs.map((t: any) => (
                <div key={t.id} className="shop-testimonial-card">
                  <Stars rating={t.rating || 5} showValue={false} />
                  <div className="shop-testimonial-name">
                    {t.name}
                    {t.verified && <span title="ยืนยันว่าซื้อจริง">✅</span>}
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--shop-gray-text)', margin: 0 }}>&ldquo;{t.quote}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="shop-newsletter">
        <h3>รับข่าวสารโปรโมชันล่าสุดจากเรา</h3>
        <NewsletterForm />
      </div>
    </>
  )
}

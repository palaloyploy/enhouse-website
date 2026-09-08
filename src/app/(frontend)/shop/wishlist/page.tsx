'use client'

import React from 'react'
import { useWishlist } from '@/lib/wishlist-context'
import { useMounted } from '@/lib/use-mounted'
import { ShopProductCard } from '@/components/shop/ShopProductCard'

export default function WishlistPage() {
  const { items } = useWishlist()
  const mounted = useMounted()

  return (
    <section className="shop-section shop-section--plain">
      <div className="shop-section__container">
        <div className="shop-section-head">
          <span className="shop-eyebrow shop-eyebrow--black">บันทึกไว้ดูทีหลัง</span>
          <h2>รายการโปรดของฉัน</h2>
        </div>

        {!mounted || items.length === 0 ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--shop-gray-text)' }}>ยังไม่มีสินค้าที่บันทึกไว้</p>
            <a href="/shop" className="shop-btn-black">
              เลือกซื้อสินค้า
            </a>
          </div>
        ) : (
          <div className="grid grid-4">
            {items.map((item) => (
              <ShopProductCard
                key={item.productId}
                product={{
                  id: item.productId,
                  slug: item.slug,
                  name: item.name,
                  price: item.price,
                  image: item.image,
                  inStock: true,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

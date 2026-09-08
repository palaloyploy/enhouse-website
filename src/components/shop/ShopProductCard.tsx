'use client'

import React from 'react'
import { useCart } from '@/lib/cart-context'
import { useWishlist } from '@/lib/wishlist-context'
import { useMounted } from '@/lib/use-mounted'
import { Stars } from './Stars'
import type { ProductSummary } from '@/components/ProductCard'

function formatPrice(price: number) {
  return price.toLocaleString('th-TH')
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} aria-hidden="true">
      <path
        d="M12 20.5s-7.5-4.6-9.8-9.1C.6 8 2 4.5 5.4 3.6c2-.5 3.9.3 5 1.9a5.2 5.2 0 0 1 1.6-1.9c1.1-1.6 3-2.4 5-1.9 3.4.9 4.8 4.4 3.2 7.8-2.3 4.5-9.8 9.1-9.8 9.1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ShopProductCard({ product }: { product: ProductSummary & { rating?: number | null } }) {
  const { addItem } = useCart()
  const { isSaved, toggle } = useWishlist()
  const mounted = useMounted()

  const discountPct =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(100 - (product.price / product.compareAtPrice) * 100)
      : null

  const saved = mounted && isSaved(product.id)

  return (
    <div className="shop-card">
      <div className="shop-card__image">
        <a href={`/shop/${product.slug}`}>{product.image && <img src={product.image} alt={product.name} />}</a>
        {product.inStock === false ? (
          <span className="shop-card__badge shop-card__badge--out">สินค้าหมด</span>
        ) : (
          discountPct && <span className="shop-card__badge">-{discountPct}%</span>
        )}
        <button
          type="button"
          className={`shop-card__heart ${saved ? 'is-active' : ''}`}
          aria-label={saved ? 'เอาออกจากรายการโปรด' : 'เพิ่มในรายการโปรด'}
          onClick={() =>
            toggle({
              productId: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: product.image,
            })
          }
        >
          <HeartIcon filled={saved} />
        </button>
      </div>
      <a href={`/shop/${product.slug}`}>
        <p className="shop-card__name">{product.name}</p>
      </a>
      {product.sku && <p className="shop-card__sku">{product.sku}</p>}
      {typeof product.rating === 'number' && <Stars rating={product.rating} />}
      <div className="shop-card__price">
        {product.compareAtPrice && <s>฿{formatPrice(product.compareAtPrice)}</s>}
        <span className={product.compareAtPrice ? 'is-discounted' : ''}>฿{formatPrice(product.price)}</span>
      </div>
      <button
        type="button"
        className="shop-card__add"
        disabled={product.inStock === false}
        onClick={() =>
          addItem({
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.image,
          })
        }
      >
        {product.inStock === false ? 'สินค้าหมด' : 'หยิบใส่ตะกร้า'}
      </button>
    </div>
  )
}

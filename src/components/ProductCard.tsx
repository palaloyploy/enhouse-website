'use client'

import React from 'react'
import { useCart } from '@/lib/cart-context'

export type ProductSummary = {
  id: string
  slug: string
  name: string
  price: number
  compareAtPrice?: number | null
  image?: string | null
  inStock?: boolean
  sku?: string | null
}

function formatPrice(price: number) {
  return price.toLocaleString('th-TH')
}

export function ProductCard({ product }: { product: ProductSummary }) {
  const { addItem } = useCart()

  return (
    <div className="product-card">
      <a href={`/shop/${product.slug}`} className="product-card__image">
        {product.image && <img src={product.image} alt={product.name} />}
      </a>
      <div className="product-card__body">
        <a href={`/shop/${product.slug}`}>
          <h3 className="product-card__name">{product.name}</h3>
        </a>
        <div style={{ marginBottom: 14 }}>
          {product.compareAtPrice && (
            <span className="product-card__price-compare">฿{formatPrice(product.compareAtPrice)}</span>
          )}
          <span className="product-card__price">฿{formatPrice(product.price)}</span>
        </div>
        {product.inStock === false ? (
          <button className="btn btn-outline" disabled style={{ width: '100%', justifyContent: 'center' }}>
            สินค้าหมด
          </button>
        ) : (
          <button
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
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
            เพิ่มลงตะกร้า
          </button>
        )}
      </div>
    </div>
  )
}

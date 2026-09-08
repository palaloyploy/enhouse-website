'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart-context'
import type { ProductSummary } from '@/components/ProductCard'

function formatPrice(price: number) {
  return price.toLocaleString('th-TH')
}

export function ProductDetail({ product }: { product: ProductSummary }) {
  const { addItem } = useCart()
  const router = useRouter()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const outOfStock = product.inStock === false

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        {product.compareAtPrice && (
          <span className="product-card__price-compare" style={{ fontSize: 18 }}>
            ฿{formatPrice(product.compareAtPrice)}
          </span>
        )}
        <span className="product-card__price" style={{ fontSize: 26 }}>
          ฿{formatPrice(product.price)}
        </span>
      </div>

      {outOfStock ? (
        <p style={{ color: '#d92d20', fontWeight: 700 }}>สินค้าหมดชั่วคราว</p>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div className="qty-control">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)}>
                +
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              className="btn btn-outline"
              onClick={() => {
                addItem(
                  {
                    productId: product.id,
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                  },
                  qty,
                )
                setAdded(true)
              }}
            >
              เพิ่มลงตะกร้า
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                addItem(
                  {
                    productId: product.id,
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                  },
                  qty,
                )
                router.push('/cart')
              }}
            >
              สั่งซื้อทันที
            </button>
          </div>
          {added && <p style={{ color: 'var(--color-accent)', marginTop: 12 }}>เพิ่มลงตะกร้าแล้ว</p>}
        </>
      )}
    </div>
  )
}

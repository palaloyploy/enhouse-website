'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useCart } from '@/lib/cart-context'
import { useWishlist } from '@/lib/wishlist-context'
import { useMounted } from '@/lib/use-mounted'

type CategoryLink = { name: string; slug: string }

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 20.5s-7.5-4.6-9.8-9.1C.6 8 2 4.5 5.4 3.6c2-.5 3.9.3 5 1.9a5.2 5.2 0 0 1 1.6-1.9c1.1-1.6 3-2.4 5-1.9 3.4.9 4.8 4.4 3.2 7.8-2.3 4.5-9.8 9.1-9.8 9.1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-2.2 4.4A1 1 0 0 0 5.7 19H17M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" />
      <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function ShopNavbar({
  siteName,
  categories,
  hasSale,
}: {
  siteName: string
  categories: CategoryLink[]
  hasSale: boolean
}) {
  const { count: cartCount } = useCart()
  const { count: wishlistCount } = useWishlist()
  const mounted = useMounted()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || undefined
  const isSaleActive = searchParams.get('sale') === '1'
  const searchQuery = searchParams.get('q') || ''

  return (
    <div className="shopland shop-navbar">
      <div className="shop-navbar__top">
        <form action="/shop" method="get" className="shop-navbar__search">
          <SearchIcon />
          <input type="text" name="q" placeholder="ค้นหาสินค้า..." defaultValue={searchQuery} />
        </form>

        <a href="/shop" className="shop-navbar__logo">
          {siteName}
        </a>

        <div className="shop-navbar__icons">
          <a href="/shop/wishlist" aria-label="รายการโปรด" className="shop-navbar__icon">
            <HeartIcon />
            {mounted && wishlistCount > 0 && <span className="shop-navbar__badge">{wishlistCount}</span>}
          </a>
          <a href="/cart" aria-label="ตะกร้าสินค้า" className="shop-navbar__icon">
            <CartIcon />
            {mounted && cartCount > 0 && <span className="shop-navbar__badge">{cartCount}</span>}
          </a>
        </div>
      </div>

      <nav className="shop-navbar__categories">
        <a href="/shop" className={!activeCategory ? 'is-active' : ''}>
          ทั้งหมด
        </a>
        {categories.map((cat) => (
          <a key={cat.slug} href={`/shop?category=${cat.slug}`} className={activeCategory === cat.slug ? 'is-active' : ''}>
            {cat.name}
          </a>
        ))}
        {hasSale && (
          <a href="/shop?sale=1" className={`shop-navbar__sale ${isSaleActive ? 'is-active' : ''}`}>
            ลดราคา
          </a>
        )}
      </nav>
    </div>
  )
}

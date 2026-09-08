'use client'

import React, { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import { useMounted } from '@/lib/use-mounted'

type NavLink = { label: string; url: string }

function CartIcon() {
  const { count } = useCart()
  const mounted = useMounted()
  return (
    <a href="/cart" className="site-header__cart" aria-label="ตะกร้าสินค้า">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-2.2 4.4A1 1 0 0 0 5.7 19H17M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {mounted && count > 0 && <span className="site-header__cart-badge">{count}</span>}
    </a>
  )
}

export function Header({ siteName, navLinks }: { siteName: string; navLinks: NavLink[] }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a href="/" className="site-header__logo">
          {siteName}
        </a>

        <nav className={`site-header__nav ${open ? 'is-open' : ''}`}>
          {navLinks.map((link) => (
            <a key={link.url} href={link.url} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CartIcon />
          <button
            type="button"
            className="site-header__toggle"
            aria-label="เปิด/ปิดเมนู"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}

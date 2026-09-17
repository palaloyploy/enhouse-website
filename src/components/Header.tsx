'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useCart } from '@/lib/cart-context'
import { useMounted } from '@/lib/use-mounted'
import { sanitizeHex } from '@/lib/theme'

type NavLink = { label: string; url: string; color?: string | null }

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

export function SiteLogo({ siteName, logoUrl }: { siteName: string; logoUrl?: string | null }) {
  const dotIndex = siteName.indexOf('.')
  const name = dotIndex >= 0 ? siteName.slice(0, dotIndex) : siteName
  const tld = dotIndex >= 0 ? siteName.slice(dotIndex) : ''

  if (logoUrl) {
    return (
      <a href="/" className="site-logo site-logo--image">
        <img src={logoUrl} alt={siteName} />
      </a>
    )
  }

  return (
    <a href="/" className="site-logo">
      <span className="site-logo__name">{name}</span>
      <span className="site-logo__second-line">
        {tld && <span className="site-logo__tld">{tld}</span>}
        <span className="site-logo__mark" aria-hidden="true">
          <span />
          <span />
        </span>
      </span>
    </a>
  )
}

export function Header({
  siteName,
  navLinks,
  logoUrl,
  headerCta,
}: {
  siteName: string
  navLinks: NavLink[]
  logoUrl?: string | null
  headerCta?: { label?: string | null; url?: string | null; bgColor?: string | null; textColor?: string | null } | null
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const ctaBgColor = sanitizeHex(headerCta?.bgColor)
  const ctaTextColor = sanitizeHex(headerCta?.textColor)

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <SiteLogo siteName={siteName} logoUrl={logoUrl} />

        <nav className={`site-header__nav ${open ? 'is-open' : ''}`}>
          {navLinks.map((link) => {
            const isActive = link.url === '/' ? pathname === '/' : pathname?.startsWith(link.url)
            const color = sanitizeHex(link.color)
            return (
              <a
                key={link.url}
                href={link.url}
                className={isActive ? 'is-active' : ''}
                style={color ? { color } : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            )
          })}
          {headerCta?.label && headerCta?.url && (
            <a
              href={headerCta.url}
              className="site-header__nav-cta"
              style={{
                ...(ctaBgColor ? { background: ctaBgColor } : {}),
                ...(ctaTextColor ? { color: ctaTextColor } : {}),
              }}
              onClick={() => setOpen(false)}
            >
              {headerCta.label}
            </a>
          )}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CartIcon />
          <button
            type="button"
            className={`site-header__toggle ${open ? 'is-open' : ''}`}
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

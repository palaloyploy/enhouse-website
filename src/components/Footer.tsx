import React from 'react'

type NavLink = { label: string; url: string }

export function Footer({
  siteName,
  navLinks,
  companyName,
  address,
  phone,
  lineUrl,
  email,
}: {
  siteName: string
  navLinks: NavLink[]
  companyName?: string | null
  address?: string | null
  phone?: string | null
  lineUrl?: string | null
  email?: string | null
}) {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <div className="site-header__logo" style={{ color: '#fff' }}>
            {siteName}
          </div>
          {companyName && <p style={{ margin: '12px 0 4px' }}>{companyName}</p>}
          {address && <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{address}</p>}
        </div>

        <div>
          <p className="site-footer__heading">เมนู</p>
          <div style={{ display: 'grid', gap: 8 }}>
            {navLinks.map((link) => (
              <a key={link.url} href={link.url}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="site-footer__heading">ติดต่อเรา</p>
          <div style={{ display: 'grid', gap: 8 }}>
            {phone && <a href={`tel:${phone}`}>{phone}</a>}
            {email && <a href={`mailto:${email}`}>{email}</a>}
            {lineUrl && (
              <a href={lineUrl} target="_blank" rel="noreferrer">
                แอดไลน์ทีมงาน
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <p className="site-footer__copyright">
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

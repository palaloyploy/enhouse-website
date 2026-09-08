import React from 'react'

type NavLink = { label: string; url: string }

const FOOTER_NAV: NavLink[] = [
  { label: 'หน้าหลัก', url: '/' },
  { label: 'เกี่ยวกับเรา', url: '/about' },
]

export function Footer({
  footerServices,
  footerPortfolio,
}: {
  siteName: string
  navLinks: NavLink[]
  logoUrl?: string | null
  footerServices?: NavLink[] | null
  footerPortfolio?: NavLink[] | null
}) {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <p className="site-footer__heading">Enhouse</p>
          <div className="site-footer__links">
            {FOOTER_NAV.map((link) => (
              <a key={link.url} href={link.url}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="site-footer__heading">บริการ</p>
          <div className="site-footer__links">
            {(footerServices || []).map((link) => (
              <a key={link.url} href={link.url}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="site-footer__heading">ผลงาน</p>
          <div className="site-footer__links">
            {(footerPortfolio || []).map((link) => (
              <a key={link.url} href={link.url}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="site-footer__divider">
          <div className="site-footer__mark" aria-hidden="true">
            <span />
            <span />
          </div>
        </div>
        <div className="site-footer__bottom">
          <p className="site-footer__copyright">
            Copyright © {new Date().getFullYear()} Enhouse Co., Ltd. All rights reserved.
          </p>
          <div className="site-footer__legal">
            <a href="#">นโยบายความเป็นส่วนตัว</a>
            <a href="#">ข้อกำหนดในการให้บริการ</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

import React from 'react'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getSiteSettings } from '@/lib/site-settings'

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const { settings, siteName, navLinks } = await getSiteSettings()

  return (
    <>
      <Header siteName={siteName} navLinks={navLinks} />
      <main>{children}</main>
      <Footer
        siteName={siteName}
        navLinks={navLinks}
        companyName={settings?.contact?.companyName}
        address={settings?.contact?.address}
        phone={settings?.contact?.phone}
        lineUrl={settings?.contact?.lineUrl}
        email={settings?.contact?.email}
      />
    </>
  )
}

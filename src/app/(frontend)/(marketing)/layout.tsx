import React from 'react'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ScrollReveal } from '@/components/ScrollReveal'
import { CardTilt } from '@/components/CardTilt'
import { getSiteSettings } from '@/lib/site-settings'

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const { settings, siteName, navLinks, logoUrl } = await getSiteSettings()

  return (
    <>
      <ScrollReveal />
      <CardTilt />
      <Header siteName={siteName} navLinks={navLinks} logoUrl={logoUrl} />
      <main>{children}</main>
      <Footer
        siteName={siteName}
        navLinks={navLinks}
        logoUrl={logoUrl}
        footerServices={settings?.footerServices}
        footerPortfolio={settings?.footerPortfolio}
      />
    </>
  )
}

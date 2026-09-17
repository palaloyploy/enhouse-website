import { getPayload } from 'payload'
import config from '@/payload.config'

export type NavLink = { label: string; url: string; color?: string | null }

const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: 'หน้าแรก', url: '/' },
  { label: 'ร้านค้า', url: '/shop' },
  { label: 'เกี่ยวกับเรา', url: '/about' },
  { label: 'บริการของเรา', url: '/services' },
  { label: 'ติดต่อเรา', url: '/contact' },
]

export async function getSiteSettings() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const settings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)

  const siteName = settings?.siteName || 'enhouse.digital'
  const navLinks: NavLink[] =
    settings?.navLinks && settings.navLinks.length > 0 ? (settings.navLinks as NavLink[]) : DEFAULT_NAV_LINKS
  const logo = settings?.logo
  const logoUrl = logo && typeof logo === 'object' ? (logo as { url?: string }).url || null : null

  return { settings, siteName, navLinks, logoUrl }
}

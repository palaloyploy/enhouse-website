import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { LeadForm } from '@/components/LeadForm'
import { BookingCalendar } from '@/components/BookingCalendar'
import { CountUp } from '@/components/CountUp'
import { ProductCard, type ProductSummary } from '@/components/ProductCard'
import { PhoneCarousel } from '@/components/PhoneCarousel'
import { getSiteSettings } from '@/lib/site-settings'

type MediaDoc = {
  url?: string | null
  alt?: string | null
}

type ImageRef = MediaDoc | string | null | undefined

type GalleryItem = {
  image?: ImageRef
  caption?: string | null
}

type LogoItem = {
  logo?: ImageRef
  url?: string | null
}

type PointItem = { text?: string | null }

type FeatureGridItem = {
  icon?: ImageRef
  title?: string | null
  description?: string | null
  points?: PointItem[] | null
}

type ImageItem = { image?: ImageRef }

type StepItem = {
  number?: string | null
  title?: string | null
  description?: string | null
}

type TimelineItem = {
  year?: string | null
  title?: string | null
  description?: string | null
}

type CaseStudyItem = {
  title?: string | null
  description?: string | null
  points?: PointItem[] | null
  footnote?: string | null
  images?: ImageItem[] | null
  linkLabel?: string | null
  linkUrl?: string | null
}

type FaqItem = { question?: string | null; answer?: string | null }

type PlatformRef = { label?: string | null; icon?: ImageRef }

type ChecklistGroup = { label?: string | null; points?: PointItem[] | null }

type PricingPackage = {
  name?: string | null
  subtitle?: string | null
  priceNote?: string | null
  audienceLine?: string | null
  platforms?: PlatformRef[] | null
  features?: PointItem[] | null
  groups?: ChecklistGroup[] | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  highlighted?: boolean | null
}

type FunnelTimelineItem = {
  label?: string | null
  text?: string | null
  color?: 'green' | 'orange' | 'red' | null
}

type FunnelRow = {
  platforms?: PlatformRef[] | null
  label?: string | null
  mockCount?: number | null
}

type FunnelColumn = {
  theme?: 'blue' | 'purple' | 'pink' | null
  rows?: FunnelRow[] | null
}

type ServiceOption = { label?: string | null }

type Block = {
  blockType: string
  heading?: string | null
  subheading?: string | null
  text?: string | null
  image?: ImageRef
  ctaLabel?: string | null
  ctaUrl?: string | null
  images?: GalleryItem[] | ImageItem[] | null
  overlayColor?: 'dark' | 'gold' | null

  // hero
  tag?: string | null
  highlightText?: string | null
  quote?: string | null
  layout?: 'centered' | 'split' | 'single' | 'collage' | null
  visualStyle?: 'photo' | 'brandMark' | null
  imageStyle?: 'rounded' | 'circle' | null
  primaryCtaLabel?: string | null
  primaryCtaUrl?: string | null
  secondaryCtaLabel?: string | null
  secondaryCtaUrl?: string | null

  // imageBanner (collage)
  collageImages?: ImageItem[] | null

  // dualDiagram
  leftLabel?: string | null
  leftImage?: ImageRef
  rightLabel?: string | null
  rightImage?: ImageRef

  // logoStrip
  logos?: LogoItem[] | null

  // iconFeatureGrid
  columns?: '2' | '3' | '4' | null
  items?: FeatureGridItem[] | null
  footnote?: string | null
  sideImages?: ImageItem[] | null

  // featureShowcase
  eyebrow?: string | null
  points?: PointItem[] | null

  // processSteps
  steps?: StepItem[] | null
  variant?: 'cards' | 'compact' | null

  // bookingPromo
  freeSlotsLabel?: string | null
  totalSlots?: number | null
  bookedSlots?: number | null
  rightTitle?: string | null
  rightDescription?: string | null
  features?: { title?: string | null; description?: string | null }[] | null
  originalPrice?: string | null
  badgeText?: string | null

  // leadFormSection
  serviceOptions?: ServiceOption[] | null
  businessListHeading?: string | null
  businessTypes?: { title?: string | null; points?: PointItem[] | null }[] | null
  serviceLabel?: string | null

  // timeline / caseStudyList
  // (uses items above, reused loosely per-block)

  // faq
  // (uses items above, reused loosely per-block)

  // ctaBanner
  theme?: 'gold' | 'dark' | null
  size?: 'full' | 'compact' | null

  // pricingPackages
  packages?: PricingPackage[] | null
  additionalNote?: {
    heading?: string | null
    highlight?: string | null
    badge?: string | null
    text?: string | null
    subtext?: string | null
    points?: PointItem[] | null
    ctaLabel?: string | null
    ctaUrl?: string | null
  } | null

  // exampleFunnelDiagram
  timeline?: FunnelTimelineItem[] | null
  funnelColumns?: FunnelColumn[] | null

  // workScopeGrid
  phoneCount?: number | null

  // diagramImage / adsPortfolioGrid
  caption?: string | null

  // productGrid
  mode?: 'featured' | 'all' | 'selected' | null
  limit?: number | null
  products?: (string | { id: string })[] | null

  // symptomChecklist
  promoHeading?: string | null
  promoHighlight?: string | null
  promoText?: string | null
  checklistHeading?: string | null
  checklistHighlight?: string | null
  thresholdText?: string | null
  thresholdCta?: string | null

  // layerCaseStudy
  number?: string | null
  exampleLabel?: string | null
  exampleText?: string | null
  situation?: LayerCaseGroup | null
  whatWeDid?: LayerCaseGroup | null
  whatWeFound?: LayerCaseGroup | null
  result?: LayerCaseGroup | null
  comparisonGroups?: ComparisonGroup[] | null

  // capabilityGrid
  subheadingText?: string | null
  subheadingHighlight?: string | null

  // insightActionPanel
  flowSteps?: { label?: string | null }[] | null
  insightHeading?: string | null
  insightItems?: { title?: string | null; description?: string | null }[] | null
  actionHeading?: string | null
  actionPoints?: PointItem[] | null
  workingHeading?: string | null
  workingPoints?: PointItem[] | null
  summaryHeading?: string | null
  summaryText?: string | null
  nextActionHeading?: string | null
  nextActionItems?: { tag?: string | null; text?: string | null }[] | null

  // businessCareLoop
  centerIcon?: ImageRef
  centerLabel?: string | null
  centerDescription?: string | null
  painPointsIcon?: ImageRef
  painPointsHeading?: string | null
  painPoints?:
    | {
        icons?: { icon?: ImageRef; label?: string | null }[] | null
        title?: string | null
        description?: string | null
      }[]
    | null
  behaviorIcon?: ImageRef
  behaviorLabel?: string | null
  behaviorDescription?: string | null
  solutionsIcon?: ImageRef
  solutionsHeading?: string | null
  solutionsItems?: { icon?: ImageRef; title?: string | null; description?: string | null }[] | null
  impactIcon?: ImageRef
  impactHeading?: string | null
  impactItems?: PointItem[] | null
}

type LayerCaseGroup = {
  heading?: string | null
  points?: PointItem[] | null
}

type ComparisonTag = 'gold' | 'blue' | 'green' | 'red'

type ComparisonItem = { text?: string | null; tag?: ComparisonTag | null }

type ComparisonGroup = {
  label?: string | null
  items?: ComparisonItem[] | null
}

type CapabilityItem = {
  platforms?: { label?: string | null; icon?: ImageRef }[] | null
  title?: string | null
  description?: string | null
  points?: PointItem[] | null
}

function resolveImage(image: ImageRef) {
  if (!image || typeof image === 'string') return null
  return image
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function highlightText(text: string, phrases: string[]): React.ReactNode {
  let parts: React.ReactNode[] = [text]

  phrases.forEach((phrase, phraseIdx) => {
    const next: React.ReactNode[] = []
    parts.forEach((part) => {
      if (typeof part !== 'string') {
        next.push(part)
        return
      }
      const segments = part.split(phrase)
      segments.forEach((segment, idx) => {
        if (idx > 0) {
          next.push(
            <span key={`hl-${phraseIdx}-${idx}-${segment.slice(0, 4)}`} style={{ color: 'var(--color-accent)' }}>
              {phrase}
            </span>,
          )
        }
        if (segment) next.push(segment)
      })
    })
    parts = next
  })

  return <>{parts}</>
}

function renderBoldText(text: string): React.ReactNode {
  const segments = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {segments.map((seg, idx) => {
        const match = seg.match(/^\*\*([^*]+)\*\*$/)
        return match ? <strong key={idx}>{match[1]}</strong> : <React.Fragment key={idx}>{seg}</React.Fragment>
      })}
    </>
  )
}

function CtaButton({
  label,
  url,
  variant = 'primary',
}: {
  label?: string | null
  url?: string | null
  variant?: 'primary' | 'secondary' | 'outline' | 'light'
}) {
  if (!label || !url) return null
  return (
    <a href={url} className={`btn btn-${variant}`}>
      {label}
      <ArrowIcon />
    </a>
  )
}

function DatabaseIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="8" ry="3" stroke="var(--color-accent)" strokeWidth="1.6" />
      <path
        d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"
        stroke="var(--color-accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function StorefrontIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 9l1.2-4.5A1 1 0 0 1 6.16 4h11.68a1 1 0 0 1 .96.75L20 9" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 9a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 9.5V19a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M9.5 20v-4a1.5 1.5 0 0 1 1.5-1.5h2a1.5 1.5 0 0 1 1.5 1.5v4" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4 3 20h18L12 4Z" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 10v4" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="17" r="0.9" fill="var(--color-accent)" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="var(--color-accent)" strokeWidth="1.6" />
      <path d="M8 12.5l2.5 2.5L16 9.5" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TrendingUpIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 16l6-6 4 4 8-9" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 5h6v6" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function needsColorChip(label: string): boolean {
  const key = label.trim().toLowerCase()
  return key.includes('instagram') || key.includes('line')
}

function needsNeutralChip(label: string): boolean {
  const key = label.trim().toLowerCase()
  return key.includes('google ads') || key.includes('google analytics') || key.includes('meta business') || key.includes('google my business') || key.includes('store')
}

function renderSingleCapabilityIcon(platform: { label?: string | null; icon?: ImageRef }): React.ReactNode {
  const label = platform.label || ''
  const iconImg = resolveImage(platform.icon)
  if (iconImg?.url) {
    return <img src={iconImg.url} alt={label} width={40} height={40} />
  }
  if (label.toLowerCase().includes('database')) {
    return <DatabaseIcon size={40} />
  }
  const badge = getPlatformBadge(label)
  return (
    <span className="platform-icon" style={{ background: badge.bg }}>
      {badge.content}
    </span>
  )
}

function CareLoopConnector({ x, y, dx, dy }: { x: number; y: number; dx: number; dy: number }) {
  const length = Math.sqrt(dx * dx + dy * dy)
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI
  return (
    <div
      className="care-loop-connector"
      style={{
        left: x,
        top: y,
        width: length,
        transform: `rotate(${angle}deg)`,
      }}
      aria-hidden="true"
    />
  )
}

function getPlatformBadge(label: string): { bg: string; content: React.ReactNode } {
  const key = label.trim().toLowerCase()
  if (key.includes('google ads')) return { bg: '#4285f4', content: 'G' }
  if (key.includes('meta business')) return { bg: '#0081fb', content: 'M' }
  if (key.includes('facebook')) return { bg: '#1877f2', content: 'f' }
  if (key.includes('instagram')) return { bg: 'linear-gradient(135deg,#f58529,#dd2a7b,#8134af)', content: 'IG' }
  if (key.includes('tiktok')) return { bg: '#000000', content: '♪' }
  if (key.includes('line')) return { bg: '#06c755', content: 'L' }
  if (key.includes('google analytics') || key === 'ga4') return { bg: '#f9ab00', content: 'GA' }
  if (key.includes('shopee')) return { bg: '#ee4d2d', content: 'SP' }
  if (key.includes('lazada')) return { bg: '#0f146d', content: 'LZ' }
  if (key.includes('messenger')) return { bg: '#0084ff', content: 'M' }
  if (key.includes('whatsapp')) return { bg: '#25d366', content: 'WA' }
  if (key.includes('google map')) return { bg: '#34a853', content: 'GM' }
  if (key.includes('google search') || key.includes('search console')) return { bg: '#4285f4', content: 'GS' }
  if (key.includes('youtube')) return { bg: '#ff0000', content: '▶' }
  return { bg: 'var(--color-accent)', content: label.slice(0, 2).toUpperCase() }
}

function needsIconChip(label: string): boolean {
  const key = label.trim().toLowerCase()
  return key.includes('line') || key.includes('youtube') || key.includes('instagram')
}

function PlatformIcon({ label, icon, size = 20 }: { label: string; icon?: ImageRef; size?: number }) {
  const iconImg = resolveImage(icon)
  if (iconImg?.url) {
    if (needsIconChip(label)) {
      const badge = getPlatformBadge(label)
      return (
        <span
          className="platform-icon-chip"
          style={{ background: badge.bg, width: size, height: size }}
          title={label}
        >
          <img src={iconImg.url} alt={label} style={{ width: size * 0.58, height: size * 0.58 }} />
        </span>
      )
    }
    return <img src={iconImg.url} alt={label} title={label} style={{ height: size, width: 'auto', maxWidth: size * 1.6 }} />
  }
  const key = label.trim().toLowerCase()
  if (key.includes('facebook')) return <FacebookIcon />
  if (key.includes('instagram')) return <InstagramIcon />
  if (key.includes('tiktok')) return <TikTokIcon />
  if (key.includes('line')) return <LineIcon />
  if (key.includes('youtube')) return <YoutubeIcon />
  if (key.includes('database')) return <DatabaseIcon size={size} />
  if (key.includes('store') || key.includes('shop') || key.includes('market')) return <StorefrontIcon />
  const badge = getPlatformBadge(label)
  return (
    <span
      className="platform-icon"
      style={{ background: badge.bg, width: size, height: size, fontSize: size * 0.42 }}
      title={label}
    >
      {badge.content}
    </span>
  )
}

function BoxIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5 19.5 7.5V16.5L12 20.5L4.5 16.5V7.5L12 3.5Z"
        stroke="var(--color-accent)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M4.8 7.7 12 11.5 19.2 7.7M12 11.5V20.3" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

function PhoneMock() {
  return (
    <div className="phone-mock" aria-hidden="true">
      <div className="phone-mock__notch" />
    </div>
  )
}

function LoopIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3a9 9 0 1 0 9 9"
        stroke="var(--color-accent)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M12 3v7l5.5-3.2L12 3Z" fill="var(--color-accent)" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 3h3l1.5 4.5-2 1.5a12 12 0 0 0 6 6l1.5-2 4.5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LineIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#06C755" />
      <path
        d="M18.4 11.1c0-2.9-2.9-5.3-6.4-5.3s-6.4 2.4-6.4 5.3c0 2.6 2.3 4.8 5.4 5.2.2 0 .5.2.6.4.1.2 0 .4 0 .6l-.1.6c0 .2-.1.6.5.3.6-.3 3.1-1.8 4.2-3.1 1.4-1.2 2.2-2.6 2.2-4z"
        fill="#fff"
      />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#1877F2" />
      <path
        d="M15.1 8.3h-1.4c-.4 0-.7.4-.7.9v1.4h2.1l-.3 2.1h-1.8V19h-2.4v-6.3H9V10.6h1.6V9c0-1.6 1-2.9 2.6-2.9h1.9v2.2Z"
        fill="#fff"
      />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#E1306C" />
      <rect x="6" y="6" width="12" height="12" rx="4" stroke="#fff" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" stroke="#fff" strokeWidth="1.5" />
      <circle cx="16" cy="8" r="0.9" fill="#fff" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#111" />
      <path
        d="M14.5 6c.3 1.4 1.2 2.3 2.7 2.5v2c-.9 0-1.8-.3-2.6-.8v4.4a3.6 3.6 0 1 1-3.6-3.6c.2 0 .4 0 .6.1v2.1a1.6 1.6 0 1 0 1.2 1.5V6h1.7Z"
        fill="#fff"
      />
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#FF0000" />
      <path d="M10 8.5v7l6-3.5-6-3.5Z" fill="#fff" />
    </svg>
  )
}

function HeroBrandMark({ logoUrl }: { logoUrl?: string | null }) {
  if (logoUrl) {
    return (
      <div className="hero-split__visual">
        <img src={logoUrl} alt="" className="hero-split__logo-image" />
      </div>
    )
  }

  return (
    <div className="hero-split__visual">
      <div className="hero-split__wordmark">
        <div className="hero-split__wordmark-name">enhouse</div>
        <div className="hero-split__wordmark-tld">.digital</div>
      </div>
    </div>
  )
}

function resolveProductImage(image: unknown) {
  if (!image || typeof image === 'string') return null
  return (image as { url?: string }).url || null
}

async function fetchGridProducts(block: Block): Promise<ProductSummary[]> {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  if (block.mode === 'selected') {
    const ids = (block.products || []).map((p) => (typeof p === 'string' ? p : p.id)).filter(Boolean)
    if (ids.length === 0) return []
    const result = await payload.find({
      collection: 'products',
      where: { id: { in: ids } },
      limit: ids.length,
    })
    return result.docs.map((doc: any) => ({
      id: String(doc.id),
      slug: doc.slug,
      name: doc.name,
      price: doc.price,
      compareAtPrice: doc.compareAtPrice,
      image: resolveProductImage(doc.images?.[0]?.image),
      inStock: doc.inStock,
    }))
  }

  const result = await payload.find({
    collection: 'products',
    where: block.mode === 'featured' ? { featured: { equals: true } } : undefined,
    limit: block.limit || 4,
    sort: '-createdAt',
  })

  return result.docs.map((doc: any) => ({
    id: String(doc.id),
    slug: doc.slug,
    name: doc.name,
    price: doc.price,
    compareAtPrice: doc.compareAtPrice,
    image: resolveProductImage(doc.images?.[0]?.image),
    inStock: doc.inStock,
  }))
}

export async function RenderBlocks({ blocks }: { blocks?: Block[] | null }) {
  if (!blocks?.length) return null

  const needsSiteSettings = blocks.some((b) => b.blockType === 'contactInfo')
  const { settings: siteSettings } = needsSiteSettings ? await getSiteSettings() : { settings: null }

  const rendered = await Promise.all(
    blocks.map(async (block, i) => {
        const img = resolveImage(block.image)

        switch (block.blockType) {
          case 'imageLeftTextRight':
            return (
              <section key={i} className="section">
                <div
                  className="container"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: img?.url ? '1fr 1fr' : '1fr',
                    gap: '3.5rem',
                    alignItems: 'center',
                  }}
                >
                  {img?.url && (
                    <div className="card-image">
                      <img src={img.url} alt={img.alt || ''} style={{ aspectRatio: '4 / 3', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div>
                    <h2>{block.heading}</h2>
                    {block.text && <p style={{ fontSize: 18, maxWidth: 480 }}>{block.text}</p>}
                    <CtaButton label={block.ctaLabel} url={block.ctaUrl} />
                  </div>
                </div>
              </section>
            )

          case 'imageTopTextBottom':
            return (
              <section key={i} className="section">
                <div className="container" style={{ maxWidth: 720, textAlign: 'center' }}>
                  {img?.url && (
                    <div className="card-image" style={{ marginBottom: '2.5rem' }}>
                      <img src={img.url} alt={img.alt || ''} style={{ aspectRatio: '16 / 9', objectFit: 'cover' }} />
                    </div>
                  )}
                  <h2>{block.heading}</h2>
                  {block.text && <p style={{ fontSize: 18 }}>{block.text}</p>}
                  <CtaButton label={block.ctaLabel} url={block.ctaUrl} />
                </div>
              </section>
            )

          case 'textOnly':
            return (
              <section key={i} className="section">
                <div className="container" style={{ maxWidth: 640, textAlign: 'center', margin: '0 auto' }}>
                  <h2>{block.heading}</h2>
                  {block.text && <p style={{ fontSize: 18, color: 'var(--color-muted)' }}>{block.text}</p>}
                </div>
              </section>
            )

          case 'imageGallery':
            return (
              <section key={i} className="section section--alt">
                <div className="container">
                  <div className="section-head">
                    <h2>{block.heading}</h2>
                    {block.text && <p style={{ fontSize: 18, color: 'var(--color-muted)' }}>{block.text}</p>}
                  </div>
                  <div className="grid grid-4">
                    {(block.images as GalleryItem[] | null)?.map((item, j) => {
                      const galleryImg = resolveImage(item.image)
                      if (!galleryImg?.url) return null
                      return (
                        <figure key={j} style={{ margin: 0 }}>
                          <div className="card-image">
                            <img
                              src={galleryImg.url}
                              alt={galleryImg.alt || item.caption || ''}
                              style={{ aspectRatio: '1 / 1', objectFit: 'cover' }}
                            />
                          </div>
                          {item.caption && (
                            <figcaption
                              style={{
                                fontSize: 15,
                                fontWeight: 700,
                                fontFamily: 'var(--font-heading), Manrope, sans-serif',
                                color: 'var(--color-ink)',
                                marginTop: 12,
                              }}
                            >
                              {item.caption}
                            </figcaption>
                          )}
                        </figure>
                      )
                    })}
                  </div>
                </div>
              </section>
            )

          case 'imageBanner': {
            if (block.layout === 'collage') {
              const collage = (block.collageImages || []).slice(0, 6)
              return (
                <section key={i} className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <div className="photo-collage">
                    {collage.map((item, j) => {
                      const cImg = resolveImage(item.image)
                      if (!cImg?.url) return null
                      return (
                        <div key={j} className="photo-collage__cell">
                          <img src={cImg.url} alt={cImg.alt || ''} />
                        </div>
                      )
                    })}
                    <div className="photo-collage__card">
                      <h2>{block.heading}</h2>
                      {block.text && <p>{block.text}</p>}
                      <CtaButton label={block.ctaLabel} url={block.ctaUrl} />
                    </div>
                  </div>
                </section>
              )
            }

            const overlayBg =
              block.overlayColor === 'gold'
                ? 'linear-gradient(180deg, rgba(201,150,43,0.35) 0%, rgba(25,21,16,0.85) 100%)'
                : 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.75) 100%)'
            return (
              <section
                key={i}
                style={{
                  position: 'relative',
                  minHeight: 420,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  color: '#fff',
                  backgroundImage: img?.url ? `url(${img.url})` : undefined,
                  backgroundColor: img?.url ? undefined : 'var(--color-black)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, background: overlayBg }} />
                <div style={{ position: 'relative', maxWidth: 620, padding: '2rem' }}>
                  <span className="eyebrow" style={{ color: '#e3bd6b' }}>
                    Our Work
                  </span>
                  <h2 style={{ color: '#fff' }}>{block.heading}</h2>
                  {block.text && <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18 }}>{block.text}</p>}
                  <div style={{ marginTop: 8 }}>
                    <CtaButton label={block.ctaLabel} url={block.ctaUrl} />
                  </div>
                </div>
              </section>
            )
          }

          case 'hero': {
            const isCircle = block.imageStyle === 'circle'
            const highlightPhrases = block.highlightText
              ? block.highlightText.split(',').map((s) => s.trim()).filter(Boolean)
              : []
            const headingNode = highlightPhrases.length
              ? highlightText(block.heading || '', highlightPhrases)
              : block.heading

            if (block.layout === 'split') {
              const brandLogoUrl =
                block.visualStyle === 'brandMark' ? (await getSiteSettings()).logoUrl : null
              const isPhotoLeft = block.visualStyle === 'photo' && img?.url
              return (
                <section key={i} className="hero-split-wrap">
                  <div className={`hero-split${isPhotoLeft ? ' hero-split--photo-left' : ''}`}>
                    <div className="hero-split__content">
                      {block.eyebrow && <span className="eyebrow">{block.eyebrow}</span>}
                      {block.tag && <p className="hero-split__intro">{block.tag}</p>}
                      <h1>{headingNode}</h1>
                      {block.subheading && (
                        <p className="hero-split__subheading">{renderBoldText(block.subheading)}</p>
                      )}
                      <div className="hero-split__actions">
                        <CtaButton label={block.primaryCtaLabel} url={block.primaryCtaUrl} variant="primary" />
                        <CtaButton label={block.secondaryCtaLabel} url={block.secondaryCtaUrl} variant="secondary" />
                      </div>
                    </div>
                    {block.visualStyle === 'brandMark' ? (
                      <HeroBrandMark logoUrl={brandLogoUrl} />
                    ) : (
                      img?.url && (
                        <div className="hero-split__visual">
                          <div
                            style={{
                              width: '100%',
                              maxWidth: 480,
                              borderRadius: 24,
                              overflow: 'hidden',
                            }}
                          >
                            <img
                              src={img.url}
                              alt={img.alt || ''}
                              style={{ aspectRatio: '4 / 3', objectFit: 'cover', width: '100%' }}
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </section>
              )
            }

            return (
              <section key={i} className="section hero-split-wrap" style={{ paddingTop: 96 }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: 760 }}>
                  {block.eyebrow && <span className="eyebrow">{block.eyebrow}</span>}
                  {block.tag && <span className="tag">{block.tag}</span>}
                  <h1 style={{ marginTop: 20 }}>{headingNode}</h1>
                  {block.subheading && (
                    <p className="hero-centered-subheading" style={{ maxWidth: 560, margin: '0 auto 28px' }}>
                      {block.subheadingHighlight ? (
                        <span className="hero-gradient-text">{block.subheading}</span>
                      ) : (
                        block.subheading
                      )}
                    </p>
                  )}
                  {block.quote && (
                    <div className="hero-quote-box">
                      <p>{renderBoldText(block.quote)}</p>
                    </div>
                  )}
                  {img?.url && (
                    <div
                      style={{
                        margin: '0 auto 32px',
                        width: isCircle ? 220 : '100%',
                        maxWidth: isCircle ? 220 : 560,
                        borderRadius: isCircle ? '50%' : 24,
                        overflow: 'hidden',
                        border: isCircle ? '4px solid var(--color-accent)' : undefined,
                      }}
                    >
                      <img
                        src={img.url}
                        alt={img.alt || ''}
                        style={{ aspectRatio: isCircle ? '1 / 1' : '16 / 9', objectFit: 'cover', width: '100%' }}
                      />
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <CtaButton label={block.primaryCtaLabel} url={block.primaryCtaUrl} variant="primary" />
                    <CtaButton label={block.secondaryCtaLabel} url={block.secondaryCtaUrl} variant="secondary" />
                  </div>
                </div>
              </section>
            )
          }

          case 'logoStrip':
            return (
              <section key={i} className="section" style={{ paddingTop: 24, paddingBottom: 24 }}>
                <div className="container">
                  {block.heading && (
                    <p
                      style={{
                        textAlign: 'center',
                        fontWeight: 700,
                        fontSize: 36,
                        fontFamily: 'var(--font-heading), Manrope, sans-serif',
                        color: 'var(--color-ink)',
                        marginBottom: 24,
                      }}
                    >
                      {block.heading}
                    </p>
                  )}
                  <div className="logo-strip">
                    {block.logos?.map((item, j) => {
                      const logoImg = resolveImage(item.logo)
                      if (!logoImg?.url) return null
                      const logo = <img key={j} src={logoImg.url} alt={logoImg.alt || ''} />
                      return item.url ? (
                        <a key={j} href={item.url} target="_blank" rel="noreferrer">
                          {logo}
                        </a>
                      ) : (
                        logo
                      )
                    })}
                  </div>
                  <div className="logo-strip-marquee">
                    <div className="logo-strip-marquee__track">
                      {[0, 1].map((copy) =>
                        block.logos?.map((item, j) => {
                          const logoImg = resolveImage(item.logo)
                          if (!logoImg?.url) return null
                          return <img key={`${copy}-${j}`} src={logoImg.url} alt={copy === 0 ? logoImg.alt || '' : ''} aria-hidden={copy === 1} />
                        }),
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )

          case 'iconFeatureGrid': {
            const sideImages = ((block.sideImages as ImageItem[] | null) || [])
              .map((item) => resolveImage(item.image))
              .filter((img) => !!img?.url)

            if (sideImages.length > 0) {
              return (
                <section key={i} className="section section--alt">
                  <div className="container container--flush-mobile">
                    <div className="feature-showcase-grid has-image">
                      <div>
                        <h2 className="feature-showcase-grid__heading">{block.heading}</h2>
                        {block.subheading && (
                          <p style={{ fontSize: 18, color: 'var(--color-muted)' }}>{block.subheading}</p>
                        )}
                        <div style={{ display: 'grid', gap: 24, marginTop: 24 }}>
                          {block.items?.map((item, j) => (
                            <div key={j} className="lead-business-item">
                              <span className="lead-business-item__number">{j + 1}</span>
                              <div>
                                <strong>{item.title}</strong>
                                {item.description && <p style={{ fontSize: 15, marginBottom: 8 }}>{item.description}</p>}
                                {item.points && item.points.length > 0 && (
                                  <ul className="check-list">
                                    {item.points.map((p, k) => (
                                      <li key={k}>{p.text}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        {(block.footnote || (block.ctaLabel && block.ctaUrl)) && (
                          <div style={{ marginTop: 32 }}>
                            {block.footnote && (
                              <p style={{ fontWeight: 700, color: 'var(--color-ink)', marginBottom: 16 }}>
                                {block.footnote}
                              </p>
                            )}
                            <CtaButton label={block.ctaLabel} url={block.ctaUrl} />
                          </div>
                        )}
                      </div>
                      <div className="icon-feature-collage">
                        {sideImages.slice(0, 3).map((img, j) =>
                          img?.url ? (
                            <div key={j} className={`icon-feature-collage__item icon-feature-collage__item--${j}`}>
                              <img src={img.url} alt={img.alt || ''} />
                            </div>
                          ) : null,
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              )
            }

            return (
              <section key={i} className="section section--alt">
                <div className="container">
                  <div className="section-head">
                    <h2>{block.heading}</h2>
                    {block.subheading && <p style={{ fontSize: 18, color: 'var(--color-muted)' }}>{block.subheading}</p>}
                  </div>
                  <div className={`grid grid-${block.columns || '3'}`}>
                    {block.items?.map((item, j) => {
                      const iconImg = resolveImage(item.icon)
                      return (
                        <div key={j} className="card">
                          {iconImg?.url && <img className="card-icon" src={iconImg.url} alt={iconImg.alt || ''} />}
                          <h3 style={{ fontSize: 20, marginBottom: 8 }}>{item.title}</h3>
                          {item.description && <p style={{ fontSize: 15 }}>{item.description}</p>}
                          {item.points && item.points.length > 0 && (
                            <ul className="check-list">
                              {item.points.map((p, k) => (
                                <li key={k}>{p.text}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  {(block.footnote || (block.ctaLabel && block.ctaUrl)) && (
                    <div style={{ textAlign: 'center', marginTop: 40 }}>
                      {block.footnote && (
                        <p style={{ fontWeight: 700, color: 'var(--color-ink)', marginBottom: 16 }}>
                          {block.footnote}
                        </p>
                      )}
                      <CtaButton label={block.ctaLabel} url={block.ctaUrl} />
                    </div>
                  )}
                </div>
              </section>
            )
          }

          case 'featureShowcase':
            return (
              <section key={i} className="section">
                <div className="container">
                  <div className="section-head">
                    {block.eyebrow && <span className="eyebrow">{block.eyebrow}</span>}
                    <h2>{block.heading}</h2>
                    {block.text && <p style={{ fontSize: 18 }}>{block.text}</p>}
                  </div>
                  <div className={`feature-showcase-grid${block.images?.length ? ' has-image' : ''}`}>
                    <div>
                      {block.points && block.points.length > 0 && (
                        <ul className="dot-list" style={{ margin: 0 }}>
                          {block.points.map((p, j) => (
                            <li key={j}>{p.text}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {block.images && block.images.length === 1 && (
                      <div className="feature-showcase-image-wrap">
                        {(() => {
                          const showcaseImg = resolveImage((block.images as ImageItem[])[0].image)
                          return showcaseImg?.url ? (
                            <img className="feature-showcase-image" src={showcaseImg.url} alt={showcaseImg.alt || ''} />
                          ) : null
                        })()}
                      </div>
                    )}
                    {block.images && block.images.length > 1 && (
                      <div className="feature-showcase-image-wrap">
                        <div className="showcase-phone-row">
                          {(block.images as ImageItem[]).map((item, j) => {
                            const showcaseImg = resolveImage(item.image)
                            if (!showcaseImg?.url) return null
                            return (
                              <div key={j} className="showcase-phone-slide">
                                <img src={showcaseImg.url} alt={showcaseImg.alt || ''} />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: 'center', marginTop: 40 }}>
                    <CtaButton label={block.ctaLabel} url={block.ctaUrl} />
                  </div>
                </div>
              </section>
            )

          case 'processSteps': {
            const psHeading = block.heading || ''
            const psHighlight = '3 Layer'
            const psHeadingNode = psHeading.includes(psHighlight) ? (
              <>
                {psHeading.split(psHighlight)[0]}
                <br className="mobile-only-break" />
                <span style={{ color: 'var(--color-accent)' }}>{psHighlight}</span>
                {psHeading.split(psHighlight)[1]}
              </>
            ) : (
              psHeading
            )
            return (
              <section key={i} className="section section--dark process-steps-section">
                <div className="container process-steps-container">
                  <div className="section-head">
                    <h2>{psHeadingNode}</h2>
                    {block.subheading && <p style={{ fontSize: 18 }}>{block.subheading}</p>}
                  </div>
                  {block.variant === 'compact' ? (
                    <div className="process-step-compact-row">
                      {block.steps?.map((step, j) => (
                        <div key={j} className="process-step-compact">
                          <span className="process-step-compact__number">{step.number}</span>
                          <span className="process-step-compact__title">{step.title}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-3">
                      {block.steps?.map((step, j) => (
                        <div key={j} className="process-step">
                          <div className="process-step-top">
                            <span className="process-step-number">{step.number}</span>
                            <span className="process-step-badge">
                              <span className="process-step-badge-dot" />
                              Layer {step.number}
                            </span>
                          </div>
                          <h3>{step.title}</h3>
                          {step.description && <p>{step.description}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                  {block.ctaLabel && block.ctaUrl && (
                    <div className="process-cta">
                      <CtaButton label={block.ctaLabel} url={block.ctaUrl} />
                    </div>
                  )}
                </div>
              </section>
            )
          }

          case 'exampleFunnelDiagram': {
            const timelineColor = (c?: string | null) =>
              c === 'orange' ? '#c9962b' : c === 'red' ? '#e5484d' : '#2f9e58'
            return (
              <section key={i} className="section funnel-diagram-section">
                <div className="container funnel-diagram-container">
                  <div className="funnel-example-box">
                    {block.exampleLabel && <p className="funnel-example-box__label">{block.exampleLabel}</p>}
                    {block.exampleText && <p className="funnel-example-box__text">{block.exampleText}</p>}
                    {block.timeline && block.timeline.length > 0 && (
                      <div className="funnel-timeline">
                        {block.timeline.map((t, j) => (
                          <p key={j} className="funnel-timeline__row">
                            <strong style={{ color: timelineColor(t.color) }}>{t.label}</strong> {t.text}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  {img?.url ? (
                    <div className="funnel-image-frame">
                      <img src={img.url} alt={img.alt || ''} />
                    </div>
                  ) : (
                  <div className="funnel-grid">
                    {block.funnelColumns?.map((col, j) => (
                      <div key={j} className={`funnel-column funnel-column--${col.theme || 'blue'}`}>
                        {col.rows?.map((row, k) => (
                          <div key={k} className="funnel-row">
                            <div className="funnel-row__head">
                              <div className="funnel-row__platforms">
                                {row.platforms?.map((p, m) => (
                                  <PlatformIcon key={m} label={p.label || ''} icon={p.icon} />
                                ))}
                              </div>
                              <span className="funnel-row__label">{row.label}</span>
                            </div>
                            {(row.mockCount || 0) > 0 && (
                              <div className="funnel-row__mocks">
                                {Array.from({ length: row.mockCount || 0 }).map((_, m) => (
                                  <div key={m} className="funnel-row__mock" />
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  )}
                </div>
              </section>
            )
          }

          case 'workScopeGrid': {
            const phoneCount = block.phoneCount || 9
            return (
              <section key={i} className="section section--dark work-scope-section">
                <div className="container work-scope-container">
                  <h2 className="work-scope-heading">{block.heading}</h2>
                  <div className="work-scope-grid">
                    <div className="work-scope-list">
                      {block.items?.map((item, j) => (
                        <div key={j} className="work-scope-card">
                          <h3>{item.title}</h3>
                          {item.points && item.points.length > 0 && (
                            <ul className="check-list">
                              {item.points.map((p, k) => (
                                <li key={k}>{p.text}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="work-scope-phones">
                      {Array.from({ length: phoneCount }).map((_, j) => (
                        <PhoneMock key={j} />
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )
          }

          case 'layerCaseStudy': {
            const renderPoints = (points?: PointItem[] | null) =>
              points && points.length > 0 ? (
                <ul className="check-list">
                  {points.map((p, k) => (
                    <li key={k}>{p.text}</li>
                  ))}
                </ul>
              ) : null

            return (
              <section key={i} className="section layer-case-section">
                <div className="container">
                  <div className="layer-case-header">
                    {block.number && <span className="layer-case-number">{block.number}</span>}
                    <h2>{block.heading}</h2>
                  </div>
                  {block.exampleText && (
                    <p className="layer-case-example">
                      {block.exampleLabel && <strong>{block.exampleLabel} </strong>}
                      {block.exampleText}
                    </p>
                  )}

                  <div className="layer-case-diagram">
                    <div className="layer-case-card layer-case-card--found">
                      <h3>{block.whatWeFound?.heading || 'What we found'}</h3>
                      {renderPoints(block.whatWeFound?.points)}
                    </div>
                    <div className="layer-case-card layer-case-card--result">
                      <h3>{block.result?.heading || 'Result'}</h3>
                      {renderPoints(block.result?.points)}
                    </div>

                    <div className="layer-case-divider" aria-hidden="true" />
                    <span className="layer-case-arrow layer-case-arrow--situation" aria-hidden="true">
                      ↓
                    </span>
                    <span className="layer-case-arrow layer-case-arrow--found" aria-hidden="true">
                      ↑
                    </span>
                    <span className="layer-case-arrow layer-case-arrow--whatwedid" aria-hidden="true">
                      ↓
                    </span>
                    <span className="layer-case-arrow layer-case-arrow--result" aria-hidden="true">
                      ↑
                    </span>

                    <div className="layer-case-card layer-case-card--situation">
                      <h3>{block.situation?.heading || 'Situation'}</h3>
                      {renderPoints(block.situation?.points)}
                    </div>
                    <div className="layer-case-card layer-case-card--whatwedid">
                      <h3>{block.whatWeDid?.heading || 'What We Did'}</h3>
                      {renderPoints(block.whatWeDid?.points)}
                    </div>
                    {block.comparisonGroups && block.comparisonGroups.length > 0 && (
                      <div className="layer-case-comparison">
                        {block.comparisonGroups.map((group, j) => (
                          <React.Fragment key={j}>
                            {j > 0 && <div className="layer-case-comparison__divider" aria-hidden="true" />}
                            <div className="layer-case-comparison__group">
                              <span className="layer-case-comparison__label">{group.label}</span>
                              {group.items?.map((item, k) => (
                                <span
                                  key={k}
                                  className={`layer-case-comparison__item layer-case-comparison__item--${item.tag || 'gold'}`}
                                >
                                  <span className="layer-case-comparison__icon" aria-hidden="true" />
                                  {item.text}
                                </span>
                              ))}
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )
          }

          case 'capabilityGrid': {
            const subheadingNode = block.subheadingHighlight
              ? highlightText(block.subheadingText || '', [block.subheadingHighlight])
              : block.subheadingText

            return (
              <section key={i} className="section">
                <div className="container">
                  <div className="layer-case-header layer-case-header--center">
                    {block.number && <span className="layer-case-number">{block.number}</span>}
                    <h2>{block.heading}</h2>
                  </div>
                  {block.subheadingText && (
                    <p className="layer-capability-subheading">{subheadingNode}</p>
                  )}

                  <div className="grid grid-3 layer-capability-grid">
                    {(block.items as unknown as CapabilityItem[])?.map((item, j) => (
                      <div key={j} className="layer-capability-card">
                        {item.platforms && item.platforms.length === 1 && (
                          <div className="layer-capability-icon-single">
                            {renderSingleCapabilityIcon(item.platforms[0])}
                          </div>
                        )}
                        {item.platforms && item.platforms.length > 1 && (
                          <div className="layer-capability-platforms">
                            {item.platforms.map((p, k) => {
                              const iconImg = resolveImage(p.icon)
                              const badge = getPlatformBadge(p.label || '')
                              if (iconImg?.url) {
                                if (needsColorChip(p.label || '')) {
                                  return (
                                    <span
                                      key={k}
                                      className="platform-icon platform-icon--chip"
                                      style={{ background: badge.bg }}
                                      title={p.label || ''}
                                    >
                                      <img src={iconImg.url} alt={p.label || ''} />
                                    </span>
                                  )
                                }
                                if (needsNeutralChip(p.label || '')) {
                                  return (
                                    <span
                                      key={k}
                                      className="platform-icon platform-icon--neutral"
                                      title={p.label || ''}
                                    >
                                      <img src={iconImg.url} alt={p.label || ''} />
                                    </span>
                                  )
                                }
                                return (
                                  <span key={k} className="platform-icon platform-icon--image" title={p.label || ''}>
                                    <img src={iconImg.url} alt={p.label || ''} />
                                  </span>
                                )
                              }
                              return (
                                <span
                                  key={k}
                                  className="platform-icon"
                                  style={{ background: badge.bg }}
                                  title={p.label || ''}
                                >
                                  {badge.content}
                                </span>
                              )
                            })}
                          </div>
                        )}
                        <h3>{item.title}</h3>
                        {item.description && (
                          <p className="layer-capability-desc">{item.description}</p>
                        )}
                        <div className="layer-capability-divider" />
                        {item.points && item.points.length > 0 && (
                          <ul className="dot-list">
                            {item.points.map((p, k) => (
                              <li key={k}>{p.text}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )
          }

          case 'insightActionPanel': {
            return (
              <section key={i} className="section">
                <div className="container">
                  <div className="layer-case-header layer-case-header--center">
                    {block.number && <span className="layer-case-number">{block.number}</span>}
                    <h2>{block.heading}</h2>
                  </div>
                  {block.flowSteps && block.flowSteps.length > 0 && (
                    <p className="layer-flow-steps">
                      {block.flowSteps.map((s, j) => (
                        <React.Fragment key={j}>
                          {j > 0 && <span className="layer-flow-steps__arrow">→</span>}
                          <span>{s.label}</span>
                        </React.Fragment>
                      ))}
                    </p>
                  )}

                  <div className="layer-insight-grid">
                    <div className="layer-insight-card layer-insight-card--blue">
                      {block.insightHeading && <h3>{block.insightHeading}</h3>}
                      <div className="layer-insight-list">
                        {block.insightItems?.map((item, j) => (
                          <div key={j} className="layer-insight-list__item">
                            <strong>{item.title}</strong>
                            {item.description && <p>{item.description}</p>}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="venn-wrap">
                      <div className="venn-circle venn-circle--action">
                        {block.actionHeading && <h4>{block.actionHeading}</h4>}
                        {block.actionPoints && block.actionPoints.length > 0 && (
                          <ul className="venn-list">
                            {block.actionPoints.map((p, j) => (
                              <li key={j}>{p.text}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="venn-circle venn-circle--working">
                        {block.workingHeading && <h4>{block.workingHeading}</h4>}
                        {block.workingPoints && block.workingPoints.length > 0 && (
                          <ul className="venn-list">
                            {block.workingPoints.map((p, j) => (
                              <li key={j}>{p.text}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className="layer-insight-side">
                      <div className="layer-insight-card layer-insight-card--green">
                        {block.summaryHeading && <h3>{block.summaryHeading}</h3>}
                        {block.summaryText && <p>{block.summaryText}</p>}
                      </div>
                      <div className="layer-insight-card layer-insight-card--gold">
                        {block.nextActionHeading && <h3>{block.nextActionHeading}</h3>}
                        <div className="next-action-list">
                          {block.nextActionItems?.map((item, j) => (
                            <div key={j} className="next-action-list__item">
                              {item.tag && <span className="next-action-list__tag">{item.tag}</span>}
                              <span>{item.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )
          }

          case 'businessCareLoop': {
            const renderBoxIcon = (imgRef: ImageRef, Fallback: () => React.JSX.Element, size = 24) => {
              const img = resolveImage(imgRef)
              if (img?.url) return <img src={img.url} alt="" width={size} height={size} />
              return <Fallback />
            }

            return (
              <section key={i} className="section section--alt">
                <div className="container">
                  <div className="section-head">
                    <h2>{block.heading}</h2>
                    {block.subheading && <p>{block.subheading}</p>}
                  </div>

                  <div className="care-loop">
                    <CareLoopConnector x={696} y={156} dx={64.4} dy={57.0} />
                    <CareLoopConnector x={734} y={627} dx={-42.2} dy={58.26} />
                    <CareLoopConnector x={566} y={752} dx={-159.04} dy={0.32} />
                    <CareLoopConnector x={282} y={664} dx={-54.38} dy={-94.72} />
                    <CareLoopConnector x={247} y={235} dx={62.39} dy={-58.85} />

                    <div className="care-loop__box care-loop__box--center">
                      <div className="care-loop__icon">{renderBoxIcon(block.centerIcon, StorefrontIcon)}</div>
                      <h3>{block.centerLabel}</h3>
                      {block.centerDescription && <p>{block.centerDescription}</p>}
                    </div>

                    <div className="care-loop__box care-loop__box--pain">
                      <div className="care-loop__box-head">
                        <h3>{block.painPointsHeading}</h3>
                        {renderBoxIcon(block.painPointsIcon, WarningIcon)}
                      </div>
                      <div className="care-loop__pain-grid">
                        {block.painPoints?.map((p, j) => (
                          <div key={j} className="care-loop__pain-item">
                            {p.icons && p.icons.length > 0 && (
                              <div className="care-loop__pain-icons">
                                {p.icons.map((ic, k) => {
                                  const iconImg = resolveImage(ic.icon)
                                  if (!iconImg?.url) return null
                                  if (needsColorChip(ic.label || '')) {
                                    const badge = getPlatformBadge(ic.label || '')
                                    return (
                                      <span
                                        key={k}
                                        className="care-loop__pain-icon-chip"
                                        style={{ background: badge.bg }}
                                      >
                                        <img src={iconImg.url} alt="" width={18} height={18} />
                                      </span>
                                    )
                                  }
                                  return <img key={k} src={iconImg.url} alt="" width={28} height={28} />
                                })}
                              </div>
                            )}
                            <strong>{p.title}</strong>
                            {p.description && <p>{p.description}</p>}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="care-loop__box care-loop__box--behavior">
                      <div className="care-loop__box-head">
                        <h3>{block.behaviorLabel}</h3>
                        {renderBoxIcon(block.behaviorIcon, ChartIcon)}
                      </div>
                      {block.behaviorDescription && <p>{block.behaviorDescription}</p>}
                    </div>

                    <div className="care-loop__box care-loop__box--solutions">
                      <div className="care-loop__box-head">
                        <h3>{block.solutionsHeading}</h3>
                        {renderBoxIcon(block.solutionsIcon, CheckCircleIcon)}
                      </div>
                      <div className="care-loop__list">
                        {block.solutionsItems?.map((s, j) => {
                          const sIcon = resolveImage(s.icon)
                          return (
                            <div key={j} className="care-loop__list-item">
                              <div className="care-loop__list-item-head">
                                {sIcon?.url && <img src={sIcon.url} alt="" width={22} height={22} />}
                                <strong>{s.title}</strong>
                              </div>
                              {s.description && <p>{s.description}</p>}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="care-loop__box care-loop__box--impact">
                      <div className="care-loop__box-head">
                        <h3>{block.impactHeading}</h3>
                        {renderBoxIcon(block.impactIcon, TrendingUpIcon)}
                      </div>
                      <ul className="check-list">
                        {block.impactItems?.map((p, j) => (
                          <li key={j}>{p.text}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            )
          }

          case 'bookingPromo': {
            const total = block.totalSlots ?? 15
            const booked = block.bookedSlots ?? 0
            const remaining = Math.max(0, total - booked)
            const progressPct = total > 0 ? Math.min(100, (booked / total) * 100) : 0
            return (
              <section key={i} className="section">
                <div className="container booking-container" style={{ maxWidth: 900 }}>
                  <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ margin: '0 auto 12px' }}>
                      <rect x="5" y="4" width="14" height="17" rx="2" stroke="var(--color-accent)" strokeWidth="1.6" />
                      <path d="M9 3.5h6a1 1 0 0 1 1 1V6H8V4.5a1 1 0 0 1 1-1Z" stroke="var(--color-accent)" strokeWidth="1.6" />
                      <path d="M9 13.5l2 2 4-4.5" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h2>{block.heading}</h2>
                  </div>
                  <div className="booking-panel">
                    <div className="booking-panel__col">
                      <p className="booking-panel__slots">
                        {block.freeSlotsLabel}: <CountUp value={remaining} /> 🔥
                      </p>
                      <div className="booking-progress">
                        <div className="booking-progress__fill" style={{ width: `${progressPct}%` }} />
                      </div>
                      <span className="tag" style={{ background: 'rgba(201,150,43,0.12)', color: 'var(--color-accent-dark)' }}>
                        จองแล้ว <CountUp value={booked} /> จาก {total} สิทธิ์
                      </span>
                      <div style={{ marginTop: 20 }}>
                        <BookingCalendar />
                      </div>
                    </div>
                    <div className="booking-panel__col">
                      {block.rightTitle && <h3 style={{ fontSize: 22 }}>{block.rightTitle}</h3>}
                      {block.rightDescription && <p style={{ fontSize: 15 }}>{block.rightDescription}</p>}
                      {block.features && block.features.length > 0 && (
                        <ul className="feature-dot-list">
                          {block.features.map((f, j) => (
                            <li key={j}>
                              <strong>{f.title}</strong>
                              {f.description && <span>{f.description}</span>}
                            </li>
                          ))}
                        </ul>
                      )}
                      {block.originalPrice && (
                        <div className="booking-panel__price-old">{block.originalPrice}</div>
                      )}
                      {block.badgeText && <div className="booking-panel__price-new">{block.badgeText}</div>}
                      <CtaButton label={block.ctaLabel} url={block.ctaUrl} variant="secondary" />
                    </div>
                  </div>
                </div>
              </section>
            )
          }

          case 'leadFormSection': {
            const hasBusinessTypes = block.businessTypes && block.businessTypes.length > 0
            return (
              <section key={i} className="section lead-form-section">
                <div
                  className="container lead-form-container"
                  style={{ maxWidth: hasBusinessTypes ? undefined : 560 }}
                >
                  <div className="section-head">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" style={{ margin: '0 auto 12px' }}>
                      <rect x="4" y="5" width="16" height="15" rx="2" stroke="var(--color-accent)" strokeWidth="1.6" />
                      <path d="M4 9h16" stroke="var(--color-accent)" strokeWidth="1.6" />
                      <path d="M8 3.5v3M16 3.5v3" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" />
                      <circle cx="15.5" cy="15" r="2.6" stroke="var(--color-accent)" strokeWidth="1.4" />
                      <path d="M15.5 13.7V15l1 .6" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    <h2>{block.heading}</h2>
                    {block.subheading && <p style={{ fontSize: 18, color: 'var(--color-muted)' }}>{block.subheading}</p>}
                  </div>

                  {hasBusinessTypes ? (
                    <div className="lead-split">
                      <div className="card lead-split__business-card">
                        {block.businessListHeading && <h3 style={{ fontSize: 20 }}>{block.businessListHeading}</h3>}
                        <div style={{ display: 'grid', gap: 24, marginTop: 20 }}>
                          {block.businessTypes!.map((biz, j) => (
                            <div key={j} className="lead-business-item">
                              <span className="lead-business-item__number">{j + 1}</span>
                              <div>
                                <strong>{biz.title}</strong>
                                {biz.points && biz.points.length > 0 && (
                                  <ul className="check-list" style={{ marginTop: 6 }}>
                                    {biz.points.map((p, k) => (
                                      <li key={k}>{p.text}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="card">
                        <h3 style={{ fontSize: 20 }}>ข้อมูลผู้ติดต่อ</h3>
                        <div style={{ marginTop: 20 }}>
                          <LeadForm
                            serviceOptions={block.serviceOptions?.map((o) => o.label).filter(Boolean) as string[] | undefined}
                            serviceLabel={block.serviceLabel || undefined}
                            submitLabel="ยืนยันนัดหมาย"
                            showSchedule={false}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <LeadForm
                      serviceOptions={block.serviceOptions?.map((o) => o.label).filter(Boolean) as string[] | undefined}
                      serviceLabel={block.serviceLabel || undefined}
                    />
                  )}
                </div>
              </section>
            )
          }

          case 'timeline':
            return (
              <section key={i} className="section timeline-section">
                <div className="container container--flush-mobile">
                  {block.heading && (
                    <div className="section-head">
                      <h2>{block.heading}</h2>
                    </div>
                  )}
                  <div className="timeline">
                    {(block.items as unknown as TimelineItem[])?.map((item, j) => (
                      <div key={j} className="timeline-item">
                        <div className="timeline-year-col">
                          <span className="timeline-year">{item.year}</span>
                          <span className="timeline-dot" />
                        </div>
                        <div>
                          <h3 style={{ fontSize: 18, marginBottom: 4 }}>{item.title}</h3>
                          {item.description && <p style={{ fontSize: 15 }}>{item.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )

          case 'caseStudyList':
            return (
              <section key={i} className="section section--alt">
                <div className="container">
                  {block.heading && (
                    <div className="section-head">
                      <h2>{block.heading}</h2>
                    </div>
                  )}
                  <div style={{ display: 'grid', gap: '3rem' }}>
                    {(block.items as unknown as CaseStudyItem[])?.map((item, j) => (
                      <div
                        key={j}
                        className={`case-study-row${item.images?.length ? ' case-study-row--with-image' : ''}`}
                      >
                        {item.images && item.images.length > 0 && (
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: `repeat(${Math.min(item.images.length, 2)}, 1fr)`,
                              gap: 10,
                            }}
                          >
                            {item.images.map((im, k) => {
                              const caseImg = resolveImage(im.image)
                              if (!caseImg?.url) return null
                              return (
                                <div key={k} className="card-image">
                                  <img
                                    src={caseImg.url}
                                    alt={caseImg.alt || ''}
                                    style={
                                      item.images!.length === 1
                                        ? { width: '100%', height: 'auto' }
                                        : { aspectRatio: '4 / 3', objectFit: 'cover' }
                                    }
                                  />
                                </div>
                              )
                            })}
                          </div>
                        )}
                        <div>
                          <h3 style={{ fontSize: 22 }}>{item.title}</h3>
                          {item.description && (
                            <p style={{ fontSize: 14, whiteSpace: 'pre-line' }}>{renderBoldText(item.description)}</p>
                          )}
                          {item.points && item.points.length > 0 && (
                            <ul className="check-list" style={{ margin: '16px 0' }}>
                              {item.points.map((p, k) => (
                                <li key={k}>{p.text}</li>
                              ))}
                            </ul>
                          )}
                          {item.footnote && (
                            <p style={{ fontSize: 13, color: 'var(--color-muted)' }}>{item.footnote}</p>
                          )}
                          <CtaButton label={item.linkLabel} url={item.linkUrl} variant="outline" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )

          case 'faq':
            return (
              <section key={i} className="section" style={{ background: 'rgba(250, 248, 244, 1)' }}>
                <div className="container" style={{ maxWidth: 720 }}>
                  <div className="section-head">
                    <h2>{block.heading}</h2>
                  </div>
                  <div>
                    {(block.items as unknown as FaqItem[])?.map((item, j) => (
                      <details key={j} className="faq-item">
                        <summary>{item.question}</summary>
                        <p>{item.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </section>
            )

          case 'ctaBanner': {
            const isDark = block.theme === 'dark'
            const isCompact = block.size === 'compact'
            return (
              <section
                key={i}
                className="section"
                style={{
                  background: isDark ? 'var(--color-black)' : 'var(--color-accent)',
                  color: '#fff',
                  paddingTop: isCompact ? 40 : 72,
                  paddingBottom: isCompact ? 40 : 72,
                }}
              >
                <div
                  className="container"
                  style={{
                    maxWidth: isCompact ? 640 : undefined,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 20,
                  }}
                >
                  <div>
                    <h2 style={{ color: '#fff' }}>{block.heading}</h2>
                    {block.text && <p style={{ color: 'rgba(255,255,255,0.85)', margin: 0 }}>{block.text}</p>}
                  </div>
                  <CtaButton label={block.ctaLabel} url={block.ctaUrl} variant="light" />
                </div>
              </section>
            )
          }

          case 'pricingPackages':
            return (
              <section key={i} className="section section--alt">
                <div className="container">
                  <div className="section-head">
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                      <BoxIcon />
                    </div>
                    <h2>{block.heading}</h2>
                    {block.subheading && <p style={{ fontSize: 18, color: 'var(--color-muted)' }}>{block.subheading}</p>}
                  </div>
                  <div className="grid grid-3">
                    {block.packages?.map((pkg, j) => {
                      const hasGroups = pkg.groups && pkg.groups.length > 0
                      const flowSegments = pkg.audienceLine
                        ? pkg.audienceLine.split('>').map((s) => s.trim()).filter(Boolean)
                        : []
                      return (
                        <div key={j} className={`pricing-card ${pkg.highlighted ? 'pricing-card--highlighted' : ''}`}>
                          <h3 style={{ fontSize: 21 }}>{pkg.name}</h3>
                          {pkg.subtitle && <p style={{ fontSize: 14 }}>{pkg.subtitle}</p>}
                          {flowSegments.length > 0 && (
                            <p className="pricing-card__flow">
                              {flowSegments.map((seg, k) => (
                                <React.Fragment key={k}>
                                  {k > 0 && <ArrowIcon />}
                                  <span>{seg}</span>
                                </React.Fragment>
                              ))}
                            </p>
                          )}
                          {pkg.platforms && pkg.platforms.length > 0 && (
                            <div className="pricing-card__platforms">
                              {pkg.platforms.map((p, k) => (
                                <PlatformIcon key={k} label={p.label || ''} icon={p.icon} size={26} />
                              ))}
                            </div>
                          )}
                          {hasGroups ? (
                            <div className="pricing-card__groups">
                              {pkg.groups!.map((g, k) => (
                                <div key={k} className="pricing-card__group">
                                  <strong>{g.label}</strong>
                                  {g.points && g.points.length > 0 && (
                                    <ul className="check-list">
                                      {g.points.map((p, m) => (
                                        <li key={m}>{p.text}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <>
                              {pkg.priceNote && <div className="pricing-price">{pkg.priceNote}</div>}
                              {pkg.features && pkg.features.length > 0 && (
                                <ul className="check-list" style={{ flexGrow: 1, marginBottom: 24 }}>
                                  {pkg.features.map((f, k) => (
                                    <li key={k}>{f.text}</li>
                                  ))}
                                </ul>
                              )}
                            </>
                          )}
                          <div className="pricing-card__footer">
                            {hasGroups && <p className="pricing-card__pay-once">Pay once, own it forever</p>}
                            <CtaButton
                              label={pkg.ctaLabel}
                              url={pkg.ctaUrl}
                              variant={pkg.highlighted ? 'secondary' : 'primary'}
                            />
                            {hasGroups && <p className="pricing-card__invoice-note">Invoices and receipts available.</p>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  {block.additionalNote?.heading &&
                    (block.additionalNote.points && block.additionalNote.points.length > 0 ? (
                      <div className="additional-package-card">
                        <div className="additional-package-card__main">
                          <div className="additional-package-card__heading-row">
                            <BoxIcon />
                            <h3>
                              {block.additionalNote.highlight
                                ? highlightText(block.additionalNote.heading, [block.additionalNote.highlight])
                                : block.additionalNote.heading}
                            </h3>
                          </div>
                          {block.additionalNote.badge && (
                            <span className="tag additional-package-card__badge">{block.additionalNote.badge}</span>
                          )}
                          {block.additionalNote.subtext && (
                            <p className="additional-package-card__subtext">{block.additionalNote.subtext}</p>
                          )}
                          <ul className="check-list additional-package-card__points">
                            {block.additionalNote.points.map((p, k) => (
                              <li key={k}>{p.text}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="additional-package-card__cta">
                          <p className="pricing-card__pay-once">Pay once, own it forever</p>
                          <CtaButton label={block.additionalNote.ctaLabel} url={block.additionalNote.ctaUrl} variant="secondary" />
                          <p className="pricing-card__invoice-note">Invoices and receipts available.</p>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="section"
                        style={{
                          marginTop: 48,
                          background: 'var(--color-accent)',
                          borderRadius: 20,
                          color: '#fff',
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 20,
                        }}
                      >
                        <div>
                          <h3 style={{ color: '#fff', marginBottom: 4 }}>{block.additionalNote.heading}</h3>
                          {block.additionalNote.text && (
                            <p style={{ color: 'rgba(255,255,255,0.85)', margin: 0 }}>{block.additionalNote.text}</p>
                          )}
                        </div>
                        <CtaButton
                          label={block.additionalNote.ctaLabel}
                          url={block.additionalNote.ctaUrl}
                          variant="secondary"
                        />
                      </div>
                    ))}
                </div>
              </section>
            )

          case 'dualDiagram': {
            const leftImg = resolveImage(block.leftImage)
            const rightImg = resolveImage(block.rightImage)
            return (
              <section key={i} className="section section--alt dual-diagram-section">
                <div className="container dual-diagram-container">
                  <div className="section-head">
                    <h2>{block.heading}</h2>
                    {block.subheading && <p style={{ fontSize: 18, color: 'var(--color-muted)' }}>{block.subheading}</p>}
                  </div>
                  <div className="grid grid-2">
                    {leftImg?.url && (
                      <div className="card" style={{ padding: 24 }}>
                        {block.leftLabel && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                            <LoopIcon />
                            <strong style={{ fontFamily: 'var(--font-heading), Manrope, sans-serif', fontSize: 17 }}>
                              {block.leftLabel}
                            </strong>
                          </div>
                        )}
                        <img src={leftImg.url} alt={leftImg.alt || ''} style={{ width: '100%' }} />
                      </div>
                    )}
                    {rightImg?.url && (
                      <div className="card" style={{ padding: 24 }}>
                        {block.rightLabel && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                            <LoopIcon />
                            <strong style={{ fontFamily: 'var(--font-heading), Manrope, sans-serif', fontSize: 17 }}>
                              {block.rightLabel}
                            </strong>
                          </div>
                        )}
                        <img src={rightImg.url} alt={rightImg.alt || ''} style={{ width: '100%' }} />
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )
          }

          case 'diagramImage':
            return (
              <section key={i} className="section section--alt">
                <div className="container">
                  {block.heading && (
                    <div className="section-head">
                      <h2>{block.heading}</h2>
                      {block.subheading && <p style={{ fontSize: 18, color: 'var(--color-muted)' }}>{block.subheading}</p>}
                    </div>
                  )}
                  {img?.url && (
                    <figure style={{ margin: 0 }}>
                      <div className="card-image">
                        <img src={img.url} alt={img.alt || ''} style={{ width: '100%' }} />
                      </div>
                      {block.caption && (
                        <figcaption
                          style={{ textAlign: 'center', marginTop: 16, color: 'var(--color-muted)', fontSize: 14 }}
                        >
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                </div>
              </section>
            )

          case 'adsPortfolioGrid':
            return (
              <section key={i} className="section">
                <div className="container">
                  {block.heading && (
                    <div className="section-head">
                      <h2>{block.heading}</h2>
                    </div>
                  )}
                  <PhoneCarousel
                    slides={
                      (block.images as ImageItem[] | null)?.map((item) => {
                        const portfolioImg = resolveImage(item.image)
                        return { url: portfolioImg?.url, alt: portfolioImg?.alt }
                      }) || []
                    }
                  />
                </div>
              </section>
            )

          case 'productGrid': {
            const products = await fetchGridProducts(block)
            if (products.length === 0) return null
            return (
              <section key={i} className="section">
                <div className="container">
                  {block.heading && (
                    <div className="section-head">
                      <h2>{block.heading}</h2>
                      {block.subheading && (
                        <p style={{ fontSize: 18, color: 'var(--color-muted)' }}>{block.subheading}</p>
                      )}
                    </div>
                  )}
                  <div className="grid grid-4">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  {block.ctaLabel && block.ctaUrl && (
                    <div style={{ textAlign: 'center', marginTop: 40 }}>
                      <CtaButton label={block.ctaLabel} url={block.ctaUrl} />
                    </div>
                  )}
                </div>
              </section>
            )
          }

          case 'contactInfo': {
            const contact = siteSettings?.contact as
              | {
                  companyName?: string | null
                  address?: string | null
                  phone?: string | null
                  phoneIcon?: ImageRef
                  lineUrl?: string | null
                  lineLabel?: string | null
                  lineIcon?: ImageRef
                  email?: string | null
                }
              | undefined
            const social = siteSettings?.socialLinks as
              | {
                  facebookUrl?: string | null
                  facebookLabel?: string | null
                  facebookIcon?: ImageRef
                  instagramUrl?: string | null
                  instagramLabel?: string | null
                  instagramIcon?: ImageRef
                  tiktokUrl?: string | null
                  tiktokLabel?: string | null
                  tiktokIcon?: ImageRef
                  youtubeUrl?: string | null
                  youtubeLabel?: string | null
                  youtubeIcon?: ImageRef
                }
              | undefined

            const channelIcon = (image: ImageRef, fallback: React.ReactNode) => {
              const resolved = resolveImage(image)
              return resolved?.url ? <img src={resolved.url} alt="" width={20} height={20} /> : fallback
            }

            const phoneIconNode = channelIcon(contact?.phoneIcon, <PhoneIcon />)
            const lineIconNode = channelIcon(contact?.lineIcon, <LineIcon />)

            const socialItems = [
              {
                key: 'facebook',
                url: social?.facebookUrl,
                label: social?.facebookLabel,
                icon: channelIcon(social?.facebookIcon, <FacebookIcon />),
              },
              {
                key: 'instagram',
                url: social?.instagramUrl,
                label: social?.instagramLabel,
                icon: channelIcon(social?.instagramIcon, <InstagramIcon />),
              },
              {
                key: 'tiktok',
                url: social?.tiktokUrl,
                label: social?.tiktokLabel,
                icon: channelIcon(social?.tiktokIcon, <TikTokIcon />),
              },
              {
                key: 'youtube',
                url: social?.youtubeUrl,
                label: social?.youtubeLabel,
                icon: channelIcon(social?.youtubeIcon, <YoutubeIcon />),
              },
            ]
              .filter((item) => item.label)
              .map((item) => ({
                ...item,
                icon: (
                  <span className={`social-badge${item.key === 'instagram' ? ' social-badge--transparent' : ''}`}>
                    {item.icon}
                  </span>
                ),
              }))

            return (
              <section key={i} className="section contact-info-section">
                <div className="container">
                  <h1 style={{ marginBottom: 12 }}>{block.heading}</h1>
                  {block.text && <p style={{ fontSize: 17, maxWidth: 620, marginBottom: 0 }}>{block.text}</p>}

                  <div className="contact-info">
                    <div>
                      {contact?.companyName && (
                        <p style={{ fontWeight: 700, color: 'var(--color-ink)', marginBottom: 16 }}>
                          {contact.companyName}
                        </p>
                      )}

                      {contact?.address && (
                        <div className="contact-info__row">
                          <span className="contact-info__icon">
                            <PinIcon />
                          </span>
                          <div>
                            <strong>Location Office</strong>
                            <p style={{ margin: 0 }}>{contact.address}</p>
                          </div>
                        </div>
                      )}

                      {contact?.email && (
                        <div className="contact-info__row">
                          <span className="contact-info__icon">
                            <MailIcon />
                          </span>
                          <div>
                            <strong>อีเมล</strong>
                            <p style={{ margin: 0 }}>{contact.email}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <p style={{ fontWeight: 700, color: 'var(--color-ink)', marginBottom: 16 }}>ช่องทางการติดต่อ</p>

                      <div className="contact-info__channels">
                        {contact?.phone && (
                          <div className="contact-info__pill">
                            {phoneIconNode}
                            <span>{contact.phone}</span>
                          </div>
                        )}

                        {contact?.lineLabel &&
                          (contact.lineUrl ? (
                            <a href={contact.lineUrl} className="contact-info__pill contact-info__pill--line">
                              {lineIconNode}
                              <span>{contact.lineLabel}</span>
                            </a>
                          ) : (
                            <div className="contact-info__pill contact-info__pill--line">
                              {lineIconNode}
                              <span>{contact.lineLabel}</span>
                            </div>
                          ))}
                      </div>

                      {socialItems.length > 0 && (
                        <div className="contact-info__social">
                          {socialItems.map((item) =>
                            item.url ? (
                              <a
                                key={item.key}
                                href={item.url}
                                className={`contact-info__social-item contact-info__social-item--${item.key}`}
                              >
                                {item.icon}
                                <span>{item.label}</span>
                              </a>
                            ) : (
                              <span
                                key={item.key}
                                className={`contact-info__social-item contact-info__social-item--${item.key}`}
                              >
                                {item.icon}
                                <span>{item.label}</span>
                              </span>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )
          }

          case 'symptomChecklist': {
            const items = (block.items as unknown as PointItem[] | null) || []
            const promoHighlightIdx =
              block.promoHeading && block.promoHighlight
                ? block.promoHeading.indexOf(block.promoHighlight)
                : -1
            const promoHeadingNode =
              promoHighlightIdx >= 0 ? (
                <>
                  {block.promoHeading!.slice(0, promoHighlightIdx)}
                  <span className="gradient-text">{block.promoHighlight}</span>
                  {block.promoHeading!.slice(promoHighlightIdx + block.promoHighlight!.length)}
                </>
              ) : (
                block.promoHeading
              )
            return (
              <section key={i} className="section symptom-checklist-section">
                <div className="container" style={{ maxWidth: 640 }}>
                  <div className="promo-card">
                    <h2 style={{ marginBottom: 8 }}>{promoHeadingNode}</h2>
                    {block.promoText && (
                      <p style={{ whiteSpace: 'pre-line', margin: 0 }}>{block.promoText}</p>
                    )}
                  </div>

                  <div className="symptom-card">
                    <h3 style={{ marginBottom: 16 }}>
                      {block.checklistHeading && block.checklistHighlight
                        ? highlightText(block.checklistHeading, [block.checklistHighlight])
                        : block.checklistHeading}
                    </h3>
                    {items.length > 0 && (
                      <ul className="symptom-list">
                        {items.map((item, j) => (
                          <li key={j}>{item.text}</li>
                        ))}
                      </ul>
                    )}
                    {(block.thresholdText || block.thresholdCta) && (
                      <p className="symptom-list__threshold">
                        {block.thresholdText && (
                          <>
                            ถ้า <span className="symptom-list__check">✓</span> {block.thresholdText}
                          </>
                        )}
                        {block.thresholdCta && (
                          <>
                            {' '}
                            <ArrowIcon /> {block.thresholdCta}
                          </>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </section>
            )
          }

          default:
            return null
        }
    }),
  )

  return <>{rendered}</>
}

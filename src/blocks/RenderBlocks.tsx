import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { LeadForm } from '@/components/LeadForm'
import { BookingCalendar } from '@/components/BookingCalendar'
import { CountUp } from '@/components/CountUp'
import { ProductCard, type ProductSummary } from '@/components/ProductCard'
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

type PricingPackage = {
  name?: string | null
  subtitle?: string | null
  priceNote?: string | null
  features?: PointItem[] | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  highlighted?: boolean | null
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
    text?: string | null
    ctaLabel?: string | null
    ctaUrl?: string | null
  } | null

  // diagramImage / adsPortfolioGrid
  caption?: string | null

  // productGrid
  mode?: 'featured' | 'all' | 'selected' | null
  limit?: number | null
  products?: (string | { id: string })[] | null
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
              <section key={i} className="section" style={{ paddingTop: 96 }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: 760 }}>
                  {block.tag && <span className="tag">{block.tag}</span>}
                  <h1 style={{ marginTop: 20 }}>{headingNode}</h1>
                  {block.subheading && (
                    <p style={{ fontSize: 19, maxWidth: 560, margin: '0 auto 28px' }}>{block.subheading}</p>
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
                  {block.ctaLabel && block.ctaUrl && (
                    <div className="process-cta">
                      <CtaButton label={block.ctaLabel} url={block.ctaUrl} />
                    </div>
                  )}
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
              <section key={i} className="section">
                <div className="container">
                  <div className="section-head">
                    <h2>{block.heading}</h2>
                    {block.subheading && <p style={{ fontSize: 18, color: 'var(--color-muted)' }}>{block.subheading}</p>}
                  </div>
                  <div className="grid grid-3">
                    {block.packages?.map((pkg, j) => (
                      <div key={j} className={`pricing-card ${pkg.highlighted ? 'pricing-card--highlighted' : ''}`}>
                        <h3 style={{ fontSize: 21 }}>{pkg.name}</h3>
                        {pkg.subtitle && <p style={{ fontSize: 14 }}>{pkg.subtitle}</p>}
                        {pkg.priceNote && <div className="pricing-price">{pkg.priceNote}</div>}
                        {pkg.features && pkg.features.length > 0 && (
                          <ul className="check-list" style={{ flexGrow: 1, marginBottom: 24 }}>
                            {pkg.features.map((f, k) => (
                              <li key={k}>{f.text}</li>
                            ))}
                          </ul>
                        )}
                        <CtaButton
                          label={pkg.ctaLabel}
                          url={pkg.ctaUrl}
                          variant={pkg.highlighted ? 'secondary' : 'primary'}
                        />
                      </div>
                    ))}
                  </div>
                  {block.additionalNote?.heading && (
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
                  )}
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
                  <div className="grid grid-4">
                    {(block.images as ImageItem[] | null)?.map((item, j) => {
                      const portfolioImg = resolveImage(item.image)
                      if (!portfolioImg?.url) return null
                      return (
                        <div key={j} className="phone-frame">
                          <img src={portfolioImg.url} alt={portfolioImg.alt || ''} />
                        </div>
                      )
                    })}
                  </div>
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

          default:
            return null
        }
    }),
  )

  return <>{rendered}</>
}

import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { LeadForm } from '@/components/LeadForm'
import { ProductCard, type ProductSummary } from '@/components/ProductCard'

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
  imageStyle?: 'rounded' | 'circle' | null
  primaryCtaLabel?: string | null
  primaryCtaUrl?: string | null
  secondaryCtaLabel?: string | null
  secondaryCtaUrl?: string | null

  // logoStrip
  logos?: LogoItem[] | null

  // iconFeatureGrid
  columns?: '2' | '3' | '4' | null
  items?: FeatureGridItem[] | null
  footnote?: string | null

  // featureShowcase
  eyebrow?: string | null
  points?: PointItem[] | null

  // processSteps
  steps?: StepItem[] | null

  // bookingPromo
  calendarNote?: string | null
  originalPrice?: string | null
  badgeText?: string | null
  bullets?: PointItem[] | null

  // leadFormSection
  serviceOptions?: ServiceOption[] | null

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

function CtaButton({
  label,
  url,
  variant = 'primary',
}: {
  label?: string | null
  url?: string | null
  variant?: 'primary' | 'secondary' | 'outline'
}) {
  if (!label || !url) return null
  return (
    <a href={url} className={`btn btn-${variant}`}>
      {label}
      <ArrowIcon />
    </a>
  )
}

const dayLabels = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']

function CalendarMock() {
  const cells = Array.from({ length: 30 }, (_, i) => i + 1)
  const activeDays = [8, 12, 15, 21]
  return (
    <div className="calendar-mock">
      {dayLabels.map((d) => (
        <span key={d} style={{ background: 'transparent', color: 'var(--color-ink)', fontWeight: 700 }}>
          {d}
        </span>
      ))}
      {cells.map((day) => (
        <span key={day} className={activeDays.includes(day) ? 'is-active' : ''}>
          {day}
        </span>
      ))}
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
            return (
              <section key={i} className="section" style={{ paddingTop: 96 }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: 760 }}>
                  {block.tag && <span className="tag">{block.tag}</span>}
                  <h1 style={{ marginTop: 20 }}>
                    {block.highlightText && block.heading?.includes(block.highlightText) ? (
                      <>
                        {block.heading.split(block.highlightText)[0]}
                        <span className="accent" style={{ color: 'var(--color-accent)' }}>
                          {block.highlightText}
                        </span>
                        {block.heading.split(block.highlightText)[1]}
                      </>
                    ) : (
                      block.heading
                    )}
                  </h1>
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
                </div>
              </section>
            )

          case 'iconFeatureGrid':
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

          case 'featureShowcase':
            return (
              <section key={i} className="section">
                <div
                  className="container"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: block.images?.length ? '1fr 1fr' : '1fr',
                    gap: '3.5rem',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    {block.eyebrow && <span className="eyebrow">{block.eyebrow}</span>}
                    <h2>{block.heading}</h2>
                    {block.text && <p style={{ fontSize: 18 }}>{block.text}</p>}
                    {block.points && block.points.length > 0 && (
                      <ul className="check-list" style={{ margin: '20px 0' }}>
                        {block.points.map((p, j) => (
                          <li key={j}>{p.text}</li>
                        ))}
                      </ul>
                    )}
                    <CtaButton label={block.ctaLabel} url={block.ctaUrl} />
                  </div>
                  {block.images && block.images.length > 0 && (
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${Math.min(block.images.length, 3)}, 1fr)`,
                        gap: 16,
                      }}
                    >
                      {(block.images as ImageItem[]).map((item, j) => {
                        const showcaseImg = resolveImage(item.image)
                        if (!showcaseImg?.url) return null
                        return (
                          <div key={j} className="phone-frame">
                            <img src={showcaseImg.url} alt={showcaseImg.alt || ''} />
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </section>
            )

          case 'processSteps':
            return (
              <section key={i} className="section section--dark">
                <div className="container">
                  <div className="section-head">
                    <h2>{block.heading}</h2>
                    {block.subheading && <p style={{ fontSize: 18 }}>{block.subheading}</p>}
                  </div>
                  <div className="grid grid-3">
                    {block.steps?.map((step, j) => (
                      <div key={j} className="process-step">
                        <div className="process-step-number">{step.number}</div>
                        <h3 style={{ fontSize: 19 }}>{step.title}</h3>
                        {step.description && <p style={{ fontSize: 15 }}>{step.description}</p>}
                      </div>
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

          case 'bookingPromo':
            return (
              <section key={i} className="section">
                <div
                  className="container"
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }}
                >
                  <div>
                    {block.calendarNote && (
                      <p style={{ fontWeight: 700, color: 'var(--color-ink)', marginBottom: 16 }}>
                        {block.calendarNote}
                      </p>
                    )}
                    <CalendarMock />
                  </div>
                  <div className="card" style={{ textAlign: 'center' }}>
                    <h2>{block.heading}</h2>
                    {block.bullets && block.bullets.length > 0 && (
                      <ul className="check-list" style={{ textAlign: 'left', margin: '20px 0' }}>
                        {block.bullets.map((b, j) => (
                          <li key={j}>{b.text}</li>
                        ))}
                      </ul>
                    )}
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 10 }}>
                      {block.originalPrice && (
                        <span style={{ textDecoration: 'line-through', color: 'var(--color-muted)' }}>
                          {block.originalPrice}
                        </span>
                      )}
                      {block.badgeText && <span className="tag">{block.badgeText}</span>}
                    </div>
                    <div style={{ marginTop: 20 }}>
                      <CtaButton label={block.ctaLabel} url={block.ctaUrl} />
                    </div>
                  </div>
                </div>
              </section>
            )

          case 'leadFormSection':
            return (
              <section key={i} className="section section--alt">
                <div className="container" style={{ maxWidth: 560 }}>
                  <div className="section-head">
                    <h2>{block.heading}</h2>
                    {block.subheading && <p style={{ fontSize: 18, color: 'var(--color-muted)' }}>{block.subheading}</p>}
                  </div>
                  <LeadForm
                    serviceOptions={block.serviceOptions?.map((o) => o.label).filter(Boolean) as string[] | undefined}
                  />
                </div>
              </section>
            )

          case 'timeline':
            return (
              <section key={i} className="section">
                <div className="container">
                  {block.heading && (
                    <div className="section-head">
                      <h2>{block.heading}</h2>
                    </div>
                  )}
                  <div className="timeline">
                    {(block.items as unknown as TimelineItem[])?.map((item, j) => (
                      <div key={j} className="timeline-item">
                        <div className="timeline-year">{item.year}</div>
                        <h3 style={{ fontSize: 18, marginBottom: 4 }}>{item.title}</h3>
                        {item.description && <p style={{ fontSize: 15 }}>{item.description}</p>}
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
                        style={{
                          display: 'grid',
                          gridTemplateColumns: item.images?.length ? '1fr 1fr' : '1fr',
                          gap: '2.5rem',
                          alignItems: 'center',
                        }}
                      >
                        {item.images && item.images.length > 0 && (
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(2, 1fr)',
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
                                    style={{ aspectRatio: '4 / 3', objectFit: 'cover' }}
                                  />
                                </div>
                              )
                            })}
                          </div>
                        )}
                        <div>
                          <h3 style={{ fontSize: 22 }}>{item.title}</h3>
                          {item.description && <p style={{ fontSize: 16 }}>{item.description}</p>}
                          {item.points && item.points.length > 0 && (
                            <ul className="check-list" style={{ margin: '16px 0' }}>
                              {item.points.map((p, k) => (
                                <li key={k}>{p.text}</li>
                              ))}
                            </ul>
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
              <section key={i} className="section">
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
                  <CtaButton label={block.ctaLabel} url={block.ctaUrl} variant="secondary" />
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

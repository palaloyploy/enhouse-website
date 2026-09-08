import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import React from 'react'

import config from '@/payload.config'
import { ProductDetail } from '@/components/ProductDetail'
import type { ProductSummary } from '@/components/ProductCard'
import '../../styles.css'

function resolveImage(image: unknown) {
  if (!image || typeof image === 'string') return null
  return image as { url?: string | null; alt?: string | null }
}

async function getProduct(slug: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  return result.docs[0] as any
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = await getProduct(slug)
  if (!doc) return notFound()

  const images = (doc.images || []).map((item: any) => resolveImage(item.image)).filter(Boolean)

  const product: ProductSummary = {
    id: String(doc.id),
    slug: doc.slug,
    name: doc.name,
    price: doc.price,
    compareAtPrice: doc.compareAtPrice,
    image: images[0]?.url || null,
    inStock: doc.inStock,
  }

  return (
    <div className="section">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem' }}>
        <div>
          <div className="product-card__image" style={{ borderRadius: 20, marginBottom: 12 }}>
            {images[0]?.url && <img src={images[0].url} alt={images[0].alt || doc.name} />}
          </div>
          {images.length > 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {images.slice(1).map((img: any, i: number) => (
                <div key={i} className="product-card__image" style={{ borderRadius: 10 }}>
                  <img src={img.url} alt={img.alt || doc.name} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {doc.category?.name && (
            <span className="tag" style={{ marginBottom: 12 }}>
              {doc.category.name}
            </span>
          )}
          <h1>{doc.name}</h1>
          {doc.shortDescription && <p style={{ fontSize: 17 }}>{doc.shortDescription}</p>}

          <ProductDetail product={product} />

          {doc.highlights?.length > 0 && (
            <ul className="check-list" style={{ marginTop: 28 }}>
              {doc.highlights.map((h: any, i: number) => (
                <li key={i}>{h.text}</li>
              ))}
            </ul>
          )}

          {doc.description && (
            <p style={{ marginTop: 20, color: 'var(--color-muted)' }}>{doc.description}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = await getProduct(slug)
  return {
    title: doc ? `${doc.name} — enhouse.digital` : 'ไม่พบสินค้า',
    description: doc?.shortDescription || '',
  }
}

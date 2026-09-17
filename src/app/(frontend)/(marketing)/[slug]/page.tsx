import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import React from 'react'

import config from '@/payload.config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { pageThemeStyle } from '@/lib/theme'
import '../../styles.css'

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { isEnabled: draft } = await draftMode()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    draft,
    limit: 1,
  })

  const page = result.docs[0]
  if (!page) return notFound()

  return (
    <div style={pageThemeStyle(page.pageTheme)}>
      {draft && <LivePreviewListener />}
      <RenderBlocks blocks={page.layout as any} />
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { isEnabled: draft } = await draftMode()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    draft,
    limit: 1,
  })

  const page = result.docs[0]

  return {
    title: page?.meta?.metaTitle || page?.title || 'enhouse.digital',
    description: page?.meta?.metaDescription || '',
  }
}

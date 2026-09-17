import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React from 'react'

import config from '@/payload.config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { pageThemeStyle } from '@/lib/theme'
import '../styles.css'

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    draft,
    limit: 1,
  })

  const page = result.docs[0]

  return (
    <div style={pageThemeStyle(page?.pageTheme)}>
      {draft && <LivePreviewListener />}
      <RenderBlocks blocks={page?.layout as any} />
    </div>
  )
}

import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import '../styles.css'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  const page = result.docs[0]

  return (
    <div>
      <RenderBlocks blocks={page?.layout as any} />
    </div>
  )
}

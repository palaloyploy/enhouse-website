import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

import config from '@/payload.config'

function toPath(slug: string) {
  return slug === 'home' || !slug ? '/' : `/${slug}`
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug') || 'home'

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new Response('ลิงก์ Preview ไม่ถูกต้อง', { status: 401 })
  }

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    draft: true,
    limit: 1,
  })

  if (!result.docs[0]) {
    return new Response('ไม่พบหน้านี้', { status: 404 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(toPath(slug))
}

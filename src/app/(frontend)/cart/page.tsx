import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { CartView } from '@/components/CartView'
import '../styles.css'

export const metadata = {
  title: 'ตะกร้าสินค้า — enhouse.digital',
}

function resolveImage(image: unknown) {
  if (!image || typeof image === 'string') return null
  return (image as { url?: string }).url || null
}

export default async function CartPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const settings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)
  const payment = settings?.payment

  return (
    <div className="section">
      <div className="container">
        <div className="section-head">
          <h1>ตะกร้าสินค้า</h1>
        </div>
        <CartView
          lineUrl={settings?.contact?.lineUrl}
          paymentInfo={{
            bankName: payment?.bankName,
            accountName: payment?.accountName,
            accountNumber: payment?.accountNumber,
            promptPayId: payment?.promptPayId,
            qrImageUrl: resolveImage(payment?.qrImage),
          }}
        />
      </div>
    </div>
  )
}

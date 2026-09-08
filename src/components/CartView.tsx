'use client'

import React, { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import { useMounted } from '@/lib/use-mounted'

function formatPrice(price: number) {
  return price.toLocaleString('th-TH')
}

type AppliedDiscount = {
  code: string
  amount: number
}

type PaymentInfo = {
  bankName?: string | null
  accountName?: string | null
  accountNumber?: string | null
  promptPayId?: string | null
  qrImageUrl?: string | null
}

type PaymentMethod = 'bank_transfer' | 'cod'

function PaymentDetails({ paymentInfo }: { paymentInfo?: PaymentInfo | null }) {
  const hasBankInfo = paymentInfo?.accountNumber || paymentInfo?.promptPayId || paymentInfo?.qrImageUrl

  if (!hasBankInfo) {
    return (
      <p style={{ fontSize: 14, color: 'var(--color-muted)', margin: 0 }}>
        ทีมงานจะติดต่อกลับเพื่อแจ้งรายละเอียดการโอนเงินหลังยืนยันออเดอร์
      </p>
    )
  }

  return (
    <div style={{ display: 'grid', gap: 8, fontSize: 14 }}>
      {paymentInfo?.qrImageUrl && (
        <img
          src={paymentInfo.qrImageUrl}
          alt="QR พร้อมเพย์"
          style={{ width: 160, height: 160, objectFit: 'contain', margin: '0 auto' }}
        />
      )}
      {paymentInfo?.bankName && (
        <p style={{ margin: 0 }}>
          <strong>ธนาคาร:</strong> {paymentInfo.bankName}
        </p>
      )}
      {paymentInfo?.accountName && (
        <p style={{ margin: 0 }}>
          <strong>ชื่อบัญชี:</strong> {paymentInfo.accountName}
        </p>
      )}
      {paymentInfo?.accountNumber && (
        <p style={{ margin: 0 }}>
          <strong>เลขบัญชี:</strong> {paymentInfo.accountNumber}
        </p>
      )}
      {paymentInfo?.promptPayId && (
        <p style={{ margin: 0 }}>
          <strong>พร้อมเพย์:</strong> {paymentInfo.promptPayId}
        </p>
      )}
      <p style={{ margin: '4px 0 0', color: 'var(--color-muted)' }}>
        โอนแล้วส่งสลิปยืนยันให้ทีมงานทาง LINE เพื่อยืนยันคำสั่งซื้อ
      </p>
    </div>
  )
}

export function CartView({ lineUrl, paymentInfo }: { lineUrl?: string | null; paymentInfo?: PaymentInfo | null }) {
  const { items, setQuantity, removeItem, total, clear } = useCart()
  const mounted = useMounted()
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [discountInput, setDiscountInput] = useState('')
  const [discount, setDiscount] = useState<AppliedDiscount | null>(null)
  const [discountError, setDiscountError] = useState('')
  const [checkingDiscount, setCheckingDiscount] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank_transfer')
  const [confirmedMethod, setConfirmedMethod] = useState<PaymentMethod>('bank_transfer')

  const grandTotal = Math.max(0, total - (discount?.amount || 0))

  async function handleApplyDiscount() {
    const code = discountInput.trim()
    if (!code) return
    setCheckingDiscount(true)
    setDiscountError('')

    try {
      const query = new URLSearchParams({
        'where[code][equals]': code,
        'where[active][equals]': 'true',
        limit: '1',
      })
      const res = await fetch(`/api/discounts?${query.toString()}`)
      const data = await res.json()
      const found = data?.docs?.[0]

      if (!found) {
        setDiscount(null)
        setDiscountError('ไม่พบโค้ดนี้ หรือโค้ดถูกปิดใช้งาน')
        return
      }

      if (found.expiresAt && new Date(found.expiresAt) < new Date()) {
        setDiscount(null)
        setDiscountError('โค้ดนี้หมดอายุแล้ว')
        return
      }

      const amount = found.type === 'percentage' ? Math.round((total * found.value) / 100) : found.value
      setDiscount({ code: found.code, amount: Math.min(amount, total) })
    } catch (err) {
      console.error(err)
      setDiscountError('ตรวจสอบโค้ดไม่สำเร็จ ลองใหม่อีกครั้ง')
    } finally {
      setCheckingDiscount(false)
    }
  }

  async function handleCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const data = new FormData(form)
    const params = new URLSearchParams(window.location.search)

    const body = {
      customerName: data.get('customerName'),
      phone: data.get('phone'),
      email: data.get('email') || undefined,
      address: data.get('address') || undefined,
      note: data.get('note') || undefined,
      items: items.map((i) => ({
        product: Number(i.productId),
        productName: i.name,
        unitPrice: i.price,
        quantity: i.quantity,
      })),
      paymentMethod,
      discountCode: discount?.code || undefined,
      discountAmount: discount?.amount || undefined,
      totalAmount: grandTotal,
      consentPDPA: data.get('consentPDPA') === 'on',
      utmSource: params.get('utm_source') || undefined,
      utmMedium: params.get('utm_medium') || undefined,
      utmCampaign: params.get('utm_campaign') || undefined,
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('request failed')

      setConfirmedMethod(paymentMethod)
      setStatus('done')
      clear()
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div style={{ textAlign: 'center', maxWidth: 420, margin: '0 auto' }}>
        <h2>สั่งซื้อสำเร็จ</h2>
        {confirmedMethod === 'cod' ? (
          <p>เก็บเงินปลายทางเมื่อสินค้าถึงมือคุณ ทีมงานจะติดต่อกลับเพื่อยืนยันการจัดส่งเร็วๆ นี้</p>
        ) : (
          <div className="card" style={{ textAlign: 'left', marginBottom: 20 }}>
            <p style={{ fontWeight: 700, marginBottom: 12 }}>ชำระเงินด้วยการโอน/พร้อมเพย์</p>
            <PaymentDetails paymentInfo={paymentInfo} />
          </div>
        )}
        {lineUrl && (
          <a href={lineUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
            แอดไลน์เพื่อส่งสลิป/ยืนยันคำสั่งซื้อ
          </a>
        )}
      </div>
    )
  }

  if (!mounted || items.length === 0) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--color-muted)' }}>ยังไม่มีสินค้าในตะกร้า</p>
        <a href="/shop" className="btn btn-primary">
          เลือกซื้อสินค้า
        </a>
      </div>
    )
  }

  const inputStyle: React.CSSProperties = {
    fontFamily: 'inherit',
    fontSize: 15,
    padding: '12px 16px',
    borderRadius: 8,
    border: '1px solid var(--color-border)',
    outline: 'none',
    width: '100%',
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '3rem', alignItems: 'start' }}>
      <div>
        {items.map((item) => (
          <div key={item.productId} className="cart-line">
            <div className="cart-line__image">{item.image && <img src={item.image} alt={item.name} />}</div>
            <div>
              <p style={{ fontWeight: 700, color: 'var(--color-ink)', margin: 0 }}>{item.name}</p>
              <p style={{ margin: '4px 0 0', color: 'var(--color-muted)' }}>฿{formatPrice(item.price)}</p>
            </div>
            <div className="qty-control">
              <button type="button" onClick={() => setQuantity(item.productId, item.quantity - 1)}>
                −
              </button>
              <span>{item.quantity}</span>
              <button type="button" onClick={() => setQuantity(item.productId, item.quantity + 1)}>
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => removeItem(item.productId)}
              style={{ background: 'none', border: 'none', color: 'var(--color-muted)', cursor: 'pointer' }}
            >
              ลบ
            </button>
          </div>
        ))}

        <div style={{ display: 'flex', gap: 8, marginTop: 20, maxWidth: 320, marginLeft: 'auto' }}>
          <input
            placeholder="โค้ดส่วนลด"
            value={discountInput}
            onChange={(e) => setDiscountInput(e.target.value)}
            style={inputStyle}
          />
          <button
            type="button"
            className="btn btn-outline"
            onClick={handleApplyDiscount}
            disabled={checkingDiscount}
          >
            {checkingDiscount ? '...' : 'ใช้โค้ด'}
          </button>
        </div>
        {discountError && (
          <p style={{ textAlign: 'right', color: '#d92d20', fontSize: 13, marginTop: 6 }}>{discountError}</p>
        )}
        {discount && (
          <p style={{ textAlign: 'right', color: 'var(--color-accent)', fontSize: 14, marginTop: 6 }}>
            ใช้โค้ด &quot;{discount.code}&quot; ลด ฿{formatPrice(discount.amount)}
          </p>
        )}

        <div style={{ textAlign: 'right', marginTop: 12, color: 'var(--color-muted)' }}>
          ยอดก่อนหักส่วนลด ฿{formatPrice(total)}
        </div>
        <div style={{ textAlign: 'right', marginTop: 4, fontSize: 20, fontWeight: 800, color: 'var(--color-ink)' }}>
          รวม ฿{formatPrice(grandTotal)}
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 16 }}>วิธีการชำระเงิน</h3>
        <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14, cursor: 'pointer' }}>
            <input
              type="radio"
              name="paymentMethodChoice"
              checked={paymentMethod === 'bank_transfer'}
              onChange={() => setPaymentMethod('bank_transfer')}
            />
            โอนผ่านธนาคาร / พร้อมเพย์
          </label>
          {paymentMethod === 'bank_transfer' && (
            <div style={{ paddingLeft: 24 }}>
              <PaymentDetails paymentInfo={paymentInfo} />
            </div>
          )}
          <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14, cursor: 'pointer' }}>
            <input
              type="radio"
              name="paymentMethodChoice"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
            />
            เก็บเงินปลายทาง (COD)
          </label>
        </div>

        <h3 style={{ marginBottom: 16 }}>ข้อมูลสำหรับสั่งซื้อ</h3>
        <form onSubmit={handleCheckout} style={{ display: 'grid', gap: 12 }}>
          <input name="customerName" placeholder="ชื่อ-นามสกุล" required style={inputStyle} />
          <input name="phone" placeholder="เบอร์โทรศัพท์" required style={inputStyle} />
          <input name="email" type="email" placeholder="อีเมล (ถ้ามี)" style={inputStyle} />
          <textarea name="address" placeholder="ที่อยู่จัดส่ง (ถ้ามี)" style={{ ...inputStyle, minHeight: 80 }} />
          <textarea name="note" placeholder="หมายเหตุ (ถ้ามี)" style={{ ...inputStyle, minHeight: 60 }} />
          <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'var(--color-muted)' }}>
            <input name="consentPDPA" type="checkbox" required />
            ฉันยินยอมให้เก็บข้อมูลตามนโยบายความเป็นส่วนตัว (PDPA)
          </label>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="btn btn-primary"
            style={{ justifyContent: 'center' }}
          >
            {status === 'sending' ? 'กำลังส่ง...' : `ยืนยันสั่งซื้อ ฿${formatPrice(grandTotal)}`}
          </button>
          {status === 'error' && <p style={{ color: '#d92d20' }}>ส่งไม่สำเร็จ ลองใหม่อีกครั้ง</p>}
        </form>
      </div>
    </div>
  )
}

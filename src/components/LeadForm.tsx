'use client'

import React, { useState } from 'react'

export function LeadForm({
  serviceOptions,
  serviceLabel = 'บริการที่สนใจ',
  submitLabel = 'ส่งข้อมูล',
  showSchedule = true,
  columns = '1',
  inputStyle: inputStyleProp = 'box',
}: {
  serviceOptions?: string[]
  serviceLabel?: string
  submitLabel?: string
  showSchedule?: boolean
  columns?: '1' | '2'
  inputStyle?: 'box' | 'line'
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [selectedService, setSelectedService] = useState<string>('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const data = new FormData(form)

    const params = new URLSearchParams(window.location.search)

    const body = {
      name: data.get('name'),
      phone: data.get('phone'),
      email: data.get('email'),
      business: data.get('business'),
      interestedService: selectedService || undefined,
      bookingDate: data.get('bookingDate') || null,
      bookingTime: data.get('bookingTime'),
      consentPDPA: data.get('consentPDPA') === 'on',
      utmSource: params.get('utm_source') || undefined,
      utmMedium: params.get('utm_medium') || undefined,
      utmCampaign: params.get('utm_campaign') || undefined,
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) throw new Error('request failed')

      setStatus('done')
      form.reset()
      setSelectedService('')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  if (status === 'done') {
    return <p style={{ textAlign: 'center' }}>ขอบคุณครับ ทีมงานจะติดต่อกลับไปเร็วๆ นี้</p>
  }

  const inputStyle: React.CSSProperties =
    inputStyleProp === 'line'
      ? {
          fontFamily: 'inherit',
          fontSize: 15,
          padding: '10px 2px',
          borderRadius: 0,
          border: 'none',
          borderBottom: '1px solid var(--color-border)',
          outline: 'none',
          width: '100%',
          background: 'transparent',
        }
      : {
          fontFamily: 'inherit',
          fontSize: 15,
          padding: '12px 16px',
          borderRadius: 8,
          border: '1px solid var(--color-border)',
          outline: 'none',
          width: '100%',
        }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
      <div
        style={
          columns === '2'
            ? { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }
            : { display: 'grid', gap: 12 }
        }
      >
        <input name="name" placeholder="ชื่อ-นามสกุล" required style={inputStyle} />
        <input name="business" placeholder="บริษัท" style={inputStyle} />
        <input name="phone" placeholder="เบอร์โทรศัพท์" required style={inputStyle} />
        <input name="email" type="email" placeholder="อีเมล" style={inputStyle} />
      </div>

      {serviceOptions && serviceOptions.length > 0 && (
        <div>
          <label style={{ fontSize: 14, color: 'var(--color-muted)', display: 'block', marginBottom: 8 }}>
            {serviceLabel}
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {serviceOptions.map((option) => {
              const active = selectedService === option
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedService(active ? '' : option)}
                  style={{
                    fontFamily: 'inherit',
                    fontSize: 14,
                    padding: '10px 16px',
                    borderRadius: 999,
                    border: `1.5px solid ${active ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    background: active ? 'var(--color-accent)' : 'transparent',
                    color: active ? '#fff' : 'var(--color-ink)',
                    cursor: 'pointer',
                  }}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {showSchedule && (
        <>
          <label style={{ fontSize: 14, color: 'var(--color-muted)' }}>
            วันที่ต้องการนัด
            <input name="bookingDate" type="date" style={{ ...inputStyle, marginTop: 6 }} />
          </label>
          <input name="bookingTime" placeholder="เวลาที่สะดวก เช่น 14:00" style={inputStyle} />
        </>
      )}
      <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'var(--color-muted)' }}>
        <input name="consentPDPA" type="checkbox" required />
        ฉันยินยอมให้เก็บข้อมูลตามนโยบายความเป็นส่วนตัว (PDPA)
      </label>
      <button type="submit" disabled={status === 'sending'} className="btn btn-secondary" style={{ justifyContent: 'center' }}>
        {status === 'sending' ? 'กำลังส่ง...' : submitLabel}
      </button>
      {status === 'error' && <p style={{ color: '#d92d20' }}>ส่งไม่สำเร็จ ลองใหม่อีกครั้ง</p>}
    </form>
  )
}

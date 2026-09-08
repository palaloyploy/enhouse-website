'use client'

import React, { useState } from 'react'

export function NewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const email = new FormData(form).get('email')

    try {
      const res = await fetch('/api/newsletter-subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('done')
      form.reset()
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  if (status === 'done') {
    return <p style={{ margin: 0, fontWeight: 700 }}>สมัครรับข่าวสารสำเร็จ ขอบคุณครับ</p>
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" required placeholder="กรอกอีเมลของคุณ" />
      <button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'กำลังส่ง...' : 'สมัครรับข่าวสาร'}
      </button>
      {status === 'error' && (
        <p style={{ width: '100%', color: '#ff8080', fontSize: 13, margin: '8px 0 0' }}>สมัครไม่สำเร็จ ลองใหม่อีกครั้ง</p>
      )}
    </form>
  )
}

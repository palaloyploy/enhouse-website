'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const OPTIONS = [
  { value: 'popular', label: 'เรียงตามความนิยม' },
  { value: 'newest', label: 'มาใหม่ล่าสุด' },
  { value: 'price-asc', label: 'ราคา: น้อยไปมาก' },
  { value: 'price-desc', label: 'ราคา: มากไปน้อย' },
]

export function SortSelect() {
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <select
      className="shop-sort-select"
      defaultValue={searchParams.get('sort') || 'popular'}
      onChange={(e) => {
        const params = new URLSearchParams(searchParams.toString())
        if (e.target.value === 'popular') {
          params.delete('sort')
        } else {
          params.set('sort', e.target.value)
        }
        router.push(`/shop?${params.toString()}#catalog`)
      }}
    >
      {OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

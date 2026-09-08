'use client'

import React from 'react'

function StarIcon({ fill }: { fill: number }) {
  const id = React.useId()
  return (
    <svg viewBox="0 0 20 20" fill="none">
      <defs>
        <linearGradient id={id}>
          <stop offset={`${fill * 100}%`} stopColor="var(--shop-star)" />
          <stop offset={`${fill * 100}%`} stopColor="#e4e4e4" />
        </linearGradient>
      </defs>
      <path
        d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.77l-5.21 2.75 1-5.8-4.21-4.1 5.82-.85L10 1.5z"
        fill={`url(#${id})`}
      />
    </svg>
  )
}

export function Stars({ rating, showValue = true }: { rating: number; showValue?: boolean }) {
  const clamped = Math.max(0, Math.min(5, rating))
  return (
    <div className="shop-card__stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <StarIcon key={i} fill={Math.max(0, Math.min(1, clamped - i))} />
      ))}
      {showValue && <span>{clamped.toFixed(1)}/5</span>}
    </div>
  )
}

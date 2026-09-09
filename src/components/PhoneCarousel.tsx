'use client'

import { useRef } from 'react'

type Slide = { url?: string | null; alt?: string | null }

export function PhoneCarousel({ slides }: { slides: Slide[] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollByAmount = (dir: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const slide = track.querySelector<HTMLElement>('.phone-frame')
    const amount = slide ? slide.offsetWidth + 16 : 240
    track.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <div className="phone-carousel-wrap">
      <button
        type="button"
        className="phone-carousel-nav phone-carousel-nav--prev"
        aria-label="เลื่อนซ้าย"
        onClick={() => scrollByAmount(-1)}
      >
        ←
      </button>
      <div className="phone-carousel" ref={trackRef}>
        {slides.map((slide, j) => (
          <div key={j} className="phone-frame">
            {slide.url && <img src={slide.url} alt={slide.alt || ''} />}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="phone-carousel-nav phone-carousel-nav--next"
        aria-label="เลื่อนขวา"
        onClick={() => scrollByAmount(1)}
      >
        →
      </button>
    </div>
  )
}

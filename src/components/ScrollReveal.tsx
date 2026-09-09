'use client'

import { useLayoutEffect } from 'react'

const SELECTOR =
  '.card, .process-step, .phone-frame, .showcase-phone-slide, .timeline-item, .booking-panel, .photo-collage__card, .hero-split__visual, .lead-business-item, .case-study-row, .icon-feature-collage'

export function ScrollReveal() {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    document.documentElement.classList.add('js-enabled')
    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    els.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return null
}

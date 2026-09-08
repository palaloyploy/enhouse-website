'use client'

import { useEffect } from 'react'

const SELECTOR = '.card, .process-step, .phone-frame'
const MAX_TILT = 8

export function CardTilt() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return

    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR))

    function handleMove(this: HTMLElement, e: MouseEvent) {
      const rect = this.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      const rotateY = (px - 0.5) * MAX_TILT * 2
      const rotateX = (0.5 - py) * MAX_TILT * 2
      this.style.setProperty(
        'transform',
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`,
        'important',
      )
    }

    function handleLeave(this: HTMLElement) {
      this.style.setProperty('transform', 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)', 'important')
    }

    els.forEach((el) => {
      el.style.setProperty(
        'transition',
        'transform 0.2s ease-out, opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      )
      el.addEventListener('mousemove', handleMove)
      el.addEventListener('mouseleave', handleLeave)
    })

    return () => {
      els.forEach((el) => {
        el.removeEventListener('mousemove', handleMove)
        el.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [])

  return null
}

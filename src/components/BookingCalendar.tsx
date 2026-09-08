'use client'

import React, { useState } from 'react'

const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const thaiMonths = [
  'มกราคม',
  'กุมภาพันธ์',
  'มีนาคม',
  'เมษายน',
  'พฤษภาคม',
  'มิถุนายน',
  'กรกฎาคม',
  'สิงหาคม',
  'กันยายน',
  'ตุลาคม',
  'พฤศจิกายน',
  'ธันวาคม',
]

export function BookingCalendar() {
  const now = new Date()
  const [cursor, setCursor] = useState({ year: now.getFullYear(), month: now.getMonth() })
  const [selected, setSelected] = useState<string | null>(null)

  const isCurrentMonth = cursor.year === now.getFullYear() && cursor.month === now.getMonth()
  const todayDate = now.getDate()

  const firstWeekday = new Date(cursor.year, cursor.month, 1).getDay()
  const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate()
  const daysInPrevMonth = new Date(cursor.year, cursor.month, 0).getDate()

  const cells: { day: number; state: 'prev' | 'past' | 'today' | 'future' }[] = []
  for (let d = firstWeekday - 1; d >= 0; d--) {
    cells.push({ day: daysInPrevMonth - d, state: 'prev' })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const state = isCurrentMonth ? (d === todayDate ? 'today' : d < todayDate ? 'past' : 'future') : 'future'
    cells.push({ day: d, state })
  }

  function changeMonth(delta: number) {
    setCursor((prev) => {
      let month = prev.month + delta
      let year = prev.year
      if (month < 0) {
        month = 11
        year -= 1
      } else if (month > 11) {
        month = 0
        year += 1
      }
      return { year, month }
    })
    setSelected(null)
  }

  function changeYear(delta: number) {
    setCursor((prev) => ({ ...prev, year: prev.year + delta }))
    setSelected(null)
  }

  return (
    <div className="booking-calendar">
      <div className="booking-calendar__header">
        <div className="booking-calendar__nav">
          <button type="button" aria-label="ปีก่อนหน้า" onClick={() => changeYear(-1)}>
            «
          </button>
          <button type="button" aria-label="เดือนก่อนหน้า" onClick={() => changeMonth(-1)}>
            ‹
          </button>
        </div>
        <strong>
          {thaiMonths[cursor.month]} {cursor.year}
        </strong>
        <div className="booking-calendar__nav">
          <button type="button" aria-label="เดือนถัดไป" onClick={() => changeMonth(1)}>
            ›
          </button>
          <button type="button" aria-label="ปีถัดไป" onClick={() => changeYear(1)}>
            »
          </button>
        </div>
      </div>
      <div className="booking-calendar__grid">
        {dayLabels.map((d, idx) => (
          <span key={idx} className="booking-calendar__weekday">
            {d}
          </span>
        ))}
        {cells.map((cell, idx) => {
          const key = `${cursor.year}-${cursor.month}-${cell.day}-${cell.state}`
          const clickable = cell.state === 'today' || cell.state === 'future'
          return (
            <button
              key={idx}
              type="button"
              disabled={!clickable}
              onClick={() => clickable && setSelected(key)}
              className={`booking-calendar__day is-${cell.state} ${selected === key ? 'is-selected' : ''}`}
            >
              {cell.day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

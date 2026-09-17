'use client'

import React, { useCallback } from 'react'
import { TextInput, useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

const HEX_RE = /^#([0-9a-f]{6})$/i
const SHORT_HEX_RE = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i

function toSwatchValue(hex: string): string {
  if (HEX_RE.test(hex)) return hex
  const short = hex.match(SHORT_HEX_RE)
  if (short) {
    const [, r, g, b] = short
    return `#${r}${r}${g}${g}${b}${b}`
  }
  return '#000000'
}

export const ColorPickerField: TextFieldClientComponent = (props) => {
  const { field, path } = props
  const { setValue, value } = useField<string>({ path })
  const hex = typeof value === 'string' ? value : ''
  const placeholder =
    typeof field.admin?.placeholder === 'string' ? field.admin.placeholder : undefined
  const swatchSource = hex || placeholder || ''

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    [setValue],
  )
  const handleSwatchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    [setValue],
  )

  return (
    <TextInput
      AfterInput={
        <input
          aria-label="เลือกสี"
          onChange={handleSwatchChange}
          style={{
            background: 'none',
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: 4,
            cursor: 'pointer',
            flexShrink: 0,
            height: 36,
            padding: 2,
            width: 36,
          }}
          type="color"
          value={toSwatchValue(swatchSource)}
        />
      }
      label={field.label}
      onChange={handleTextChange}
      path={path}
      placeholder={placeholder}
      required={field.required}
      value={hex}
    />
  )
}

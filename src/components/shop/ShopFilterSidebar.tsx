import React from 'react'
import { COLOR_OPTIONS } from '@/lib/colors'

export type ShopFilters = {
  q?: string
  category?: string
  sale?: string
  sort?: string
  minPrice?: string
  maxPrice?: string
  minWidth?: string
  maxWidth?: string
  minHeight?: string
  maxHeight?: string
  minDepth?: string
  maxDepth?: string
  color?: string[]
  tag?: string[]
}

function RangeField({
  label,
  unit,
  minName,
  maxName,
  minValue,
  maxValue,
}: {
  label: string
  unit?: string
  minName: string
  maxName: string
  minValue?: string
  maxValue?: string
}) {
  return (
    <div className="shop-filter-group">
      <p className="shop-filter-title">{label}</p>
      <div className="shop-filter-range">
        <input type="number" name={minName} placeholder="น้อยที่สุด" defaultValue={minValue} min={0} />
        <input type="number" name={maxName} placeholder="มากที่สุด" defaultValue={maxValue} min={0} />
      </div>
      {unit && <span className="shop-filter-unit">{unit}</span>}
    </div>
  )
}

export function ShopFilterSidebar({ filters, availableTags }: { filters: ShopFilters; availableTags: string[] }) {
  const selectedColors = filters.color || []
  const selectedTags = filters.tag || []

  return (
    <form action="/shop" method="get" className="shop-sidebar">
      <h3>ตัวกรอง</h3>

      {filters.category && <input type="hidden" name="category" value={filters.category} />}
      {filters.q && <input type="hidden" name="q" value={filters.q} />}
      {filters.sale && <input type="hidden" name="sale" value={filters.sale} />}
      {filters.sort && <input type="hidden" name="sort" value={filters.sort} />}

      <RangeField label="ราคาสินค้า" minName="minPrice" maxName="maxPrice" minValue={filters.minPrice} maxValue={filters.maxPrice} />
      <RangeField
        label="ความกว้าง"
        unit="ซม."
        minName="minWidth"
        maxName="maxWidth"
        minValue={filters.minWidth}
        maxValue={filters.maxWidth}
      />
      <RangeField
        label="ความสูง"
        unit="ซม."
        minName="minHeight"
        maxName="maxHeight"
        minValue={filters.minHeight}
        maxValue={filters.maxHeight}
      />
      <RangeField
        label="ความลึก"
        unit="ซม."
        minName="minDepth"
        maxName="maxDepth"
        minValue={filters.minDepth}
        maxValue={filters.maxDepth}
      />

      <div className="shop-filter-group">
        <p className="shop-filter-title">ตัวเลือกสี</p>
        <div className="shop-color-grid">
          {COLOR_OPTIONS.map((c) => (
            <label
              key={c.slug}
              className={`shop-color-swatch ${selectedColors.includes(c.slug) ? 'is-selected' : ''}`}
              style={{ background: c.hex }}
              title={c.name}
            >
              <input type="checkbox" name="color" value={c.slug} defaultChecked={selectedColors.includes(c.slug)} />
            </label>
          ))}
        </div>
      </div>

      {availableTags.length > 0 && (
        <div className="shop-filter-group">
          <p className="shop-filter-title">แท็ก</p>
          <div className="shop-tag-grid">
            {availableTags.map((tag) => (
              <label key={tag} className={`shop-tag-pill ${selectedTags.includes(tag) ? 'is-selected' : ''}`}>
                <input type="checkbox" name="tag" value={tag} defaultChecked={selectedTags.includes(tag)} />
                {tag}
              </label>
            ))}
          </div>
        </div>
      )}

      <button type="submit" className="shop-btn-black" style={{ width: '100%', marginTop: 8 }}>
        กรองสินค้า
      </button>
    </form>
  )
}

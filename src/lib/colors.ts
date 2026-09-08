export const COLOR_OPTIONS = [
  { slug: 'purple', name: 'ม่วง', hex: '#C9A7EB' },
  { slug: 'red', name: 'แดง', hex: '#E0435C' },
  { slug: 'orange', name: 'ส้ม', hex: '#F0954A' },
  { slug: 'white', name: 'ขาว', hex: '#FFFFFF' },
  { slug: 'gray', name: 'เทา', hex: '#C9C9C9' },
  { slug: 'gold', name: 'ทอง', hex: '#C9A227' },
  { slug: 'black', name: 'ดำ', hex: '#1A1A1A' },
  { slug: 'green', name: 'เขียว', hex: '#3F7D4A' },
  { slug: 'pink', name: 'ชมพู', hex: '#F3B8C4' },
  { slug: 'slate', name: 'ฟ้าเทา', hex: '#8FA0B3' },
  { slug: 'mint', name: 'มินท์', hex: '#A8DDC9' },
  { slug: 'cream', name: 'ครีม', hex: '#EFE6D8' },
  { slug: 'yellow', name: 'เหลือง', hex: '#F2D027' },
  { slug: 'blue', name: 'น้ำเงิน', hex: '#4A5FA5' },
  { slug: 'brown', name: 'น้ำตาล', hex: '#7A5B3F' },
] as const

export function colorHex(slug?: string | null) {
  return COLOR_OPTIONS.find((c) => c.slug === slug)?.hex
}

export function colorName(slug?: string | null) {
  return COLOR_OPTIONS.find((c) => c.slug === slug)?.name
}

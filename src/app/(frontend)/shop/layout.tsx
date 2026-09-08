import React from 'react'
import { ShopChrome } from '@/components/shop/ShopChrome'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <ShopChrome>{children}</ShopChrome>
}

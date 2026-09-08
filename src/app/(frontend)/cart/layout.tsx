import React from 'react'
import { ShopChrome } from '@/components/shop/ShopChrome'

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <ShopChrome>{children}</ShopChrome>
}

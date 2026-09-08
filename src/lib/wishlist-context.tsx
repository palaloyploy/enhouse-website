'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type WishlistItem = {
  productId: string
  slug: string
  name: string
  price: number
  image?: string | null
}

type WishlistContextValue = {
  items: WishlistItem[]
  isSaved: (productId: string) => boolean
  toggle: (item: WishlistItem) => void
  remove: (productId: string) => void
  count: number
}

const WishlistContext = createContext<WishlistContextValue | null>(null)
const STORAGE_KEY = 'enhouse-wishlist'

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore
    }
  }, [items, hydrated])

  const isSaved = (productId: string) => items.some((i) => i.productId === productId)

  const toggle = (item: WishlistItem) => {
    setItems((prev) =>
      prev.some((i) => i.productId === item.productId)
        ? prev.filter((i) => i.productId !== item.productId)
        : [...prev, item],
    )
  }

  const remove = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId))
  }

  return (
    <WishlistContext.Provider value={{ items, isSaved, toggle, remove, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}

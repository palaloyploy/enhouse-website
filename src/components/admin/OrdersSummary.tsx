import React from 'react'
import type { Payload } from 'payload'

function StatCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div
      style={{
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: 6,
        padding: '16px 20px',
        background: 'var(--theme-elevation-0)',
      }}
    >
      <div style={{ fontSize: 13, color: 'var(--theme-elevation-500)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--theme-text)' }}>{value}</div>
    </div>
  )
}

export const OrdersSummary = async ({ payload }: { payload: Payload }) => {
  const [orders, products] = await Promise.all([
    payload.find({ collection: 'orders', limit: 1000, sort: '-createdAt' }),
    payload.find({ collection: 'products', limit: 0 }),
  ])

  const totalOrders = orders.totalDocs
  const newOrders = orders.docs.filter((o: any) => o.status === 'new').length
  const totalRevenue = orders.docs.reduce((sum: number, o: any) => sum + (o.totalAmount || 0), 0)

  return (
    <div style={{ margin: '24px 0' }}>
      <h4 style={{ margin: '0 0 12px' }}>ภาพรวมร้านค้า</h4>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16,
        }}
      >
        <StatCard label="ออเดอร์ใหม่ (ยังไม่ติดต่อ)" value={newOrders} />
        <StatCard label="ออเดอร์ทั้งหมด" value={totalOrders} />
        <StatCard label="ยอดขายรวม" value={`฿${totalRevenue.toLocaleString('th-TH')}`} />
        <StatCard label="สินค้าในร้าน" value={products.totalDocs} />
      </div>
    </div>
  )
}

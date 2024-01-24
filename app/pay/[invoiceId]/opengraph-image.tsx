import { ImageResponse } from 'next/og'
import { env } from '@/env.mjs'
import { TInvoice } from '@/lib/types'

export const runtime = 'edge'

export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: { invoiceId: string }
}) {
  const { invoiceId } = params
  const res = await fetch(`${env.ACCTUAL_INVOICE_API}/${invoiceId}`)

  const imageData = (await fetch(
    new URL('./background.jpg', import.meta.url),
  ).then((res) => res.arrayBuffer())) as string

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const invoice = (await res.json()) as TInvoice

  const formattedInvoiceTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(invoice.total)

  const formattedDueDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  }).format(new Date(invoice.dueDate))

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
        <img
          src={imageData}
          style={{ width: '100%', height: '100%', position: 'absolute' }}
        />
        <div
          style={{
            color: '#2C478C',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <span>{invoice.issuer.name} has sent you an invoice</span>
          <span style={{ fontWeight: 'bold' }}>
            for {formattedInvoiceTotal} due on {formattedDueDate}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}

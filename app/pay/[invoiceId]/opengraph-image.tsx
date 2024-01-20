import { ImageResponse } from 'next/og'
import { TInvoice } from '@/components/Invoice'

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
  const res = await fetch(
    `https://us-central1-crypt-account-362116.cloudfunctions.net/invoice-generator/invoices/${invoiceId}`,
  )

  const imageData = (await fetch(
    new URL('./background.png', import.meta.url),
  ).then((res) => res.arrayBuffer())) as string

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const invoice = (await res.json()) as TInvoice

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
            display: 'flex',
            color: '#2C478C',
            flexDirection: 'column',
          }}>
          <span style={{ fontWeight: 800 }}>{invoice.issuer.name}</span>
          <span>has sent you an invoice</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}

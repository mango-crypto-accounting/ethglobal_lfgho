import { Metadata } from 'next'
import Invoice from '@/components/Invoice'
import { env } from '@/env.mjs'
import { TInvoice } from '@/lib/types'

export const revalidate = 1800 // revalidate at most every half hour

async function getData(invoiceId: string) {
  const res = await fetch(`${env.ACCTUAL_INVOICE_API}/${invoiceId}`)

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export async function generateMetadata({
  params,
}: {
  params: { invoiceId: string }
}): Promise<Metadata> {
  const { invoiceId } = params

  // fetch data
  const res = await fetch(`${env.ACCTUAL_INVOICE_API}/${invoiceId}`)
  const invoice = (await res.json()) as TInvoice

  return {
    title: `${invoice.issuer.name} has sent you an invoice`,
  }
}

export default async function PayInvoicePage({
  params,
}: {
  params: { invoiceId: string }
}) {
  const { invoiceId } = params
  const data = (await getData(invoiceId)) as TInvoice
  return (
    <div className="h-full">
      <Invoice invoice={data} />
    </div>
  )
}

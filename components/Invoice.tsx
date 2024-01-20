import React from 'react'
import dynamic from 'next/dynamic'
import InvoiceCard from './InvoiceCard'

const PdfViewer = dynamic(() => import('./InvoicePDF'), { ssr: false })

type Address = {
  email: string
  logo: string
  name: string
  address: string
  city: string
  zip: string
  state: string
  country: string
}

type Item = {
  description: string
  quantity: number
  price: number
  amount: number
}

type Currency = {
  value: string
  logo: string
}

type Crypto = {
  token: string
  chain: string
  walletAddress: string
}

type Fiat = {
  swift: string
  account: string
  routing: string
  bankEntity: string
}

export type TInvoice = {
  invoiceId: string
  number: string
  issueDate: string
  dueDate: string
  issuer: Address
  client: Address
  items: Item[]
  currency: Currency
  subtotal: number
  discount: number
  tax: number
  taxAmount: number
  total: number
  notes: string
  crypto: Crypto
  fiat: Fiat
  invoiceLink: string
}

interface InvoicePageProps {
  invoice: TInvoice
}

export default function Invoice({ invoice }: InvoicePageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-14 lg:flex-row">
      <div className="flex w-full grow items-center justify-end p-6">
        <InvoiceCard className="w-full grow lg:w-[400px]" invoice={invoice} />
      </div>
      <div className="h-fit w-full grow items-center justify-start p-6">
        <PdfViewer pdfUrl={invoice.invoiceLink} />
      </div>
    </div>
  )
}

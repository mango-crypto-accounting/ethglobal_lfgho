import React, { useState } from 'react'
import InvoiceCard from './InvoiceCard'
import InvoicePDF from './InvoicePDF'

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
        <InvoiceCard className="w-full grow lg:max-w-[400px]" />
      </div>
      <div className="h-fit w-full grow items-center justify-start p-6">
        <InvoicePDF pdfUrl={invoice.invoiceLink} />
      </div>
    </div>
  )
}

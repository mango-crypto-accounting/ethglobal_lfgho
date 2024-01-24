import React from 'react'
import { TInvoice } from '@/lib/types'

const GHO = {
  value: 'GHO',
  label: 'GHO',
  logo: 'https://assets.coingecko.com/coins/images/30663/small/ghoaave.jpeg?1696529533',
}

export default function InvoiceDetails({ invoice }: { invoice: TInvoice }) {
  return (
    <div className="mb-6 border-b pb-8">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">To</p>
        </div>
        <div className="">
          <p className="text-sm font-bold text-gray-800">
            {invoice.client.name}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">From</p>
        </div>
        <div className="">
          <p className="text-sm font-bold text-gray-800">
            {invoice.issuer.name}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Amount due</p>
        </div>
        <div className="">
          <p className="flex items-center gap-2 text-sm font-bold text-gray-800">
            <img
              src={GHO.logo}
              alt={GHO.label}
              className="h-4 w-4 rounded-full"
            />{' '}
            {GHO.value} {invoice.total}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Due on</p>
        </div>
        <div className="">
          <p
            className="text-sm font-bold text-gray-800"
            suppressHydrationWarning>
            {new Date(invoice.dueDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}

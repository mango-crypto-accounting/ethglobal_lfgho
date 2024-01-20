import React from 'react'
import { TInvoice } from './Invoice'

export default function InvoiceDetails({ invoice }: { invoice: TInvoice }) {
  return (
    <div className="mb-6 border-b pb-8">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">To</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-gray-800">
            {invoice.client.name}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">From</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-gray-800">
            {invoice.issuer.name}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Amount due</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-gray-800">
            {invoice.crypto.chain} {invoice.total}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Due on</p>
        </div>
        <div className="text-right">
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

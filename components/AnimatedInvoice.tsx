'use client'

import React, { useState } from 'react'
import InvoiceCard from './InvoiceCard'
import InvoicePDF from './InvoicePDF'

export default function AnimatedInvoice() {
  const [isFirstState, setIsFirstState] = useState(true)

  // You can toggle the state with this function
  const toggleState = () => {
    setIsFirstState(!isFirstState)
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-14 lg:flex-row">
      <div className="flex w-full grow items-center justify-end p-6">
        <InvoiceCard
          toggleState={toggleState}
          isFirstState={isFirstState}
          className="w-full grow lg:max-w-[400px]"
          invoice={{
            invoiceId: '123',
            number: '123',
            issueDate: '2021-10-10',
            dueDate: '2021-10-10',
            issuer: {
              name: 'John Doe',
              address: '123 Main St',
              city: 'New York',
              zip: '12345',
              state: 'NY',
              country: 'USA',
              email: '',
              logo: '',
            },
            client: {
              name: 'John Doe',
              address: '123 Main St',
              city: 'New York',
              zip: '12345',
              state: 'NY',
              country: 'USA',
              email: '',
              logo: '',
            },
            items: [
              {
                description: 'Item 1',
                quantity: 1,
                price: 100,
                amount: 100,
              },
              {
                description: 'Item 2',
                quantity: 1,
                price: 100,
                amount: 100,
              },
            ],
            currency: {
              value: 'USD',
              logo: 'https://cryptkit.com/images/USD.png',
            },
            subtotal: 200,
            discount: 0,
            tax: 0,
            taxAmount: 0,
            total: 200,
            notes: 'Thank you for your business!',
            crypto: {
              token: 'GHO',
              chain: 'Ethereum',
              walletAddress: '0x123',
            },
            fiat: {
              swift: '123',
              account: '123',
              routing: '123',
              bankEntity: '123',
            },
            invoiceLink: 'https://cryptkit.com/invoices/123',
          }}
        />
      </div>
      <div className="h-fit w-full grow items-center justify-start p-6">
        <InvoicePDF />
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import InvoiceCard from './InvoiceCard'
import InvoicePDF from './InvoicePDF'

export default function Invoice() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-14 lg:flex-row">
      <div className="flex w-full grow items-center justify-end p-6">
        <InvoiceCard className="w-full grow lg:max-w-[400px]" />
      </div>
      <div className="h-fit w-full grow items-center justify-start p-6">
        <InvoicePDF />
      </div>
    </div>
  )
}

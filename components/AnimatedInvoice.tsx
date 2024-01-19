'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import InvoiceCard from './InvoiceCard'
import InvoicePDF from './InvoicePDF'

// Define the two different states for animation
const containerStateOne = {
  x: '0',
}

const containerStateTwo = {
  x: -400,
}

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
        />
      </div>
      <div className="h-fit w-full grow items-center justify-start p-6">
        <InvoicePDF />
      </div>
    </div>
  )
}

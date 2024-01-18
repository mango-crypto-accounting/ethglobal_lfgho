'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import InvoiceCard from './InvoiceCard'

// Define the two different states for animation
const containerStateOne = {
  x: 'calc(50% - 250px)',
}

const containerStateTwo = {
  x: 0,
}

const invoiceStateOne = {
  x: 150,
  opacity: 0.5,
}

const invoiceStateTwo = {
  x: 0,
  opacity: 1,
}

export default function AnimatedInvoice() {
  const [isFirstState, setIsFirstState] = useState(true)

  // You can toggle the state with this function
  const toggleState = () => {
    setIsFirstState(!isFirstState)
  }
  return (
    <>
      <motion.div
        animate={isFirstState ? containerStateOne : containerStateTwo}
        transition={{ type: 'tween', duration: 0.3 }}>
        <div className="flex min-h-screen items-center justify-center gap-10 align-middle">
          <div className="max-w-[500px] grow p-6">
            <InvoiceCard className="w-full" />
          </div>
          <div className="max-w-[700px] grow p-6">
            <motion.div
              animate={isFirstState ? invoiceStateOne : invoiceStateTwo}
              transition={{ type: 'tween', duration: 0.3 }}
              className="h-fit rounded-md border bg-gray-100 p-6 drop-shadow-md hover:cursor-pointer hover:border-blue-500"
              onClick={toggleState}>
              <h1>Invoice here</h1>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

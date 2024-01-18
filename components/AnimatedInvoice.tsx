'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import InvoiceCard from './InvoiceCard'

// Define the two different states for animation
const containerStateOne = {
  x: '0',
}

const containerStateTwo = {
  x: -500,
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
    <div className="overflow-y-hidden">
      <motion.div
        animate={isFirstState ? containerStateOne : containerStateTwo}
        transition={{ type: 'tween', duration: 0.3 }}>
        <div className="flex min-h-screen items-center justify-center">
          <div>
            <InvoiceCard
              toggleState={toggleState}
              isFirstState={isFirstState}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

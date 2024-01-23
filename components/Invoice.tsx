'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { TInvoice } from '@/lib/types'

const PdfViewer = dynamic(() => import('./InvoicePDF'), { ssr: false })
const InvoiceSSR = dynamic(() => import('./InvoiceCard'), { ssr: false })

interface InvoicePageProps {
  invoice: TInvoice
}

export default function Invoice({ invoice }: InvoicePageProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const transition = {
    type: 'spring',
    stiffness: 300,
    damping: 20,
    duration: 0.3,
  }

  const toggleExpand = () => setIsExpanded(!isExpanded)

  return (
    <div className="flex min-h-screen items-center gap-12 lg:flex-row lg:overflow-hidden">
      <motion.div
        className="flex flex-shrink-0 justify-center lg:justify-end"
        initial={{
          width: `calc(100% - 350px)`,
        }}
        animate={{
          width: isExpanded ? `calc(100% - 350px)` : '50%',
        }}
        transition={transition}>
        <motion.div
          className="max-w-[400px]"
          animate={{
            x: isExpanded ? -350 : 0,
          }}
          transition={transition}>
          <InvoiceSSR className="w-full" invoice={invoice} />
        </motion.div>
      </motion.div>
      <motion.div
        animate={{
          scale: isExpanded ? 0.8 : 1,
        }}
        className="w-[600px] flex-shrink-0 cursor-pointer opacity-30 transition-opacity duration-300 hover:opacity-80"
        onClick={toggleExpand}
        style={{ opacity: isExpanded ? '' : 1 }}>
        <PdfViewer pdfUrl={invoice.invoiceLink} />
      </motion.div>
    </div>
  )
}

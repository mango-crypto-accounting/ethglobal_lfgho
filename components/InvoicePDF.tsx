'use client'

import React from 'react'
import {
  PageLayout,
  SpecialZoomLevel,
  Viewer,
  Worker,
} from '@react-pdf-viewer/core'

const pageLayout: PageLayout = {
  buildPageStyles: () => ({
    alignItems: 'center',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  }),
}

export default function InvoicePDF({
  pdfUrl = 'https://storage.googleapis.com/acctual-billing/users/a636fd0a0569b049fabf306fcdcd9e1ce53c8e7ac33e991a529791fd35b3a628/905.pdf',
}: {
  pdfUrl?: string
}) {
  return (
    <div className="max-w-[600px] overflow-y-hidden rounded-md p-6 shadow-lg">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          fileUrl={pdfUrl}
          pageLayout={pageLayout}
          defaultScale={SpecialZoomLevel.PageWidth}
        />
      </Worker>
    </div>
  )
}

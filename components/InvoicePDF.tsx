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
    overflowY: 'hidden',
  }),
}

export default function InvoicePDF({ pdfUrl }: { pdfUrl: string }) {
  return (
    <div className="max-w-[600px] overflow-hidden rounded-md p-6 shadow-lg">
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

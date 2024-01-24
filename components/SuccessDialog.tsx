'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function SuccessDialog({
  open,
  setOpen,
  senderLogo = '/acctual-logo-for-invoice.png',
  receiverLogo = '/family-logo-for-invoice.png',
}: {
  open: boolean
  setOpen: (open: boolean) => void
  senderLogo?: string
  receiverLogo?: string
}) {
  useEffect(() => {
    async function fireConfetti() {
      const confetti = await import('canvas-confetti')
      confetti.default({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }

    if (open) {
      fireConfetti()
    }
  }, [open])
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
      }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Success!</DialogTitle>
          <DialogDescription>
            <div className="relative w-full">
              <Image
                src={senderLogo}
                alt="Sender logo"
                width={100}
                height={100}
                className="absolute left-[75px] top-[150px]"
              />
              <Image
                src={receiverLogo}
                alt="Receiver logo"
                width={100}
                height={100}
                className="absolute right-[75px] top-[200px]"
              />

              <Image
                src="/the-office-handshake.jpg"
                alt="Business done"
                width={600}
                height={547}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

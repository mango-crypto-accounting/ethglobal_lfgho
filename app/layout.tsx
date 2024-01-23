import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { Web3Providers } from '@/components/providers/Web3Providers'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Acctual LFGHO',
  description: 'Invoice & pay in GHO',
  metadataBase: new URL(`https://invoice3.xyz`),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen overflow-x-hidden bg-background font-sans antialiased',
          fontSans.variable,
        )}>
        <Web3Providers>{children}</Web3Providers>
        <Toaster />
      </body>
    </html>
  )
}

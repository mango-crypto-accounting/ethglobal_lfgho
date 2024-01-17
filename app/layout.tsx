import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Web3Providers } from "@/components/providers/Web3Providers";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Acctual LFGHO",
  description: "Lets fucking goooo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Web3Providers>{children}</Web3Providers>
        <Toaster />
      </body>
    </html>
  );
}

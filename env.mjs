import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    ACCTUAL_INVOICE_API: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_ALCHEMY_ID: z.string().min(1),
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_WALLET_CONNECT_APP_NAME: z.string().min(1),
  },
  runtimeEnv: {
    ACCTUAL_INVOICE_API: process.env.ACCTUAL_INVOICE_API,
    NEXT_PUBLIC_ALCHEMY_ID: process.env.NEXT_PUBLIC_ALCHEMY_ID,
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID:
      process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    NEXT_PUBLIC_WALLET_CONNECT_APP_NAME:
      process.env.NEXT_PUBLIC_WALLET_CONNECT_APP_NAME,
  },
})

'use client'

import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { WagmiConfig, createConfig, mainnet, sepolia } from 'wagmi'
import { env } from '@/env.mjs'

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: env.NEXT_PUBLIC_ALCHEMY_ID,
    walletConnectProjectId: env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,

    // Required
    appName: env.NEXT_PUBLIC_WALLET_CONNECT_APP_NAME,
    chains: [mainnet, sepolia],

    // Optional
    // appDescription: "Your App Description",
    // appUrl: "https://family.co", // your app's url
    // appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
)
export const Web3Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </WagmiConfig>
  )
}

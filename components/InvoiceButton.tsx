'use client'

import React, { useState } from 'react'
import { InterestRate, Pool } from '@aave/contract-helpers'
import { ConnectKitButton } from 'connectkit'
import { ethers } from 'ethers'
import { CheckIcon } from 'lucide-react'
import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import { useEthersProvider } from '@/hooks/useEthersProvider'
import { useEthersSigner } from '@/hooks/useEthersSigner'

const AAVE_V3_POOL_ADDRESS = '0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A'
const GHO_TOKEN_ADDRESS = '0xc4bF5CbDaBE595361438F8c6a187bDc330539c60'

export function InvoiceButton() {
  const { address } = useAccount()

  const provider = useEthersProvider()
  const signer = useEthersSigner()

  const [status, setStatus] = useState('')

  const depositETHAndBorrowGHO = async () => {
    if (!address) {
      setStatus('Please connect your wallet.')
      return
    }

    if (!signer) {
      setStatus('Please connect your wallet.')
      return
    }

    try {
      const depositAmount = ethers.utils.parseEther('0.01')
      setStatus('Depositing ETH...')
      await signer.sendTransaction({
        to: AAVE_V3_POOL_ADDRESS,
        value: depositAmount.toBigInt(),
        gasLimit: ethers.utils.hexlify(1000000),
      })

      // Initialize the Aave Pool with the connected signer
      const pool = new Pool(provider, { POOL: AAVE_V3_POOL_ADDRESS })

      const borrowAmount = ethers.utils.parseUnits('0.01', 'ether')
      setStatus('Borrowing GHO...')

      const txs = await pool.borrow({
        user: address,
        reserve: GHO_TOKEN_ADDRESS,
        amount: borrowAmount.toString(),
        interestRateMode: InterestRate.Variable,
      })

      // Wait for the transaction to be mined
      txs.map(async (tx) => {
        const awaitedTx = await tx.tx()
        console.log(awaitedTx)
      })

      setStatus('Transaction successful!')
    } catch (error) {
      console.error(error)
      setStatus('An error occurred.')
    }
  }

  return address ? (
    <>
      <Button
        className="w-full"
        type="submit"
        onClick={() => {
          depositETHAndBorrowGHO()
        }}>
        <CheckIcon className="mr-2 h-4 w-4" /> Pay
      </Button>
      {status && <p className="text-sm text-gray-500">{status}</p>}
    </>
  ) : (
    <ConnectKitButton.Custom>
      {({ show }) => {
        return (
          <Button
            type="button"
            className="w-full"
            onClick={(e) => {
              e.preventDefault()
              show?.()
            }}>
            Connect Wallet
          </Button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}

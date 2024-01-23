'use client'

import React, { useState } from 'react'
import { ConnectKitButton } from 'connectkit'
import { ethers } from 'ethers'
import { motion } from 'framer-motion'
import { BanknoteIcon, CheckIcon, ClockIcon } from 'lucide-react'
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { TInvoice } from '@/lib/types'
import POOL_ABI from '@/lib/web3/erc20ABI.json'
import GHO_ABI from '@/lib/web3/ghoABI.json'
import WETH_GATEWAY_ABI from '@/lib/web3/wethGatewayABI.json'

const WETH_GATEWAWY_ADDRESS = '0x387d311e47e80b498169e6fb51d3193167d89F7D'
const AAVE_V3_POOL_ADDRESS = '0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951'
const GHO_TOKEN_ADDRESS = '0xc4bF5CbDaBE595361438F8c6a187bDc330539c60'

const ETH_TO_USDC_EXCHANGE_RATE = 2200

export function InvoiceButton({ invoice }: { invoice: TInvoice }) {
  const { address } = useAccount()
  // Step state
  const [step, setStep] = useState('deposit') // 'deposit', 'borrow', 'send'

  const sendTo = invoice.crypto.walletAddress

  // const totalInUSDC = ethers.utils.parseUnits(String(invoice.total), 'ether') // Total in USDC
  const totalInUSDC = ethers.utils.parseUnits('1', 'ether') // Total in USDC

  // Assuming 1 GHO = 1 USDC for simplicity
  const ltvRatio = 0.6 // 60%
  const depositAmountInETH = totalInUSDC
    .mul(ethers.utils.parseUnits('1', 'ether'))
    .div(
      ethers.utils.parseUnits(
        String(ltvRatio * ETH_TO_USDC_EXCHANGE_RATE),
        'ether',
      ),
    )

  // Borrow amount is the same as the invoice total
  const borrowAmount = totalInUSDC

  // Prepare contract for WETH gateway
  const { config: wethGatewayConfig } = usePrepareContractWrite({
    address: WETH_GATEWAWY_ADDRESS,
    abi: WETH_GATEWAY_ABI,
    value: depositAmountInETH.toBigInt(),
    functionName: 'depositETH',
    args: [AAVE_V3_POOL_ADDRESS, address, 0],
  })

  const {
    write: wethGatewayWrite,
    isError: isDepositError,
    isLoading: isDepositLoading,
    isSuccess: isDepositSuccesss,
  } = useContractWrite({
    ...wethGatewayConfig,
    onSuccess: () => {
      const data = {
        address: address,
        amount: depositAmountInETH,
        sendTo: sendTo,
      }
      toast({
        title: 'Deposit submitted! Payload:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
      setStep('borrow') // Move to next step after deposit
    },
  })

  // Prepare contract write for borrow
  const { config: borrowConfig } = usePrepareContractWrite({
    address: AAVE_V3_POOL_ADDRESS,
    abi: POOL_ABI,
    functionName: 'borrow', // replace with actual function name
    args: [GHO_TOKEN_ADDRESS, borrowAmount.toBigInt(), 2, 0, address],
  })

  const {
    write: borrowWrite,
    isLoading: isBorrowLoading,
    isSuccess: isBorrowSuccess,
  } = useContractWrite({
    ...borrowConfig,
    onSuccess: () => {
      const data = {}
      toast({
        title: 'Borrow submitted! Payload:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
      setStep('send') // Move to next step after borrow
    },
  })

  // Transfer GHO using GHO contract
  const { config: ghoConfig } = usePrepareContractWrite({
    address: GHO_TOKEN_ADDRESS,
    abi: GHO_ABI,
    functionName: 'transfer',
    args: [sendTo, borrowAmount.toBigInt()],
  })

  const {
    write: ghoWrite,
    isLoading: isGhoLoading,
    isSuccess: isGhoSuccess,
  } = useContractWrite({
    ...ghoConfig,
    onSuccess: () => {
      const data = {
        address: address,
        amount: borrowAmount,
        sendTo: sendTo,
      }
      toast({
        title: 'Transfer submitted! Payload:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    },
  })

  const handleDeposit = () => {
    wethGatewayWrite?.()
  }

  const handleBorrow = () => {
    borrowWrite?.()
  }

  const handleSend = () => {
    ghoWrite?.()
  }

  const variants = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  }

  return address ? (
    <>
      {step === 'deposit' && (
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit">
          <Button
            className="mb-4 w-full"
            variant={isDepositSuccesss ? 'secondary' : 'default'}
            disabled={isDepositLoading || isDepositSuccesss}
            onClick={handleDeposit}>
            {isDepositSuccesss ? (
              <CheckIcon className="mr-2 h-4 w-4" />
            ) : (
              <BanknoteIcon className="mr-2 h-4 w-4" />
            )}
            {isDepositLoading ? 'Depositing...' : 'Deposit'}
          </Button>
        </motion.div>
      )}

      {step === 'borrow' && (
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit">
          <Button
            className="w-full"
            variant={isBorrowSuccess ? 'secondary' : 'default'}
            disabled={isBorrowLoading || isBorrowSuccess}
            onClick={handleBorrow}>
            {isBorrowSuccess ? (
              <CheckIcon className="mr-2 h-4 w-4" />
            ) : (
              <ClockIcon className="mr-2 h-4 w-4" />
            )}
            {isBorrowLoading ? 'Borrowing...' : 'Borrow'}
          </Button>
        </motion.div>
      )}

      {step === 'send' && (
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit">
          <Button
            className="w-full"
            variant={isGhoSuccess ? 'secondary' : 'default'}
            disabled={isGhoLoading || isGhoSuccess}
            onClick={handleSend}>
            {isGhoSuccess ? (
              <CheckIcon className="mr-2 h-4 w-4" />
            ) : (
              <ClockIcon className="mr-2 h-4 w-4" />
            )}
            {isGhoLoading ? 'Sending...' : 'Send'}
          </Button>
        </motion.div>
      )}
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

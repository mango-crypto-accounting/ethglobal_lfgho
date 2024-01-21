'use client'

import React, { useState } from 'react'
import { ConnectKitButton } from 'connectkit'
import { ethers } from 'ethers'
import { BanknoteIcon, CheckIcon, ClockIcon } from 'lucide-react'
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { Button } from '@/components/ui/button'
import { useEthersSigner } from '@/hooks/useEthersSigner'
import POOL_ABI from '@/lib/web3/erc20ABI.json'
import WETH_GATEWAY_ABI from '@/lib/web3/wethGatewayABI.json'

const WETH_GATEWAWY_ADDRESS = '0x387d311e47e80b498169e6fb51d3193167d89F7D'
const AAVE_V3_POOL_ADDRESS = '0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951'
const GHO_TOKEN_ADDRESS = '0xc4bF5CbDaBE595361438F8c6a187bDc330539c60'

export function InvoiceButton() {
  const { address } = useAccount()

  const depositAmount = ethers.utils.parseEther('0.01')
  const borrowAmount = ethers.utils.parseUnits(String(0.01 * 0.6), 'ether') // 60% of 0.01 ETH

  // Prepare contract for WETH gateway
  const { config: wethGatewayConfig } = usePrepareContractWrite({
    address: WETH_GATEWAWY_ADDRESS,
    abi: WETH_GATEWAY_ABI,
    value: depositAmount.toBigInt(),
    functionName: 'depositETH',
    args: [AAVE_V3_POOL_ADDRESS, address, 0],
  })

  const {
    write: wethGatewayWrite,
    data: wethGatewayData,
    isError: isDepositError,
    isLoading: isDepositLoading,
    isSuccess: isDepositSuccesss,
  } = useContractWrite(wethGatewayConfig)

  // Prepare contract write for borrow
  const { config: borrowConfig } = usePrepareContractWrite({
    address: AAVE_V3_POOL_ADDRESS,
    abi: POOL_ABI,
    functionName: 'borrow', // replace with actual function name
    args: [GHO_TOKEN_ADDRESS, borrowAmount.toBigInt(), 2, 0, address],
  })

  const {
    write: borrowWrite,
    data: borrowData,
    isLoading: isBorrowLoading,
    isSuccess: isBorrowSuccess,
  } = useContractWrite(borrowConfig)

  return address ? (
    <>
      <Button
        className="mb-4 w-full"
        variant={isDepositSuccesss ? 'secondary' : 'default'}
        disabled={isDepositLoading || isDepositSuccesss}
        onClick={() => {
          wethGatewayWrite?.()
        }}>
        {isDepositSuccesss ? (
          <CheckIcon className="mr-2 h-4 w-4" />
        ) : (
          <BanknoteIcon className="mr-2 h-4 w-4" />
        )}
        {isDepositLoading
          ? 'Depositing...'
          : isDepositSuccesss
            ? 'Deposited!'
            : isDepositError
              ? 'Deposit failed'
              : 'Deposit'}
      </Button>
      <div className="flex gap-4">
        <Button
          className="w-full"
          variant={isBorrowSuccess ? 'secondary' : 'default'}
          disabled={isBorrowLoading || isBorrowSuccess}
          onClick={() => {
            borrowWrite?.()
          }}>
          {isBorrowSuccess ? (
            <CheckIcon className="mr-2 h-4 w-4" />
          ) : (
            <ClockIcon className="mr-2 h-4 w-4" />
          )}
          {isBorrowLoading
            ? 'Borrowing...'
            : isBorrowSuccess
              ? 'Borrowed!'
              : 'Borrow'}
        </Button>
        <Button
          className="w-full"
          type="submit"
          onClick={() => {
            console.log('transfer gho')
          }}>
          <CheckIcon className="mr-2 h-4 w-4" /> Pay now
        </Button>
      </div>
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

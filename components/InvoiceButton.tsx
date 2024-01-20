'use client'

import React, { useState } from 'react'
import { ConnectKitButton } from 'connectkit'
import { ethers } from 'ethers'
import { CheckIcon } from 'lucide-react'
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { Button } from '@/components/ui/button'
import { useEthersSigner } from '@/hooks/useEthersSigner'
import POOL_ABI from '@/lib/web3/erc20ABI.json'
import WETH_GATEWAY_ABI from '@/lib/web3/wethGatewayABI.json'

const WETH_GATEWAWY_ADDRESS = '0x387d311e47e80b498169e6fb51d3193167d89F7D'
const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
const AAVE_V3_POOL_ADDRESS = '0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951'
const GHO_TOKEN_ADDRESS = '0xc4bF5CbDaBE595361438F8c6a187bDc330539c60'

export function InvoiceButton() {
  const { address } = useAccount()

  // const provider = useEthersProvider()
  const signer = useEthersSigner()

  const [status, setStatus] = useState('')

  const depositAmount = ethers.utils.parseEther('0.01')
  const borrowAmount = ethers.utils.parseUnits('0.01', 'ether')

  // Prepare contract for WETH gateway
  const { config: wethGatewayConfig } = usePrepareContractWrite({
    address: WETH_GATEWAWY_ADDRESS,
    abi: WETH_GATEWAY_ABI,
    functionName: 'depositETH',
    args: [AAVE_V3_POOL_ADDRESS, address, depositAmount.toBigInt()],
  })

  // Prepare contract write for deposit
  const { config: depositConfig } = usePrepareContractWrite({
    address: AAVE_V3_POOL_ADDRESS,
    abi: POOL_ABI,
    functionName: 'deposit', // replace with actual function name
    args: [ETH_ADDRESS, depositAmount, address, 0],
  })

  // Prepare contract write for borrow
  const { config: borrowConfig } = usePrepareContractWrite({
    address: AAVE_V3_POOL_ADDRESS,
    abi: POOL_ABI,
    functionName: 'borrow', // replace with actual function name
    args: [GHO_TOKEN_ADDRESS, borrowAmount, 1, 0, address],
  })

  const {
    write: depositWrite,
    data: depositData,
    isLoading: isDepositLoading,
    isSuccess: isDepositSuccess,
  } = useContractWrite(depositConfig)

  const {
    write: borrowWrite,
    data: borrowData,
    isLoading: isBorrowLoading,
    isSuccess: isBorrowSuccess,
  } = useContractWrite(borrowConfig)

  const { write: wethGatewayWrite } = useContractWrite(wethGatewayConfig)

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
      // Create an instance of the Pool contract
      setStatus('Swapping ETH for wETH...')
      await wethGatewayWrite?.()

      // setStatus('Depositing ETH...')
      // await depositWrite?.()

      // setStatus('Borrowing GHO...')

      // await borrowWrite?.()

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

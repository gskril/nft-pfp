import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useState } from 'react'
import Confetti from 'react-confetti'
import toast from 'react-hot-toast'
import useWindowSize from 'react-use/lib/useWindowSize'

import {
  ABI,
  getContractAddress,
  getEtherscanUrl,
  getOpenseaUrl,
} from '../utils/contract'
import { State } from '../types'
import Button from './Button'
import Success from './Success'

type MintProps = {
  state: State
  setIsMintComplete: (isMintComplete: boolean) => void
}

export default function Mint({ state, setIsMintComplete }: MintProps) {
  const { openConnectModal } = useConnectModal()
  const { width: windowWidth, height: windowHeight } = useWindowSize()

  const { address } = useAccount()
  const { chain } = useNetwork()
  const tokenUri = `ipfs://${state?.message}`

  const { config } = usePrepareContractWrite({
    address: getContractAddress(chain?.id),
    abi: ABI,
    functionName: 'mintNFT',
    args: [address, tokenUri],
  })

  const { data, write } = useContractWrite(config)
  const { isError, isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      setIsMintComplete(true)
      toast.success('Minted NFT', {
        duration: 3000,
      })
    },
  })

  if (state.status !== 'success') return null

  if (!address) {
    return <Button onClick={openConnectModal}>Connect Wallet</Button>
  }

  if (!data) {
    return (
      <Button disabled={!write} onClick={() => write?.()}>
        {`Mint NFT${chain?.id !== 1 ? ` (${chain?.name})` : ''}`}
      </Button>
    )
  }

  if (isLoading) {
    return (
      <Button as="a" href={getEtherscanUrl(data, chain)} loading>
        Minting NFT
      </Button>
    )
  }

  if (isError) {
    return (
      <Button as="a" href={getEtherscanUrl(data, chain)} state="error">
        Transaction Failed
      </Button>
    )
  }

  if (data && !isLoading && !isError) {
    return (
      <>
        <Confetti
          width={windowWidth}
          height={windowHeight}
          colors={['#44BCFO', '#7298F8', '#A099FF', '#DE82FF', '#7F6AFF']}
          style={{ zIndex: '1000' }}
        />

        <Success name="Minted NFT" href={getEtherscanUrl(data, chain)} />

        <Button as="a" href={getOpenseaUrl(chain)} state="success">
          View on OpenSea
        </Button>
      </>
    )
  }

  return null
}

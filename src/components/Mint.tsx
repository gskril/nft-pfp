import { useConnectModal } from '@rainbow-me/rainbowkit'
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import { ABI, getContractAddress, getEtherscanUrl } from '../utils/contract'
import { State } from '../types'
import Button from './Button'
import { useState } from 'react'

export default function Mint({ state }: { state: State }) {
  const { openConnectModal } = useConnectModal()

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
  })

  if (state.status !== 'success') return null

  if (!address) {
    return <Button onClick={openConnectModal}>Connect Wallet</Button>
  }

  if (!data) {
    return (
      <Button disabled={!write} onClick={() => write?.()}>
        {`Mint NFT${chain?.id !== 1 && ` (${chain?.name})`}`}
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
      <Button
        as="a"
        href="https://testnets.opensea.io/collection/opennft-iboh5rhaks"
        state="success"
      >
        View on OpenSea
      </Button>
    )
  }
}

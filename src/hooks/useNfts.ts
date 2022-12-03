import { useEffect, useState } from 'react'
import type { Chain } from 'wagmi'
import type { Nft } from '../types'

type Response = {
  nfts: Nft[]
  ensNames: Nft[]
  isLoading: boolean
  isError: boolean
}

export default function useNfts(address?: string, chain?: Chain): Response {
  const [nfts, setNfts] = useState<Nft[]>([])
  const [ensNames, setEnsNames] = useState<Nft[]>([])
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (address) {
      const url = `https://${
        chain?.id === 5 ? 'testnets-' : ''
      }api.opensea.io/api/v1/assets?owner=${address}&limit=150`
      setIsLoading(true)

      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          // Set NFTs, not including ENS names
          setNfts(
            json.assets.filter((nft: Nft) => nft.asset_contract.name !== 'ENS')
          )

          // Set ENS names
          setEnsNames(
            json.assets.filter((nft: Nft) => nft.asset_contract.name === 'ENS')
          )
        })
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false))
    }
  }, [address, chain])

  return { nfts, ensNames, isLoading, isError }
}

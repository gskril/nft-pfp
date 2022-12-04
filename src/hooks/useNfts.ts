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
    async function fetchData() {
      setIsLoading(true)

      try {
        let cursor: string | null = ''
        let newNFTs: Nft[] = []
        let newEnsNames: Nft[] = []

        while (cursor !== null) {
          const response = await fetch(
            `https://${
              chain?.id === 5 ? 'testnets-' : ''
            }api.opensea.io/api/v1/assets?owner=${address}&limit=50&cursor=${cursor}`
          )
          const data = await response.json()

          newNFTs = newNFTs.concat(
            data.assets.filter((nft: Nft) => nft.asset_contract.name !== 'ENS')
          )
          setNfts(nfts.concat(newNFTs))

          newEnsNames = newEnsNames.concat(
            data.assets.filter((nft: Nft) => nft.asset_contract.name === 'ENS')
          )
          setEnsNames(ensNames.concat(newEnsNames))

          const next = data.next as string
          cursor = next === '' ? null : next

          // Can load the rest in the background
          setIsLoading(false)
        }
      } catch (error) {
        setIsError(true)
        setIsLoading(false)
      }
    }

    if (address) {
      fetchData()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  return { nfts, ensNames, isLoading, isError }
}

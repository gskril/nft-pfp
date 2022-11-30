import {
  useAccount,
  useNetwork,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { Toaster } from 'react-hot-toast'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useEffect, useState } from 'react'

import {
  ENS_RESOLVER,
  ENS_RESOLVER_ABI,
  getEtherscanUrl,
} from '../utils/contract'
import Button from '../components/Button'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import type { Nft } from '../types'
import useNfts from '../hooks/useNfts'

export default function Home() {
  const { address } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { nfts, isLoading, isError } = useNfts(address)

  const [isMounted, setIsMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedNft, setSelectedNft] = useState<Nft | null>(null)

  useEffect(() => setIsMounted(true), [])

  if (!isMounted) return null

  return (
    <>
      <Toaster />

      <Layout size="lg">
        {!address && <Button onClick={openConnectModal}>Connect Wallet</Button>}

        {isLoading && <p>Loading...</p>}
        {isError && <p>Error...</p>}

        {nfts && (
          <div className="nfts">
            {nfts.map((nft) => {
              return (
                <div
                  className="nft"
                  key={nft.permalink}
                  onClick={() => {
                    setSelectedNft(nft)
                    setIsModalOpen(true)
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={nft.image_thumbnail_url} alt={nft.name} />
                  <span>{nft.name}</span>
                </div>
              )
            })}
          </div>
        )}

        {isModalOpen && (
          <TransactionModal setIsOpen={setIsModalOpen} nft={selectedNft!} />
        )}
      </Layout>

      <style jsx>{`
        .nfts {
          display: grid;
          gap: 1.5rem 1rem;
          grid-template-columns: repeat(3, 1fr);
        }

        .nft {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;

          &:hover {
            cursor: pointer;
          }

          img {
            aspect-ratio: 1;
            object-fit: cover;
            border-radius: 0.25rem;
            box-shadow: var(--shadow);
            transition: transform 0.15s ease-in-out;

            &:hover {
              transform: scale(1.04);
            }
          }

          span {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </>
  )
}

type TransactionModalProps = {
  nft: Nft
  setIsOpen: (isOpen: boolean) => void
}

function TransactionModal({ nft, setIsOpen }: TransactionModalProps) {
  // create hook to get nodehash of connected ENS name from the graph
  const nodehash =
    '0xc670b4d01b86494f31a5eaed0c4423c87de30755fa61604cac330074b7ac87f2' // hardcoded for gregskril.eth
  const avatarStr = `eip155:1/${nft.asset_contract.schema_name.toLowerCase()}:${
    nft.asset_contract.address
  }/${nft.token_id}`

  const { chain } = useNetwork()
  const { config } = usePrepareContractWrite({
    address: ENS_RESOLVER,
    abi: ENS_RESOLVER_ABI,
    functionName: 'setText',
    args: [nodehash, 'avatar', avatarStr],
  })

  const { data, write } = useContractWrite(config)
  const { data: success, isLoading, isError } = useWaitForTransaction(data)

  return (
    <Modal setIsOpen={setIsOpen}>
      <div className="content">
        {!data && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={nft.image_thumbnail_url} alt={nft.name} />

            <Button disabled={!write} onClick={() => write?.()}>
              Set Avatar
            </Button>
          </>
        )}

        {data && (
          <a
            href={getEtherscanUrl(data, chain)}
            target="_blank"
            rel="noreferrer"
          >
            View on Etherscan
          </a>
        )}
        {isLoading && <p>Waiting for transaction...</p>}
        {isError && <p>Error...</p>}

        {success && <p>Success!</p>}
      </div>

      <style jsx>{`
        .content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
          margin: 0 auto;
        }

        img {
          aspect-ratio: 1;
          object-fit: cover;
        }
      `}</style>
    </Modal>
  )
}

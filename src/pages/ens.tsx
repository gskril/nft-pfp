import {
  useAccount,
  useDisconnect,
  useNetwork,
  useEnsName,
  useEnsResolver,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { hash } from 'eth-ens-namehash'
import { Toaster } from 'react-hot-toast'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import Head from 'next/head'
import Image from 'next/image'
import useWindowSize from 'react-use/lib/useWindowSize'

import { ENS_RESOLVER_ABI, getEtherscanUrl } from '../utils/contract'
import { usePlausible } from 'next-plausible'
import Button from '../components/Button'
import Hero from '../components/Hero'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import type { Nft } from '../types'
import useNfts from '../hooks/useNfts'

const isDev = process.env.NODE_ENV === 'development'

export default function Home() {
  const { chain } = useNetwork()
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { openConnectModal } = useConnectModal()
  const { nfts, ensNames, isLoading, isError } = useNfts(address, chain)
  const { width: windowWidth, height: windowHeight } = useWindowSize()

  const [isMounted, setIsMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAvatarSet, setIsAvatarSet] = useState(false)
  const [selectedNft, setSelectedNft] = useState<Nft | null>(null)

  useEffect(() => setIsMounted(true), [])

  return (
    <>
      <Head>
        <title>Set Your ENS Avatar</title>
        <meta property="og:title" content="Set Your ENS Avatar" />
        <meta property="twitter:creator" content="@gregskril" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          name="description"
          content="Easily set an NFT as your ENS Avatar"
        />
        <meta
          property="og:description"
          content="Easily set an NFT as your ENS Avatar"
        />
        <meta
          property="og:image"
          content="https://mintyourpfp.xyz/sharing-ens.jpg"
        />
      </Head>

      <Toaster />

      {isAvatarSet && (
        <Confetti
          width={windowWidth}
          height={windowHeight}
          colors={['#44BCFO', '#7298F8', '#A099FF', '#DE82FF', '#7F6AFF']}
          style={{ zIndex: '1000' }}
        />
      )}

      {isMounted && (
        <Layout
          size={address ? 'lg' : 'sm'}
          hero={<Hero title="Set Your ENS Avatar" />}
        >
          {!address && (
            <Button onClick={openConnectModal}>Connect Wallet</Button>
          )}

          {isLoading && <p>Loading...</p>}
          {isError && <p>Error...</p>}

          {address && !isLoading && nfts.length === 0 && (
            <>
              <p style={{ margin: '0' }}>
                You don&apos;t have any NFTs in this wallet.
              </p>
              <Button
                onClick={() => disconnect()}
                style={{
                  width: 'fit-content',
                }}
              >
                Disconnect
              </Button>
            </>
          )}

          {address && !isLoading && nfts.length > 0 && (
            <>
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
                      <img src={nft?.image_thumbnail_url} alt={nft?.name} />
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {isModalOpen && (
            <TransactionModal
              nft={selectedNft!}
              ensNames={ensNames}
              setIsOpen={setIsModalOpen}
              setIsAvatarSet={setIsAvatarSet}
            />
          )}
        </Layout>
      )}

      <style jsx>{`
        .nfts {
          width: 100%;
          display: grid;
          padding: 1rem;
          gap: 1.5rem 1rem;
          border-radius: 0.5rem;
          background-color: #fff;
          box-shadow: var(--shadow);
          grid-template-columns: repeat(auto-fill, minmax(9rem, 2fr));
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
  ensNames: Nft[]
  setIsOpen: (isOpen: boolean) => void
  setIsAvatarSet: (isAvatarSet: boolean) => void
}

function TransactionModal({
  nft,
  ensNames,
  setIsOpen,
  setIsAvatarSet,
}: TransactionModalProps) {
  const plausible = usePlausible()

  const { chain } = useNetwork()
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { data: ensResolver } = useEnsResolver({
    name: ensName ?? undefined,
  })

  const nodehash = ensName && hash(ensName)
  const avatarStr = `eip155:1/${nft.asset_contract.schema_name.toLowerCase()}:${
    nft.asset_contract.address
  }/${nft.token_id}`

  const { config, isError: prepareWriteError } = usePrepareContractWrite({
    address: ensResolver?.address,
    abi: ENS_RESOLVER_ABI,
    functionName: 'setText',
    args: [nodehash, 'avatar', avatarStr],
  })

  const { data, write } = useContractWrite(config)
  const {
    data: success,
    isLoading,
    isError,
  } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      setIsAvatarSet(true)
      plausible('Set ENS Avatar', { props: { status: 'success' } })
    },
    onError: () => {
      plausible('Set ENS Avatar', { props: { status: 'error' } })
    },
  })

  if (!ensName || !address) {
    return (
      <Modal setIsOpen={setIsOpen}>
        <div style={{ textAlign: 'center' }}>
          {ensNames.length === 0 && (
            <>
              <p>Your connected address doesn&apos;t own an ENS name</p>
              <Button
                as="a"
                href={`https://${
                  chain?.id === 5 ? 'alpha' : 'app'
                }.ens.domains/`}
              >
                Register a name
              </Button>
            </>
          )}

          {ensNames.length > 0 && (
            <>
              <p>Your connected address doesn&apos;t have a primary ENS name</p>
              <Button as="a" href="https://ezens.xyz/">
                Set your primary name
              </Button>
            </>
          )}
        </div>
      </Modal>
    )
  }

  return (
    <Modal setIsOpen={setIsOpen} canClose={!data}>
      <h2 className="text-center">Preview Your Profile</h2>
      <div className="content">
        <div className="previews">
          <div className="nft-image">
            <Image
              src={`${
                isDev ? 'http://localhost:3000' : 'https://mintyourpfp.xyz'
              }/api/ens-avatar?name=${ensName}&src=${nft.image_thumbnail_url}`}
              alt={nft.name}
              width={240}
              height={240}
            />
          </div>

          <div className="connections">
            <Profile
              name={ensName}
              address={address}
              image={nft?.image_thumbnail_url}
            />
            <Profile
              site="rainbow"
              name={ensName}
              address={address}
              image={nft.image_thumbnail_url}
            />
          </div>
        </div>

        {!data && (
          <Button disabled={!write} onClick={() => write?.()}>
            Set Avatar
          </Button>
        )}

        {prepareWriteError && (
          <p className="text-center" style={{ color: '#ED7B7B' }}>
            Error preparing transaction
          </p>
        )}

        {isLoading && (
          <Button as="a" href={getEtherscanUrl(data!, chain)} loading>
            View on Etherscan
          </Button>
        )}

        {isError && (
          <Button as="a" href={getEtherscanUrl(data!, chain)} state="error">
            Transaction failed
          </Button>
        )}

        {success && (
          <Button
            as="a"
            href={`https://${
              chain?.id === 5
                ? 'alpha.ens.domains/profile'
                : 'app.ens.domains/name'
            }/${ensName}`}
            state="success"
          >
            View in ENS Manager
          </Button>
        )}
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
          border-radius: 0.5rem;
        }

        .previews {
          display: flex;
          flex-direction: column-reverse;
          align-items: center;
          width: 100%;
          gap: 1rem;

          @media (min-width: 32em) {
            display: grid;
            grid-template-columns: 2fr 3fr;
          }

          @media (min-width: 38em) {
            grid-template-columns: 1fr 1fr;
          }

          .nft-image {
            line-height: 1;
            border-radius: 0.5rem;
            background: #dadfe9;
            overflow: hidden;
            box-shadow: var(--shadow);
          }

          .connections {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;

            @media (min-width: 32em) {
              gap: 1rem;
            }
          }
        }
      `}</style>
    </Modal>
  )
}

function Profile({
  name,
  address,
  image,
  site,
}: {
  name: string
  address: string
  image: string | undefined
  site?: 'rainbow'
}) {
  return (
    <>
      <div className={`profile ${site}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" width={52} height={52} />
        <div className="right">
          <span className="name">{name}</span>
          <span className="address">{`${address.slice(0, 6)}...${address.slice(
            -5
          )}`}</span>
        </div>
      </div>

      <style jsx>{`
        .profile {
          display: flex;
          flex-direction: row;
          gap: 0.625rem;
          background-color: #fff;
          border: 2px solid #e2e8ed;
          box-shadow: var(--shadow);
          padding: 0.5rem 1.125rem 0.5rem 0.5rem;
          border-radius: 10rem;
          width: fit-content;
          overflow: hidden;

          img {
            border-radius: 5rem;
            width: 3.25rem;
            height: 3.25rem;
            object-fit: cover;
            background-color: #dce5f1;
          }

          .right {
            display: flex;
            font-weight: 600;
            flex-direction: column;
            justify-content: center;

            .name {
              font-size: 1.25rem;
            }

            .address {
              font-size: 0.9375rem;
              color: rgba(0, 0, 0, 0.4);
            }
          }

          &.rainbow {
            background: linear-gradient(0deg, #525258, #2b2d30);
            color: #fff;
            padding: 0.375rem 0.75rem 0.375rem 0.5rem;
            border-radius: 0.5rem;
            border: none;
            gap: 0.5rem;

            img {
              width: 2rem;
              height: 2rem;
            }

            .right {
              .name {
                font-size: 1rem;
              }

              .address {
                display: none;
              }
            }
          }
        }
      `}</style>
    </>
  )
}

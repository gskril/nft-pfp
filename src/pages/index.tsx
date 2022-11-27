import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useState } from 'react'
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import { ABI, getContractAddress, getEtherscanUrl } from '../utils/contract'
import handleSubmit from '../utils/handleSubmit'
import type { State } from '../types'
import Hero from '../components/Hero'
import Uploader from '../components/Uploader'

export default function Home() {
  const [state, setState] = useState<State>({ status: 'idle' })

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

  return (
    <>
      <div className="layout">
        <div />

        <main>
          <Hero />
          <div className="interactive">
            {!data && <Uploader state={state} setState={setState} />}

            {state.status === 'success' && !data && (
              <>
                <hr />
                <br />
                <ConnectButton />
                <p>Token URI: {tokenUri}</p>
                {address && <p>Network: {chain?.name}</p>}
                <button disabled={!write} onClick={() => write?.()}>
                  Mint NFT
                </button>
              </>
            )}

            {data && isLoading && (
              <p>
                Transaction pending...{' '}
                <a
                  href={getEtherscanUrl(data, chain)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Etherscan
                </a>
              </p>
            )}

            {isError && <p>Transaction failed</p>}

            {data && !isLoading && !isError && (
              <p>
                Transaction successful!{' '}
                <a
                  href="https://testnets.opensea.io/collection/opennft-iboh5rhaks"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on OpenSea
                </a>{' '}
                (it might take a minute to appear)
              </p>
            )}
          </div>
        </main>

        <footer>hi</footer>
      </div>

      <style jsx>{`
        .layout {
          padding: 1rem;
          display: flex;
          gap: 3rem;
          min-height: 100vh;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          align-items: stretch;

          @media (min-width: 768px) {
            padding: 2rem;
          }

          main {
            display: flex;
            gap: 1.5rem;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex-grow: 1;
          }

          .interactive {
            width: 100%;
            max-width: 22rem;
          }
        }
      `}</style>
    </>
  )
}

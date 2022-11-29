import { Toaster } from 'react-hot-toast'
import { useNetwork } from 'wagmi'
import { useState } from 'react'

import { getOpenseaUrl } from '../utils/contract'
import Button from '../components/Button'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Mint from '../components/Mint'
import Modal from '../components/Modal'
import type { State } from '../types'
import Uploader from '../components/Uploader'

export default function Home() {
  const { chain } = useNetwork()

  const [isMintComplete, setIsMintComplete] = useState(false)
  const [state, setState] = useState<State>({ status: 'idle' })
  const [isHelperModalOpen, setIsHelperModalOpen] = useState<boolean>(false)

  return (
    <>
      <Toaster />

      <div className="layout">
        <div />

        <main>
          <Hero />
          <div className="interactive">
            <Uploader state={state} setState={setState} />
            <Mint state={state} setIsMintComplete={setIsMintComplete} />

            {!isMintComplete && (
              <button
                className="help"
                onClick={() => setIsHelperModalOpen(true)}
              >
                How does it work?
              </button>
            )}
          </div>
        </main>

        <Footer />
      </div>

      {isHelperModalOpen && (
        <div className="help-modal">
          <Modal setIsOpen={setIsHelperModalOpen}>
            <h2 className="text-center">How Does It Work?</h2>
            <p>
              Some platforms allow their users to set an NFT as a verified
              avatar. A few examples are{' '}
              <a
                href="https://farcasterxyz.notion.site/How-to-get-a-purple-checkmark-fb66f0cb0f5f4f24b699b8f288a2f14a"
                target="_blank"
                rel="noreferrer"
              >
                Farcaster
              </a>
              ,{' '}
              <a
                href="https://support.opensea.io/hc/en-us/articles/4415562648851-How-do-I-set-my-NFT-as-my-Twitter-profile-picture-"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>
              , and{' '}
              <a
                href="https://medium.com/the-ethereum-name-service/step-by-step-guide-to-setting-an-nft-as-your-ens-profile-avatar-3562d39567fc"
                target="_blank"
                rel="noreferrer"
              >
                ENS
              </a>
              .
            </p>
            <p style={{ fontWeight: '500', color: '#000' }}>
              This website makes it easy to turn any image into an NFT that can
              be used as an avatar on these platforms.
            </p>
            <p>
              It will upload your image to IPFS, a decentralized file storage
              system, then mint it as an NFT in a{' '}
              <a href={getOpenseaUrl(chain)} target="_blank" rel="noreferrer">
                shared collection
              </a>{' '}
              on the Ethereum blockchain.
            </p>
            <Button
              variant="secondary"
              onClick={() => setIsHelperModalOpen(false)}
            >
              Close
            </Button>
          </Modal>
        </div>
      )}

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

          @media (min-width: 560px) {
            padding: 1.5rem 2rem;
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
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            width: 100%;
            max-width: 22rem;
          }
        }

        .help {
          opacity: 0.5;
          border: none;
          font-weight: 500;
          background: none;
          width: fit-content;

          &-modal {
            a {
              color: #3681f2;
            }
          }
        }
      `}</style>
    </>
  )
}

import { useEffect, useState } from 'react'
import { useNetwork } from 'wagmi'

import { getContractAddress } from '../utils/contract'

export default function Footer() {
  const { chain } = useNetwork()

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const etherscanUrl =
    chain?.id === 5
      ? `https://goerli.etherscan.io/address/${getContractAddress(chain?.id)}`
      : `https://etherscan.io/address/${getContractAddress(chain?.id)}`

  const openseaUrl =
    chain?.id === 5
      ? 'https://testnets.opensea.io/collection/opennft-iboh5rhaks'
      : 'https://opensea.io/collection/opennft-v3'

  return (
    <>
      <footer>
        <div className="links">
          <a
            href="https://twitter.com/gregskril"
            target="_blank"
            rel="noreferrer"
          >
            @gregskril
          </a>
        </div>

        <div className="links">
          <a
            href="https://github.com/gskril/nft-pfp"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <a
            href={mounted ? etherscanUrl : ''}
            target="_blank"
            rel="noreferrer"
          >
            Etherscan
          </a>

          <a href={mounted ? openseaUrl : ''} target="_blank" rel="noreferrer">
            OpenSea
          </a>
        </div>
      </footer>

      <style jsx>{`
        footer {
          gap: 0.5rem;
          display: flex;
          align-items: center;
          font-size: 1.125rem;
          font-weight: 500;
          flex-direction: column;

          @media (min-width: 560px) {
            flex-direction: row;
            justify-content: space-between;
            gap: 2rem;
          }
        }

        .links {
          display: flex;
          gap: 2rem;
        }

        a {
          opacity: 0.6;

          &:hover {
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}

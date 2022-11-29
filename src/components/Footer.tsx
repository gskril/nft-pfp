import { useEffect, useState } from 'react'
import { useNetwork } from 'wagmi'
import Link from 'next/link'

import { getContractAddress } from '../utils/contract'
import Feedback from './Feedback'

export default function Footer() {
  const [isHome, setIsHome] = useState(false)
  useEffect(() => setIsHome(window.location.pathname === '/'), [])

  const { chain } = useNetwork()

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)

  const etherscanUrl =
    chain?.id === 5
      ? `https://goerli.etherscan.io/address/${getContractAddress(chain?.id)}`
      : `https://etherscan.io/address/${getContractAddress(chain?.id)}`

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
          <span>
            {isHome && <Link href="/ens">ENS Avatar</Link>}
            {!isHome && <Link href="/">Home</Link>}
          </span>

          <a
            href="https://github.com/gskril/nft-pfp"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <button onClick={() => setIsFeedbackOpen(!isFeedbackOpen)}>
            Feedback
          </button>

          {isFeedbackOpen && <Feedback setIsOpen={setIsFeedbackOpen} />}
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

          & > * {
            opacity: 0.6;

            &:hover {
              opacity: 1;
              cursor: pointer;
            }
          }

          button {
            background: none;
            border: none;
          }
        }
      `}</style>
    </>
  )
}

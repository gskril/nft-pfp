import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

import { useIsMounted } from '../hooks/useIsMounted'

import Footer from './Footer'

export default function Layout({
  hero,
  children,
  size,
}: {
  hero?: React.ReactNode
  children: React.ReactNode
  size?: 'lg' | 'sm'
}) {
  const isMounted = useIsMounted()
  const { address } = useAccount()

  return (
    <>
      <div className="layout">
        <div className="nav">
          {address && isMounted && (
            <div className="connect-wrapper">
              <ConnectButton showBalance={false} chainStatus="none" />
            </div>
          )}
        </div>

        <main>
          {hero}
          <div className="interactive">{children}</div>
        </main>

        <Footer />
      </div>

      <style jsx>{`
        .layout {
          padding: 1rem;
          display: flex;
          gap: 2.5rem;
          min-height: 100vh;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          align-items: stretch;

          @media (min-width: 560px) {
            padding: 1.5rem 2rem;
          }

          .nav {
            display: flex;
            flex-direction: column;
            align-items: flex-end;

            .connect-wrapper {
              @media (min-width: 47em) {
                position: absolute;
              }
            }
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
            max-width: ${size === 'lg' ? '50rem' : '22rem'};
          }
        }
      `}</style>
    </>
  )
}

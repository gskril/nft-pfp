import { useState } from 'react'

import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Mint from '../components/Mint'
import type { State } from '../types'
import Uploader from '../components/Uploader'

export default function Home() {
  const [state, setState] = useState<State>({ status: 'idle' })

  return (
    <>
      <div className="layout">
        <div />

        <main>
          <Hero />
          <div className="interactive">
            <Uploader state={state} setState={setState} />
            <Mint state={state} />
          </div>
        </main>

        <Footer />
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
            width: 100%;
            max-width: 22rem;
          }
        }
      `}</style>
    </>
  )
}

import '../styles/normalize.scss'
import '../styles/fonts.scss'
import '../styles/globals.scss'

import '@rainbow-me/rainbowkit/styles.css'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import PlausibleProvider from 'next-plausible'
import type { AppProps } from 'next/app'

const { chains, provider } = configureChains(
  [chain.mainnet, chain.goerli],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_KEY! }),
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'NFT PFP',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="mintyourpfp.xyz" trackOutboundLinks>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} modalSize="compact">
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </PlausibleProvider>
  )
}

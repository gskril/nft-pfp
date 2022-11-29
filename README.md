# Mint your PFP as an NFT

This is a simple app to upload/pin an image to IPFS and mint it as an NFT on a shared Ethereum smart contract.

Built on top of the [OpenNFT](https://github.com/DigOppGroup/OpenNFT) contract:

- Mainnet: [0x4A4f4A202C840f7247CfCb429e1B41A5509176D8](https://etherscan.io/address/0x4A4f4A202C840f7247CfCb429e1B41A5509176D8)
- Goerli: [0xfbaD712D849144f0471cE5d2e47E6295042C8625](https://goerli.etherscan.io/address/0xfbaD712D849144f0471cE5d2e47E6295042C8625)

## Getting Started

- Signup for [Pinata](pinata.cloud) and create an API key
- Run `cp .env.example .env.local` and enter your Pinata API key and secret
- Run `yarn` to install dependencies
- Run `yarn dev` to start the development server

## Deploy on Railway

The typical Vercel deployment flow does not work with this app because it requires a server that can read/write to the filesystem. I personally use [Railway](railway.app) to host stuff like this, but I'm sure Heroku or Render would work as well.

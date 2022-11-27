import { ConnectButton } from '@rainbow-me/rainbowkit'
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

import { ABI, getContractAddress, getEtherscanUrl } from '../utils/contract'
import { State } from '../types'

export default function Mint({ state }: { state: State }) {
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

  if (state.status !== 'success') return null

  return (
    <>
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
    </>
  )
}

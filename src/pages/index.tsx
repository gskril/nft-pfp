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
    <div>
      {!data && (
        <form onSubmit={async (e) => await handleSubmit(e, setState)}>
          <input
            type="file"
            name="file"
            id="file"
            accept="image/png, image/jpeg"
            required
          />
          <br />
          <button type="submit">Upload</button>
          <br />
          <p>{state.status}</p>
        </form>
      )}

      <br />

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

      {data && (
        <a
          href={getEtherscanUrl(data, chain)}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Etherscan
        </a>
      )}

      {isLoading && <p>Transaction pending...</p>}

      {isError && <p>Transaction failed</p>}

      {data && !isLoading && !isError && <p>Transaction successful!</p>}
    </div>
  )
}

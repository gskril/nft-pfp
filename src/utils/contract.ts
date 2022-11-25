import type { Chain, SendTransactionResult } from '@wagmi/core/dist'

export const ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'recipient', type: 'address' },
      { internalType: 'string', name: 'tokenURI', type: 'string' },
    ],
    name: 'mintNFT',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const getContractAddress = (chainId?: number) => {
  return chainId === 5
    ? '0xfbaD712D849144f0471cE5d2e47E6295042C8625'
    : '0x4A4f4A202C840f7247CfCb429e1B41A5509176D8'
}

export const getEtherscanUrl = (data: SendTransactionResult, chain?: Chain) => {
  return `https://${chain?.id === 5 ? 'goerli.' : ''}etherscan.io/tx/${
    data.hash
  }`
}

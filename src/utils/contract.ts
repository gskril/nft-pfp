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
  return chain?.id === 5
    ? `https://goerli.etherscan.io/tx/${data.hash}`
    : `https://etherscan.io/tx/${data.hash}`
}

export const getOpenseaUrl = (chain?: Chain) => {
  return chain?.id === 5
    ? 'https://testnets.opensea.io/collection/opennft-iboh5rhaks?search[sortAscending]=false&search[sortBy]=CREATED_DATE'
    : 'https://opensea.io/collection/opennft-v3?search[sortAscending]=false&search[sortBy]=CREATED_DATE'
}

/**
 * ==============================
 * ENS CONTRACT CONSTANTS
 * ==============================
 */

export const ENS_RESOLVER_ABI = [
  {
    constant: false,
    inputs: [
      { internalType: 'bytes32', name: 'node', type: 'bytes32' },
      { internalType: 'string', name: 'key', type: 'string' },
      { internalType: 'string', name: 'value', type: 'string' },
    ],
    name: 'setText',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const ENS_RESOLVER = '0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41'

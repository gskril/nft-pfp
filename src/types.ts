export type Status = 'idle' | 'loading' | 'success' | 'error'

export type State = {
  status: Status
  message?: string
}

export type Nft = {
  name: string
  image_thumbnail_url: string | undefined
  asset_contract: {
    name: string
    address: string
    schema_name: 'ERC721' | 'ERC1155'
  }
  permalink: string
  token_id: string
}

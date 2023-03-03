import pinataSDK from '@pinata/sdk'

const PINATA_API_KEY = process.env.PINATA_API_KEY
const PINATA_API_SECRET = process.env.PINATA_API_SECRET

if (!PINATA_API_KEY || !PINATA_API_SECRET) {
  throw new Error('PINATA_API_KEY and PINATA_API_SECRET must be provided')
}

export const pinata = new pinataSDK(PINATA_API_KEY, PINATA_API_SECRET)

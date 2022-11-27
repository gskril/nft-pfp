import fs from 'fs'
import pinataSDK, { PinataPinResponse } from '@pinata/sdk'
import type { NextApiRequest, NextApiResponse } from 'next'

const PINATA_API_KEY = process.env.PINATA_API_KEY
const PINATA_API_SECRET = process.env.PINATA_API_SECRET

if (!PINATA_API_KEY || !PINATA_API_SECRET) {
  throw new Error('PINATA_API_KEY and PINATA_API_SECRET must be provided')
}

const pinata = new pinataSDK(PINATA_API_KEY, PINATA_API_SECRET)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PinataPinResponse>
) {
  const data = JSON.parse(req.body)
  const { image, filename, name } = data

  // Create the file structure
  const timestamp = Date.now().toString()
  const dirPath = `public/gen/${timestamp}`
  const imgPath = `${dirPath}/${filename}`
  const metadataPath = `${dirPath}/metadata.json`
  fs.mkdirSync(dirPath, { recursive: true })

  // Save the image to disk
  const imageBuffer = Buffer.from(image, 'base64')
  fs.writeFileSync(imgPath, imageBuffer)

  // Pin the image to IPFS
  const imgHash = await pinata.pinFromFS(imgPath).then((res) => res.IpfsHash)

  // Create the metadata JSON file
  const nftMetadata = {
    name: name,
    description: 'NFT avatar',
    image: `ipfs://${imgHash}`,
  }

  // Save the metadata to disk
  fs.writeFileSync(metadataPath, JSON.stringify(nftMetadata))

  // Pin the metadata to IPFS
  const response = await pinata.pinFromFS(metadataPath)

  res.status(200).json(response)

  // Delete the directory from disk
  fs.rmdirSync(dirPath, { recursive: true })
}

// Override default Next.js API limits
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
}

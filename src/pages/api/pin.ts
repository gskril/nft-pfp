import { PinataPinResponse } from '@pinata/sdk'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { pinata } from '../../pinata'

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

  // Create the Pinata metadata
  const options = {
    pinataMetadata: {
      name: name as string,
    },
  }

  // Pin the image to IPFS
  const imgHash = await pinata
    .pinFromFS(imgPath, options)
    .then((res) => res.IpfsHash)

  // Create the metadata JSON file
  const nftMetadata = {
    name: name as string,
    description: 'NFT avatar',
    image: `ipfs://${imgHash}`,
  }

  // Save the metadata to disk
  fs.writeFileSync(metadataPath, JSON.stringify(nftMetadata))

  // Pin the metadata to IPFS
  const response = await pinata.pinFromFS(metadataPath, options)

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

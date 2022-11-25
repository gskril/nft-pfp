import fs from 'fs'
import pinataSDK, { PinataPinResponse } from '@pinata/sdk'
import type { NextApiRequest, NextApiResponse } from 'next'

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY!,
  process.env.PINATA_API_SECRET!
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void | PinataPinResponse>
) {
  const data = JSON.parse(req.body)
  const { image, filename } = data

  // Decode the base64 string
  const imageBuffer = Buffer.from(image, 'base64')

  // Save the image to disk
  const filePath = `public/gen/${filename}`
  fs.writeFileSync(filePath, imageBuffer)

  // Pin the image to IPFS
  const response = await pinata.pinFromFS(filePath, {
    pinataMetadata: {
      name: filename,
    },
  })

  res.status(200).json(response)

  // Delete the image from disk
  fs.rmSync(filePath)
}

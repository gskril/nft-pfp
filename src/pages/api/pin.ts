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
  const src = 'public/favicon.ico'
  const options = {
    pinataMetadata: {
      name: 'favicon',
    },
  }

  const response = await pinata.pinFromFS(src, options)
  res.status(200).json(response)
}

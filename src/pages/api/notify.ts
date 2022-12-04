import type { NextApiRequest, NextApiResponse } from 'next'

const NOTIFY_API = process.env.NOTIFY_API

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { text } = req.body
  const endpoint = `${NOTIFY_API}?text=Feedback from mintyourpfp: `

  await fetch(endpoint + text)
    .then((res) => res.json())
    .then((json) => {
      if (json.error) throw new Error(json.error)
      res.status(200).json(json)
    })
    .catch((err) => res.status(500).json({ error: err }))
}

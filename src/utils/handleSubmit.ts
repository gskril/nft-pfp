import type { FormEvent } from 'react'
import type { State } from '../types'

export default async function handleSubmit(
  e: FormEvent<HTMLFormElement>,
  file: File,
  setState: (state: State) => void
) {
  e.preventDefault()
  setState({ status: 'loading' })

  // Get name for NFT
  const _name = e.currentTarget.name as unknown as HTMLFormElement
  const name = _name.value

  // Format image
  const image = file
  const imageBuffer = await image.arrayBuffer()
  const body = JSON.stringify({
    image: Buffer.from(imageBuffer).toString('base64'),
    filename: image.name,
    name: name,
  })

  // Check file size
  const dataSizeInMb = Buffer.byteLength(body) / 1024 / 1024
  if (dataSizeInMb > 4) {
    setState({ status: 'error', message: 'File is too large' })
    return
  }

  // Send to API
  await fetch('/api/pin', {
    method: 'POST',
    body,
  })
    .then((res) => {
      const errorMsg = 'Failed to upload to IPFS'

      if (!res.ok) {
        // Notify me via Telegram
        fetch('/api/notify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: errorMsg }),
        })

        throw new Error(errorMsg)
      }

      return res.json()
    })
    .then((data) => setState({ status: 'success', message: data.IpfsHash }))
    .catch((err) => setState({ status: 'error', message: err.message }))
}

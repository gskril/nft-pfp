import type { FormEvent } from 'react'
import type { State } from '../types'

export default async function handleSubmit(
  e: FormEvent<HTMLFormElement>,
  setState: (state: State) => void
) {
  e.preventDefault()
  setState({ status: 'loading' })

  // Get name for NFT
  const _name = e.currentTarget.name as unknown as HTMLFormElement
  const name = _name.value

  // Format image
  const image = e.currentTarget.file.files[0]
  const imageBuffer = await image.arrayBuffer()
  const body = JSON.stringify({
    image: Buffer.from(imageBuffer).toString('base64'),
    filename: image.name,
    name: name,
  })

  // Check file size
  const dataSizeInMb = Buffer.byteLength(body) / 1024 / 1024
  if (dataSizeInMb > 4) {
    setState({ status: 'error', message: 'File too large' })
    return
  }

  // Send to API
  await fetch('/api/pin', {
    method: 'POST',
    body,
  })
    .then((res) => res.json())
    .then((data) => setState({ status: 'success', message: data.IpfsHash }))
    .catch((err) => setState({ status: 'error', message: err }))
}

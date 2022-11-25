import { FormEvent, useState } from 'react'
import type { State } from '../types'

export default function Home() {
  const [state, setState] = useState<State>({ status: 'idle' })

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState({ status: 'loading' })

    // Format image
    const image = e.currentTarget.file.files[0]
    const imageBuffer = await image.arrayBuffer()
    const body = JSON.stringify({
      image: Buffer.from(imageBuffer).toString('base64'),
      filename: image.name,
    })

    // Check file size
    const dataSizeInMb = Buffer.byteLength(body) / 1024 / 1024
    if (dataSizeInMb > 4) {
      setState({ status: 'error', error: 'File too large' })
      return
    }

    // Send to API
    await fetch('/api/pin', {
      method: 'POST',
      body,
    })
      .then((res) => res.json())
      .then(() => setState({ status: 'success' }))
      .catch((err) => {
        console.log(err)
        setState({ status: 'error', error: err })
      })
  }

  return (
    <div>
      <form onSubmit={async (e) => await handleSubmit(e)}>
        <input
          type="file"
          name="file"
          id="file"
          accept="image/png, image/jpeg"
          required
        />
        <br />
        <button type="submit">Upload</button>
        <br />
        <p>{state.status}</p>
        <p>{state.error?.toString()}</p>
      </form>
    </div>
  )
}

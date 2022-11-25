import { FormEvent } from 'react'

export default function Home() {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const image = e.currentTarget.file.files[0]
    const imageBuffer = await image.arrayBuffer()

    await fetch('/api/pin', {
      method: 'POST',
      body: JSON.stringify({
        image: Buffer.from(imageBuffer).toString('base64'),
        filename: image.name,
      }),
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
      </form>
    </div>
  )
}

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useState } from 'react'

import handleSubmit from '../utils/handleSubmit'
import type { State } from '../types'

export default function Home() {
  const [state, setState] = useState<State>({ status: 'idle' })

  return (
    <div>
      <form onSubmit={async (e) => await handleSubmit(e, setState)}>
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
        <p>{state.message}</p>
      </form>

      <ConnectButton />
    </div>
  )
}

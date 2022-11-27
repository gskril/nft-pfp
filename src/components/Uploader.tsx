import { useState } from 'react'
import handleSubmit from '../utils/handleSubmit'
import type { State } from '../types'

type UploaderProps = {
  state: State
  setState: React.Dispatch<React.SetStateAction<State>>
}

export default function Uploader({ state, setState }: UploaderProps) {
  const [file, setFile] = useState<File | undefined | null>(null)

  return (
    <>
      <form onSubmit={async (e) => await handleSubmit(e, setState)}>
        <div
          className="file"
          style={{
            backgroundImage: file
              ? `url(${URL.createObjectURL(file)})`
              : undefined,
          }}
        >
          <label htmlFor="file">Attach file (max 4mb)</label>
          <input
            type="file"
            name="file"
            id="file"
            accept="image/png, image/jpeg"
            required
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                setFile(e.target.files?.[0])
              }
            }}
          />
        </div>
        {file && <button type="submit">Upload</button>}
      </form>

      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: 1rem;
        }

        .file {
          width: 100%;
          position: relative;
          text-align: center;
          font-weight: 700;
          background-color: #fff;
          box-shadow: var(--shadow);
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          border-radius: 0.5rem;
          border: ${file ? '1px solid #464646' : '1px dashed #919191'};

          input {
            visibility: hidden;
            position: absolute;
          }

          label {
            width: 100%;
            display: block;
            padding: 5rem 1rem;
            opacity: ${file ? '0' : '0.5'};
          }
        }
      `}</style>
    </>
  )
}

import { ArrowIcon, LoadingIcon, SuccessIcon } from '../assets/icons'
import { useState } from 'react'
import handleSubmit from '../utils/handleSubmit'
import type { State } from '../types'

type UploaderProps = {
  state: State
  setState: React.Dispatch<React.SetStateAction<State>>
}

export default function Uploader({ state, setState }: UploaderProps) {
  const [file, setFile] = useState<File | undefined | null>(null)
  const [name, setName] = useState<string | undefined | null>(null)
  const [fileUrl, setFileUrl] = useState<string | undefined | null>(null)

  if (state.status === 'success') {
    return (
      <>
        <div className="success">
          <div className="left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={fileUrl!} alt={name!} width={36} height={36} />
            <span>{name}</span>
          </div>

          <div className="right">
            <SuccessIcon />
          </div>
        </div>

        <style jsx>{`
          .success {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 2rem;
            padding: 0.5rem;
            font-weight: 500;
            font-size: 1.125rem;
            border-radius: 0.5rem;
            background-color: #fff;
            box-shadow: var(--shadow);

            & > * {
              width: 100%;
            }

            .left {
              display: flex;
              align-items: center;
              gap: 0.5rem;

              img {
                border-radius: 0.375rem;
                aspect-ratio: 1;
                object-fit: cover;
                border: 1px solid rgba(18, 28, 55, 0.2);
              }

              span {
                opacity: 0.8;
              }
            }

            .right {
              width: auto;
            }
          }
        `}</style>
      </>
    )
  }

  return (
    <>
      <form onSubmit={async (e) => await handleSubmit(e, setState)}>
        <div
          className="file"
          style={{
            backgroundImage: file ? `url(${fileUrl})` : undefined,
          }}
        >
          <label htmlFor="file">Attach file (max 4mb)</label>
          <input
            type="file"
            name="file"
            id="file"
            required
            accept="image/png, image/jpeg"
            disabled={state.status === 'loading'}
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                setFile(file)
                setFileUrl(URL.createObjectURL(file))
              }
            }}
          />
        </div>

        {file && (
          <div className="input-wrapper">
            <input
              type="text"
              name="name"
              id="name"
              required
              autoComplete="off"
              placeholder="Name your NFT"
              disabled={state.status === 'loading'}
              onChange={(e) => setName(e.target.value)}
            />

            <button
              type="submit"
              disabled={!name || state.status === 'loading'}
            >
              {state.status === 'loading' ? (
                <LoadingIcon />
              ) : (
                <ArrowIcon disabled={!name} />
              )}
            </button>
          </div>
        )}
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
          overflow: hidden;
          opacity: ${state.status === 'loading' ? 0.7 : 1};
          border: ${file ? '1px solid #464646' : '1px dashed #919191'};

          input {
            visibility: hidden;
            position: absolute;
            inset: 0;
          }

          label {
            width: 100%;
            display: block;
            padding: 5rem 1rem;
            opacity: ${file ? '0' : '0.5'};
          }
        }

        .input-wrapper {
          position: relative;

          input,
          button {
            outline-color: var(--color-primary);
          }

          input {
            width: 100%;
            font-weight: 500;
            background: #fff;
            font-size: 1.125rem;
            border-radius: 0.5rem;
            padding: 0.625rem 0.875rem;
            border: 1px solid rgba(86, 55, 142, 0.26);
            box-shadow: 1px 2px 12px rgba(168, 157, 173, 0.1);

            &:disabled {
              cursor: not-allowed;
              color: RGBA(var(--text-color-rgb), 0.5);
            }

            &::placeholder {
              color: RGBA(var(--text-color-rgb), 0.35);
            }
          }

          button {
            width: auto;
            position: absolute;
            background: none;
            border: none;
            border-radius: 2rem;
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            top: 0.5rem;
            right: 0.5rem;
            bottom: 0.5rem;
          }
        }
      `}</style>
    </>
  )
}

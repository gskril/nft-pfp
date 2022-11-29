import { useEffect, useState } from 'react'
import { usePlausible } from 'next-plausible'
import toast from 'react-hot-toast'

import { ArrowIcon, LoadingIcon, SuccessIcon } from '../assets/icons'
import handleSubmit from '../utils/handleSubmit'
import Success from './Success'
import type { State } from '../types'

type UploaderProps = {
  state: State
  setState: React.Dispatch<React.SetStateAction<State>>
}

export default function Uploader({ state, setState }: UploaderProps) {
  const plausible = usePlausible()

  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [file, setFile] = useState<File | undefined | null>(null)
  const [name, setName] = useState<string | undefined | null>(null)
  const [fileUrl, setFileUrl] = useState<string | undefined | null>(null)

  useEffect(() => {
    if (state.status === 'error') {
      toast.error(state.message!)
      plausible('IPFS Upload', { props: { status: 'error' } })
    } else if (state.status === 'success') {
      toast.success('Pinned to IPFS', { duration: 3000 })
      plausible('IPFS Upload', { props: { status: 'success' } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  if (state.status === 'success') {
    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${state?.message}`
    return <Success name="Uploaded media" href={ipfsUrl} />
  }

  return (
    <>
      <form
        onSubmit={async (e) => {
          if (!file) {
            toast.error('Please select a file first')
          } else {
            await handleSubmit(e, file, setState)
          }
        }}
      >
        <div
          className={`file ${isDragging ? 'file--dragging' : ''}`}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          style={{
            backgroundImage: file ? `url(${fileUrl})` : undefined,
          }}
        >
          <label
            htmlFor="file"
            onDrop={async (e) => {
              e.preventDefault()
              const file = e.dataTransfer.files && e.dataTransfer.files[0]

              if (file && file.type.startsWith('image/')) {
                setFile(file)
                setFileUrl(URL.createObjectURL(file))
              } else {
                toast.error('The file must be an image')
              }
            }}
          >
            Upload image (max 4mb)
          </label>
          <input
            type="file"
            name="file"
            id="file"
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
          background-repeat: no-repeat !important;
          background-position: center !important;
          background-size: cover !important;
          border-radius: 0.5rem;
          overflow: hidden;
          opacity: ${state.status === 'loading' ? 0.7 : 1};
          border: ${file ? '1px solid #464646' : '1px dashed #919191'};

          &--dragging {
            background: #e5e9ef;
          }

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

            &:hover {
              cursor: pointer;
            }
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

import { ArrowIcon, LoadingIcon } from '../assets/icons'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'

export default function Feedback({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void
}) {
  const [text, setText] = useState<string | undefined | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!text) return
    setIsLoading(true)

    const res = await fetch('/api/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })

    if (res.ok === true) {
      toast.success('Feedback sent!')
    } else {
      toast.error(res.statusText)
    }

    setIsLoading(false)
  }

  return (
    <>
      <div className="modal">
        <div className="background" onClick={() => setIsOpen(false)} />
        <div className="content">
          <form onSubmit={async (e) => await handleSubmit(e)}>
            <input
              type="text"
              name="text"
              id="text"
              placeholder="It would be cool if..."
              autoFocus
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" disabled={!text}>
              {isLoading ? (
                <LoadingIcon />
              ) : (
                <ArrowIcon disabled={!text || text.length < 3} />
              )}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(0.5rem);
        }

        .background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
        }

        .content {
          padding: 1.5rem;
          max-width: 34rem;
          width: 100%;
          z-index: 101;
        }

        form {
          position: relative;

          & > * {
            outline-color: var(--color-primary);
          }

          input {
            background: #fff;
            border: none;
            font-size: 1.25rem;
            border-radius: 0.5rem;
            padding: 1rem 3.5rem 1rem 1.25rem;
            width: 100%;
          }

          button {
            background: none;
            border: none;
            position: absolute;
            border-radius: 5rem;
            width: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            top: 50%;
            right: 0.75rem;
            bottom: 0;
            transform: translateY(-50%) scale(1.3);

            &:disabled {
              cursor: not-allowed;
            }
          }
        }
      `}</style>
    </>
  )
}

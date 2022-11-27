import { LoadingIcon } from '../assets/icons'

type ButtonProps = {
  as?: 'button' | 'a'
  href?: string
  loading?: boolean
  state?: 'success' | 'error'
  disabled?: boolean
  children: string
  onClick?: () => void
}

export default function Button({
  as,
  href,
  loading,
  state,
  disabled,
  children,
  onClick,
}: ButtonProps) {
  return (
    <>
      {as === 'a' ? (
        <a href={href} target="_blank" rel="noreferrer">
          {children}
          {loading && <LoadingIcon theme="light" />}
        </a>
      ) : (
        <button onClick={onClick} type="button" disabled={disabled}>
          {children}
          {loading && <LoadingIcon theme="light" />}
        </button>
      )}

      <style jsx>{`
        button,
        a {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          background: ${state === 'error'
            ? '#d55555'
            : state === 'success'
            ? '#44c4a4'
            : '#3889ff'};
          line-height: 1.6;
          padding: 0.75rem 1.25rem;
          font-size: 1.125rem;
          border: none;
          width: 100%;
          border-radius: 0.5rem;
          font-weight: 700;
          color: #fff;
          box-shadow: var(--shadow);
          transition: all 0.15s ease-in-out;

          &:hover,
          &:focus-visible {
            transform: scale(1.025);
          }

          &:disabled {
            transform: unset;
            cursor: not-allowed;
            background: #8dbbff;
          }
        }
      `}</style>
    </>
  )
}

import { LoadingIcon } from '../assets/icons'

type ButtonProps = {
  as?: 'button' | 'a'
  href?: string
  variant?: 'secondary'
  loading?: boolean
  state?: 'success' | 'error'
  disabled?: boolean
  children: string
  onClick?: () => void
  style?: React.CSSProperties
}

export default function Button({
  as,
  href,
  variant,
  loading,
  state,
  disabled,
  children,
  onClick,
  style,
}: ButtonProps) {
  return (
    <>
      {as === 'a' ? (
        <a href={href} target="_blank" rel="noreferrer" style={style}>
          {children}
          {loading && <LoadingIcon theme="light" />}
        </a>
      ) : (
        <button
          onClick={onClick}
          type="button"
          style={style}
          disabled={disabled}
        >
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
            : variant === 'secondary'
            ? 'rgba(82, 152, 255, 0.15)'
            : '#3889ff'};
          line-height: 1.6;
          padding: 0.75rem 1.25rem;
          font-size: 1.125rem;
          border: none;
          width: 100%;
          border-radius: 0.5rem;
          font-weight: 700;
          color: ${variant === 'secondary' ? '#5298ff' : '#fff'};
          box-shadow: ${variant === 'secondary' ? 'none' : 'var(--shadow)'};
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

type ModalProps = {
  setIsOpen: (isOpen: boolean) => void
  children: React.ReactNode
  padding?: boolean
}

export default function Modal({
  setIsOpen,
  children,
  padding = true,
}: ModalProps) {
  return (
    <>
      <div className="modal">
        <div className="background" onClick={() => setIsOpen(false)} />
        <div className="content">{children}</div>
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
          padding: 1.5rem;
        }

        .background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
        }

        .content {
          background: #fff;
          border-radius: 0.5rem;
          max-width: 34rem;
          padding: ${padding ? '1.5rem' : '0'};
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

import { SuccessIcon } from '../assets/icons'

type SuccessProps = {
  imageUrl?: string | null | undefined
  name: string
  href: string
}

export default function Success({ imageUrl, name, href }: SuccessProps) {
  return (
    <>
      <a className="success" href={href} target="_blank" rel="noreferrer">
        <div className="left">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {imageUrl && <img src={imageUrl} alt="" width={36} height={36} />}
          <span>{name}</span>
        </div>

        <div className="right">
          <SuccessIcon />
        </div>
      </a>

      <style jsx>{`
        .success {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          padding: 0.75rem;
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

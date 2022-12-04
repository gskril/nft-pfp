export function Profile({
  address,
  name,
  image,
  site,
  onClick,
}: {
  address: string
  name: string | undefined | null
  image: string | undefined | null
  site?: 'rainbow'
  onClick?: () => void
}) {
  return (
    <>
      <div className={`profile ${site ?? ''}`} onClick={onClick}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image || '/av-default.svg'} alt="" width={46} height={46} />
        <div className="right">
          <span className="name">{name || 'No name set'}</span>
          <span className="address">{`${address.slice(0, 6)}...${address.slice(
            -5
          )}`}</span>
        </div>
      </div>

      <style jsx>{`
        .profile {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.5rem;
          background-color: #fff;
          border: 2px solid #e2e8ed;
          box-shadow: var(--shadow);
          padding: 0.5rem 1.125rem 0.5rem 0.5rem;
          word-spacing: -0.0625rem;
          border-radius: 10rem;
          width: fit-content;
          overflow: hidden;
          transition: transform 0.15s ease-in-out;

          &:hover {
            cursor: ${onClick ? 'pointer' : 'default'};
            transform: ${onClick ? 'translateY(-0.0625rem)' : 'none'};

            img {
              opacity: ${onClick ? 0.85 : 1};
            }
          }

          img {
            --size: 3rem;

            border-radius: 5rem;
            width: var(--size);
            height: var(--size);
            object-fit: cover;
            background-color: #dce5f1;
            transition: opacity 0.1s ease-in-out;
          }

          .right {
            display: flex;
            font-weight: 600;
            flex-direction: column;
            justify-content: center;

            .name {
              --opacity: ${name ? 1 : 0.4};

              color: rgba(0, 0, 0, var(--opacity));
              font-size: 1.125rem;
            }

            .address {
              --opacity: ${name ? 0.4 : 1};

              font-size: 0.9375rem;
              color: rgba(0, 0, 0, var(--opacity));
            }
          }

          &.rainbow {
            background: linear-gradient(0deg, #525258, #2b2d30);
            padding: 0.375rem 0.75rem 0.375rem 0.5rem;
            border-radius: 0.5rem;
            border: none;
            gap: 0.5rem;

            img {
              width: 2rem;
              height: 2rem;
            }

            .right {
              .name {
                color: #fff;
                font-size: 1rem;
              }

              .address {
                display: none;
              }
            }
          }
        }
      `}</style>
    </>
  )
}

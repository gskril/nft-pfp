export default function Hero({ title }: { title: string }) {
  return (
    <>
      <div className="hero">
        <span>The easiest way to</span>
        <h1>{title}</h1>
      </div>

      <style jsx>{`
        .hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          text-align: center;

          @media (min-width: 560px) {
            gap: 0.5rem;
          }

          span {
            opacity: 80%;
            line-height: 1;
            font-weight: 500;
            font-size: 1.5rem;

            @media (min-width: 560px) {
              font-size: 1.625rem;
            }
          }

          h1 {
            line-height: 1;
            font-size: 3rem;
            color: var(--color-primary);

            @media (min-width: 560px) {
              font-size: 4.5rem;
            }
          }
        }
      `}</style>
    </>
  )
}

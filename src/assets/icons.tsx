export function ArrowIcon({ ...props }) {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        opacity: props.disabled ? '0.5' : '1',
      }}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.5 2.01072e-06C17.8513 3.12122e-06 23 5.14873 23 11.5C23 17.8513 17.8513 23 11.5 23C5.14873 23 9.00232e-07 17.8513 2.01072e-06 11.5C3.12122e-06 5.14873 5.14873 9.00232e-07 11.5 2.01072e-06ZM18.6763 12.0843L12.9169 17.3458C12.5635 17.6687 11.9905 17.6687 11.637 17.3458C11.2836 17.0229 11.2836 16.4994 11.637 16.1766L15.8515 12.3265L4.96406 12.3265C4.46424 12.3265 4.05905 11.9563 4.05905 11.4997C4.05905 11.0431 4.46424 10.6729 4.96406 10.6729L15.8515 10.6729L11.637 6.82284C11.2836 6.49997 11.2836 5.97649 11.637 5.65362C11.9905 5.33075 12.5635 5.33075 12.9169 5.65362L18.6763 10.9151C19.0298 11.238 19.0298 11.7614 18.6763 12.0843Z"
        fill="#4F95FF"
      />
    </svg>
  )
}

export function LoadingIcon() {
  return (
    <>
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5 2.5C18.0229 2.5 22.5 6.97716 22.5 12.5C22.5 18.0229 18.0229 22.5 12.5 22.5C6.97716 22.5 2.5 18.0229 2.5 12.5C2.5 6.97716 6.97716 2.5 12.5 2.5Z"
          stroke="#4F95FF"
          stroke-opacity="0.3"
          stroke-width="4"
          stroke-linecap="round"
        />
        <path
          d="M12.5 2.5C18.0229 2.5 22.5 6.97716 22.5 12.5"
          stroke="#4F95FF"
          stroke-width="4"
          stroke-linecap="round"
        />
      </svg>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        svg {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </>
  )
}

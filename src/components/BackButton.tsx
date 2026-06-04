'use client'

type BackButtonProps = {
  fallbackHref: string
}

export function BackButton({ fallbackHref }: BackButtonProps) {
  return (
    <button
      className="back-link"
      onClick={() => {
        if (window.history.length > 1 && document.referrer.startsWith(window.location.origin)) {
          window.history.back()
          return
        }

        window.location.href = fallbackHref
      }}
      type="button"
    >
      <span aria-hidden="true">‹</span>
      Back
    </button>
  )
}

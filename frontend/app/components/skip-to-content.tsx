"use client"

import { useCallback, useEffect, useState } from "react"

export function SkipToContent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSkip = useCallback(() => {
    const content = document.getElementById("main-content")
    if (content) {
      content.tabIndex = -1
      content.focus()
      setTimeout(() => {
        content.removeAttribute("tabindex")
      }, 1000)
    }
  }, [])

  if (!mounted) return null

  return (
    <a
      href="#main-content"
      onClick={handleSkip}
      className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:p-4 focus:bg-white dark:focus:bg-deepOlive focus:text-deepOlive dark:focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-brightOrange"
    >
      Skip to content
    </a>
  )
}


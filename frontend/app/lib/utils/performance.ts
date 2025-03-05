import React from "react"
// Utility function to lazy load components
export function lazyLoadComponent<T extends React.ComponentType<unknown>>(
    importFunc: () => Promise<{ default: T }>,
): React.LazyExoticComponent<T> {
    return React.lazy(importFunc)
}

// Utility function to defer non-critical operations
export function deferOperation(callback: () => void, delay = 0): void {
    if (typeof window !== "undefined") {
        if ("requestIdleCallback" in window) {
            ; (window as Window & typeof globalThis & { requestIdleCallback: (callback: IdleRequestCallback) => void }).requestIdleCallback(() => {
                setTimeout(callback, delay)
            })
        } else {
            setTimeout(() => {
                setTimeout(callback, delay)
            }, 1)
        }
    }
}

// Utility function to preload critical resources
export function preloadResource(url: string, as: "script" | "style" | "image" | "font"): void {
    if (typeof document !== "undefined") {
        const link = document.createElement("link")
        link.rel = "preload"
        link.href = url
        link.as = as
        document.head.appendChild(link)
    }
}


// Simple analytics utility to track page views and events
// Replace with your actual analytics provider implementation

export function trackPageView(url: string): void {
    if (process.env.NODE_ENV !== "production") {
        console.log(`[Analytics] Page view: ${url}`)
        return
    }

    // Example implementation for Google Analytics
    try {
        if (typeof window !== "undefined" && (window as unknown as { gtag: (command: string, id: string, config?: object) => void }).gtag) {
            const gaId = process.env.NEXT_PUBLIC_GA_ID;
            if (gaId) {
                (window as unknown as { gtag: (command: string, id: string, config?: object) => void }).gtag("config", gaId, {
                    page_path: url,
                });
            } else {
                console.error("Google Analytics ID is not defined");
            }
        }
    } catch (error) {
        console.error("Error tracking page view:", error)
    }
}

export function trackEvent(action: string, category: string, label?: string, value?: number): void {
    if (process.env.NODE_ENV !== "production") {
        console.log(`[Analytics] Event: ${action}, Category: ${category}, Label: ${label}, Value: ${value}`)
        return
    }

    // Example implementation for Google Analytics
    try {
        if (typeof window !== "undefined" && (window as unknown as { gtag: (command: string, action: string, options?: object) => void }).gtag) {
            ; (window as unknown as { gtag: (command: string, action: string, options?: object) => void }).gtag("event", action, {
                event_category: category,
                event_label: label,
                value: value,
            })
        }
    } catch (error) {
        console.error("Error tracking event:", error)
    }
}


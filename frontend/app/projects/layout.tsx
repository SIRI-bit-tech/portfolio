import type React from "react"
export default function ProjectsLayout({
                                           children,
                                       }: {
    children: React.ReactNode
}) {
    return <main className="min-h-screen bg-white dark:bg-deepOlive">{children}</main>
}


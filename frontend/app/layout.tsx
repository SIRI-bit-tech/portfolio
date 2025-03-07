import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { SkipToContent } from "@/components/skip-to-content"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "SiriDev | Personal Portfolio",
    template: "%s | SiriDev",
  },
  description:
    "Professional portfolio of SiriDev, a full-stack developer specializing in React, Next.js, and Django applications.",
  keywords: ["developer", "portfolio", "full-stack", "react", "next.js", "django"],
  authors: [{ name: "SiriDev" }],
  creator: "SiriDev",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://siridev.com",
    title: "SiriDev | Personal Portfolio",
    description: "Professional portfolio showcasing projects, skills and experience",
    siteName: "SiriDev Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SiriDev Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SiriDev | Personal Portfolio",
    description: "Professional portfolio showcasing projects, skills and experience",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
  metadataBase: new URL("https://siridev.com"),
  alternates: {
    canonical: "/",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SkipToContent />
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}

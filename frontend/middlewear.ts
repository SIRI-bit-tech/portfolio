import { NextResponse } from "next/server"

export function middleware() {
    // Add security headers to all responses
    const response = NextResponse.next()

    // Security headers
    response.headers.set("X-DNS-Prefetch-Control", "on")
    response.headers.set("X-XSS-Protection", "1; mode=block")
    response.headers.set("X-Frame-Options", "SAMEORIGIN")
    response.headers.set("X-Content-Type-Options", "nosniff")
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

    // Content Security Policy - adjust as needed for your specific requirements
    response.headers.set(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googleapis.com *.gstatic.com; style-src 'self' 'unsafe-inline' *.googleapis.com; img-src 'self' data: blob: *.googleapis.com; font-src 'self' data: *.gstatic.com; connect-src 'self' *.vercel-insights.com; frame-src 'self'",
    )

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
}


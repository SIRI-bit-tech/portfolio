import type { NextRequest } from "next/server"

export function GET(request: NextRequest) {
    const baseUrl = request.nextUrl.origin
    const currentDate = new Date().toISOString()

    // Define your routes here
    const routes = [
        {
            url: "/",
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: "/projects",
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: "/contact",
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.5,
        },
    ]

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
            .map(
                (route) => `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastModified}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
            )
            .join("")}
</urlset>`

    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml",
        },
    })
}


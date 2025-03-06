"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Github, ExternalLink, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TypographyH1, TypographyP } from "@/components/ui/typography"

interface Project {
    id: number
    title: string
    slug: string
    description: string
    image: string
    tags: { name: string }[]
    languages: { name: string }[]
    github_url: string
    live_url: string
}

export default function ProjectPage() {
    const params = useParams()
    const router = useRouter()
    const [project, setProject] = useState<Project | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Extract the slug from params
    const slug = params?.slug as string

    // Fetch project data when slug is available
    useEffect(() => {
        if (!slug) return

        console.log("Fetching project with slug:", slug)

        const fetchProject = async () => {
            try {
                // For testing, use mock data if API URL isn't available
                if (!process.env.NEXT_PUBLIC_API_URL) {
                    console.log("Using mock data since API URL is not available")
                    setProject({
                        id: 1,
                        title: "E-commerce Platform",
                        slug: slug,
                        description:
                            "A full-featured online store with payment processing. This platform includes user authentication, product catalog, shopping cart, checkout process with payment integration, order management, and admin dashboard for inventory management.",
                        image: "/placeholder.svg",
                        tags: [{ name: "React" }, { name: "Django" }, { name: "PostgreSQL" }],
                        languages: [{ name: "JavaScript" }, { name: "Python" }, { name: "SQL" }],
                        github_url: "https://github.com",
                        live_url: "https://example.com",
                    })
                    setIsLoading(false)
                    return
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${slug}/`)
                if (!response.ok) {
                    throw new Error("Failed to fetch project")
                }
                const data = await response.json()
                console.log("Fetched project:", data)
                setProject(data)
                setIsLoading(false)
            } catch (error) {
                console.error("Error fetching project:", error)
                setError("Failed to load project. Please try again later.")
                setIsLoading(false)
            }
        }

        fetchProject()
    }, [slug])

    const handleBackClick = () => {
        router.push("/")
    }

    if (isLoading)
        return (
            <div className="min-h-screen bg-white dark:bg-deepOlive flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-brightOrange"></div>
            </div>
        )

    if (error)
        return (
            <div className="min-h-screen bg-white dark:bg-deepOlive flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-deepOlive dark:text-white mb-4">Error</h2>
                    <p className="text-mutedBlue dark:text-lightTeal">{error}</p>
                    <button onClick={handleBackClick} className="mt-6 btn-primary">
                        Back to Home
                    </button>
                </div>
            </div>
        )

    if (!project)
        return (
            <div className="min-h-screen bg-white dark:bg-deepOlive flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-deepOlive dark:text-white mb-4">Project Not Found</h2>
                    <p className="text-mutedBlue dark:text-lightTeal">The project you&apos;re looking for doesn&apos;t exist.</p>
                    <button onClick={handleBackClick} className="mt-6 btn-primary">
                        Back to Home
                    </button>
                </div>
            </div>
        )

    return (
        <div className="min-h-screen bg-[#1B2936] pt-20">
            <div className="container mx-auto px-4 py-8">
                <Button variant="ghost" onClick={handleBackClick} className="mb-8 text-gray-400 hover:text-white">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Projects
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <TypographyH1 className="text-white mb-6">{project.title}</TypographyH1>
                        <Card className="overflow-hidden bg-[#243442] border-[#2A3C4A] mb-6">
                            <div className="relative h-80 w-full">
                                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                            </div>
                        </Card>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag) => (
                                <Badge key={tag.name} variant="tech">
                                    {tag.name}
                                </Badge>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.languages.map((lang) => (
                                <Badge key={lang.name} variant="language">
                                    {lang.name}
                                </Badge>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <Button variant="default" asChild>
                                <a
                                    href={project.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                >
                                    <Github className="h-4 w-4" />
                                    View Code
                                </a>
                            </Button>
                            <Button variant="secondary" asChild>
                                <a
                                    href={project.live_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    Live Demo
                                </a>
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <Card className="bg-[#243442] border-[#2A3C4A]">
                            <CardHeader>
                                <CardTitle className="text-white">Project Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <TypographyP className="text-gray-400">{project.description}</TypographyP>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#243442] border-[#2A3C4A]">
                            <CardHeader>
                                <CardTitle className="text-white">Key Features</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-5 space-y-2 text-gray-400">
                                    <li>Responsive design for all device sizes</li>
                                    <li>Intuitive user interface with modern design principles</li>
                                    <li>Optimized performance for fast loading times</li>
                                    <li>Comprehensive documentation for easy maintenance</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#243442] border-[#2A3C4A]">
                            <CardHeader>
                                <CardTitle className="text-white">Development Process</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <TypographyP className="text-gray-400">
                                    This project was developed using an agile methodology, with regular iterations and feedback cycles.
                                    The development process included thorough planning, design, implementation, testing, and deployment
                                    phases.
                                </TypographyP>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

"use client"
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { TypographyH1, TypographyLead } from "@/app/components/ui/typography"

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



export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [activeFilter, setActiveFilter] = useState("All")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // For testing, use mock data if API URL isn't available
                if (!process.env.NEXT_PUBLIC_API_URL) {
                    console.log("Using mock data since API URL is not available")
                    setProjects([
                        {
                            id: 1,
                            title: "E-commerce Platform",
                            slug: "e-commerce-platform",
                            description: "A full-featured online store with payment processing",
                            image: "/placeholder.svg",
                            tags: [{ name: "React" }, { name: "Django" }],
                            languages: [{ name: "JavaScript" }, { name: "Python" }],
                            github_url: "https://github.com",
                            live_url: "https://example.com",
                        },
                        {
                            id: 2,
                            title: "Portfolio Website",
                            slug: "portfolio-website",
                            description: "A professional portfolio website",
                            image: "/placeholder.svg",
                            tags: [{ name: "Next.js" }, { name: "Tailwind" }],
                            languages: [{ name: "TypeScript" }, { name: "CSS" }],
                            github_url: "https://github.com",
                            live_url: "https://example.com",
                        },
                        {
                            id: 3,
                            title: "Task Management App",
                            slug: "task-management-app",
                            description: "A productivity app for managing tasks and projects",
                            image: "/placeholder.svg",
                            tags: [{ name: "React" }, { name: "Node.js" }],
                            languages: [{ name: "JavaScript" }, { name: "Express" }],
                            github_url: "https://github.com",
                            live_url: "https://example.com",
                        },
                        {
                            id: 4,
                            title: "Weather Dashboard",
                            slug: "weather-dashboard",
                            description: "Real-time weather information with forecasts",
                            image: "/placeholder.svg",
                            tags: [{ name: "Vue.js" }, { name: "API" }],
                            languages: [{ name: "JavaScript" }, { name: "CSS" }],
                            github_url: "https://github.com",
                            live_url: "https://example.com",
                        },
                    ])
                    setIsLoading(false)
                    return
                }

                // Get all projects, not just featured ones
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/`)
                if (!response.ok) {
                    throw new Error("Failed to fetch projects")
                }
                const data = await response.json()
                setProjects(data)
                setIsLoading(false)
            } catch (error) {
                console.error("Error fetching projects:", error)
                setError("Failed to load projects. Please try again later.")
                setIsLoading(false)
            }
        }

        fetchProjects()
    }, [])

    const allTags = [...new Set(projects.flatMap((project) => project.tags.map((tag) => tag.name)))]
    const filters = ["All", ...allTags]

    const filteredProjects =
        activeFilter === "All"
            ? projects
            : projects.filter((project) => project.tags.some((tag) => tag.name === activeFilter))

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white dark:bg-deepOlive flex items-center justify-center pt-16">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-brightOrange"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white dark:bg-deepOlive flex items-center justify-center pt-16">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-deepOlive dark:text-white mb-4">Error</h2>
                    <p className="text-mutedBlue dark:text-lightTeal">{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#1B2936] pt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-16">
                    <TypographyH1 className="text-white">
                        All <span className="text-brightOrange">Projects</span>
                    </TypographyH1>
                    <TypographyLead className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Browse through my complete portfolio of projects. Each project represents a unique challenge and showcases
                        different skills and technologies.
                    </TypographyLead>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {filters.map((filter) => (
                        <Button
                            key={filter}
                            variant={activeFilter === filter ? "default" : "secondary"}
                            onClick={() => setActiveFilter(filter)}
                            className="rounded-full"
                        >
                            {filter}
                        </Button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="overflow-hidden bg-[#243442] border-[#2A3C4A] hover:border-brightOrange/50 transition-all duration-300">
                                <Link href={`/projects/${project.slug}`}>
                                    <div className="relative h-60 w-full overflow-hidden">
                                        <Image
                                            src={project.image || "/placeholder.svg"}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform hover:scale-105"
                                        />
                                    </div>
                                </Link>

                                <CardContent>
                                    <Link href={`/projects/${project.slug}`}>
                                        <CardTitle className="text-xl font-bold mb-2 text-white hover:text-brightOrange transition-colors">
                                            {project.title}
                                        </CardTitle>
                                    </Link>
                                    <CardDescription className="text-gray-400 mb-4">
                                        {project.description.length > 100
                                            ? `${project.description.substring(0, 100)}...`
                                            : project.description}
                                    </CardDescription>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tag) => (
                                            <Badge key={tag.name} className="text-xs">
                                                {tag.name}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.languages.map((lang) => (
                                            <Badge key={lang.name} className="text-xs">
                                                {lang.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>

                                <CardFooter className="flex justify-between">
                                    <div className="flex gap-4">
                                        <a
                                            href={project.github_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-gray-400 hover:text-brightOrange transition-colors"
                                        >
                                            <Github size={18} />
                                            <span>Code</span>
                                        </a>
                                        <a
                                            href={project.live_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-gray-400 hover:text-brightOrange transition-colors"
                                        >
                                            <ExternalLink size={18} />
                                            <span>Live Demo</span>
                                        </a>
                                    </div>
                                    <Link
                                        href={`/projects/${project.slug}`}
                                        className="text-gray-400 hover:text-brightOrange transition-colors"
                                    >
                                        <span>Details</span>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}


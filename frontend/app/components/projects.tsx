"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { TypographyH2, TypographyLead } from "../components/ui/typography"

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

const Projects = () => {
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
          ])
          setIsLoading(false)
          return
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/?featured=true`)
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
    return <div>Loading projects...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <section id="projects" className="bg-[#1B2936] py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <TypographyH2 className="text-white">
            Featured <span className="text-brightOrange">Projects</span>
          </TypographyH2>
          <TypographyLead className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Here are some of my featured projects. Each one was built to solve a specific problem or explore new
            technologies.
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
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
                      className="object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                </Link>

                <CardHeader>
                  <Link href={`/projects/${project.slug}`}>
                    <CardTitle className="text-xl text-white hover:text-brightOrange transition-colors">
                      {project.title}
                    </CardTitle>
                  </Link>
                  <CardDescription className="text-gray-400">
                    {project.description.length > 100
                      ? `${project.description.substring(0, 100)}...`
                      : project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag.name} variant="tech">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.languages.map((lang) => (
                      <Badge key={lang.name} variant="language">
                        {lang.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex gap-4">
                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/projects/${project.slug}`} className="text-gray-400 hover:text-white">
                      Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <Button asChild className="group">
            <Link href="/projects" className="flex items-center gap-2">
              View All Projects
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Projects


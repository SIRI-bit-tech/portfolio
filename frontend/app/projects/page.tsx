import ProjectsContent from "./projects-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects | SiriDev",
  description:
    "Browse through my complete portfolio of projects showcasing my skills in web development, React, Next.js, and more.",
  alternates: {
    canonical: "/projects",
  },
}

export default function Projects() {
  return <ProjectsContent />
}


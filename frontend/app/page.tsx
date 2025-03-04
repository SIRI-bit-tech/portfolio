import { Suspense } from "react"
import Hero from "@/app/components/hero"
import Projects from "@/app/components/projects"
import Skills from "@/app/components/skills"
import Testimonials from "@/app/components/testimonials"
import Contact from "@/app/components/contact"
import Footer from "@/app/components/footer"
import Loading from "@/app/components/loading"

export default function Home() {
  return (
      <main className="min-h-screen bg-white dark:bg-deepOlive">
        <Suspense fallback={<Loading />}>
          <Hero />
          <Projects />
          <Skills />
          <Testimonials />
          <Contact />
          <Footer />
        </Suspense>
      </main>
  )
}


import { Suspense } from "react"
import type { Metadata } from "next"
import Hero from "@/app/components/hero"
import Projects from "@/app/components/projects"
import Skills from "@/app/components/skills"
import Testimonials from "@/app/components/testimonials"
// import Contact from "@/components/contact"
import Newsletter from "@/app/components/newsletter"
import Footer from "@/app/components/footer"
import Loading from "@/app/components/loading"
import { JsonLd } from "@/app/components/json-ld"

export const metadata: Metadata = {
  title: "SiriDev | Full Stack Developer",
  description:
    "Professional portfolio of SiriDev, a full-stack developer specializing in React, Next.js, and Django applications.",
  alternates: {
    canonical: "/",
  },
}

export default function Home() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "SiriDev",
    url: "https://siridev.com",
    jobTitle: "Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "SiriDev",
    },
    sameAs: ["https://github.com/siridev", "https://linkedin.com/in/siridev", "https://twitter.com/siridev"],
  }

  return (
    <>
      <JsonLd data={personSchema} />
      <main id="main-content" className="min-h-screen bg-white dark:bg-deepOlive">
        <Suspense fallback={<Loading />}>
          <Hero />
          <Projects />
          <Skills />
          <Testimonials />
          {/* <Contact /> */}
          <Newsletter />
          <Footer />
        </Suspense>
      </main>
    </>
  )
}


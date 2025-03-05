"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowRight } from "lucide-react"
import { Button } from "@/app/components/ui/button"

const Hero = () => {
  return (
    <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-brightOrange">Hello, I&apos;m</span> <br />
              <span className="text-deepOlive dark:text-white">Siri</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-mutedBlue dark:text-lightTeal mb-6">Full Stack Developer</h2>
            <p className="text-lg mb-8 max-w-lg text-deepOlive dark:text-gray-300">
              I build exceptional digital experiences with modern technologies. Specializing in creating responsive,
              user-friendly applications with clean code and intuitive design.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/projects" legacyBehavior>
                <Button size="lg" className="group">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact" legacyBehavior>
                <Button size="lg" variant="outline">
                  Contact Me
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-lightTeal">
              <Image
                src="/profile-pic.jpeg" // Replace with your actual profile picture
                alt="Siri - Full Stack Developer"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="#projects"
            className="animate-bounce p-2 bg-lightTeal dark:bg-purple rounded-full"
            aria-label="Scroll down"
          >
            <ArrowDown className="text-deepOlive dark:text-white" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero


"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowDown, ArrowRight } from "lucide-react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center py-20 overflow-hidden bg-gradient-to-b from-[#1B2936] to-[#243442]">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[100rem] h-[100rem] opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-lightTeal/30 to-purple/30 rounded-full blur-3xl" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Badge variant="outline" className="text-lightTeal border-lightTeal">
                  Available for freelance work
                </Badge>
              </motion.div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                <span className="text-brightOrange block mb-2">Hello, I&apos;m</span>
                <span className="text-white">Siri</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-lightTeal font-semibold">Full Stack Developer</h2>
              <p className="text-lg text-gray-400 max-w-lg">
                I build exceptional digital experiences with modern technologies. Specializing in creating responsive,
                user-friendly applications with clean code and intuitive design.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="group">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline">
                Contact Me
              </Button>
            </div>

            <div className="flex gap-6">
              <Card className="bg-[#2A3C4A]/50 border-[#3A4C5A] p-4">
                <div className="text-2xl font-bold text-white mb-1">5+</div>
                <div className="text-sm text-gray-400">Years of Experience</div>
              </Card>
              <Card className="bg-[#2A3C4A]/50 border-[#3A4C5A] p-4">
                <div className="text-2xl font-bold text-white mb-1">50+</div>
                <div className="text-sm text-gray-400">Projects Completed</div>
              </Card>
              <Card className="bg-[#2A3C4A]/50 border-[#3A4C5A] p-4">
                <div className="text-2xl font-bold text-white mb-1">30+</div>
                <div className="text-sm text-gray-400">Happy Clients</div>
              </Card>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Decorative circles */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brightOrange to-purple opacity-20 blur-2xl" />
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-lightTeal to-purple opacity-20 blur-xl" />

              {/* Profile image container */}
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-lightTeal/30 backdrop-blur-sm">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Siri - Full Stack Developer"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating card with image */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -right-8 top-10"
              >
                <Card className="bg-[#2A3C4A]/90 border-[#3A4C5A] p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden border border-lightTeal/30">
                      <Image
                        src="/profile-pic.jpeg"
                        alt="Profile thumbnail"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm text-white">Available for hire</span>
                  </div>
                </Card>
              </motion.div>

              {/* Second floating card with image */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -left-8 bottom-10"
              >
                <Card className="bg-[#2A3C4A]/90 border-[#3A4C5A] p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden border border-lightTeal/30">
                      <Image
                        src="/Atom.png"
                        alt="Technology icon"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm text-white">🚀 Let&apos;s build something amazing</span>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full animate-bounce text-gray-400 hover:text-white"
            onClick={() => {
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero


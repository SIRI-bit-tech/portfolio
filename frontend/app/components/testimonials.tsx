"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

interface Testimonial {
  id: number
  name: string
  position: string
  avatar: string
  text: string
}

// Fallback mock data in case API fails
const mockTestimonialsData = [
  {
    id: 1,
    name: "Alex Johnson",
    position: "CTO at TechStart",
    avatar: "/placeholder.svg?height=100&width=100",
    text: "Siri delivered an exceptional e-commerce platform that exceeded our expectations. Their technical expertise and attention to detail resulted in a seamless user experience that has significantly increased our conversion rates.",
  },
  {
    id: 2,
    name: "Sarah Williams",
    position: "Product Manager at DesignHub",
    avatar: "/placeholder.svg?height=100&width=100",
    text: "Working with Siri was a pleasure. They understood our requirements perfectly and delivered a beautiful, functional website that perfectly represents our brand. Their communication throughout the project was excellent.",
  },
  {
    id: 3,
    name: "Michael Chen",
    position: "Founder of DataViz",
    avatar: "/placeholder.svg?height=100&width=100",
    text: "Siri's work on our data visualization dashboard was outstanding. They took complex requirements and created an intuitive interface that our clients love. Their problem-solving skills and technical knowledge are impressive.",
  },
]

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonialsData)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Fetch testimonials from API if URL is available
        if (process.env.NEXT_PUBLIC_API_URL) {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials/`)
          if (response.ok) {
            const data = await response.json()
            if (data && data.length > 0) {
              setTestimonials(data)
            }
          }
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error)
        // Fallback to mock data is already handled by default state
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  if (isLoading) {
    return (
      <section id="testimonials" className="py-20 bg-[#243442]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse h-8 w-40 bg-[#3A4C5A] rounded-full mx-auto mb-4"></div>
            <div className="animate-pulse h-12 w-80 bg-[#3A4C5A] rounded-full mx-auto mb-4"></div>
            <div className="animate-pulse h-4 w-96 bg-[#3A4C5A] rounded-full mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="testimonials" className="py-20 bg-[#243442]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="text-lightTeal border-lightTeal mb-4">
            Testimonials
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Client <span className="text-brightOrange">Feedback</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here&apos;s what some of my clients have to say about working with me.
          </p>
        </div>

        {testimonials.length > 0 ? (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-[#2A3C4A] border-[#3A4C5A] overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className="p-8 md:p-12"
                    >
                      <div className="absolute top-8 right-8 text-brightOrange opacity-10">
                        <Quote size={120} />
                      </div>

                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-lightTeal">
                            <Image
                              src={testimonials[currentIndex].avatar || "/placeholder.svg?height=100&width=100"}
                              alt={testimonials[currentIndex].name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{testimonials[currentIndex].name}</h3>
                            <p className="text-lightTeal">{testimonials[currentIndex].position}</p>
                          </div>
                        </div>

                        <blockquote className="text-lg text-gray-300 italic relative z-10">
                          &quot;{testimonials[currentIndex].text}&quot;
                        </blockquote>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {testimonials.length > 1 && (
                    <>
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={prevTestimonial}
                          className="rounded-full text-gray-400 hover:text-white hover:bg-[#3A4C5A]"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </Button>
                      </div>

                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={nextTestimonial}
                          className="rounded-full text-gray-400 hover:text-white hover:bg-[#3A4C5A]"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {testimonials.length > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? "bg-brightOrange" : "bg-[#3A4C5A] hover:bg-[#4A5C6A]"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-400">No testimonials available yet.</div>
        )}
      </div>
    </section>
  )
}

export default Testimonials


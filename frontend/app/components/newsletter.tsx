"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { subscribe } from "@/lib/mailchimp"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    try {
      setStatus("loading")

      const result = await subscribe(email)

      if (result.success) {
        setStatus("success")
        setMessage("Thank you for subscribing to our newsletter!")
        setEmail("")
      } else {
        setStatus("error")
        setMessage(result.message || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("An error occurred. Please try again later.")
      console.error("Newsletter subscription error:", error)
    }
  }

  return (
    <section className="py-16 bg-gray-100 dark:bg-[#1A2835]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-deepOlive dark:text-white">
            Stay <span className="text-brightOrange">Updated</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Subscribe to my newsletter for the latest updates on projects, tech insights, and exclusive content.
          </p>

          <div className="bg-white dark:bg-[#243442] rounded-lg shadow-md p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  value={email}
                  onChange={(e: { target: { value: React.SetStateAction<string> } }) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-grow bg-gray-50 dark:bg-[#2A3C4A] border-gray-200 dark:border-[#3A4C5A] text-deepOlive dark:text-white"
                  disabled={status === "loading" || status === "success"}
                  required
                />
                <Button
                  type="submit"
                  className="bg-brightOrange hover:bg-brightOrange/90 text-white"
                  disabled={status === "loading" || status === "success"}
                >
                  {status === "loading" ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Subscribing...
                    </div>
                  ) : status === "success" ? (
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Subscribed
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      Subscribe
                    </div>
                  )}
                </Button>
              </div>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md flex items-center"
                >
                  <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{message}</span>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-md flex items-center"
                >
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{message}</span>
                </motion.div>
              )}

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                By subscribing, you agree to receive emails from me. You can unsubscribe at any time. I respect your
                privacy and will never share your information.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter

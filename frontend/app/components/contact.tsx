"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send } from "lucide-react"

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [status, setStatus] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)

        try {
            // In a real app, this would send data to the Django backend
            // await fetch('/api/contact', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(formData)
            // })

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            setSubmitStatus("success")
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            })
        } catch (error) {
            console.error("Error submitting form:", error)
            setSubmitStatus("error")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="section-title text-deepOlive dark:text-white">
                    Get In <span className="text-brightOrange">Touch</span>
                </h2>
                <p className="section-subtitle">Have a project in mind or want to collaborate? Feel free to reach out!</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                        <h3 className="text-2xl font-bold mb-6 text-deepOlive dark:text-white">Contact Information</h3>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-lightTeal dark:bg-purple rounded-full text-deepOlive dark:text-white">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-deepOlive dark:text-white">Email</h4>
                                    <p className="text-mutedBlue dark:text-lightTeal">hello@siridev.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-lightTeal dark:bg-purple rounded-full text-deepOlive dark:text-white">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-deepOlive dark:text-white">Phone</h4>
                                    <p className="text-mutedBlue dark:text-lightTeal">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-lightTeal dark:bg-purple rounded-full text-deepOlive dark:text-white">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-deepOlive dark:text-white">Location</h4>
                                    <p className="text-mutedBlue dark:text-lightTeal">San Francisco, CA</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h3 className="text-2xl font-bold mb-6 text-deepOlive dark:text-white">Follow Me</h3>
                            <div className="flex gap-4">
                                <a
                                    href="https://github.com/siridev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-gray-200 dark:bg-deepOlive hover:bg-brightOrange dark:hover:bg-brightOrange text-deepOlive hover:text-white dark:text-white rounded-full transition-colors"
                                    aria-label="GitHub"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                    </svg>
                                </a>
                                <a
                                    href="https://linkedin.com/in/siridev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-gray-200 dark:bg-deepOlive hover:bg-brightOrange dark:hover:bg-brightOrange text-deepOlive hover:text-white dark:text-white rounded-full transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                        <rect x="2" y="9" width="4" height="12"></rect>
                                        <circle cx="4" cy="4" r="2"></circle>
                                    </svg>
                                </a>
                                <a
                                    href="https://twitter.com/siridev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-gray-200 dark:bg-deepOlive hover:bg-brightOrange dark:hover:bg-brightOrange text-deepOlive hover:text-white dark:text-white rounded-full transition-colors"
                                    aria-label="Twitter"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-bold mb-6 text-deepOlive dark:text-white">Send Me a Message</h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-deepOlive dark:text-white">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-deepOlive rounded-md focus:outline-none focus:ring-2 focus:ring-brightOrange bg-white dark:bg-deepOlive text-deepOlive dark:text-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block mb-2 text-deepOlive dark:text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-deepOlive rounded-md focus:outline-none focus:ring-2 focus:ring-brightOrange bg-white dark:bg-deepOlive text-deepOlive dark:text-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block mb-2 text-deepOlive dark:text-white">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-deepOlive rounded-md focus:outline-none focus:ring-2 focus:ring-brightOrange bg-white dark:bg-deepOlive text-deepOlive dark:text-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block mb-2 text-deepOlive dark:text-white">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-deepOlive rounded-md focus:outline-none focus:ring-2 focus:ring-brightOrange bg-white dark:bg-deepOlive text-deepOlive dark:text-white"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-primary w-full flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        Send Message
                                    </>
                                )}
                            </button>

                            {submitStatus === "success" && (
                                <div className="p-4 bg-green-100 text-green-800 rounded-md">
                                    Your message has been sent successfully! I'll get back to you soon.
                                </div>
                            )}

                            {submitStatus === "error" && (
                                <div className="p-4 bg-red-100 text-red-800 rounded-md">
                                    There was an error sending your message. Please try again later.
                                </div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Contact


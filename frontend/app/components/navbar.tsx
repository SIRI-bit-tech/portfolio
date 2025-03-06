"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/app/components/ui/button"
import { ImageWithFallback } from "@/app/components/image-with-fallback"

const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can access the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Skills", href: "/#skills" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Contact", href: "/contact" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 dark:bg-deepOlive/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3" aria-label="SiriDev home">
              <div className="relative h-12 w-12 sm:h-16 sm:w-16">
                <ImageWithFallback
                  src="/logo.jpeg"
                  fallbackSrc="/placeholder.svg?height=64&width=64"
                  alt="SiriDev Logo"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 48px, 64px"
                />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-brightOrange">SiriDev</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`${
                  isActive(link.href)
                    ? "text-brightOrange"
                    : "text-deepOlive dark:text-white hover:text-brightOrange dark:hover:text-brightOrange"
                } transition-colors duration-300 text-lg font-medium`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.name}
              </Link>
            ))}

            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="ml-4"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-white" />
                ) : (
                  <Moon className="h-5 w-5 text-deepOlive" />
                )}
              </Button>
            )}
          </div>

          <div className="md:hidden flex items-center gap-4">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-white" />
                ) : (
                  <Moon className="h-5 w-5 text-deepOlive" />
                )}
              </Button>
            )}

            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-deepOlive dark:text-white hover:bg-gray-200 dark:hover:bg-deepOlive-800"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-white/95 dark:bg-deepOlive/95 backdrop-blur-sm shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-4 py-3 rounded-md text-base font-medium ${
                  isActive(link.href)
                    ? "text-brightOrange"
                    : "text-deepOlive dark:text-white hover:bg-gray-200 dark:hover:bg-deepOlive-800"
                }`}
                onClick={() => setIsOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar


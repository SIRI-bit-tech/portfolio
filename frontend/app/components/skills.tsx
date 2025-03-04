"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"

const skillsData = [
  {
    category: "Frontend",
    icon: "🎨",
    skills: [
      { name: "React", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "HTML/CSS", level: 95 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Material UI", level: 85 },
    ],
  },
  {
    category: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Django", level: 85 },
      { name: "Python", level: 90 },
      { name: "Node.js", level: 75 },
      { name: "Express", level: 70 },
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 75 },
    ],
  },
  {
    category: "Tools & Others",
    icon: "🛠️",
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 75 },
      { name: "AWS", level: 70 },
      { name: "CI/CD", level: 80 },
      { name: "RESTful APIs", level: 90 },
    ],
  },
]

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-[#1B2936]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="text-lightTeal border-lightTeal mb-4">
            Professional Skills
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            My <span className="text-brightOrange">Expertise</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I&apos;ve worked with a variety of technologies in the web development world. Here&apos;s an overview of my technical
            skills and proficiency levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
            >
              <Card className="bg-[#243442] border-[#2A3C4A] overflow-hidden">
                <CardHeader className="border-b border-[#2A3C4A] bg-[#2A3C4A]/50">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <span className="text-2xl">{category.icon}</span>
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">{skill.name}</span>
                        <span className="text-gray-400 text-sm">{skill.level}%</span>
                      </div>
                      <div className="relative">
                        <Progress
                          value={skill.level}
                          className="h-2 bg-[#2A3C4A]"
                          indicatorClassName="bg-gradient-to-r from-brightOrange to-purple"
                        />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills


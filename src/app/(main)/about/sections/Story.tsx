"use client"
import React from "react"
import { Anton } from "next/font/google"
import Image from "next/image"
import { motion } from "framer-motion"

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
})

type Props = {}

export default function Story({}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen py-14 px-4 md:px-8 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Single merged container */}
        <div className="relative rounded-3xl overflow-visible shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
          <div className="grid lg:grid-cols-[45%_55%] relative">
            {/* Left section - Image area with convex curve */}
            <div className="relative bg-background p-6 lg:p-10 rounded-l-3xl overflow-visible">
              {/* Convex curve on the right */}
              <div className="absolute -right-16 top-0 bottom-0 w-32 overflow-hidden hidden lg:block">
                <div className="absolute inset-0 bg-background rounded-r-full" />
              </div>
              
              {/* Image with sharp corners */}
              <div className="relative rounded-2xl overflow-hidden w-full h-[400px] lg:h-[500px] z-10">
                <Image
                  src="/imgs/gallery/5.jpg"
                  width={700}
                  height={600}
                  alt="Nyansapo classroom teaching"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Curved dividing line with gradient */}
            <div className="absolute left-[45%] -top-8 -bottom-8 w-32 hidden lg:block pointer-events-none z-20">
              <svg 
                className="absolute inset-0 w-full h-full" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="15%" stopColor="rgba(255,255,255,0.2)" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
                    <stop offset="85%" stopColor="rgba(255,255,255,0.2)" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path 
                  d="M 25 0 Q 75 50 25 100" 
                  fill="none" 
                  stroke="url(#curveGradient)" 
                  strokeWidth="3"
                />
              </svg>
            </div>

            {/* Right section - Story area with concave curve */}
            <div className="relative bg-background rounded-r-3xl overflow-hidden">
              {/* Concave curve on the left */}
              <div className="absolute -left-16 top-0 bottom-0 w-32 overflow-hidden hidden lg:block">
                <div className="absolute inset-0 bg-background rounded-l-full" />
              </div>
              
              {/* Story content with more padding */}
              <div className="relative p-10 lg:p-16 lg:py-20 flex flex-col justify-center min-h-[500px] lg:min-h-[650px] z-10">
                <h1
                  className={`text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-8 tracking-tight ${anton.className}`}
                >
                  OUR STORY
                </h1>
                
                <div className="text-foreground/90 text-base lg:text-lg xl:text-xl leading-relaxed space-y-6">
                  <p>
                    Our name, Nyansapo, means "wisdom knot" and this embodies the mission 
                    of our venture. We believe that if we help a student build the proper 
                    foundation of skills, that "strong knot" of wisdom will carry them throughout 
                    their future education.
                  </p>
                  
                  <p>
                    Nyansapo AI creates custom educational tools to instructors to optimize 
                    their workflow. By saving instructors' time and energy, they can maximize 
                    outcomes for their students, who are then more equipped to jump back into 
                    their education.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
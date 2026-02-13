"use client"
import React from "react"
import { Anton } from "next/font/google"
import { motion } from "framer-motion"

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
})

const Mission = () => {
  return (
    <section className="relative text-white overflow-hidden">
      <div className="container mx-auto px-6 py-20 lg:py-32 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* Left: Text content in bordered card */}
        <motion.div
          className="flex flex-col p-10 rounded-3xl border-2 border-white/20 bg-white/5 backdrop-blur-sm flex-shrink-0 w-full max-w-lg lg:w-[580px] h-[520px] lg:h-[540px] justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Mission Title */}
          <h1
            className={`text-6xl lg:text-7xl font-bold uppercase leading-none mb-12 lg:mb-16 ${anton.className}`}
          >
            OUR <span className="text-yellow-400">MISSION</span>
          </h1>

          {/* Mission Text with progressive indentation */}
          <div className="space-y-4 lg:space-y-6">
            {/* First line - no indent */}
            <p className="text-3xl lg:text-4xl font-medium leading-tight">
              We aim to realize the full
            </p>
            
            {/* Second line - small indent */}
            <p className="text-3xl lg:text-4xl font-medium leading-tight ml-6 lg:ml-8">
              potential of technology
            </p>
            
            {/* Third line - medium indent */}
            <p className="text-3xl lg:text-4xl font-medium leading-tight ml-12 lg:ml-16">
              to drive development
            </p>
            
            {/* Fourth line - large indent */}
            <p className="text-3xl lg:text-4xl font-medium leading-tight ml-18 lg:ml-24">
              and productivity in
            </p>
            
            {/* Fifth line - extra large indent */}
            <p className="text-3xl lg:text-4xl font-medium leading-tight ml-24 lg:ml-32">
              communities.
            </p>
          </div>
        </motion.div>

        {/* Right: Devices image */}
        <motion.div
          className="relative w-full max-w-md lg:max-w-lg flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className="w-full max-w-[520px] h-[420px] lg:h-[460px] overflow-hidden rounded-sm">
            <img
              src="/imgs/about/about.png"
              alt="Devices showing technology for development"
              className="w-full h-full object-cover drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Mission
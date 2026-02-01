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
        {/* Left: Text content in bordered card (TALLER) */}
        <motion.div
          className="flex flex-col gap-6 p-10 rounded-3xl border border-white/20 bg-white/5 backdrop-blur-sm flex-shrink-0 w-full max-w-sm lg:w-[420px] h-[520px] lg:h-[540px] justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1
            className={`text-5xl sm:text-6xl font-bold uppercase leading-tight text-center ${anton.className}`}
          >
            OUR <span className="text-yellow-400">MISSION</span>
          </h1>

          <p className="text-2xl sm:text-3xl font-medium leading-relaxed text-center">
            We aim to realize the full
            <br />
            &nbsp;&nbsp;potential of technology
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;to drive development
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and productivity in
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;communities.
          </p>
        </motion.div>

        {/* Right: Devices image (SLIGHTLY SHORTER) */}
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

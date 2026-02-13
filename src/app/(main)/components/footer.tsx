import Link from "next/link"
import Image from "next/image"
import React from "react"
import { navigationLinks } from "@/constants/links"
import { Twitter, Facebook, Instagram, Linkedin } from "./SocialIcons"
import { Mail } from "lucide-react"

export default function Footer() {
  const legal = [
    {
      name: "Terms of Service",
      link: "https://lydian-metatarsal-304.notion.site/NYANSAPO-AI-TERM-OF-SERVICE-1218c217191345babad183918c5d3da0",
    },
    {
      name: "Privacy Policy",
      link: "https://nyansapoai.notion.site/Privacy-Policy-dc8bf36b989140b88bc0c34329a27be6",
    },
  ]

  return (
    <div className="relative bg-background text-white overflow-hidden">
      {/* Hero Section with AI FOR EDUCATION - DRASTICALLY REDUCED */}
      <div className="relative max-w-screen-xl mx-auto px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          {/* Left Section - Hero Text */}
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              <span className="text-[#FDB913]">AI FOR</span>
              <br />
              <span className="text-white">EDUCATION</span>
            </h2>
          </div>

          {/* Right Section - Decorative Diamond Image - MUCH SMALLER */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[140px] aspect-square">
              {/* Background Diamond Shapes - Smaller */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-20 h-20 bg-[#5B9BD5] rotate-45 opacity-70"></div>
                <div className="absolute w-14 h-14 bg-[#70B8E8] rotate-45 top-0 right-0"></div>
                <div className="absolute w-16 h-16 bg-[#4A8BC2] rotate-45 bottom-0 left-0"></div>
              </div>
              {/* Center Image Container */}
              <div className="relative z-10 w-24 h-24 mx-auto rotate-45 overflow-hidden bg-[#5B9BD5]">
                <div className="-rotate-45 scale-150 w-full h-full flex items-center justify-center">
                  <Image
                    src="/imgs/gallery/7.jpg"
                    alt="Education"
                    width={120}
                    height={120}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Links Section - REDUCED PADDING */}
      <div className="bg-background/95 backdrop-blur-sm">
        <div className="max-w-screen-xl mx-auto px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Logo and Tagline */}
            <div className="flex flex-col items-start space-y-2">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="NyansapoAI"
                  width="120"
                  height="120"
                  className="w-auto h-auto"
                />
              </Link>
              <p className="text-base font-light text-white/90">
                Read, Count & Shine
              </p>
            </div>

            {/* Center Column - Main Navigation */}
            <div className="flex flex-col space-y-2">
              <Link 
                href="/products" 
                className="text-base font-light hover:text-cyan-400 transition-colors"
              >
                Products
              </Link>
              <Link 
                href="/about" 
                className="text-base font-light hover:text-cyan-400 transition-colors"
              >
                About Us
              </Link>
              <Link 
                href="/resources" 
                className="text-base font-light hover:text-cyan-400 transition-colors"
              >
                Resources
              </Link>
            </div>

            {/* Right Column - Contact & Legal */}
            <div className="flex flex-col space-y-2">
              <Link 
                href="/contact" 
                className="text-base font-light hover:text-cyan-400 transition-colors"
              >
                Contact Us
              </Link>
              <a 
                href={legal[1].link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-light hover:text-cyan-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href={legal[0].link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-light hover:text-cyan-400 transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Bar - REDUCED HEIGHT */}
      <div className="bg-[#4CAF50] py-2">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="flex justify-center items-center gap-4">
            <a
              href="https://instagram.com/nyansapo_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/twivamwe?mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/nyansapo_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-colors"
              aria-label="Twitter/X"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="mailto:contact@nyansapoai.com"
              className="text-white hover:text-white/80 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/showcase/nyansapo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
// app/careers/page.tsx
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, ExternalLink } from "lucide-react"

// Define the green color
const brandGreen = "#4caf50"

export default function CareersPage() {
  const applicationFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSd8K1zfxJvw6QdhdiSRmxWEO_M5fDx6pyOJYhQ3mhaBDYMvgQ/viewform"

  return (
    <main className="pt-20 bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span 
                className="inline-block py-1 px-3 rounded-full text-sm font-medium mb-6"
                style={{ 
                  backgroundColor: `${brandGreen}20`,
                  color: brandGreen 
                }}
              >
                Careers at Nyansapo AI
              </span>
              <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-foreground tracking-tighter leading-[1.1] mb-8">
                Help Us Unlock Every Child's{" "}
                <span className="italic" style={{ color: brandGreen }}>Potential.</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl font-light">
                We're building AI-powered assessment tools that deliver measurable reading and math gains for 
                children across Africa. Join a passionate, multidisciplinary team working at the intersection 
                of technology, education, and impact.
              </p>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/imgs/gallery/2.jpg" 
                  alt="African children learning with digital tablets in classroom"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              <div 
                className="absolute -bottom-6 -left-6 p-6 rounded-xl shadow-2xl max-w-[240px] text-white"
                style={{ backgroundColor: brandGreen }}
              >
                <p className="text-sm font-medium italic">
                  "Education is the most powerful weapon which you can use to change the world."
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-muted -z-10 translate-x-1/4 skew-x-12"></div>
      </section>

      {/* Job Listings - Only Communications Role */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-headline font-bold tracking-tight mb-4 text-foreground">
              Open Positions
            </h2>
            <div className="h-1 w-20" style={{ backgroundColor: brandGreen }}></div>
          </div>

          <div className="space-y-4">
            {/* Communications and Social Media Lead - Only Position */}
            <div className="group bg-card hover:bg-accent/5 transition-all p-8 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-border">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: brandGreen }}>
                    Marketing & Communications
                  </span>
                  <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Nairobi, Kenya / Remote
                  </span>
                </div>
                <h3 className="text-2xl font-headline font-bold mb-3 text-foreground group-hover:text-[#4caf50] transition-colors">
                  Communications and Social Media Lead
                </h3>
                <p className="text-muted-foreground line-clamp-2 max-w-2xl">
                  Shape the voice of Nyansapo AI. We're looking for a creative storyteller to manage our digital 
                  presence and engage with our growing community of educators and partners.
                </p>
              </div>
              <a
                href={applicationFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-bold text-[#4caf50] group-hover:gap-4 transition-all"
              >
                Apply Now <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
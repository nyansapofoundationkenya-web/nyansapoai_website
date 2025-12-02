import { Metadata } from "next"
import Image from "next/image"
import { featuredPartners } from "@/data/featuredPartners"

export const metadata: Metadata = {
  title: "Featured Partners",
  description: "Organizations and publications featuring Nyansapo",
}

export default function News() {
  return (
    <div
      id="Resources"
      className="py-8 lg:py-16 container px-4 bg-white min-w-screen"
    >
      <h2 className="text-3xl xl:text-4xl font-bold mb-10 text-center text-[#1F2836]">
        Featured By
      </h2>

      {featuredPartners.length > 0 ? (
        <div className="mb-8 lg:mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 items-center">
            {featuredPartners.map((partner) => (
              <a
                key={partner.id}
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:opacity-90 transition-all duration-300 h-24 flex items-center justify-center"
                title={partner.title}
              >
                <div className="w-full h-full relative flex items-center justify-center">
                  <Image
                    src={partner.imageUrl}
                    alt={partner.altText || partner.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    unoptimized={false} // Remove if you want Next.js image optimization
                    priority={false} // Only set to true for above-the-fold images
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No featured partners to display.
        </p>
      )}
    </div>
  )
}
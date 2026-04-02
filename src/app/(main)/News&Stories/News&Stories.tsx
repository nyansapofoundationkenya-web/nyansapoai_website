// News&Stories.tsx
"use client";

import Image from "next/image";
import { featuredPartners } from "@/data/featuredPartners";

export default function News() {
  // Duplicate the partners array to create a seamless infinite scroll effect
  const duplicatedPartners = [...featuredPartners, ...featuredPartners];

  return (
    <div
      id="Resources"
      className="py-8 lg:py-16 bg-white overflow-hidden"
    >
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl xl:text-4xl font-bold mb-10 text-center text-[#1F2836]">
          Featured By
        </h2>
      </div>

      {featuredPartners.length > 0 ? (
        <div className="relative w-full overflow-hidden">
          {/* Gradient fade overlays for smoother edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling container */}
          <div className="animate-scroll-right-to-left inline-flex gap-5 md:gap-6 py-4">
            {duplicatedPartners.map((partner, index) => (
              <a
                key={`${partner.id}-${index}`}
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block flex-shrink-0 w-80 md:w-96 transition-all duration-300 hover:scale-105"
                title={partner.title}
              >
                {/* Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {/* Background Image Section - Taller */}
                  <div className="relative h-56 md:h-64 overflow-hidden">
                    {partner.backgroundImageUrl ? (
                      <Image
                        src={partner.backgroundImageUrl}
                        alt={`${partner.title} background`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
                    )}
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                    
                    {/* Featured Text */}
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <p className="text-white text-sm md:text-base font-semibold text-center line-clamp-3">
                        {partner.featuredText || partner.title}
                      </p>
                    </div>
                  </div>

                  {/* Logo Section - Horizontal layout with "Featured in:" on left and logo on right */}
                  <div className="p-5 flex items-center justify-between gap-4">
                    <div className="text-xs uppercase tracking-wider text-gray-500 font-medium whitespace-nowrap">
                      Featured in:
                    </div>
                    <div className="relative h-12 w-32 flex-shrink-0">
                      <Image
                        src={partner.imageUrl}
                        alt={partner.altText || partner.title}
                        fill
                        className="object-contain"
                        unoptimized={false}
                      />
                    </div>
                  </div>
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

      <style jsx>{`
        @keyframes scrollRightToLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-right-to-left {
          animation: scrollRightToLeft 50s linear infinite;
        }
        /* Pause animation on hover */
        .animate-scroll-right-to-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
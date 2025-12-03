// Preview.tsx
"use client"
import React from "react"
import { useNextSanityImage } from "next-sanity-image"
import { sanityClient } from "@/lib/sanity.client"
import Image from "next/image"

// Define the interface locally or import from a types file
type FeaturedInterface = {
  title: string
  link: string
  mainImage: {
    asset: {
      metadata: {
        lqip?: string
      }
    }
  }
}

type Props = {
  data: FeaturedInterface
}

export default function Preview({ data }: Props) {
  const imageProps = useNextSanityImage(sanityClient, data.mainImage)

  return (
    <a
      href={data.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group h-24 flex items-center justify-center hover:opacity-90 transition-all duration-300"
      title={data.title}
    >
      <div className="w-full h-full relative flex items-center justify-center">
        <Image
          alt={data.title}
          {...imageProps}
          width={200}
          height={100}
          className="object-contain group-hover:scale-105 transition-transform duration-300"
          placeholder="blur"
          blurDataURL={data.mainImage.asset.metadata.lqip || undefined}
        />
      </div>
    </a>
  )
}
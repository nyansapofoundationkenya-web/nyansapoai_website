import Image from "next/image"
import React, { cache } from "react"
import Link from "next/link"
import { sanityClient } from "@/lib/sanity.client"
import { groq } from "next-sanity"
import { cn } from "@/lib/utils"

type Props = {}

export type ProductPreviewInterface = {
  title: string
  summary: string
  mainImage: {
    asset: {
      metadata: { lqip: string }
      url: string
    }
  }
  _id: string
  slug: { current: string }
  externalUrl?: string
  playStoreUrl?: string
}

/* ------------------------------------------------------------------ */
/* Google Play logo (lucide has no brand icons)                        */
/* ------------------------------------------------------------------ */
function PlayStoreIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#00A0FF"
        d="M3.6 2.4 14 12 3.6 21.6c-.4-.2-.6-.6-.6-1.1V3.5c0-.5.2-.9.6-1.1Z"
      />
      <path
        fill="#00E676"
        d="M4 2.2 14 12l3.2-3.2L5.4 2.3c-.5-.2-1-.2-1.4-.1Z"
      />
      <path
        fill="#FF3D00"
        d="M4 21.8 14 12l3.2 3.2-11.8 6.5c-.5.2-1 .2-1.4.1Z"
      />
      <path
        fill="#FFD600"
        d="m17.2 8.8 3.2 1.8c.8.5.8 1.9 0 2.4l-3.2 2.2L14 12l3.2-3.2Z"
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Play Store URLs (matching the parents page)                         */
/* ------------------------------------------------------------------ */
const PLAY = "https://play.google.com/store/apps/details?id="
const TRACK = "&pcampaignid=web_share"

const PLAY_STORE_URLS = {
  nao: `${PLAY}com.nyansapoai.naoassessment${TRACK}`,
  stadi: `${PLAY}com.nyansapoai.stadiLearn${TRACK}`,
  hekima: `${PLAY}com.nyansapo_foundation.hekimaapp${TRACK}`,
} as const

const projectQuery = groq`*[_type=='products']{title,summary,slug,mainImage{asset->{...,metadata{lqip,url}}}}`
const clientFetch = cache(sanityClient.fetch.bind(sanityClient))

const placeholderProduct: ProductPreviewInterface = {
  _id: "hardcoded-stadi-learn",
  title: "Stadi Learn",
  summary:
    "Stadi Learn is a learning app that helps children develop foundational reading skills through interactive phonics activities and guided practice. Lessons are designed to match each learner's level and help children build confidence step by step.",
  slug: { current: "" },
  mainImage: { asset: { metadata: { lqip: "" }, url: "" } },
  externalUrl: "https://naolearn.nyansapoai.app/",
  playStoreUrl: PLAY_STORE_URLS.stadi,
}

// Mock products for local development when Sanity isn't reachable.
const mockProducts: ProductPreviewInterface[] = [
  {
    _id: "mock-1",
    title: "NAO Assessment",
    summary:
      "A quick, standards-aligned assessment that helps teachers pinpoint each student's reading level in minutes, not hours.",
    slug: { current: "reading-assessment-tool" },
    mainImage: { asset: { metadata: { lqip: "" }, url: "" } },
    playStoreUrl: PLAY_STORE_URLS.nao,
  },
  {
    _id: "mock-2",
    title: "Hekima Learning",
    summary:
      "Daily phonics and foundational numeracy practice with friendly bilingual audio guidance — works completely offline after download.",
    slug: { current: "hekima-learning" },
    mainImage: { asset: { metadata: { lqip: "" }, url: "" } },
    playStoreUrl: PLAY_STORE_URLS.hekima,
  },
  placeholderProduct,
]

async function getProducts(): Promise<ProductPreviewInterface[]> {
  try {
    const data = await clientFetch<ProductPreviewInterface[]>(projectQuery)
    if (data && data.length > 0) return data
  } catch (err) {
    console.warn("Sanity fetch failed, falling back to mock data:", err)
  }
  return mockProducts
}

export default async function Products({}: Props) {
  const data = await getProducts()

  const paddedData =
    data.length < 3
      ? [...data, ...Array(3 - data.length).fill(placeholderProduct)]
      : data

  return (
    <div
      id="products"
      className="py-12 px-4 sm:px-8 md:px-16 xl:px-32 2xl:px-64 bg-[#fbfbfb] text-gray-800 min-h-screen"
    >
      <h1 className="text-2xl sm:text-4xl font-bold w-full text-center mt-8 sm:mt-14">
        OUR PRODUCTS
      </h1>
      <h4 className="text-xl sm:text-3xl text-center">
        Assessments. Data Analysis. Targeted Instruction
      </h4>

      <div className="flex flex-wrap justify-center gap-8 mt-12 sm:mt-20 max-w-6xl mx-auto">
        {paddedData.slice(0, 3).map((product, i) => {
          const isNaoLearn =
            product.title.toLowerCase().includes("nao") ||
            product.slug.current?.toLowerCase().includes("nao-learn") ||
            product._id === "hardcoded-nao-learn"

          const bgColor = isNaoLearn
            ? "#5aa2ce" // blue for Nao Learn
            : i % 2 === 0
            ? "#4caf50" // green for even index
            : "#e67e22" // orange for odd index

          return (
            <ProductPreview
              product={product}
              bgColor={bgColor}
              key={`${product._id}-${i}`}
              flexReverse={i % 2 === 0}
              index={i}
            />
          )
        })}
      </div>
    </div>
  )
}

type ProductPreviewProps = {
  product: ProductPreviewInterface
  flexReverse?: boolean
  bgColor: string
  index: number
}

const ProductPreview = ({
  product,
  flexReverse,
  bgColor,
  index,
}: ProductPreviewProps) => {
  const imageSrc =
    index === 0
      ? "/imgs/gallery/5.jpg"
      : index === 1
      ? "/imgs/gallery/7.jpg"
      : "/imgs/gallery/6.jpg"

  const isHardcoded = Boolean(product.externalUrl)

  // Fallback by title match so any product without an explicit URL still gets a correct download link
  const downloadUrl =
    product.playStoreUrl ??
    (product.title.toLowerCase().includes("hekima")
      ? PLAY_STORE_URLS.hekima
      : product.title.toLowerCase().includes("nao") ||
        product.title.toLowerCase().includes("assessment")
      ? PLAY_STORE_URLS.nao
      : PLAY_STORE_URLS.stadi)

  return (
    <div
      className="flex flex-col overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 w-full max-w-sm"
      style={{ backgroundColor: "white" }}
    >
      <div className="relative w-full h-48 sm:h-56 md:h-64">
        <Image
          src={imageSrc}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={index < 2}
        />
      </div>

      <div
        style={{ backgroundColor: bgColor }}
        className="flex flex-col p-6 flex-grow"
      >
        <h1 className="text-xl sm:text-2xl mb-4 font-semibold text-white">
          {product.title}
        </h1>
        <p className="tracking-wide text-white flex-grow mb-6">
          {product.summary}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          {isHardcoded ? (
            <a
              href={product.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex min-h-[44px] items-center justify-center py-2 px-4 rounded-md bg-white text-gray-800 font-medium hover:bg-gray-100 transition-colors duration-200 text-center"
            >
              Learn more
            </a>
          ) : (
            <Link
              href={`/products/${product.slug.current}`}
              className="flex-1 inline-flex min-h-[44px] items-center justify-center py-2 px-4 rounded-md bg-white text-gray-800 font-medium hover:bg-gray-100 transition-colors duration-200 text-center"
            >
              Learn more
            </Link>
          )}

          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Download ${product.title} on Google Play`}
            className="flex-1 inline-flex min-h-[44px] items-center justify-center gap-2 py-2 px-4 rounded-md bg-[#142848] text-white font-bold hover:bg-[#1d3a66] transition-colors duration-200 text-center"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white">
              <PlayStoreIcon className="h-4 w-4" />
            </span>
            Download
          </a>
        </div>
      </div>
    </div>
  )
}
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
}

const projectQuery = groq`*[_type=='products']{title,summary,slug,mainImage{asset->{...,metadata{lqip,url}}}}`
const clientFetch = cache(sanityClient.fetch.bind(sanityClient))

const placeholderProduct: ProductPreviewInterface = {
  _id: "hardcoded-nao-learn",
  title: "Nao Learn",
  summary:
    "NAO Learn is a learning app that helps children develop foundational reading skills through interactive phonics activities and guided practice. Lessons are designed to match each learner's level and help children build confidence step by step.",
  slug: { current: "" },
  mainImage: { asset: { metadata: { lqip: "" }, url: "" } },
  externalUrl: "https://naolearn.nyansapoai.app/",
}

// Mock products for local development when Sanity isn't reachable.
const mockProducts: ProductPreviewInterface[] = [
  {
    _id: "mock-1",
    title: "Reading Assessment Tool",
    summary:
      "A quick, standards-aligned assessment that helps teachers pinpoint each student's reading level in minutes, not hours.",
    slug: { current: "reading-assessment-tool" },
    mainImage: { asset: { metadata: { lqip: "" }, url: "" } },
  },
  {
    _id: "mock-2",
    title: "Classroom Insights Dashboard",
    summary:
      "Turn raw assessment data into clear, actionable insights teachers can use to group students and plan targeted instruction.",
    slug: { current: "classroom-insights-dashboard" },
    mainImage: { asset: { metadata: { lqip: "" }, url: "" } },
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
        {isHardcoded ? (
          <a
            href={product.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-2 px-6 rounded-md bg-white text-gray-800 font-medium hover:bg-gray-100 transition-colors duration-200 text-center"
          >
            Learn more
          </a>
        ) : (
          <Link
            href={`/products/${product.slug.current}`}
            className="inline-block py-2 px-6 rounded-md bg-white text-gray-800 font-medium hover:bg-gray-100 transition-colors duration-200 text-center"
          >
            Learn more
          </Link>
        )}
      </div>
    </div>
  )
}
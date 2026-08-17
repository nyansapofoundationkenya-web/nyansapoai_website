import LearningLabNavbar from "./learning-lab-navbar"
import "@/app/globals.css"
import { Raleway } from "next/font/google"
import { Metadata } from "next"
import RootProviders from "../providers"
import { Toaster } from "react-hot-toast"
import Script from "next/script"

const raleway = Raleway({
  subsets: ["latin"],
  display: "optional",
})

export const metadata: Metadata = {
  title: "Learning Lab | Nyansapo AI",
  description: "Interactive learning tools and resources from Nyansapo AI",
  robots: {
    index: true,
    follow: true,
  },
}

export default function LearningLabLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${raleway.className}`}>
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-34V2V8JHZ0"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-34V2V8JHZ0');
          `}
        </Script>
      </head>
      <body className="dark relative bg-background duration-400">
        <RootProviders>
          <Toaster />
          <LearningLabNavbar />
          {children}
        </RootProviders>
      </body>
    </html>
  )
}
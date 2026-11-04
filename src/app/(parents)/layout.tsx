import "@/app/globals.css"
import { Metadata } from "next"
import Script from "next/script"
import RootProviders from "../providers"

export const metadata: Metadata = {
  title: "Is your child learning at their level? | Nyansapo AI",
  description:
    "Free reading check and fun offline lessons for Kenyan parents. English & Kiswahili, aligned to the CBC.",
}

export default function ParentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-34V2V8JHZ0" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-34V2V8JHZ0');
          `}
        </Script>
      </head>
      <body className="relative bg-[#f6faf8]">
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  )
}
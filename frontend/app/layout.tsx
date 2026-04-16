import type { Metadata } from "next"
import { Raleway, Geist } from "next/font/google"
import "./globals.css"
import Providers from "./providers"
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Customer Management Mini App",
  description:
    "CRM mini app built with Next.js, shadcn UI, TanStack Query, and Axios",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", raleway.variable, "font-sans", geist.variable)}>
      <body className="min-h-full bg-[var(--brand-bg)] text-[var(--brand-text)]">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

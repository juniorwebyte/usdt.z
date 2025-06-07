import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ClientProvider from "@/components/client-provider"
import GalaxyAnimation from "@/components/galaxy-animation"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import PerformanceToggle from "@/components/performance-toggle"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "Tether USD Bridged ZED20",
  description: "Sistema de reivindicação de AirDrop para distribuição de tokens USDT.z - Tether USD Bridged ZED20",
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "/images/USDT-1.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/images/USDT-1.png",
        type: "image/png",
      },
    ],
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
}

function LoadingFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <div className="text-white text-xl">Carregando...</div>
    </div>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />
        <link rel="dns-prefetch" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />
        <link rel="icon" href="/images/USDT-1.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/USDT-1.png" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Suspense fallback={<LoadingFallback />}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <LanguageProvider>
              <ClientProvider>
                <div className="flex flex-col min-h-screen">
                  <div className="flex-grow">
                    <Suspense fallback={<LoadingFallback />}>
                      <GalaxyAnimation />
                    </Suspense>
                    <main>{children}</main>
                    <ScrollToTop />
                    <PerformanceToggle />
                  </div>
                  <Footer />
                </div>
              </ClientProvider>
            </LanguageProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}

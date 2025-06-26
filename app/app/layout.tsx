import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Austin AV Intelligence Platform',
  description: 'Real-time Safety Analysis & Deployment Readiness - Autonomous vehicles are 8.8x safer than human drivers',
  openGraph: {
    title: 'Austin AV Intelligence Platform',
    description: 'Autonomous vehicles are 8.8x safer than human drivers',
    siteName: 'Austin AV Intelligence',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Austin AV Intelligence Platform',
    description: 'Autonomous vehicles are 8.8x safer than human drivers',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

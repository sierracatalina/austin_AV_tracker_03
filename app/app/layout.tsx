import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Austin AV Intelligence Platform',
  description: 'Autonomous vehicles are 8.8x safer than human drivers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <style jsx global>{`
          @tailwind base;
          @tailwind components;
          @tailwind utilities;
          
          body {
            background: linear-gradient(to bottom right, #111827, #000000, #111827);
            min-height: 100vh;
          }
        `}</style>
        {children}
      </body>
    </html>
  )
}

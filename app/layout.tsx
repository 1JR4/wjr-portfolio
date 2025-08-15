import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wonjae Ra - Technical Product Manager',
  description: 'Technical Product Manager with 7+ years of experience bridging technical and business needs, transforming chaos into clarity.',
  keywords: ['technical product manager', 'product management', 'AI/ML', 'GraphQL', 'microservices', 'portfolio'],
  authors: [{ name: 'Wonjae Ra' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
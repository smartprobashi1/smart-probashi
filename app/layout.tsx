import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smart Probashi',
  description: 'Your financial companion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} max-w-md mx-auto bg-background dark:bg-slate-950 text-gray-900 dark:text-slate-50 min-h-screen shadow-lg`}
      >
        <ThemeProvider>
          {/* The max-w-md and mx-auto create a mobile-sized container */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
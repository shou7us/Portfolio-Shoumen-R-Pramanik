import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shoumen R Pramanik — UX Designer',
  description: 'Lead UX Designer specialising in AI-native products, enterprise SaaS, and cross-product systems.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="grid-bg"></div>
        {children}
      </body>
    </html>
  )
}

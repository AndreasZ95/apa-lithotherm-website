import React from 'react'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import './styles.css'

export const dynamic = 'force-dynamic'

export const metadata = {
  description: 'Fireplaces, stone, BBQs, wood stoves, and completed installation projects.',
  title: 'A.P.A LithoTherm',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}

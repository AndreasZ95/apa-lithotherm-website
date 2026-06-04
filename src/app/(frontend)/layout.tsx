import React from 'react'
import { SiteFooter } from '@/components/SiteFooter'
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
        <header className="site-header">
          <a className="brand" href="/">
            <img alt="A.P.A LithoTherm logo" src="/logo.jpg" />
            <span>A.P.A LithoTherm</span>
          </a>
          <nav className="nav">
            <a href="/products">Products</a>
            <a href="/projects">Projects</a>
            <a href="/contact">Contact</a>
            <a href="/who-we-are">Who We Are</a>
          </nav>
        </header>
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}

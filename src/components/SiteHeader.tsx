'use client'

import { useState } from 'react'

const navItems = [
  { href: '/products', label: 'Products' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
  { href: '/who-we-are', label: 'Who We Are' },
]

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="site-header">
      <a className="brand" href="/" onClick={() => setIsOpen(false)}>
        <img alt="A.P.A LithoTherm logo" src="/logo.jpg" />
      </a>
      <button
        aria-controls="site-navigation"
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
        className="menu-toggle"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={`nav${isOpen ? ' open' : ''}`} id="site-navigation">
        {navItems.map((item) => (
          <a href={item.href} key={item.href} onClick={() => setIsOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

'use client'

import { FormEvent, useState } from 'react'

type ContactFormProps = {
  recipientEmail?: string
}

export function ContactForm({ recipientEmail = 'lithotherm@hotmail.com' }: ContactFormProps) {
  const [status, setStatus] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '').trim()
    const phone = String(form.get('phone') || '').trim()
    const email = String(form.get('email') || '').trim()
    const message = String(form.get('message') || '').trim()

    const subject = `Website enquiry${name ? ` from ${name}` : ''}`
    const body = [
      `Name: ${name || '-'}`,
      `Phone: ${phone || '-'}`,
      `Email: ${email || '-'}`,
      '',
      'Message:',
      message || '-',
    ].join('\n')

    window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus(`Opening email to ${recipientEmail}`)
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" type="text" required />
      <input name="phone" placeholder="Phone" type="tel" />
      <input name="email" placeholder="Email" type="email" required />
      <textarea name="message" placeholder="Message" rows={6} required />
      <button className="button primary" type="submit">
        Send
      </button>
      {status && <p className="form-status">{status}</p>}
    </form>
  )
}

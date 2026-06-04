'use client'

import { FormEvent, useState } from 'react'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus('')

    try {
      const form = event.currentTarget
      const formData = new FormData(form)
      const response = await fetch('/api/contact', {
        body: JSON.stringify({
          email: String(formData.get('email') || ''),
          message: String(formData.get('message') || ''),
          name: String(formData.get('name') || ''),
          phone: String(formData.get('phone') || ''),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('The message could not be sent.')
      }

      form.reset()
      setStatus('Thank you. Your message has been sent.')
    } catch {
      setStatus('Sorry, the message could not be sent. Please call or email us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" type="text" required />
      <input name="phone" placeholder="Phone" type="tel" />
      <input name="email" placeholder="Email" type="email" required />
      <textarea name="message" placeholder="Message" rows={6} required />
      <button className="button primary" disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>
      {status && <p className="form-status">{status}</p>}
    </form>
  )
}

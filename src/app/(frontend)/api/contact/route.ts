import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

type ContactRequest = {
  email?: string
  message?: string
  name?: string
  phone?: string
}

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: Request) {
  const data = (await request.json().catch(() => ({}))) as ContactRequest
  const name = clean(data.name)
  const phone = clean(data.phone)
  const email = clean(data.email)
  const message = clean(data.message)

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const to = process.env.CONTACT_TO || 'lithotherm@hotmail.com'
  const from = process.env.SMTP_FROM || user

  if (!host || !user || !pass || !from) {
    return NextResponse.json({ error: 'Email is not configured.' }, { status: 500 })
  }

  const transporter = nodemailer.createTransport({
    auth: {
      pass,
      user,
    },
    host,
    port,
    secure: port === 465,
  })

  await transporter.sendMail({
    from,
    replyTo: email,
    subject: `Website enquiry from ${name}`,
    text: [
      'New website enquiry',
      '',
      `Name: ${name}`,
      `Phone: ${phone || '-'}`,
      `Email: ${email}`,
      '',
      'Message:',
      message,
    ].join('\n'),
    to,
  })

  return NextResponse.json({ ok: true })
}

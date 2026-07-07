// app/api/getstarted/route.ts
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'

// ─── Validation Schema (matches the 3-step Introduction/Needs/Solutions form) ──
const demoRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  country: z.string().min(1, "Country is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number must be at least 5 characters"),
  entityType: z.string().min(1, "Please select what best describes you"),
  needs: z.array(z.string()).min(1, "At least one need must be selected"),
  solutions: z.array(z.string()).min(1, "At least one solution must be selected"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required to submit this request" }),
  }),
})

// Configure Nodemailer transporter
const createTransporter = () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('SMTP credentials are not configured')
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// ─── Brand tokens (hex equivalents of your theme's --background/--accent/--primary) ─
const BRAND = {
  dark: '#182c49',      // ≈ hsl(216.9, 56%, 18%) — your dark-mode --background
  blue: '#5aa2ce',       // ≈ hsl(203, 54%, 58%) — your --accent
  yellow: '#f7cc1c',     // ≈ hsl(47.9, 95.8%, 53.1%) — your --primary
  surface: '#fafaf5',
  surfaceMuted: '#f1f5f9',
  textMuted: '#4a5568',
  border: '#e2e8f0',
}

const ENTITY_TYPE_LABELS: Record<string, string> = {
  "School Network": "School / School Network",
  "NGO": "NGO / Education Program",
  "Government": "Government",
  "Parent": "Parent / Caregiver",
  "Other": "Other",
}

const DEMO_BOOKING_URL = 'https://calendar.app.google/Zk4SJDj6XtUtRS4H8'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};font-family:Arial,sans-serif;font-size:13px;color:${BRAND.textMuted};width:180px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};font-family:Arial,sans-serif;font-size:14px;color:${BRAND.dark};font-weight:600;vertical-align:top;">${value}</td>
    </tr>`
}

function sectionTitle(label: string) {
  return `
    <tr>
      <td colspan="2" style="padding:28px 0 8px 0;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${BRAND.blue};">
        ${escapeHtml(label)}
      </td>
    </tr>`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const validatedData = demoRequestSchema.parse(body)

    const entityTypeDisplay = ENTITY_TYPE_LABELS[validatedData.entityType] || validatedData.entityType

    // ── Internal notification email ─────────────────────────────────────────
    const emailContent = `
New Demo Request Received!

Contact Information:
--------------------
Full Name: ${validatedData.name}
Country: ${validatedData.country}
Email: ${validatedData.email}
Phone: ${validatedData.phone}
Best Described As: ${entityTypeDisplay}

Needs & Solutions:
------------------
Needs: ${validatedData.needs.join(', ')}
Interested Solutions: ${validatedData.solutions.join(', ')}

---
This request was submitted through the Nyansapo AI demo request form.
`

    const internalHtml = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background-color:${BRAND.surface};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.surface};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid ${BRAND.border};max-width:600px;width:100%;">
          <tr>
            <td style="background-color:${BRAND.dark};padding:24px 32px;">
              <span style="font-family:Arial,sans-serif;font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">Nyansapo AI</span>
              <span style="font-family:Arial,sans-serif;font-size:12px;color:${BRAND.yellow};float:right;line-height:28px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;">New Demo Request</span>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <h1 style="margin:0 0 4px 0;font-family:Arial,sans-serif;font-size:20px;color:${BRAND.dark};">${escapeHtml(validatedData.name)}</h1>
              <p style="margin:0 0 16px 0;font-family:Arial,sans-serif;font-size:14px;color:${BRAND.textMuted};">${escapeHtml(entityTypeDisplay)} · ${escapeHtml(validatedData.country)}</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${sectionTitle('Contact')}
                ${row('Email', `<a href="mailto:${validatedData.email}" style="color:${BRAND.blue};text-decoration:none;">${escapeHtml(validatedData.email)}</a>`)}
                ${row('Phone', `<a href="tel:${validatedData.phone}" style="color:${BRAND.blue};text-decoration:none;">${escapeHtml(validatedData.phone)}</a>`)}
                ${row('Country', escapeHtml(validatedData.country))}
                ${sectionTitle('Needs & Solutions')}
                ${row('Needs', escapeHtml(validatedData.needs.join(', ')))}
                ${row('Interested in', escapeHtml(validatedData.solutions.join(', ')))}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px;background-color:${BRAND.surfaceMuted};">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:${BRAND.textMuted};">
                Submitted through the Nyansapo AI demo request form.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

    // ── User confirmation email ─────────────────────────────────────────────
    const userEmailContent = `
Dear ${validatedData.name},

Thank you for requesting a demo of Nyansapo AI's assessment platform!

Interested in: ${validatedData.solutions.join(', ')}

Our team will review your request and contact you shortly at ${validatedData.email} to discuss your specific needs.

You can also book a session with us here: ${DEMO_BOOKING_URL}

Best regards,
The Nyansapo AI Team
`

    const userHtml = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background-color:${BRAND.surface};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.surface};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid ${BRAND.border};max-width:600px;width:100%;">
          <tr>
            <td style="background-color:${BRAND.dark};padding:32px;text-align:center;">
              <span style="font-family:Arial,sans-serif;font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">Nyansapo AI</span>
              <p style="margin:6px 0 0 0;font-family:Arial,sans-serif;font-size:13px;color:${BRAND.yellow};font-weight:600;">AI-Powered Assessment Platform</p>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 32px 8px 32px;">
              <div style="width:48px;height:48px;border-radius:50%;background-color:#e8f2f8;text-align:center;line-height:48px;margin-bottom:20px;">
                <span style="font-family:Arial,sans-serif;font-size:22px;color:${BRAND.blue};">&#10003;</span>
              </div>
              <h1 style="margin:0 0 12px 0;font-family:Arial,sans-serif;font-size:22px;color:${BRAND.dark};">Thanks for requesting a demo, ${escapeHtml(validatedData.name.split(' ')[0])}!</h1>
              <p style="margin:0 0 24px 0;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:${BRAND.textMuted};">
                We've received your request to explore Nyansapo AI. Here's what you shared:
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.surfaceMuted};border-radius:10px;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 0;font-family:Arial,sans-serif;font-size:13px;color:${BRAND.textMuted};width:120px;">Best described as</td>
                        <td style="padding:6px 0;font-family:Arial,sans-serif;font-size:14px;color:${BRAND.dark};font-weight:700;">${escapeHtml(entityTypeDisplay)}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-family:Arial,sans-serif;font-size:13px;color:${BRAND.textMuted};">Interested in</td>
                        <td style="padding:6px 0;font-family:Arial,sans-serif;font-size:14px;color:${BRAND.dark};font-weight:700;">${escapeHtml(validatedData.solutions.join(', '))}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px 0;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:${BRAND.textMuted};">
                Our team will contact you shortly at <strong style="color:${BRAND.dark};">${escapeHtml(validatedData.email)}</strong> to discuss your needs.
              </p>

              <p style="margin:18px 0 0 0;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:${BRAND.textMuted};">
                You can also book a session with us directly:
              </p>

              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:12px 0 0 0;">
                <tr>
                  <td style="border-radius:8px;background-color:${BRAND.blue};">
                    <a href="${DEMO_BOOKING_URL}" style="display:inline-block;padding:12px 18px;font-family:Arial,sans-serif;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;">Book a session</a>
                  </td>
                </tr>
              </table>

              <p style="margin:10px 0 0 0;font-family:Arial,sans-serif;font-size:12px;line-height:1.6;color:${BRAND.textMuted};">
                ${DEMO_BOOKING_URL}
              </p>

              <p style="margin:24px 0 0 0;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:${BRAND.textMuted};">
                Need to make a change? Just reply to this email.
              </p>

              <p style="margin:24px 0 0 0;font-family:Arial,sans-serif;font-size:14px;color:${BRAND.dark};">
                Best regards,<br /><strong>The Nyansapo AI Team</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background-color:${BRAND.surfaceMuted};text-align:center;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:${BRAND.textMuted};line-height:1.6;">
                Nyansapo Foundation Kenya<br />
                Transforming education through AI-powered assessments
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

    const transporter = createTransporter()

    // Send email to your team
    await transporter.sendMail({
      from: `"Nyansapo AI" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: validatedData.email,
      subject: `New Demo Request: ${validatedData.name} (${entityTypeDisplay})`,
      text: emailContent,
      html: internalHtml,
    })

    // Send confirmation email to the user
    await transporter.sendMail({
      from: `"Nyansapo AI" <${process.env.SMTP_USER}>`,
      to: validatedData.email,
      subject: 'Your Nyansapo AI Demo Request is Confirmed',
      text: userEmailContent,
      html: userHtml,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Demo request submitted successfully. Confirmation email sent.',
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    // NOTE: never console.error(error) directly here. Nodemailer connection
    // failures carry raw socket/TLS objects on the error, and Node's
    // util.inspect can throw while trying to pretty-print those
    // (TypeError: Cannot read properties of undefined (reading 'value')),
    // which crashes this route before a response is ever sent. Log a safe,
    // flattened shape instead.

    if (error instanceof z.ZodError) {
      console.error('Demo request validation failed:', error.flatten())
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    const safeMessage = error instanceof Error ? error.message : String(error)
    const safeStack = error instanceof Error ? error.stack : undefined
    console.error('Error submitting demo request:', safeMessage)
    if (safeStack) console.error(safeStack)

    return NextResponse.json(
      {
        error: 'Failed to submit demo request',
        details: safeMessage,
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed. Please use POST.' }, { status: 405 })
}

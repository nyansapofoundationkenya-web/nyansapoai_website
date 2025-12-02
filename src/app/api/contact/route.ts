// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'

// Validation Schema
const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  companyName: z.string().min(2, "Company name must be at least 2 characters").max(100),
  companyUrl: z.string().url().or(z.literal("")).optional(),
  message: z.string().optional(),
  subject: z.string().optional().default("New Contact Form Submission"),
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validatedData = contactFormSchema.parse(body)

    // Create email content
    const teamEmailContent = `
New Contact Form Submission!

Contact Information:
-------------------
Name: ${validatedData.firstName} ${validatedData.lastName}
Email: ${validatedData.email}
Company: ${validatedData.companyName}
${validatedData.companyUrl ? `Company URL: ${validatedData.companyUrl}` : ''}

Message:
--------
${validatedData.message || 'No message provided'}

---
Submitted through Nyansapo AI Contact Form
`

    // Create confirmation email for the user
    const userEmailContent = `
Dear ${validatedData.firstName},

Thank you for reaching out to Nyansapo AI!

We have received your contact form submission and one of our team members will get back to you within 24-48 hours.

Here's a summary of your submission:
- Name: ${validatedData.firstName} ${validatedData.lastName}
- Email: ${validatedData.email}
- Company: ${validatedData.companyName}
${validatedData.companyUrl ? `- Company URL: ${validatedData.companyUrl}` : ''}

${validatedData.message ? `Your message: "${validatedData.message}"` : ''}

If you have any urgent questions, feel free to reply to this email directly.

Best regards,
The Nyansapo AI Team

---
Nyansapo Foundation Kenya
Transforming education through AI-powered assessments
Contact: info@nyansapoaiapp.com
Social: @nyansapo_ai
`

    const transporter = createTransporter()

    // Send email to your team
    await transporter.sendMail({
      from: `"Nyansapo AI" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Or your team email
      replyTo: validatedData.email,
      subject: `New Contact: ${validatedData.firstName} ${validatedData.lastName} from ${validatedData.companyName}`,
      text: teamEmailContent,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #2563eb;">New Contact Form Submission!</h2>
  
  <h3 style="color: #4b5563;">Contact Information:</h3>
  <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
  <p><strong>Email:</strong> <a href="mailto:${validatedData.email}">${validatedData.email}</a></p>
  <p><strong>Company:</strong> ${validatedData.companyName}</p>
  ${validatedData.companyUrl ? `<p><strong>Company URL:</strong> <a href="${validatedData.companyUrl}" target="_blank">${validatedData.companyUrl}</a></p>` : ''}
  
  <h3 style="color: #4b5563;">Message:</h3>
  <p style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; white-space: pre-wrap;">${validatedData.message || 'No message provided'}</p>
  
  <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
  <p style="color: #6b7280; font-size: 12px;">
    Submitted through Nyansapo AI Contact Form
  </p>
</div>
      `,
    })

    // Send confirmation email to the user
    await transporter.sendMail({
      from: `"Nyansapo AI" <${process.env.SMTP_USER}>`,
      to: validatedData.email,
      subject: 'Thank You for Contacting Nyansapo AI',
      text: userEmailContent,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
      <h1 style="color: white; margin: 0; font-size: 28px;">Nyansapo AI</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">AI-Powered Assessment Platform</p>
    </div>
  </div>
  
  <h2 style="color: #1f2937; margin-bottom: 20px;">Thank You for Reaching Out!</h2>
  
  <p>Dear <strong>${validatedData.firstName}</strong>,</p>
  
  <p>We have received your contact form submission and one of our team members will get back to you within <strong>24-48 hours</strong>.</p>
  
  <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p style="font-weight: bold; margin-bottom: 10px; color: #2563eb;">Submission Summary:</p>
    <ul style="list-style: none; padding: 0; margin: 0;">
      <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
        <span style="position: absolute; left: 0; color: #2563eb;">👤</span>
        <strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}
      </li>
      <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
        <span style="position: absolute; left: 0; color: #2563eb;">📧</span>
        <strong>Email:</strong> ${validatedData.email}
      </li>
      <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
        <span style="position: absolute; left: 0; color: #2563eb;">🏢</span>
        <strong>Company:</strong> ${validatedData.companyName}
      </li>
      ${validatedData.companyUrl ? `
      <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
        <span style="position: absolute; left: 0; color: #2563eb;">🔗</span>
        <strong>Website:</strong> <a href="${validatedData.companyUrl}" style="color: #2563eb;">${validatedData.companyUrl}</a>
      </li>
      ` : ''}
    </ul>
  </div>
  
  ${validatedData.message ? `
  <div style="background-color: #e0f2fe; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #2563eb;">
    <p style="margin: 0; font-style: italic;">"${validatedData.message}"</p>
  </div>
  ` : ''}
  
  <p>If you have any urgent questions, feel free to reply to this email directly.</p>
  
  <p>Best regards,<br>
  <strong>The Nyansapo AI Team</strong></p>
  
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
  
  <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; text-align: center;">
    <p style="color: #2563eb; font-weight: bold; margin: 0 0 10px 0;">GET IN TOUCH</p>
    <div style="display: flex; justify-content: center; gap: 20px; margin: 10px 0;">
      <div>
        <p style="font-size: 12px; color: #6b7280; margin: 0;">📧 Email</p>
        <a href="mailto:info@nyansapoaiapp.com" style="color: #2563eb; text-decoration: none;">info@nyansapoaiapp.com</a>
      </div>
      <div>
        <p style="font-size: 12px; color: #6b7280; margin: 0;">📱 Social</p>
        <a href="#" style="color: #2563eb; text-decoration: none;">@nyansapo_ai</a>
      </div>
    </div>
  </div>
</div>
      `,
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully. Confirmation email sent.' 
      },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('Error submitting contact form:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Failed to submit contact form',
        details: error.message 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Please use POST.' },
    { status: 405 }
  )
}
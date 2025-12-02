// app/api/getstarted/route.ts
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'

// Validation Schema
const demoRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number must be at least 5 characters"),
  organizationType: z.string().min(1, "Organization type is required"),
  otherOrganizationType: z.string().optional(),
  organizationName: z.string().min(1, "Organization name is required"),
  numberOfLearners: z.string().optional(),
  numberOfAttendees: z.string().optional(),
  roles: z.array(z.string()).min(1, "At least one role must be selected"),
  otherRole: z.string().optional(),
  assessmentChallenges: z.string().optional(),
  preferredLanguage: z.string().min(1, "Preferred language is required"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  preferredTime: z.string().min(1, "Preferred time is required")
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
    const validatedData = demoRequestSchema.parse(body)

    // Create email content
    const emailContent = `
New Demo Request Received!

Personal Information:
--------------------
Full Name: ${validatedData.name}
Email: ${validatedData.email}
Phone: ${validatedData.phone}

Organization Information:
------------------------
Organization Type: ${validatedData.organizationType}${validatedData.otherOrganizationType ? ` (${validatedData.otherOrganizationType})` : ''}
Organization Name: ${validatedData.organizationName}

Scale Information:
-----------------
Number of Learners: ${validatedData.numberOfLearners || 'Not specified'}
Number of Attendees: ${validatedData.numberOfAttendees || 'Not specified'}

Attendee Roles:
--------------
${validatedData.roles.join(', ')}${validatedData.otherRole ? `, ${validatedData.otherRole}` : ''}

Demo Details:
-------------
Assessment Challenges: ${validatedData.assessmentChallenges || 'Not specified'}
Preferred Language: ${validatedData.preferredLanguage}
Preferred Date: ${validatedData.preferredDate}
Preferred Time: ${validatedData.preferredTime}

---
This request was submitted through the Nyansapo AI demo request form.
`

    // Create confirmation email for the user
    const userEmailContent = `
Dear ${validatedData.name},

Thank you for requesting a demo of Nyansapo AI's assessment platform!

We have received your request with the following details:

Demo Details:
- Preferred Date: ${validatedData.preferredDate}
- Preferred Time: ${validatedData.preferredTime}
- Language: ${validatedData.preferredLanguage}

Our team will review your request and contact you shortly at ${validatedData.email} to confirm the schedule and discuss your specific needs regarding ${validatedData.assessmentChallenges ? `"${validatedData.assessmentChallenges}"` : 'student assessments'}.

Best regards,
The Nyansapo AI Team
`

    const transporter = createTransporter()

    // Send email to your team
    await transporter.sendMail({
      from: `"Nyansapo AI" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: validatedData.email,
      subject: `New Demo Request: ${validatedData.name} from ${validatedData.organizationName}`,
      text: emailContent,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #2563eb;">New Demo Request Received!</h2>
  
  <h3 style="color: #4b5563;">Personal Information:</h3>
  <p><strong>Full Name:</strong> ${validatedData.name}</p>
  <p><strong>Email:</strong> <a href="mailto:${validatedData.email}">${validatedData.email}</a></p>
  <p><strong>Phone:</strong> <a href="tel:${validatedData.phone}">${validatedData.phone}</a></p>
  
  <h3 style="color: #4b5563;">Organization Information:</h3>
  <p><strong>Organization Type:</strong> ${validatedData.organizationType}${validatedData.otherOrganizationType ? ` (${validatedData.otherOrganizationType})` : ''}</p>
  <p><strong>Organization Name:</strong> ${validatedData.organizationName}</p>
  
  <h3 style="color: #4b5563;">Scale Information:</h3>
  <p><strong>Number of Learners:</strong> ${validatedData.numberOfLearners || 'Not specified'}</p>
  <p><strong>Number of Attendees:</strong> ${validatedData.numberOfAttendees || 'Not specified'}</p>
  
  <h3 style="color: #4b5563;">Attendee Roles:</h3>
  <p>${validatedData.roles.join(', ')}${validatedData.otherRole ? `, ${validatedData.otherRole}` : ''}</p>
  
  <h3 style="color: #4b5563;">Demo Details:</h3>
  <p><strong>Assessment Challenges:</strong> ${validatedData.assessmentChallenges || 'Not specified'}</p>
  <p><strong>Preferred Language:</strong> ${validatedData.preferredLanguage}</p>
  <p><strong>Preferred Date:</strong> ${validatedData.preferredDate}</p>
  <p><strong>Preferred Time:</strong> ${validatedData.preferredTime}</p>
  
  <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
  <p style="color: #6b7280; font-size: 12px;">
    This request was submitted through the Nyansapo AI demo request form.
  </p>
</div>
      `,
    })

    // Send confirmation email to the user
    await transporter.sendMail({
      from: `"Nyansapo AI" <${process.env.SMTP_USER}>`,
      to: validatedData.email,
      subject: 'Nyansapo AI Demo Request Confirmation',
      text: userEmailContent,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #2563eb; margin: 0;">Nyansapo AI</h1>
    <p style="color: #6b7280; margin: 5px 0 0 0;">AI-Powered Assessment Platform</p>
  </div>
  
  <h2 style="color: #1f2937; margin-bottom: 20px;">Thank you for requesting a demo!</h2>
  
  <p>Dear ${validatedData.name},</p>
  
  <p>We have received your request for a demo of Nyansapo AI's assessment platform with the following details:</p>
  
  <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p style="font-weight: bold; margin-bottom: 10px;">Demo Details:</p>
    <ul style="list-style: none; padding: 0; margin: 0;">
      <li style="margin-bottom: 8px;">📅 <strong>Date:</strong> ${validatedData.preferredDate}</li>
      <li style="margin-bottom: 8px;">⏰ <strong>Time:</strong> ${validatedData.preferredTime}</li>
      <li style="margin-bottom: 8px;">🗣️ <strong>Language:</strong> ${validatedData.preferredLanguage}</li>
      <li style="margin-bottom: 8px;">🏢 <strong>Organization:</strong> ${validatedData.organizationName}</li>
    </ul>
  </div>
  
  <p>Our team will review your request and contact you shortly at <strong>${validatedData.email}</strong> to confirm the schedule and discuss your specific needs.</p>
  
  ${validatedData.assessmentChallenges ? `<p>We've noted your current challenges: <em>"${validatedData.assessmentChallenges}"</em></p>` : ''}
  
  <p>If you need to make any changes to your request, please don't hesitate to reply to this email.</p>
  
  <p>Best regards,<br>
  <strong>The Nyansapo AI Team</strong></p>
  
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
  
  <div style="text-align: center; color: #6b7280; font-size: 12px;">
    <p>Nyansapo Foundation Kenya<br>
    Transforming education through AI-powered assessments</p>
  </div>
</div>
      `,
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Demo request submitted successfully. Confirmation email sent.' 
      },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('Error submitting demo request:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: error.errors 
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Failed to submit demo request',
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
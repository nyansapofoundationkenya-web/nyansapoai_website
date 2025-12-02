// app/api/tutor-chat/route.ts
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'

// Define schemas for both product types
const hekimaFormSchema = z.object({
  productType: z.literal("hekima"),
  institutionName: z.string().min(2, "Institution name must be at least 2 characters"),
  institutionType: z.string().min(1, "Institution type is required"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  contactNameRole: z.string().min(2, "Contact name/role must be at least 2 characters"),
  emailPhone: z.string().min(5, "Email/phone must be at least 5 characters"),
  studentCount: z.string().min(1, "Student count is required"),
  teacherCount: z.string().min(1, "Teacher count is required"),
  classLevels: z.array(z.string()).min(1, "At least one class level must be selected"),
})

const nyansapoFormSchema = z.object({
  productType: z.literal("nyansapo"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  secondName: z.string().min(2, "Second name must be at least 2 characters"),
  organizationType: z.string().min(1, "Organization type is required"),
  assessmentSupport: z.string().min(1, "Assessment support type is required"),
  childrenCount: z.string().min(1, "Children count is required"),
  primaryCountry: z.string().min(2, "Primary country must be at least 2 characters"),
  emailPhone: z.string().email("Valid email is required"),
})

// Union type for both schemas
const formSchema = z.discriminatedUnion('productType', [
  hekimaFormSchema,
  nyansapoFormSchema,
])

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
    const validatedData = formSchema.parse(body)

    const transporter = createTransporter()
    const isHekima = validatedData.productType === 'hekima'
    const productName = isHekima ? 'Hekima Learning App' : 'Nyansapo Learning App'
    const userEmail = isHekima 
      ? validatedData.emailPhone.split(',').find(part => part.includes('@'))?.trim() || ''
      : validatedData.emailPhone

    // Create team email content
    const teamEmailContent = isHekima ? `
New Hekima Learning App Interest Form!

Institution Information:
-----------------------
Institution Name: ${validatedData.institutionName}
Institution Type: ${validatedData.institutionType}
Location: ${validatedData.location}

Contact Information:
-------------------
Contact Name/Role: ${validatedData.contactNameRole}
Email/Phone: ${validatedData.emailPhone}

Educational Statistics:
----------------------
Student Count: ${validatedData.studentCount}
Teacher Count: ${validatedData.teacherCount}
Class Levels: ${validatedData.classLevels.join(', ')}

---
Submitted through Hekima Learning App Interest Form
` : `
New Nyansapo Learning App Interest Form!

Personal Information:
--------------------
Name: ${validatedData.firstName} ${validatedData.secondName}
Email: ${validatedData.emailPhone}
Organization Type: ${validatedData.organizationType}

Assessment & Scale Information:
------------------------------
Assessment Support Needed: ${validatedData.assessmentSupport}
Number of Children: ${validatedData.childrenCount}
Primary Country: ${validatedData.primaryCountry}

---
Submitted through Nyansapo Learning App Interest Form
`

    // Create user confirmation email
    const userConfirmationContent = `
Dear ${isHekima ? validatedData.contactNameRole.split('-')[0]?.trim() || validatedData.institutionName : validatedData.firstName},

Thank you for your interest in ${productName}!

We have received your inquiry and our team will review it shortly. Our education specialists will contact you within 1-2 business days to discuss how ${productName} can best serve your needs.

${isHekima ? `
Institution: ${validatedData.institutionName}
Location: ${validatedData.location}
` : `
Name: ${validatedData.firstName} ${validatedData.secondName}
Organization: ${validatedData.organizationType}
`}

Thank you for considering our platform to enhance your educational experience.

Best regards,
The Nyansapo AI Team

---
Nyansapo Foundation Kenya
Transforming education through AI-powered assessments
Contact: info@nyansapoaiapp.com
`

    // Send email to your team
    await transporter.sendMail({
      from: `"Nyansapo AI" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: userEmail || process.env.SMTP_USER,
      subject: isHekima 
        ? `New Hekima Interest: ${validatedData.institutionName}`
        : `New Nyansapo Interest: ${validatedData.firstName} ${validatedData.secondName}`,
      text: teamEmailContent,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, ${isHekima ? '#f59e0b' : '#2563eb'} 0%, ${isHekima ? '#d97706' : '#1d4ed8'} 100%); padding: 20px; border-radius: 10px 10px 0 0; margin-bottom: 20px;">
    <h2 style="color: white; margin: 0; text-align: center;">New ${productName} Interest Form!</h2>
  </div>
  
  ${isHekima ? `
  <h3 style="color: #4b5563;">Institution Information:</h3>
  <p><strong>Institution Name:</strong> ${validatedData.institutionName}</p>
  <p><strong>Institution Type:</strong> ${validatedData.institutionType}</p>
  <p><strong>Location:</strong> ${validatedData.location}</p>
  
  <h3 style="color: #4b5563;">Contact Information:</h3>
  <p><strong>Contact Name/Role:</strong> ${validatedData.contactNameRole}</p>
  <p><strong>Email/Phone:</strong> ${validatedData.emailPhone}</p>
  
  <h3 style="color: #4b5563;">Educational Statistics:</h3>
  <p><strong>Student Count:</strong> ${validatedData.studentCount}</p>
  <p><strong>Teacher Count:</strong> ${validatedData.teacherCount}</p>
  <p><strong>Class Levels:</strong> ${validatedData.classLevels.join(', ')}</p>
  ` : `
  <h3 style="color: #4b5563;">Personal Information:</h3>
  <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.secondName}</p>
  <p><strong>Email:</strong> <a href="mailto:${validatedData.emailPhone}">${validatedData.emailPhone}</a></p>
  <p><strong>Organization Type:</strong> ${validatedData.organizationType}</p>
  
  <h3 style="color: #4b5563;">Assessment & Scale Information:</h3>
  <p><strong>Assessment Support Needed:</strong> ${validatedData.assessmentSupport}</p>
  <p><strong>Number of Children:</strong> ${validatedData.childrenCount}</p>
  <p><strong>Primary Country:</strong> ${validatedData.primaryCountry}</p>
  `}
  
  <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
  <p style="color: #6b7280; font-size: 12px;">
    Submitted through ${productName} Interest Form
  </p>
</div>
      `,
    })

    // Send confirmation email to user if email is provided
    if (userEmail) {
      await transporter.sendMail({
        from: `"Nyansapo AI" <${process.env.SMTP_USER}>`,
        to: userEmail,
        subject: `Thank You for Your Interest in ${productName}`,
        text: userConfirmationContent,
        html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="background: linear-gradient(135deg, ${isHekima ? '#f59e0b' : '#2563eb'} 0%, ${isHekima ? '#d97706' : '#1d4ed8'} 100%); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
      <h1 style="color: white; margin: 0;">${productName}</h1>
      <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">AI-Powered Learning Platform</p>
    </div>
  </div>
  
  <h2 style="color: #1f2937; margin-bottom: 20px;">Thank You for Your Interest!</h2>
  
  <p>Dear ${isHekima ? validatedData.contactNameRole.split('-')[0]?.trim() || validatedData.institutionName : validatedData.firstName},</p>
  
  <p>We have received your inquiry about ${productName} and our team will review it shortly.</p>
  
  <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p style="font-weight: bold; margin-bottom: 10px; color: #4b5563;">Submission Summary:</p>
    <ul style="list-style: none; padding: 0; margin: 0;">
      ${isHekima ? `
      <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
        <span style="position: absolute; left: 0; color: #f59e0b;">🏫</span>
        <strong>Institution:</strong> ${validatedData.institutionName}
      </li>
      <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
        <span style="position: absolute; left: 0; color: #f59e0b;">📍</span>
        <strong>Location:</strong> ${validatedData.location}
      </li>
      <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
        <span style="position: absolute; left: 0; color: #f59e0b;">👤</span>
        <strong>Contact:</strong> ${validatedData.contactNameRole}
      </li>
      <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
        <span style="position: absolute; left: 0; color: #f59e0b;">🎓</span>
        <strong>Class Levels:</strong> ${validatedData.classLevels.join(', ')}
      </li>
      ` : `
      <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
        <span style="position: absolute; left: 0; color: #2563eb;">👤</span>
        <strong>Name:</strong> ${validatedData.firstName} ${validatedData.secondName}
      </li>
      <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
        <span style="position: absolute; left: 0; color: #2563eb;">🏢</span>
        <strong>Organization:</strong> ${validatedData.organizationType}
      </li>
      <li style="margin-bottom: 8px; padding-left: 20px; position: relative;">
        <span style="position: absolute; left: 0; color: #2563eb;">📊</span>
        <strong>Assessment Support:</strong> ${validatedData.assessmentSupport}
      </li>
      `}
    </ul>
  </div>
  
  <p>Our education specialists will contact you within <strong>1-2 business days</strong> to discuss how ${productName} can best serve your needs.</p>
  
  <p>If you have any urgent questions, feel free to reply to this email directly.</p>
  
  <p>Best regards,<br>
  <strong>The Nyansapo AI Team</strong></p>
  
  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
  
  <div style="text-align: center; color: #6b7280; font-size: 12px;">
    <p>Nyansapo Foundation Kenya<br>
    Transforming education through AI-powered assessments<br>
    📧 <a href="mailto:info@nyansapoaiapp.com" style="color: #2563eb;">info@nyansapoaiapp.com</a></p>
  </div>
</div>
        `,
      })
    }

    return NextResponse.json(
      { 
        success: true, 
        message: `Form submitted successfully.${userEmail ? ' Confirmation email sent.' : ''}` 
      },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('Error submitting tutor chat form:', error)
    
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
        error: 'Failed to submit form',
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
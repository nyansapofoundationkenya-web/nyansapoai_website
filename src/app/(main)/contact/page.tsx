// app/contact/page.tsx
"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Mail } from "lucide-react"
import Head from "next/head"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    companyUrl: "",
    message: "",
    subject: "General Inquiry"
  })

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
    
    if (error) setError(null)
  }

  // Simple URL validation that accepts most formats
  const isValidUrl = (url: string): boolean => {
    if (!url.trim()) return true // Empty is valid (optional field)
    
    try {
      // Try to create a URL object with the input
      // Add protocol if missing
      let testUrl = url.trim()
      if (!testUrl.includes('://')) {
        testUrl = 'http://' + testUrl
      }
      new URL(testUrl)
      return true
    } catch {
      return false
    }
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    // Required fields validation
    if (!formData.firstName.trim()) errors.firstName = "First name is required"
    if (!formData.lastName.trim()) errors.lastName = "Last name is required"
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }
    if (!formData.companyName.trim()) errors.companyName = "Organization name is required"

    // Optional URL validation - only validate if there's content
    if (formData.companyUrl.trim() && !isValidUrl(formData.companyUrl)) {
      errors.companyUrl = "Please enter a valid website URL (e.g., example.com or https://example.com)"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setError(null)

    try {
      // Clean up URL - add protocol if missing
      let cleanedCompanyUrl = formData.companyUrl.trim()
      if (cleanedCompanyUrl && !cleanedCompanyUrl.includes('://')) {
        cleanedCompanyUrl = 'https://' + cleanedCompanyUrl
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          companyUrl: cleanedCompanyUrl || undefined // Send undefined if empty
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || result.details?.[0]?.message || 'Failed to submit form')
      }

      setIsSubmitted(true)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        companyName: "",
        companyUrl: "",
        message: "",
        subject: "General Inquiry"
      })
      
    } catch (error: any) {
      console.error("Error submitting contact form:", error)
      setError(error.message || "Failed to submit form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Contact Nyansapo AI | Get in Touch</title>
        <meta 
          name="description" 
          content="Contact Nyansapo AI team for inquiries, partnerships, and support. We&apos;re here to help transform education through AI-powered assessments." 
        />
      </Head>
      
      {isSubmitted ? (
        <div className="min-h-screen bg-gradient-to-b from-background via-blue-50/20 to-background pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-primary/60 rounded-full mb-6">
                <CheckCircle2 className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Message Sent Successfully!
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Thank you for reaching out to Nyansapo AI. We&apos;ve sent a confirmation email and will get back to you within 24-48 hours.
              </p>
            </div>

            <div className="text-center mt-12">
              <Button 
                onClick={() => setIsSubmitted(false)}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground"
                size="lg"
              >
                Send Another Message
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-[#1e293b] flex items-center justify-center p-4">
          <div className="w-full max-w-6xl grid lg:grid-cols-[320px_1fr] gap-0 shadow-2xl overflow-hidden rounded-lg">
            {/* Left Sidebar - Contact Info */}
            <div className="bg-white p-8 flex flex-col">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#1e293b] leading-tight mb-4">
                  YOU&apos;RE JUST ONE<br />CLICK AWAY
                </h2>
                <div className="w-20 h-1 bg-[#60a5fa] mb-8"></div>
                
                <div className="flex items-start">
                  <div className="rotate-180 mr-6" style={{ writingMode: 'vertical-rl' }}>
                    <h3 className="font-bold text-lg tracking-wider text-[#1e293b] whitespace-nowrap">
                      CONTACT US
                    </h3>
                  </div>
                  
                  <div className="space-y-6 flex-1">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-[#60a5fa]" />
                      <a 
                        href="mailto:info@nyansapoai.app" 
                        className="text-sm text-[#1e293b] hover:text-[#60a5fa] hover:underline transition-colors"
                      >
                        info@nyansapoai.app
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <svg 
                        className="h-5 w-5 text-[#1e293b]" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                        aria-label="Instagram"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <a 
                        href="https://instagram.com/nyansapo_ai" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-[#1e293b] hover:text-[#60a5fa] hover:underline transition-colors"
                      >
                        @nyansapo_ai
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <svg 
                        className="h-5 w-5 text-[#1e293b]" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                        aria-label="LinkedIn"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <a 
                        href="https://linkedin.com/company/nyansapo-ai" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-[#1e293b] hover:text-[#60a5fa] hover:underline transition-colors"
                      >
                        Nyansapo AI
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-8 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  We typically respond within 24 hours
                </p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="bg-[#2d3b52] p-8 lg:p-12">
              <div className="relative mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Get in touch</h1>
                <svg className="absolute -right-4 -top-4 w-16 h-16" viewBox="0 0 100 100">
                  <path d="M20,50 Q30,20 50,30 T80,40" stroke="#60a5fa" strokeWidth="2" fill="none" />
                  <polygon points="75,35 80,40 75,45" fill="#60a5fa" />
                </svg>
              </div>

              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white text-sm">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="bg-[#3d4d66] border-0 text-white placeholder:text-gray-400 rounded-lg h-12"
                      required
                      disabled={isSubmitting}
                      placeholder="Enter your first name"
                    />
                    {validationErrors.firstName && (
                      <p className="text-red-400 text-xs mt-1">{validationErrors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white text-sm">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="bg-[#3d4d66] border-0 text-white placeholder:text-gray-400 rounded-lg h-12"
                      required
                      disabled={isSubmitting}
                      placeholder="Enter your last name"
                    />
                    {validationErrors.lastName && (
                      <p className="text-red-400 text-xs mt-1">{validationErrors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-white text-sm">
                      Organization name *
                    </Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="bg-[#3d4d66] border-0 text-white placeholder:text-gray-400 rounded-lg h-12"
                      required
                      disabled={isSubmitting}
                      placeholder="Your company or organization"
                    />
                    {validationErrors.companyName && (
                      <p className="text-red-400 text-xs mt-1">{validationErrors.companyName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyUrl" className="text-white text-sm">
                      Organization Website (Optional)
                    </Label>
                    <Input
                      id="companyUrl"
                      name="companyUrl"
                      value={formData.companyUrl}
                      onChange={handleChange}
                      className="bg-[#3d4d66] border-0 text-white placeholder:text-gray-400 rounded-lg h-12"
                      disabled={isSubmitting}
                      placeholder="example.com or https://example.com"
                    />
                    {validationErrors.companyUrl && (
                      <p className="text-red-400 text-xs mt-1">{validationErrors.companyUrl}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white text-sm">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-[#3d4d66] border-0 text-white placeholder:text-gray-400 rounded-lg h-12"
                    required
                    disabled={isSubmitting}
                    placeholder="your.email@example.com"
                  />
                  {validationErrors.email && (
                    <p className="text-red-400 text-xs mt-1">{validationErrors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white text-sm">
                    Message (Optional)
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-[#3d4d66] border-0 text-white placeholder:text-gray-400 rounded-lg min-h-[120px] resize-none"
                    disabled={isSubmitting}
                    placeholder="How can we help you?"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#60a5fa] hover:bg-[#3b82f6] text-white font-semibold py-6 text-base rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Sending...
                    </>
                  ) : (
                    'SUBMIT'
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
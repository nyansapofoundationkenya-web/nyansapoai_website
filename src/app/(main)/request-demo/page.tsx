// app/request-demo/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Calendar, Users, User, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RequestDemoPage() {
  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    email: "",
    phone: "",
    
    // Organization Information
    organizationType: "",
    otherOrganizationType: "",
    organizationName: "",
    
    // Scale Information
    numberOfLearners: "",
    numberOfAttendees: "",
    
    // Attendee Roles
    roles: [] as string[],
    otherRole: "",
    
    // Demo Details
    assessmentChallenges: "",
    preferredLanguage: "",
    preferredDate: "",
    preferredTime: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({
        ...prev,
        roles: checked 
          ? [...prev.roles, value]
          : prev.roles.filter(role => role !== value)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    
    // Clear error when user starts typing
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/getstarted', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          // Ensure otherOrganizationType is included only when "Other" is selected
          otherOrganizationType: formData.organizationType === "Other" ? formData.otherOrganizationType : "",
          // Ensure otherRole is included only when "Other" is selected in roles
          otherRole: formData.roles.includes("Other") ? formData.otherRole : ""
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || result.details?.[0]?.message || 'Failed to submit request')
      }

      setIsSubmitted(true)
      console.log("Demo request submitted successfully:", result)
      
    } catch (error: any) {
      console.error("Error submitting demo request:", error)
      setError(error.message || "Failed to submit request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const organizationTypes = [
    "EdTech",
    "Education Institution",
    "Technology Company",
    "Government & Policy",
    "NGO/Non-profit",
    "Other"
  ]

  const roles = [
    "Teacher",
    "Founder",
    "Director",
    "Administrative Staff",
    "Program Manager",
    "Other"
  ]

  const languages = [
    "English",
    "Swahili"
  ]

  const getTodayDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="text-center py-12 border-0 shadow-lg">
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <CheckCircle2 className="h-16 w-16 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold text-foreground">
                Demo Request Received!
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Thank you for your interest in Nyansapo AI. Our team will contact you shortly to confirm your demo schedule and discuss how we can support your assessment needs.
              </CardDescription>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We've sent a confirmation email to <strong>{formData.email}</strong> and will contact you there to confirm your preferred time.
                </p>
                <div className="pt-4">
                  <Button 
                    onClick={() => {
                      setIsSubmitted(false)
                      setFormData({ 
                        name: "", 
                        email: "", 
                        phone: "", 
                        organizationType: "", 
                        otherOrganizationType: "", 
                        organizationName: "",
                        numberOfLearners: "", 
                        numberOfAttendees: "",
                        roles: [], 
                        otherRole: "",
                        assessmentChallenges: "", 
                        preferredLanguage: "", 
                        preferredDate: "", 
                        preferredTime: ""
                      })
                    }}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Request Another Demo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Request a Demo
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Schedule a personalized demo of Nyansapo AI's assessment platform
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-foreground">
              Demo Request Form
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Provide your details and we'll schedule a demo tailored to your needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="border-border focus:ring-primary"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Work Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your work email"
                      className="border-border focus:ring-primary"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="border-border focus:ring-primary"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>

              {/* Organization Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Organization Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="organizationType" className="text-foreground">
                      Type of Organization *
                    </Label>
                    <select
                      id="organizationType"
                      name="organizationType"
                      required
                      value={formData.organizationType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent bg-background disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      <option value="">Select organization type</option>
                      {organizationTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {formData.organizationType === "Other" && (
                    <div className="space-y-2">
                      <Label htmlFor="otherOrganizationType" className="text-foreground">
                        Please specify *
                      </Label>
                      <Input
                        id="otherOrganizationType"
                        name="otherOrganizationType"
                        type="text"
                        required={formData.organizationType === "Other"}
                        value={formData.otherOrganizationType}
                        onChange={handleChange}
                        placeholder="Specify organization type"
                        className="border-border focus:ring-primary"
                        disabled={isSubmitting}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="organizationName" className="text-foreground">
                      Organization Name *
                    </Label>
                    <Input
                      id="organizationName"
                      name="organizationName"
                      type="text"
                      required
                      value={formData.organizationName}
                      onChange={handleChange}
                      placeholder="Enter your organization name"
                      className="border-border focus:ring-primary"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>

              {/* Scale Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Scale Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="numberOfLearners" className="text-foreground">
                      Number of Learners to be Supported
                    </Label>
                    <Input
                      id="numberOfLearners"
                      name="numberOfLearners"
                      type="text"
                      value={formData.numberOfLearners}
                      onChange={handleChange}
                      placeholder="e.g., 500 learners"
                      className="border-border focus:ring-primary"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numberOfAttendees" className="text-foreground">
                      Number of Demo Attendees
                    </Label>
                    <Input
                      id="numberOfAttendees"
                      name="numberOfAttendees"
                      type="number"
                      min="1"
                      value={formData.numberOfAttendees}
                      onChange={handleChange}
                      placeholder="Number of people attending"
                      className="border-border focus:ring-primary"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>

              {/* Attendee Roles */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Roles of Attendees *
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {roles.map(role => (
                    <div key={role} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`role-${role}`}
                        name="roles"
                        value={role}
                        checked={formData.roles.includes(role)}
                        onChange={handleChange}
                        className="rounded border-border text-primary focus:ring-primary disabled:opacity-50"
                        disabled={isSubmitting}
                        required={formData.roles.length === 0}
                      />
                      <Label htmlFor={`role-${role}`} className="text-foreground">
                        {role}
                      </Label>
                    </div>
                  ))}
                </div>
                
                {formData.roles.includes("Other") && (
                  <div className="space-y-2">
                    <Label htmlFor="otherRole" className="text-foreground">
                      Please specify other roles
                    </Label>
                    <Input
                      id="otherRole"
                      name="otherRole"
                      type="text"
                      value={formData.otherRole}
                      onChange={handleChange}
                      placeholder="Specify attendee roles"
                      className="border-border focus:ring-primary"
                      disabled={isSubmitting}
                    />
                  </div>
                )}
              </div>

              {/* Demo Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Demo Details
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="assessmentChallenges" className="text-foreground">
                    Current Assessment Challenges
                  </Label>
                  <Textarea
                    id="assessmentChallenges"
                    name="assessmentChallenges"
                    rows={3}
                    value={formData.assessmentChallenges}
                    onChange={handleChange}
                    placeholder="Describe your current challenges with student assessments..."
                    className="border-border focus:ring-primary resize-none"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="preferredLanguage" className="text-foreground">
                      Preferred Demo Language *
                    </Label>
                    <select
                      id="preferredLanguage"
                      name="preferredLanguage"
                      required
                      value={formData.preferredLanguage}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent bg-background disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      <option value="">Select language</option>
                      {languages.map(language => (
                        <option key={language} value={language}>{language}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferredDate" className="text-foreground">
                      Preferred Date *
                    </Label>
                    <Input
                      id="preferredDate"
                      name="preferredDate"
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="border-border focus:ring-primary"
                      disabled={isSubmitting}
                      min={getTodayDate()}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferredTime" className="text-foreground">
                      Preferred Time *
                    </Label>
                    <Input
                      id="preferredTime"
                      name="preferredTime"
                      type="time"
                      required
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="border-border focus:ring-primary"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2" />
                      Submitting Request...
                    </>
                  ) : (
                    "Schedule Demo"
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  We'll contact you to confirm your demo schedule. By submitting, you agree to our Privacy Policy.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  CheckCircle2,
  Calendar,
  Users,
  User,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import DemoCalendar from "@/components/WeekCalendar"

const ORGANIZATION_TYPES = [
  "EdTech",
  "Education Institution",
  "Technology Company",
  "Government & Policy",
  "NGO/Non-profit",
  "Other",
]

const ROLES = [
  "Teacher",
  "Founder",
  "Director",
  "Administrative Staff",
  "Program Manager",
  "Other",
]

const LANGUAGES = ["English", "Swahili"]

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  organizationType: "",
  otherOrganizationType: "",
  organizationName: "",
  numberOfLearners: "",
  numberOfAttendees: "",
  roles: [] as string[],
  otherRole: "",
  assessmentChallenges: "",
  preferredLanguage: "",
  preferredDate: "",
  preferredTime: "",
}

export default function RequestDemoPage() {
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({
        ...prev,
        roles: checked
          ? [...prev.roles, value]
          : prev.roles.filter((r) => r !== value),
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
    if (error) setError(null)
  }

  const handleCalendarSelect = (date: string, time: string) => {
    setFormData((prev) => ({ ...prev, preferredDate: date, preferredTime: time }))
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.preferredDate || !formData.preferredTime) {
      setError("Please select a date and time from the calendar.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/getstarted", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          otherOrganizationType:
            formData.organizationType === "Other"
              ? formData.otherOrganizationType
              : "",
          otherRole: formData.roles.includes("Other") ? formData.otherRole : "",
        }),
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(
          result.error || result.details?.[0]?.message || "Failed to submit request"
        )
      }

      setIsSubmitted(true)
    } catch (err: any) {
      setError(err.message || "Failed to submit request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Success screen ──────────────────────────────────────────────────────────
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="text-center py-12 border-0 shadow-lg">
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <CheckCircle2 className="h-16 w-16 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                Demo Request Received!
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Thank you for your interest in Nyansapo AI. Our team will contact
                you shortly to confirm your demo schedule and discuss how we can
                support your assessment needs.
              </p>
              <p className="text-sm text-muted-foreground">
                We&apos;ve sent a confirmation to{" "}
                <strong>{formData.email}</strong>.
              </p>
              <Button
                onClick={() => {
                  setIsSubmitted(false)
                  setFormData(EMPTY_FORM)
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Request Another Demo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Page header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Request a Demo
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Schedule a personalized demo of Nyansapo AI&apos;s assessment platform
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-foreground">
              Demo Request Form
            </CardTitle>
            <CardDescription>
              Provide your details and we&apos;ll schedule a demo tailored to your
              needs
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* ── Personal Information ─────────────────────────────────── */}
              <section className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your work email"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </section>

              {/* ── Organization Information ─────────────────────────────── */}
              <section className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Organization Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="organizationType">
                      Type of Organization *
                    </Label>
                    <select
                      id="organizationType"
                      name="organizationType"
                      required
                      value={formData.organizationType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={isSubmitting}
                    >
                      <option value="">Select organization type</option>
                      {ORGANIZATION_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formData.organizationType === "Other" && (
                    <div className="space-y-2">
                      <Label htmlFor="otherOrganizationType">
                        Please specify *
                      </Label>
                      <Input
                        id="otherOrganizationType"
                        name="otherOrganizationType"
                        type="text"
                        required
                        value={formData.otherOrganizationType}
                        onChange={handleChange}
                        placeholder="Specify organization type"
                        disabled={isSubmitting}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="organizationName">Organization Name *</Label>
                    <Input
                      id="organizationName"
                      name="organizationName"
                      type="text"
                      required
                      value={formData.organizationName}
                      onChange={handleChange}
                      placeholder="Enter your organization name"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </section>

              {/* ── Scale Information ────────────────────────────────────── */}
              <section className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Scale Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="numberOfLearners">
                      Number of Learners to be Supported
                    </Label>
                    <Input
                      id="numberOfLearners"
                      name="numberOfLearners"
                      type="text"
                      value={formData.numberOfLearners}
                      onChange={handleChange}
                      placeholder="e.g., 500 learners"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numberOfAttendees">
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
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </section>

              {/* ── Attendee Roles ───────────────────────────────────────── */}
              <section className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Roles of Attendees *
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {ROLES.map((role) => (
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
                      <Label htmlFor={`role-${role}`}>{role}</Label>
                    </div>
                  ))}
                </div>

                {formData.roles.includes("Other") && (
                  <div className="space-y-2">
                    <Label htmlFor="otherRole">Please specify other roles</Label>
                    <Input
                      id="otherRole"
                      name="otherRole"
                      type="text"
                      value={formData.otherRole}
                      onChange={handleChange}
                      placeholder="Specify attendee roles"
                      disabled={isSubmitting}
                    />
                  </div>
                )}
              </section>

              {/* ── Demo Details ─────────────────────────────────────────── */}
              <section className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Demo Details
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="assessmentChallenges">
                    Current Assessment Challenges
                  </Label>
                  <Textarea
                    id="assessmentChallenges"
                    name="assessmentChallenges"
                    rows={3}
                    value={formData.assessmentChallenges}
                    onChange={handleChange}
                    placeholder="Describe your current challenges with student assessments..."
                    className="resize-none"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredLanguage">
                    Preferred Demo Language *
                  </Label>
                  <select
                    id="preferredLanguage"
                    name="preferredLanguage"
                    required
                    value={formData.preferredLanguage}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={isSubmitting}
                  >
                    <option value="">Select language</option>
                    {LANGUAGES.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ── Week Calendar ──────────────────────────────────────── */}
                <div className="space-y-2">
                  <Label>
                    Preferred Date & Time *{" "}
                    <span className="text-muted-foreground font-normal text-xs">
                      (EAT — Nairobi time, Mon–Fri, 8 AM–5 PM)
                    </span>
                  </Label>
                  <DemoCalendar onSelect={handleCalendarSelect} />
                </div>
              </section>

              {/* ── Submit ───────────────────────────────────────────────── */}
              <div className="space-y-4 pt-2">
                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !formData.preferredDate ||
                    !formData.preferredTime
                  }
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      Submitting Request...
                    </>
                  ) : (
                    "Schedule Demo"
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  We&apos;ll contact you to confirm your demo schedule. By
                  submitting, you agree to our Privacy Policy.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
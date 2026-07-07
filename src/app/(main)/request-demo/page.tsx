"use client"

import { useState } from "react"
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  School,
  HeartHandshake,
  Landmark,
  Users,
  MoreHorizontal,
  BarChart3,
  Volume2,
  HelpCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"

// ─── Static content (matches the approved mockup, field for field) ──────────

const COUNTRIES = ["Kenya", "Ghana", "Nigeria", "South Africa", "Other"]

const ENTITY_TYPES = [
  { value: "School Network", label: "School / School Network", icon: School },
  { value: "NGO", label: "NGO / Education Program", icon: HeartHandshake },
  { value: "Government", label: "Government", icon: Landmark },
  { value: "Parent", label: "Parent / Caregiver", icon: Users },
  { value: "Other", label: "Other", icon: MoreHorizontal },
]

const NEEDS = [
  { value: "Early identification", label: "Early learner identification" },
  { value: "Assessments", label: "Literacy or numeracy assessments" },
  { value: "Tracking", label: "Learner progress tracking" },
  { value: "Home learning", label: "Home learning support" },
  { value: "Monitoring", label: "Program monitoring & reporting" },
  { value: "Falling behind", label: "Supporting children who are falling behind" },
]

const SOLUTIONS = [
  {
    value: "NAO",
    title: "NAO Assessments",
    description: "AI-powered early grade literacy and numeracy assessments with learner progress tracking.",
    icon: BarChart3,
  },
  {
    value: "Hekima",
    title: "Hekima Learning",
    description: "Sound-based early literacy learning tools for children ages 4–7.",
    icon: Volume2,
  },
  {
    value: "Not sure",
    title: "Not sure yet",
    description: "Let's talk and figure out the best fit for your needs.",
    icon: HelpCircle,
  },
]

const STEPS = ["Introduction", "Needs", "Solutions"]

const EMPTY_FORM = {
  name: "",
  country: "Kenya",
  email: "",
  phone: "",
  entityType: "",
  needs: [] as string[],
  solutions: [] as string[],
  consent: false,
}

type FormState = typeof EMPTY_FORM

// ─── Small building blocks ────────────────────────────────────────────────────

function CheckboxPill({
  label,
  checked,
  onChange,
  disabled,
}: {
  label: string
  checked: boolean
  onChange: () => void
  disabled?: boolean
}) {
  return (
    <label className="cursor-pointer group">
      <input type="checkbox" className="hidden" checked={checked} onChange={onChange} disabled={disabled} />
      <div
        className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all font-body text-sm font-medium ${
          checked ? "border-accent bg-accent/10" : "border-2 border-border bg-transparent group-hover:bg-secondary/50"
        }`}
      >
        <div
          className={`w-6 h-6 shrink-0 rounded-md border-2 flex items-center justify-center transition-colors ${
            checked ? "bg-accent border-accent" : "border-border"
          }`}
        >
          {checked && <CheckCircle2 className="w-4 h-4 text-accent-foreground" />}
        </div>
        <span className="text-foreground">{label}</span>
      </div>
    </label>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function RequestDemoPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormState>(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const totalSteps = STEPS.length

  const update = (patch: Partial<FormState>) => {
    setFormData((prev) => ({ ...prev, ...patch }))
    if (error) setError(null)
  }

  const toggleInArray = (key: "needs" | "solutions", value: string) => {
    setFormData((prev) => {
      const arr = prev[key]
      // "Not sure" in solutions is exclusive of NAO/Hekima, matching the mockup's radio-vs-checkbox split
      if (key === "solutions") {
        if (value === "Not sure") {
          return { ...prev, solutions: arr.includes("Not sure") ? [] : ["Not sure"] }
        }
        const withoutNotSure = arr.filter((v) => v !== "Not sure")
        const next = withoutNotSure.includes(value)
          ? withoutNotSure.filter((v) => v !== value)
          : [...withoutNotSure, value]
        return { ...prev, solutions: next }
      }
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
      return { ...prev, [key]: next }
    })
    if (error) setError(null)
  }

  const validateStep = (): string | null => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone) return "Please fill in your name, email, and phone number."
      if (!formData.entityType) return "Please select what best describes you."
    }
    if (step === 2) {
      if (formData.needs.length === 0) return "Please select at least one area you'd like support with."
    }
    if (step === 3) {
      if (formData.solutions.length === 0) return "Please select a solution, or 'Not sure yet'."
      if (!formData.consent) return "Please confirm you consent to being contacted."
    }
    return null
  }

  const goNext = () => {
    const validationError = validateStep()
    if (validationError) {
      setError(validationError)
      return
    }
    setStep((s) => Math.min(s + 1, totalSteps))
  }

  const goBack = () => setStep((s) => Math.max(s - 1, 1))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationError = validateStep()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/getstarted", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || result.details?.[0]?.message || "Failed to submit request")
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
      <div className="min-h-screen bg-background flex items-center justify-center pt-24 pb-16 px-6">
        <div className="max-w-2xl w-full bg-card rounded-xl p-12 text-center shadow-[0_40px_60px_-15px_rgba(20,40,72,0.15)] border border-border">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="h-16 w-16 text-accent" />
          </div>
          <h2 className="text-3xl font-bold text-foreground font-headline mb-4">Demo Request Received!</h2>
          <p className="text-lg text-muted-foreground font-body max-w-lg mx-auto mb-2">
            Thank you for your interest in Nyansapo AI. Our team will review your request and reach out shortly to
            schedule your demo at a time that works for you.
          </p>
          <p className="text-sm text-muted-foreground font-body mb-8">
            We&apos;ve sent a confirmation to <strong className="text-foreground">{formData.email}</strong>.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false)
              setFormData(EMPTY_FORM)
              setStep(1)
            }}
            className="bg-primary text-primary-foreground font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-all font-body"
          >
            Request Another Demo
          </button>
        </div>
      </div>
    )
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto w-full">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground font-headline tracking-tight mb-4 leading-tight">
            Making Learning Visible Earlier
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-body max-w-3xl mx-auto font-light leading-relaxed">
            See how Nyansapo AI helps schools, families, and education programs identify children who are falling
            behind earlier and provide more timely literacy and numeracy support.
          </p>
        </header>

        <div className="relative bg-card rounded-xl p-8 md:p-12 shadow-[0_40px_60px_-15px_rgba(20,40,72,0.15)] border border-border overflow-hidden">
          {/* Progress Stepper */}
          <div className="flex justify-between items-center mb-16 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" />
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-accent -translate-y-1/2 z-0 transition-all duration-500"
              style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
            />
            {STEPS.map((label, i) => {
              const num = i + 1
              const active = num <= step
              return (
                <div key={label} className="relative z-10 flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-headline transition-colors ${
                      active ? "bg-accent text-accent-foreground" : "bg-transparent border-2 border-border text-muted-foreground"
                    }`}
                  >
                    {num}
                  </div>
                  <span
                    className={`text-[10px] md:text-xs font-semibold uppercase tracking-widest font-body ${
                      active ? "text-accent" : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              )
            })}
          </div>

          {error && (
            <div className="mb-8 flex items-start gap-3 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg px-4 py-3 font-body text-sm">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="relative min-h-[500px] flex flex-col">
            <div className="flex-1">
              {/* STEP 1: INTRODUCTION */}
              {step === 1 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-foreground font-headline">Tell us about yourself</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-muted-foreground mb-1 ml-1 font-body">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={(e) => update({ name: e.target.value })}
                        disabled={isSubmitting}
                        className="w-full bg-transparent border-2 border-input rounded-lg px-4 py-3 transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none font-body text-foreground placeholder:text-muted-foreground disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-muted-foreground mb-1 ml-1 font-body">Country</label>
                      <select
                        value={formData.country}
                        onChange={(e) => update({ country: e.target.value })}
                        disabled={isSubmitting}
                        className="w-full bg-transparent border-2 border-input rounded-lg px-4 py-3 transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none font-body text-foreground disabled:opacity-50"
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c} style={{ color: "#111827", backgroundColor: "#ffffff" }}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-muted-foreground mb-1 ml-1 font-body">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="jane@organization.org"
                        value={formData.email}
                        onChange={(e) => update({ email: e.target.value })}
                        disabled={isSubmitting}
                        className="w-full bg-transparent border-2 border-input rounded-lg px-4 py-3 transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none font-body text-foreground placeholder:text-muted-foreground disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-muted-foreground mb-1 ml-1 font-body">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+254 --- --- ---"
                        value={formData.phone}
                        onChange={(e) => update({ phone: e.target.value })}
                        disabled={isSubmitting}
                        className="w-full bg-transparent border-2 border-input rounded-lg px-4 py-3 transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none font-body text-foreground placeholder:text-muted-foreground disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 font-body">
                      What best describes you?
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {ENTITY_TYPES.map(({ value, label, icon: Icon }) => {
                        const checked = formData.entityType === value
                        return (
                          <label key={value} className="cursor-pointer group">
                            <input
                              type="radio"
                              name="entityType"
                              className="hidden"
                              checked={checked}
                              onChange={() => update({ entityType: value })}
                              disabled={isSubmitting}
                            />
                            <div
                              className={`p-4 text-center rounded-xl border-2 transition-all h-full flex flex-col items-center justify-center gap-2 ${
                                checked ? "border-accent bg-accent/10" : "border-2 border-border bg-transparent group-hover:bg-secondary/50"
                              }`}
                            >
                              <Icon className="w-5 h-5 text-accent" />
                              <span className="text-[10px] md:text-xs font-bold leading-tight text-foreground font-body">
                                {label}
                              </span>
                            </div>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: NEEDS */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground font-headline mb-8">
                    What would you like support with?
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {NEEDS.map(({ value, label }) => (
                      <CheckboxPill
                        key={value}
                        label={label}
                        checked={formData.needs.includes(value)}
                        onChange={() => toggleInArray("needs", value)}
                        disabled={isSubmitting}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: SOLUTIONS */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground font-headline mb-8">
                    Which solution would you like to explore?
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {SOLUTIONS.map(({ value, title, description, icon: Icon }) => {
                      const checked = formData.solutions.includes(value)
                      return (
                        <label key={value} className="cursor-pointer group h-full">
                          <input
                            type={value === "Not sure" ? "radio" : "checkbox"}
                            name={value === "Not sure" ? "solution-exclusive" : undefined}
                            className="hidden"
                            checked={checked}
                            onChange={() => toggleInArray("solutions", value)}
                            disabled={isSubmitting}
                          />
                          <div
                            className={`h-full flex flex-col p-6 rounded-xl border-2 transition-all ${
                              checked ? "border-accent bg-accent/10" : "border-2 border-border bg-transparent group-hover:bg-secondary/50"
                            }`}
                          >
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-accent/10">
                              <Icon className="w-5 h-5 text-accent" />
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-foreground font-headline">{title}</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed font-body">{description}</p>
                          </div>
                        </label>
                      )
                    })}
                  </div>

                  <label className="flex items-start gap-4 p-4 rounded-xl bg-transparent border-2 border-border cursor-pointer mb-8">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 rounded border-border text-accent focus:ring-accent/20"
                      checked={formData.consent}
                      onChange={(e) => update({ consent: e.target.checked })}
                      disabled={isSubmitting}
                    />
                    <span className="text-sm text-muted-foreground leading-relaxed font-body">
                      I consent to Nyansapo AI contacting me regarding this demo request and related learning
                      support solutions. We respect your privacy.
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Form Controls */}
            <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goBack}
                  disabled={isSubmitting}
                  className="text-muted-foreground font-semibold flex items-center gap-2 hover:text-foreground transition-colors px-4 py-2 font-body disabled:opacity-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <span />
              )}

              <div className="ml-auto flex gap-4">
                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={isSubmitting}
                    className="bg-accent text-accent-foreground font-bold px-8 py-4 rounded-lg shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 font-body disabled:opacity-50"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary text-primary-foreground font-bold px-10 py-4 rounded-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 font-body disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5" />
                        Submitting...
                      </>
                    ) : (
                      "Book My Demo"
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
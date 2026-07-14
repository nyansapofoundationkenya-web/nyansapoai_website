"use client"
import { useState, useEffect, useRef } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import {
  registrationSchema,
  defaultValues,
  type RegistrationFormValues,
} from "@/lib/registration-schema"
import StepIndicator from "./steps/step-indicator"
import ParentInfoStep from "./steps/parent-info-step"
import ChildDetailsStep from "./steps/child-details-step"
import ReviewConsentStep from "./steps/review-consent-step"

const STEPS = ["Parent Info", "Child's Details", "Review"] as const

// Which fields get validated before advancing past each step.
const STEP_FIELDS: Record<number, (keyof RegistrationFormValues)[]> = {
  0: ["parentFullName", "parentPhone"],
  1: ["children"],
  2: ["referrerName", "referrerPhone", "consent"],
}

export default function RegistrationWizard() {
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues,
    mode: "onBlur",
  })

  const childrenArray = useFieldArray({
    control: form.control,
    name: "children",
  })

  // Scroll back to the top of the wizard whenever the step changes,
  // so a new step never opens mid-scroll (e.g. showing the submit button
  // instead of the top of the step's content).
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [step])

  async function goNext() {
    const valid = await form.trigger(STEP_FIELDS[step])
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0))
  }

  async function onSubmit(values: RegistrationFormValues) {
    setSubmitting(true)
    try {
      const res = await fetch("/api/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)

        if (res.status === 409) {
          // Duplicate phone number — point the user at the exact field
          form.setError("parentPhone", {
            type: "manual",
            message:
              data?.error || "This phone number is already registered.",
          })
          setStep(0) // jump back to the step with the phone field
          toast.error(
            data?.error || "This phone number is already registered."
          )
          return
        }

        throw new Error(data?.error || "Registration failed")
      }

      toast.success("Registration complete! We'll be in touch soon.")
      form.reset(defaultValues)
      setStep(0)
    } catch (error) {
      console.error("Registration failed", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-12" ref={topRef}>
      <div className="mx-auto w-full max-w-4xl">
        <StepIndicator steps={STEPS} currentStep={step} />
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {step === 0 && <ParentInfoStep form={form} onNext={goNext} />}
        {step === 1 && (
          <ChildDetailsStep
            form={form}
            childrenArray={childrenArray}
            onNext={goNext}
            onBack={goBack}
          />
        )}
        {step === 2 && (
          <ReviewConsentStep form={form} onBack={goBack} submitting={submitting} />
        )}
      </form>
    </div>
  )
}
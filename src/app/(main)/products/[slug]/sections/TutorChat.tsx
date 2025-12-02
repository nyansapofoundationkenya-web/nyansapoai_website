// TutorChat.tsx
"use client"
import React, { useState } from "react"
import { TutorChatProps, FormData } from "./types"
import WelcomeSection from "./components/WelcomeSection"
import HekimaForm from "./forms/HekimaForm"
import NyansapoForm from "./forms/NyansapoForm"

const TutorChat: React.FC<TutorChatProps> = ({ ctaText, productSlug }) => {
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<{
    success: boolean
    message: string
  } | null>(null)

  // Initialize form data based on product type
  const [formData, setFormData] = useState<FormData>(() => {
    if (productSlug === "hekima-learning-app") {
      return {
        productType: "hekima",
        institutionName: "",
        institutionType: "",
        location: "",
        contactNameRole: "",
        emailPhone: "",
        studentCount: "",
        teacherCount: "",
        classLevels: [],
      }
    }
    return {
      productType: "nyansapo",
      firstName: "",
      secondName: "",
      organizationType: "",
      assessmentSupport: "",
      childrenCount: "",
      primaryCountry: "",
      emailPhone: "", // Added email field
    }
  })

  // Get title based on product type
  const getTitle = () => {
    return formData.productType === "hekima"
      ? "Maximize the Benefits of Hekima Learning App"
      : "Maximize the Benefits of Nyansapo Learning App"
  }

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value } as FormData))
  }

  // Handle checkbox changes for class levels
  const handleCheckboxChange = (level: string) => {
    if (formData.productType !== "hekima") return

    setFormData((prev) => {
      if (prev.productType === "hekima") {
        const classLevels = prev.classLevels.includes(level)
          ? prev.classLevels.filter((l) => l !== level)
          : [...prev.classLevels, level]
        return { ...prev, classLevels }
      }
      return prev
    })
  }

  // Reset form after submission
  const resetForm = () => {
    setFormData((prev) => {
      if (prev.productType === "hekima") {
        return {
          productType: "hekima",
          institutionName: "",
          institutionType: "",
          location: "",
          contactNameRole: "",
          emailPhone: "",
          studentCount: "",
          teacherCount: "",
          classLevels: [],
        }
      }
      return {
        productType: "nyansapo",
        firstName: "",
        secondName: "",
        organizationType: "",
        assessmentSupport: "",
        childrenCount: "",
        primaryCountry: "",
        emailPhone: "", // Added email field
      }
    })
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)
      setSubmissionStatus(null)

      // Send form data to API
      const response = await fetch('/api/tutor-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || result.details?.[0]?.message || 'Failed to submit form')
      }

      setSubmissionStatus({
        success: true,
        message: "Thank you for your interest! We'll contact you soon.",
      })
      resetForm()
      
    } catch (error: any) {
      console.error("Form submission error:", error)
      setSubmissionStatus({
        success: false,
        message: error.message || "There was a problem submitting your form. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-sm">
      {!showForm ? (
        <WelcomeSection
          ctaText={ctaText}
          title={getTitle()}
          onGetStarted={() => setShowForm(true)}
        />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {formData.productType === "hekima" ? (
            <HekimaForm
              formData={
                formData as Extract<FormData, { productType: "hekima" }>
              }
              onInputChange={handleInputChange}
              onCheckboxChange={handleCheckboxChange}
            />
          ) : (
            <NyansapoForm
              formData={
                formData as Extract<FormData, { productType: "nyansapo" }>
              }
              onInputChange={handleInputChange}
            />
          )}

          {/* Status message */}
          {submissionStatus && (
            <div
              className={`p-4 rounded-md ${
                submissionStatus.success
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              <p className="font-medium">
                {submissionStatus.success ? "✅ Success!" : "❌ Error"}
              </p>
              <p className="mt-1 text-sm">{submissionStatus.message}</p>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                formData.productType === "hekima" 
                  ? "bg-yellow-500 hover:bg-yellow-600" 
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white px-6 py-3 rounded-md transition-colors font-medium ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors font-medium"
              disabled={isSubmitting}
            >
              Back
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default TutorChat
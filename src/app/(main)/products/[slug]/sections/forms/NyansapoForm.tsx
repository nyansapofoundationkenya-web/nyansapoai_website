// forms/NyansapoForm.tsx
import React from "react"
import { FormData, organizationTypes } from "../types"

interface NyansapoFormProps {
  formData: Extract<FormData, { productType: "nyansapo" }>
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void
}

const NyansapoForm: React.FC<NyansapoFormProps> = ({
  formData,
  onInputChange,
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-50 mb-6">
        Personal Information
      </h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-gray-50 font-medium">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={onInputChange}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="Enter first name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="secondName" className="block text-gray-50 font-medium">
              Second Name *
            </label>
            <input
              type="text"
              id="secondName"
              name="secondName"
              value={formData.secondName}
              onChange={onInputChange}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="Enter second name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="emailPhone" className="block text-gray-50 font-medium">
            Email Address *
          </label>
          <input
            type="email"
            id="emailPhone"
            name="emailPhone"
            value={formData.emailPhone}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            placeholder="your.email@example.com"
          />
          <p className="text-sm text-gray-300 mt-1">
            We&apos;ll send confirmation and updates to this email
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="organizationType" className="block text-gray-50 font-medium">
            Organization Type *
          </label>
          <select
            id="organizationType"
            name="organizationType"
            value={formData.organizationType}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select organization type</option>
            {organizationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="assessmentSupport" className="block text-gray-50 font-medium">
            What assessments would you like support with? *
          </label>
          <textarea
            id="assessmentSupport"
            name="assessmentSupport"
            value={formData.assessmentSupport}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            required
            placeholder="e.g., Student performance tracking, Teacher evaluations, Standardized test preparation..."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="childrenCount" className="block text-gray-50 font-medium">
            How many children are you intending to reach? *
          </label>
          <input
            type="number"
            id="childrenCount"
            name="childrenCount"
            value={formData.childrenCount}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            min="1"
            placeholder="e.g., 500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="primaryCountry" className="block text-gray-50 font-medium">
            Primary country of operation *
          </label>
          <input
            type="text"
            id="primaryCountry"
            name="primaryCountry"
            value={formData.primaryCountry}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            placeholder="e.g., Kenya"
          />
        </div>
      </div>
    </>
  )
}

export default NyansapoForm
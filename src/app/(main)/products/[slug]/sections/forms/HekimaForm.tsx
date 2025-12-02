// forms/HekimaForm.tsx
import React from "react"
import { FormData, institutionTypes, classLevelOptions } from "../types"

interface HekimaFormProps {
  formData: Extract<FormData, { productType: "hekima" }>
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void
  onCheckboxChange: (level: string) => void
}

const HekimaForm: React.FC<HekimaFormProps> = ({
  formData,
  onInputChange,
  onCheckboxChange,
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-50 mb-6">
        Institution Information
      </h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="institutionName" className="block text-gray-50 font-medium">
            School/Organization Name *
          </label>
          <input
            type="text"
            id="institutionName"
            name="institutionName"
            value={formData.institutionName}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            required
            placeholder="Enter institution name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="institutionType" className="block text-gray-50 font-medium">
            Type of Institution *
          </label>
          <select
            id="institutionType"
            name="institutionType"
            value={formData.institutionType}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            required
          >
            <option value="">Select institution type</option>
            {institutionTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="block text-gray-50 font-medium">
            Location (County, Town) *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            required
            placeholder="e.g., Nairobi, Kenya"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="contactNameRole" className="block text-gray-50 font-medium">
            Contact Name & Role *
          </label>
          <input
            type="text"
            id="contactNameRole"
            name="contactNameRole"
            value={formData.contactNameRole}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            required
            placeholder="e.g., John Doe - Principal"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="emailPhone" className="block text-gray-50 font-medium">
            Email & Phone Number *
          </label>
          <input
            type="text"
            id="emailPhone"
            name="emailPhone"
            value={formData.emailPhone}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            required
            placeholder="e.g., john@school.edu, +254712345678"
          />
          <p className="text-sm text-gray-300 mt-1">
            Please provide both email and phone number for faster communication
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-50 mt-8 mb-6">
        Student & Teacher Reach
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="studentCount" className="block text-gray-50 font-medium">
            Total Number of Students *
          </label>
          <input
            type="number"
            id="studentCount"
            name="studentCount"
            value={formData.studentCount}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            required
            min="1"
            placeholder="e.g., 500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="teacherCount" className="block text-gray-50 font-medium">
            Number of Teachers Using the Platform *
          </label>
          <input
            type="number"
            id="teacherCount"
            name="teacherCount"
            value={formData.teacherCount}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            required
            min="1"
            placeholder="e.g., 25"
          />
        </div>
      </div>

      <div className="space-y-2 mt-6">
        <label className="block text-gray-50 font-medium mb-2">
          Class Levels Covered *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {classLevelOptions.map((level) => (
            <div key={level} className="flex items-center bg-white/10 p-3 rounded-lg">
              <input
                type="checkbox"
                id={level}
                checked={formData.classLevels.includes(level)}
                onChange={() => onCheckboxChange(level)}
                className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
              />
              <label htmlFor={level} className="ml-3 text-gray-50">
                {level}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default HekimaForm
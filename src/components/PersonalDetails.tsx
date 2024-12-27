import React from 'react'
import { formPlaceholders } from '../constants/formPlaceholders'

interface PersonalDetailsData {
  studentName: string
  studentId: string
  email: string
  phone: string
  physicalAddress: string
  course: string
  guardianName: string
  guardianId: string
  guardianPhone: string
  guardianEmail: string
  guardianAddress: string
  guardianRelationship: string
}

interface PersonalDetailsProps {
  data: PersonalDetailsData
  updateData: (data: PersonalDetailsData) => void
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ data, updateData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#E67E22]">Personal Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Details Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[#2C3E50]">Student Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-[#2C3E50]">
              Full Name
            </label>
            <input
              type="text"
              name="studentName"
              value={data.studentName}
              onChange={handleChange}
              placeholder={formPlaceholders.personalDetails.studentName}
              autoComplete="name"
              className="mt-1 w-full px-3 py-2 border border-[#2C3E50] rounded-md focus:ring-[#E67E22] focus:border-[#E67E22]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C3E50]">
              Identity Number
            </label>
            <input
              type="text"
              name="studentId"
              value={data.studentId}
              onChange={handleChange}
                placeholder={formPlaceholders.personalDetails.studentId}
              className="mt-1 w-full px-3 py-2 border border-[#2C3E50] rounded-md focus:ring-[#E67E22] focus:border-[#E67E22]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C3E50]">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder={formPlaceholders.personalDetails.email}
              autoComplete="email"
              className="mt-1 w-full px-3 py-2 border border-[#2C3E50] rounded-md focus:ring-[#E67E22] focus:border-[#E67E22]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C3E50]">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              placeholder={formPlaceholders.personalDetails.phone}
              autoComplete="tel"
              className="mt-1 w-full px-3 py-2 border border-[#2C3E50] rounded-md focus:ring-[#E67E22] focus:border-[#E67E22]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C3E50]">
              Physical Address
            </label>
            <input
              type="text"
              name="physicalAddress"
              value={data.physicalAddress}
              onChange={handleChange}
              placeholder={formPlaceholders.personalDetails.physicalAddress}
              autoComplete="street-address"
              className="mt-1 w-full px-3 py-2 border border-[#2C3E50] rounded-md focus:ring-[#E67E22] focus:border-[#E67E22]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2C3E50]">
              Course Enrolled For
            </label>
            <input
              type="text"
              name="course"
              value={data.course}
              onChange={handleChange}
                placeholder={formPlaceholders.personalDetails.course}
              className="mt-1 w-full px-3 py-2 border border-[#2C3E50] rounded-md focus:ring-[#E67E22] focus:border-[#E67E22]"
              required
            />
          </div>
        </div>

        {/* Guardian Details Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[#2C3E50]">Guardian Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-[#2C3E50]">
              Guardian Full Name
            </label>
            <input
              type="text"
              name="guardianName"
              value={data.guardianName}
              onChange={handleChange}
              placeholder={formPlaceholders.personalDetails.guardianName}
              autoComplete="name"
              className="mt-1 w-full px-3 py-2 border border-[#2C3E50] rounded-md focus:ring-[#E67E22] focus:border-[#E67E22]"
              required
            />
          </div>

              <div>
              <label className="block text-sm font-medium text-[#2C3E50]">
                Guardian Identity Number
              </label>
              <input
                type="text"
                name="guardianId"
                value={data.guardianId}
                onChange={handleChange}
                placeholder={formPlaceholders.personalDetails.guardianId}
                className="mt-1 w-full px-3 py-2 border border-[#2C3E50] rounded-md focus:ring-[#E67E22] focus:border-[#E67E22]"
                required
              />
              </div>

              <div>
              <label className="block text-sm font-medium text-[#2C3E50]">
                Guardian Phone Number
              </label>
              <input
                type="tel"
                name="guardianPhone"
                value={data.guardianPhone}
                onChange={handleChange}
                placeholder={formPlaceholders.personalDetails.guardianPhone}
                className="mt-1 w-full px-3 py-2 border border-[#2C3E50] rounded-md focus:ring-[#E67E22] focus:border-[#E67E22]"
                required
              />
              </div>

              <div>
              <label className="block text-sm font-medium text-[#2C3E50]">
                Guardian Email
              </label>
              <input
                type="email"
                name="guardianEmail"
                value={data.guardianEmail}
                onChange={handleChange}
                placeholder={formPlaceholders.personalDetails.guardianEmail}
                autoComplete="email"
                className="mt-1 w-full px-3 py-2 border border-[#2C3E50] rounded-md focus:ring-[#E67E22] focus:border-[#E67E22]"
                required
              />
              </div>

              <div>
              <label className="block text-sm font-medium text-[#2C3E50]">
                Guardian Physical Address
              </label>
              <input
                type="text"
                name="guardianAddress"
                value={data.guardianAddress}
                onChange={handleChange}
                placeholder={formPlaceholders.personalDetails.guardianAddress}
                className="mt-1 w-full px-3 py-2 border border-[#2C3E50] rounded-md focus:ring-[#E67E22] focus:border-[#E67E22]"
                required
              />
              </div>

              <div>
              <label className="block text-sm font-medium text-[#2C3E50]">
                Relationship to Student
              </label>
              <input
                type="text"
                name="guardianRelationship"
                value={data.guardianRelationship}
                onChange={handleChange}
                placeholder={formPlaceholders.personalDetails.guardianRelationship}
                className="mt-1 w-full px-3 py-2 border border-[#2C3E50] rounded-md focus:ring-[#E67E22] focus:border-[#E67E22]"
                required
              />
              </div>
            </div>
            </div>
          </div>

  )
}

export default PersonalDetails

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { termsAndConditions } from '../constants/termsAndConditions'

interface TermsProps {
  accepted: boolean
  updateData: (accepted: boolean) => void
}

const Terms = ({ accepted, updateData }: TermsProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  // Parse the terms and conditions string into sections
  const sections = termsAndConditions.split('\n\n').map((section, index) => {
    const lines = section.split('\n')
    const title = lines[0].trim()
    const content = lines.slice(1).join('\n').trim()
    return {
      id: `section-${index}`,
      title,
      content
    }
  }).filter(section => section.title && section.content) // Remove any empty sections

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#E67E22] mb-6">Terms & Conditions</h2>
      
      <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-4">
        {sections.map(section => (
          <div key={section.id} className="border border-[#2C3E50] rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-4 py-3 bg-white flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-[#2C3E50]">{section.title}</h3>
              {expandedSections.includes(section.id) ? (
                <ChevronUp className="w-5 h-5 text-[#E67E22] flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#E67E22] flex-shrink-0" />
              )}
            </button>
            {expandedSections.includes(section.id) && (
              <div className="p-4 bg-white border-t border-[#2C3E50]">
                <div className="text-[#2C3E50] text-sm whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => updateData(e.target.checked)}
            className="w-4 h-4 text-[#E67E22] rounded border-[#2C3E50] focus:ring-[#E67E22]"
          />
          <span className="text-sm text-[#2C3E50]">
            I have read and agree to the terms and conditions of this lease agreement
          </span>
        </label>
      </div>
    </div>
  )
}

export default Terms

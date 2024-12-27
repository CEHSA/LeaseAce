import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { debitAcknowledgment } from '../constants/debitAcknowledgment'
import { debitOrderPlaceholders } from '../constants/formPlaceholders'

interface DebitData {
  accepted: boolean;
  bankName: string;
  accountNumber: string;
  branchCode: string;
  accountHolder: string;
}

interface DebitAcknowledgmentProps {
  accepted: boolean;
  updateData: (data: DebitData) => void;
  data: DebitData;
}

const DebitAcknowledgment: React.FC<DebitAcknowledgmentProps> = ({ accepted, updateData, data }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  // Parse the debit acknowledgment string into sections
  const sections = debitAcknowledgment.split('\n\n').map((section, index) => {
    const lines = section.split('\n')
    const title = lines[0].trim()
    const content = lines.slice(1).join('\n').trim()
    return {
      id: `section-${index}`,
      title,
      content
    }
  }).filter(section => section.title && section.content)

  const handleInputChange = (field: string, value: string | boolean) => {
    updateData({
      ...data,
      [field]: value
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#E67E22] mb-6">Debit Order Acknowledgment</h2>
      
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

        <div className="mt-8 space-y-4 bg-white p-6 rounded-lg border border-[#2C3E50]">
          <h3 className="text-lg font-semibold text-[#E67E22] mb-4">Banking Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-1">
            Bank Name
            </label>
            <input
              type="text"
              value={data.bankName}
              onChange={(e) => handleInputChange('bankName', e.target.value)}
              placeholder={debitOrderPlaceholders.bankName}
              name="bankName"
              id="bankName"
              autoComplete="organization"
              className="mt-1 w-full px-3 py-2 border border-[#2C3E50] rounded-md focus:ring-[#E67E22] focus:border-[#E67E22]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-1">
            Account Number
            </label>
            <input
              type="text"
              value={data.accountNumber}
              onChange={(e) => handleInputChange('accountNumber', e.target.value)}
              placeholder={debitOrderPlaceholders.accountNumber}
              name="accountNumber"
              id="accountNumber"
              autoComplete="cc-number"
              className="mt-1 w-full px-3 py-2 border border-[#2C3E50] rounded-md focus:ring-[#E67E22] focus:border-[#E67E22]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-1">
            Branch Code
            </label>
            <input
              type="text"
              value={data.branchCode}
              onChange={(e) => handleInputChange('branchCode', e.target.value)}
              placeholder={debitOrderPlaceholders.branchCode}
              name="branchCode"
              id="branchCode"
              autoComplete="cc-csc"
              className="mt-1 w-full px-3 py-2 border border-[#2C3E50] rounded-md focus:ring-[#E67E22] focus:border-[#E67E22]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#2C3E50] mb-1">
            Account Holder Name
            </label>
            <input
              type="text"
              value={data.accountHolder}
              onChange={(e) => handleInputChange('accountHolder', e.target.value)}
              placeholder={debitOrderPlaceholders.accountHolder}
              name="accountHolder"
              id="accountHolder"
              autoComplete="cc-name"
              className="mt-1 w-full px-3 py-2 border border-[#2C3E50] rounded-md focus:ring-[#E67E22] focus:border-[#E67E22]"
            />
          </div>
          </div>
        </div>


      <div className="mt-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => handleInputChange('accepted', e.target.checked)}
            className="w-4 h-4 text-[#E67E22] rounded border-[#2C3E50] focus:ring-[#E67E22]"
          />
          <span className="text-sm text-[#2C3E50]">
            I have read and agree to the debit order terms and conditions, and confirm that the banking details provided are correct
          </span>
        </label>
      </div>
    </div>
  )
}

export default DebitAcknowledgment

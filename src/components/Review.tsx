import React from 'react'
import type { FormData } from '../components/LeaseForm'
import { RATES } from '../constants/roomManagement'

interface ReviewProps {
  data: FormData
}

const Review: React.FC<ReviewProps> = ({ data }) => {
  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-[#E67E22] mb-3">{title}</h3>
      <div className="bg-white p-4 rounded-lg border border-[#2C3E50] shadow-sm">{children}</div>
    </div>
  )

  const Field = ({ label, value }: { label: string, value: string | boolean }) => (
    <div className="mb-2">
      <span className="font-medium text-[#2C3E50]">{label}: </span>
      <span className="text-[#2C3E50]">{value.toString()}</span>
    </div>
  )

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#E67E22] mb-6">Review Your Information</h2>
      
      <Section title="Lessor Details">
        <Field label="Name" value={data.lessorDetails.name} />
        <Field label="Registration Number" value={data.lessorDetails.regNo} />
        <Field label="Email" value={data.lessorDetails.email} />
        <Field label="Phone" value={data.lessorDetails.phone} />
        <Field label="Address" value={data.lessorDetails.address} />
        <Field label="NSFAS Accreditation Number" value={data.lessorDetails.nsfasAccreditationNo} />
      </Section>

      <Section title="Personal Details">
        <Field label="Student Name" value={data.personalDetails.studentName} />
        <Field label="Student ID" value={data.personalDetails.studentId} />
        <Field label="Email" value={data.personalDetails.email} />
        <Field label="Phone" value={data.personalDetails.phone} />
        <Field label="Physical Address" value={data.personalDetails.physicalAddress} />
        <Field label="Course" value={data.personalDetails.course} />
        
        <div className="mt-4 pt-4 border-t border-[#2C3E50]">
          <h4 className="font-semibold mb-2 text-[#E67E22]">Guardian Information</h4>
          <Field label="Guardian Name" value={data.personalDetails.guardianName} />
          <Field label="Guardian ID" value={data.personalDetails.guardianId} />
          <Field label="Guardian Phone" value={data.personalDetails.guardianPhone} />
          <Field label="Guardian Email" value={data.personalDetails.guardianEmail} />
          <Field label="Guardian Address" value={data.personalDetails.guardianAddress} />
          <Field label="Relationship to Student" value={data.personalDetails.guardianRelationship} />
        </div>
      </Section>

      <Section title="Property Details">
        <Field 
          label="Occupancy Type" 
          value={data.propertyDetails.occupancyType === 'single' ? 'Single Room' : 'Sharing Room'} 
        />
        <Field 
          label="Payment Interval" 
          value={data.propertyDetails.paymentInterval === 'monthly' ? 'Monthly' : 'Annual'} 
        />
        <Field 
          label="Rate" 
          value={`R ${RATES[data.propertyDetails.occupancyType][data.propertyDetails.paymentInterval].toLocaleString()} ${data.propertyDetails.paymentInterval === 'monthly' ? '/month' : '/year'}`} 
        />
        <Field label="Property Address" value={data.propertyDetails.propertyAddress} />
        <Field label="Room Number" value={data.propertyDetails.roomNumber} />
        <Field label="Lease Type" value={data.propertyDetails.leaseType} />
        <Field label="Lease Start Date" value={data.propertyDetails.leaseStart} />
        <Field label="Lease End Date" value={data.propertyDetails.leaseEnd} />
        
        <div className="mt-4 pt-4 border-t border-[#2C3E50]">
          <h4 className="font-semibold mb-2 text-[#E67E22]">Bank Details</h4>
          <Field label="Account Holder" value={data.propertyDetails.bankDetails.accountHolder} />
          <Field label="Bank" value={data.propertyDetails.bankDetails.bank} />
          <Field label="Branch" value={data.propertyDetails.bankDetails.branch} />
          <Field label="Branch Code" value={data.propertyDetails.bankDetails.branchCode} />
          <Field label="Account Number" value={data.propertyDetails.bankDetails.accountNumber} />
        </div>
      </Section>

      <Section title="Terms & Conditions">
        <Field label="Terms Accepted" value={data.termsAccepted} />
      </Section>

      <Section title="House Rules">
        <Field label="House Rules Accepted" value={data.houseRulesAccepted} />
      </Section>

      <Section title="Signatures">
        <Field label="Lessor Date" value={data.signature.lessorDate} />
        <Field label="Lessor Signature" value={data.signature.lessorSignature ? "Signed" : "Not signed"} />
        <Field label="Lessee Date" value={data.signature.lesseeDate} />
        <Field label="Lessee Signature" value={data.signature.lesseeSignature ? "Signed" : "Not signed"} />
      </Section>

      <Section title="Debit Order Details">
        <Field label="Debit Order Accepted" value={data.debitOrder.accepted} />
        <Field label="Bank Name" value={data.debitOrder.bankName} />
        <Field label="Account Number" value={data.debitOrder.accountNumber} />
        <Field label="Branch Code" value={data.debitOrder.branchCode} />
        <Field label="Account Holder" value={data.debitOrder.accountHolder} />
      </Section>

      <p className="text-sm text-[#2C3E50] mt-6">
        Please review all information carefully. If you need to make any changes, use the Previous button to navigate back to the relevant section.
      </p>
    </div>
  )
}

export default Review

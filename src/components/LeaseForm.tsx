import { useState, useEffect } from 'react'
import { OccupancyType, PaymentInterval } from '../constants/roomManagement'
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'
import Watermark from './Watermark'
import PersonalDetails from './PersonalDetails'
import { default as PropertyDetailsComponent } from './PropertyDetails'
import Terms from './Terms'
import Signature from './Signature'
import LessorDetails from './LessorDetails'
import Review from './Review'
import HouseRules from './HouseRules'
import DebitAcknowledgment from './DebitAcknowledgment'
import CoverPage from './CoverPage'
import Payment from './Payment'
import { generatePDF } from '../utils/generatePDF'
import LoadingSpinner from './LoadingSpinner'
import Notification from './Notification'
import { validateForm, formatValidationErrors } from '../utils/validation'

export type FormData = {

  lessorDetails: {
    name: string;
    regNo: string;
    email: string;
    phone: string;
    address: string;
    nsfasAccreditationNo: string;
    bankDetails: {
      bank: string;
      accountHolder: string;
      accountNumber: string;
      branchCode: string;
    };
  };
  personalDetails: {
    studentName: string;
    studentId: string;
    email: string;
    phone: string;
    physicalAddress: string;
    course: string;
    guardianName: string;
    guardianId: string;
    guardianPhone: string;
    guardianEmail: string;
    guardianAddress: string;
    guardianRelationship: string;
  };
  propertyDetails: {
    occupancyType: OccupancyType;
    paymentInterval: PaymentInterval;
    propertyAddress: string;
    roomNumber: string;
    leaseType: 'bursary' | 'private';
    leaseStart: string;
    leaseEnd: string;
    selectedExtras: string[];
    bankDetails: {
      accountHolder: string;
      bank: string;
      branch: string;
      branchCode: string;
      accountNumber: string;
    };
  };
  termsAccepted: boolean;
  signature: {
    lessorSignature: string;
    lessorDate: string;
    lessorLocation: string;
    lesseeSignature: string;
    lesseeDate: string;
    lesseeLocation: string;
    lessorFormattedLocation: string;
    lesseeFormattedLocation: string;
  };
  houseRulesAccepted: boolean;
  debitOrder: {
    accepted: boolean;
    bankName: string;
    accountNumber: string;
    branchCode: string;
    accountHolder: string;
  };
};

// Make the type definition more explicit
export type LeaseData = FormData;

const steps = [
  'Cover Page',
  'Lessor Details',
  'Personal Details',
  'Property & Payment',
  'Terms & Conditions',
  'House Rules',
  'Debit Acknowledgment',
  'Review',
  'Sign & Submit',
  'Payment'
]

type NotificationType = {
  type: 'success' | 'error';
  message: string;
} | null;

const LeaseForm = () => {
  console.log('LeaseForm rendering'); // Debug log

  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState<NotificationType>(null)
  const [formData, setFormData] = useState<FormData>({
    lessorDetails: {
      name: 'AAA Student Rentals',
      regNo: '2024/339166/07',
      email: 'aaa.student.rentals@gmail.com',
      phone: '+27 76 848 3419',
      address: 'Potchefstroom, North West',
      nsfasAccreditationNo: '',
      bankDetails: {
        bank: 'FNB',
        accountHolder: 'AAA Student Rentals',
        accountNumber: '63103816885',
        branchCode: '250655',
      }
    },
    personalDetails: {
      studentName: '',
      studentId: '',
      email: '',
      phone: '',
      physicalAddress: '',
      course: '',
      guardianName: '',
      guardianId: '',
      guardianPhone: '',
      guardianEmail: '',
      guardianAddress: '',
      guardianRelationship: '',
    },
    propertyDetails: {
      occupancyType: 'single' as OccupancyType,
      paymentInterval: 'monthly' as PaymentInterval,
      propertyAddress: '',
      roomNumber: '',
      leaseType: 'private',
      leaseStart: '',
      leaseEnd: '',
      selectedExtras: [],
      bankDetails: {
        accountHolder: '',
        bank: '',
        branch: '',
        branchCode: '',
        accountNumber: '',
      }
    },
    termsAccepted: false,
    signature: {
      lessorSignature: '',
      lessorDate: '',
      lessorLocation: '',
      lesseeSignature: '',
      lesseeDate: '',
      lesseeLocation: '',
      lessorFormattedLocation: '',
      lesseeFormattedLocation: ''
    },
    houseRulesAccepted: false,
    debitOrder: {
      accepted: false,
      bankName: '',
      accountNumber: '',
      branchCode: '',
      accountHolder: ''
    },
  })

  useEffect(() => {
    console.log('Current step:', currentStep); // Debug log
  }, [currentStep]);

  const updateFormData = <K extends keyof FormData>(section: K, data: Partial<FormData[K]>) => {
    console.log('Updating form data:', section, data); // Debug log
    setFormData(prev => {
      if (section === 'propertyDetails' && typeof data === 'object' && data !== null && !('bankDetails' in data)) {
        // Preserve bankDetails when updating propertyDetails
        return {
          ...prev,
          propertyDetails: {
            ...prev.propertyDetails,
            ...data,
            bankDetails: prev.propertyDetails.bankDetails
          }
        };
      }
      if (typeof prev[section] === 'object' && prev[section] !== null && typeof data === 'object' && data !== null) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            ...data
          }
        };
      }
      return {
        ...prev,
        [section]: data
      };
    });
  }

  const handleSubmit = async () => {
    try {
      // Validate form
      const validationErrors = validateForm(formData)
      if (validationErrors.length > 0) {
        setNotification({
          type: 'error',
          message: formatValidationErrors(validationErrors)
        })
        return
      }

      setIsSubmitting(true)
      
      // Generate and send PDF
      const result = await generatePDF(formData as LeaseData)

      if (result.success) {
        setNotification({
          type: 'success',
          message: `Lease agreement submitted successfully!\nReference: ${result.documentId}`
        })
        console.log('Form submitted successfully!', result)
      } else {
        setNotification({
          type: 'error',
          message: result.errors?.join('\n') || 'Error submitting form. Please try again later.'
        })
        console.error('Error submitting form:', result.errors)
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Error submitting form. Please try again later.'
      })
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    console.log('Rendering step:', currentStep); // Debug log
    switch(currentStep) {
      case 0:
        return <CoverPage />
      case 1:
        return <LessorDetails />
      case 2:
        return <PersonalDetails 
          data={formData.personalDetails} 
          updateData={(data) => updateFormData('personalDetails', data)} 
        />
      case 3:
        return <PropertyDetailsComponent
          data={formData.propertyDetails}
          updateData={(data) => updateFormData('propertyDetails', data)}
        />
      case 4:
        return <Terms 
          accepted={formData.termsAccepted}
          updateData={(data) => updateFormData('termsAccepted', data)}
        />
      case 5:
        return <HouseRules
          accepted={formData.houseRulesAccepted}
          updateData={(accepted) => updateFormData('houseRulesAccepted', accepted)}
        />
      case 6:
        return <DebitAcknowledgment
          accepted={formData.debitOrder.accepted}
          data={formData.debitOrder}
          updateData={(data) => updateFormData('debitOrder', data)}
        />
      case 7:
        return <Review data={formData} />
      case 8:
      return <Signature
        data={formData.signature}
        updateData={(data) => updateFormData('signature', data)}
        requireLocation={true}
      />
      case 9:
        return <Payment data={formData} />
      default:
        console.error('Invalid step:', currentStep);
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 border border-[#2C3E50]">
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Stepper - Only show after cover page */}
      {currentStep > 0 && (
        <div className="mb-8">
          <div className="flex justify-between">
            {steps.slice(1).map((step, idx) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  idx < currentStep - 1 ? 'bg-[#E67E22] text-white' :
                  idx === currentStep - 1 ? 'bg-[#E67E22] text-white' :
                  'bg-[#2C3E50] text-white'
                }`}>
                  {idx < currentStep - 1 ? <Check className="w-5 h-5" /> : idx + 1}
                </div>
                <span className="text-sm mt-2 text-center text-[#2C3E50]">{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form Content */}
      <div className={`relative ${currentStep === 0 ? '' : 'mb-8 bg-white p-6 rounded-lg border border-[#2C3E50]'}`}>
        <Watermark />
        <div className="relative z-10">
          {isSubmitting ? (
            <div className="flex flex-col items-center justify-center py-12">
              <LoadingSpinner size="large" />
              <p className="mt-4 text-[#2C3E50]">Processing your lease agreement...</p>
            </div>
          ) : (
            renderStep()
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          disabled={currentStep === 0 || isSubmitting}
          className="flex items-center gap-2 px-4 py-2 text-[#E67E22] disabled:text-[#2C3E50] transition-colors duration-200"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        
        {currentStep === steps.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`flex items-center gap-2 px-6 py-2 bg-[#E67E22] text-white rounded-md hover:bg-[#2C3E50] transition-colors duration-200 disabled:bg-gray-400`}
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="small" color="#ffffff" />
                <span>Submitting...</span>
              </>
            ) : (
              'Submit Agreement'
            )}
          </button>
        ) : (
          <button
            onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2 text-[#E67E22] hover:text-[#2C3E50] transition-colors duration-200"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export default LeaseForm

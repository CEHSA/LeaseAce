import { useState, useEffect, type FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { optionalExtras } from '../constants/optionalExtras';
import { RATES } from '../constants/roomManagement';
import type { FormData } from './LeaseForm';
import { getFormattedLocation } from '../utils/location';

interface PaymentProps {
  data: FormData;
}

// Helper functions
const calculateExtrasAmount = (selectedExtras: string[], isMonthly: boolean): number => {
  return optionalExtras
    .filter(extra => selectedExtras.includes(extra.id) && extra.isMonthly === isMonthly)
    .reduce((sum, extra) => sum + extra.price, 0);
};

const calculateTotalAmount = (
  data: FormData['propertyDetails']
): number => {
  const baseRate = RATES[data.occupancyType][data.paymentInterval]
  const monthlyExtras = calculateExtrasAmount(data.selectedExtras, true)
  const onceOffExtras = calculateExtrasAmount(data.selectedExtras, false)
  
  if (data.paymentInterval === 'monthly') {
    const totalMonthly = baseRate + monthlyExtras
    const months = data.leaseType === 'bursary' ? 10 : 12
    return totalMonthly * months + onceOffExtras
  } else {
    return baseRate + onceOffExtras
  }
}


const Payment: FC<PaymentProps> = ({ data }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [location, setLocation] = useState<string | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationResult = await getFormattedLocation()
        if (locationResult.success && locationResult.address) {
          setLocation(locationResult.address)
        } else {
          setLocationError(locationResult.error || 'Failed to fetch location')
        }
      } catch (error) {
        setLocationError('Location access denied or error occurred')
      }
    }
    fetchLocation()
  }, [setLocation, setLocationError])

  if (!location) {
    return <div>Please allow location access to proceed.</div>
  }

  const currentDate = new Date().toISOString().split('T')[0]

  const handlePayment = async () => {

    if (!location.trim()) {
      setError('Please enter your current location')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const baseDomain = window.location.origin
      const transactionReference = uuidv4()
      const bankReference = `RENT-${data.personalDetails.studentName.replace(/\s+/g, '-')}`
      const totalAmount = calculateTotalAmount(data.propertyDetails)
      const siteCode = import.meta.env.VITE_OZOW_SITE_CODE
      const privateKey = import.meta.env.VITE_OZOW_PRIVATE_KEY
      const countryCode = 'ZA'
      const currencyCode = 'ZAR'
      const isTest = import.meta.env.DEV ? 'true' : 'false'

      // Store payment details in localStorage for reference
      const paymentDetails = {
      transactionReference,
      occupancyType: data.propertyDetails.occupancyType,
      paymentInterval: data.propertyDetails.paymentInterval,
      totalAmount,
      leaseType: data.propertyDetails.leaseType,
      selectedExtras: data.propertyDetails.selectedExtras,
      date: currentDate,
      location,
      studentName: data.personalDetails.studentName
      }
      localStorage.setItem('lastPayment', JSON.stringify(paymentDetails))

      // Prepare URLs
      const cancelUrl = `${baseDomain}/form/payment/cancel`
      const errorUrl = `${baseDomain}/form/payment/error`
      const notifyUrl = `${baseDomain}/form/payment/notify`
      const successUrl = `${baseDomain}/form/payment/success`

      // Prepare values for hash calculation in exact order
      const hashValues = [
      siteCode,
      countryCode,
      currencyCode,
      totalAmount.toFixed(2),
      transactionReference,
      bankReference,
      cancelUrl,
      errorUrl,
      successUrl,
      notifyUrl,
      isTest,
      data.personalDetails.studentName,
      data.personalDetails.email,
      privateKey
      ]

      // Create hash from lowercase concatenated string
      const hashInput = hashValues.join('').toLowerCase()
      console.log('Hash input:', hashInput)
      
      const hashCheck = await crypto.subtle.digest(
      'SHA-512',
      new TextEncoder().encode(hashInput)
      ).then(buffer => Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
      )

      console.log('Generated hash:', hashCheck)

      const redirectUrl = `https://pay.ozow.com/` +
      `?SiteCode=${siteCode}` +
      `&CountryCode=${countryCode}` +
      `&CurrencyCode=${currencyCode}` +
      `&Amount=${totalAmount.toFixed(2)}` +
      `&TransactionReference=${transactionReference}` +
      `&BankReference=${bankReference}` +
      `&CancelUrl=${encodeURIComponent(cancelUrl)}` +
      `&ErrorUrl=${encodeURIComponent(errorUrl)}` +
      `&NotifyUrl=${encodeURIComponent(notifyUrl)}` +
      `&SuccessUrl=${encodeURIComponent(successUrl)}` +
      `&IsTest=${isTest}` +
      `&Customer=${encodeURIComponent(data.personalDetails.studentName)}` +
      `&CustomerEmail=${encodeURIComponent(data.personalDetails.email)}` +
      `&HashCheck=${hashCheck}`;

        console.log('Payment initiated:', paymentDetails)
        window.location.href = redirectUrl
      } catch (err) {
        const error = err instanceof Error ? err.message : 'Failed to initiate payment'
        setError(error)
        console.error('Payment error:', error)
      } finally {
        setIsLoading(false)
      }
      }

      const baseRate = RATES[data.propertyDetails.occupancyType][data.propertyDetails.paymentInterval]
      const monthlyExtras = calculateExtrasAmount(data.propertyDetails.selectedExtras, true)
      const onceOffExtras = calculateExtrasAmount(data.propertyDetails.selectedExtras, false)
      const months = data.propertyDetails.leaseType === 'bursary' ? 10 : 12
      const totalAmount = calculateTotalAmount(data.propertyDetails)

      const selectedExtrasDetails = optionalExtras.filter(extra => 
      data.propertyDetails.selectedExtras.includes(extra.id)
      )

      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-[#E67E22]">Payment</h2>

          <div className="bg-white p-6 rounded-lg border border-[#2C3E50] shadow-sm">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {/* Base Rate Details */}
            <div className="space-y-2">
              <div>
                <span className="text-[#2C3E50] font-medium">
                  {data.propertyDetails.paymentInterval === 'monthly' ? 'Base Monthly Rate:' : 'Annual Rate:'}
                </span>
                <span className="text-[#2C3E50] font-semibold ml-2">
                  R {baseRate.toLocaleString()}
                  {data.propertyDetails.paymentInterval === 'monthly' ? '/month' : '/year'}
                </span>
              </div>
              
              {/* Selected Extras */}
              {selectedExtrasDetails.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-[#2C3E50] font-medium">Selected Extras:</h4>
                  {selectedExtrasDetails.map(extra => (
                    <div key={extra.id} className="flex justify-between text-sm pl-4">
                      <span>{extra.name}</span>
                      <span>R {extra.price} {extra.isMonthly ? '/month' : 'once-off'}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Monthly Subtotal */}
              {data.propertyDetails.paymentInterval === 'monthly' && monthlyExtras > 0 && (
                <div className="mt-2 pt-2 border-t">
                  <span className="text-[#2C3E50] font-medium">Total Monthly Amount:</span>
                  <span className="text-[#2C3E50] font-semibold ml-2">
                    R {(baseRate + monthlyExtras).toLocaleString()}
                  </span>
                </div>
              )}

              {/* Once-off Extras */}
              {onceOffExtras > 0 && (
                <div className="mt-2">
                  <span className="text-[#2C3E50] font-medium">Once-off Extras Total:</span>
                  <span className="text-[#2C3E50] font-semibold ml-2">R {onceOffExtras}</span>
                </div>
              )}

              <div className="mt-2">
                <span className="text-[#2C3E50] font-medium">Lease Type:</span>
                <span className="text-[#2C3E50] ml-2">
                  {data.propertyDetails.leaseType === 'bursary' ? 'NSFAS (10 months)' : 'Private (12 months)'}
                </span>
              </div>

              {/* Final Total */}
              <div className="mt-4 pt-2 border-t border-[#2C3E50]">
                <span className="text-[#2C3E50] font-medium">Total Amount Due:</span>
                <span className="text-[#2C3E50] font-semibold ml-2">R {totalAmount.toLocaleString()}</span>
                {data.propertyDetails.paymentInterval === 'monthly' && (
                  <p className="text-sm text-gray-500 mt-1">
                    ({months} months × R {(baseRate + monthlyExtras).toLocaleString()}
                    {onceOffExtras > 0 ? ` + R ${onceOffExtras} once-off` : ''})
                  </p>
                )}
              </div>
            </div>

            <div>
              <span className="text-[#2C3E50] font-medium">Student Name:</span>
              <span className="text-[#2C3E50] ml-2">{data.personalDetails.studentName}</span>
            </div>

            <div>
              <span className="text-[#2C3E50] font-medium">Email:</span>
              <span className="text-[#2C3E50] ml-2">{data.personalDetails.email}</span>
            </div>

            <div>
              <span className="text-[#2C3E50] font-medium">Date:</span>
              <span className="text-[#2C3E50] ml-2">{currentDate}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#2C3E50]">
              Current Location
            </label>
            <input
              type="text"
              value={location || ''}
              readOnly
              placeholder="Fetching your location..."
              className="w-full px-3 py-2 border border-[#2C3E50] rounded-md focus:ring-[#E67E22] focus:border-[#E67E50]"
              required
              title="Location is required and must be allowed by the user"
            />
            {locationError && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                {locationError}
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="pt-4">
            <button
              onClick={handlePayment}
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors duration-200 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#E67E22] hover:bg-[#2C3E50]'}`}
            >
              {isLoading ? 'Processing...' : 'Pay with Ozow'}
            </button>
          </div>

          <p className="text-sm text-gray-500 text-center">
            You will be redirected to Ozow&apos;s secure payment page
          </p>
        </div>
      </div>
    </div>
  )
}

export default Payment

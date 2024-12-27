import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const PaymentResult: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  // Extract status from /form/payment/status path
  const status = location.pathname.split('/').pop() // /form/payment/success -> success

  const getContent = () => {
    switch (status) {
      case 'success':
        return {
          icon: <CheckCircle className="w-16 h-16 text-green-500" />,
          title: 'Payment Successful',
          message: 'Your payment has been processed successfully.',
          buttonText: 'View Receipt',
          buttonAction: () => {
            // Navigate to form root
            navigate('/form/')
          },
          buttonColor: 'bg-green-500 hover:bg-green-600'
        }
      case 'error':
        return {
          icon: <XCircle className="w-16 h-16 text-red-500" />,
          title: 'Payment Failed',
          message: 'There was an error processing your payment. Please try again.',
          buttonText: 'Try Again',
          buttonAction: () => navigate('/form/'),
          buttonColor: 'bg-red-500 hover:bg-red-600'
        }
      case 'cancel':
        return {
          icon: <AlertCircle className="w-16 h-16 text-yellow-500" />,
          title: 'Payment Cancelled',
          message: 'You have cancelled the payment process.',
          buttonText: 'Return to Payment',
          buttonAction: () => navigate('/form/'),
          buttonColor: 'bg-yellow-500 hover:bg-yellow-600'
        }
      default:
        return {
          icon: <AlertCircle className="w-16 h-16 text-gray-500" />,
          title: 'Unknown Status',
          message: 'An unknown error occurred.',
          buttonText: 'Return Home',
          buttonAction: () => navigate('/form/'),
          buttonColor: 'bg-gray-500 hover:bg-gray-600'
        }
    }
  }

  const content = getContent()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          {content.icon}
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {content.title}
        </h1>
        
        <p className="text-gray-600 mb-8">
          {content.message}
        </p>

        <button
          onClick={content.buttonAction}
          className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors duration-200 ${content.buttonColor}`}
        >
          {content.buttonText}
        </button>
      </div>
    </div>
  )
}

export default PaymentResult

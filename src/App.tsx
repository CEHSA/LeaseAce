import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load the LeaseForm component
const LeaseForm = lazy(() => import('./components/LeaseForm'));

function App() {
  return (
    <ErrorBoundary>
      <Router basename="/form">
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
          <main>
            <Suspense 
              fallback={
                <div className="flex justify-center items-center min-h-[60vh]">
                  <LoadingSpinner size="large" />
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<LeaseForm />} />
                <Route 
                  path="/payment/success" 
                  element={
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
                      <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful</h2>
                      <p className="text-gray-600">Your payment has been processed successfully.</p>
                    </div>
                  } 
                />
                <Route 
                  path="/payment/error" 
                  element={
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
                      <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h2>
                      <p className="text-gray-600">There was an error processing your payment. Please try again.</p>
                    </div>
                  } 
                />
                <Route 
                  path="/payment/cancel" 
                  element={
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
                      <h2 className="text-2xl font-bold text-yellow-600 mb-4">Payment Cancelled</h2>
                      <p className="text-gray-600">Your payment was cancelled. Please try again when you're ready.</p>
                    </div>
                  } 
                />
                <Route 
                  path="/payment/notify" 
                  element={
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
                      <h2 className="text-2xl font-bold text-blue-600 mb-4">Payment Notification</h2>
                      <p className="text-gray-600">Payment notification received.</p>
                    </div>
                  } 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

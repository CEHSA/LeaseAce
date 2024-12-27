import React, { useEffect } from 'react'
import OptionalExtras from './OptionalExtras'
import {
  propertyAddresses,
  getAvailableRooms,
  PaymentInterval,
  OccupancyType,
  RATES
} from '../constants/roomManagement'

interface BankDetails {
  accountHolder: string;
  bank: string;
  branch: string;
  branchCode: string;
  accountNumber: string;
}

interface PropertyDetailsData {
  occupancyType: OccupancyType;
  paymentInterval: PaymentInterval;
  propertyAddress: string;
  roomNumber: string;
  leaseType: 'bursary' | 'private';
  leaseStart: string;
  leaseEnd: string;
  selectedExtras: string[];
  bankDetails: BankDetails;
}

interface PropertyDetailsProps {
  data: PropertyDetailsData;
  updateData: (data: Partial<PropertyDetailsData>) => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ data, updateData }) => {
  type FormData = PropertyDetailsProps['data'];

  // Ensure bankDetails exists
  useEffect(() => {
    if (!data.bankDetails) {
      console.log('Initializing bankDetails');
      updateData({
        bankDetails: {
          accountHolder: '',
          bank: '',
          branch: '',
          branchCode: '',
          accountNumber: ''
        }
      });
    }
  }, [data.bankDetails, updateData]);

  useEffect(() => {
    // Log available rooms when property or occupancy type changes
    if (data.propertyAddress && data.occupancyType) {
      const availableRooms = getAvailableRooms(data.propertyAddress, data.occupancyType);
      console.log('Available rooms:', availableRooms);
    }
  }, [data.propertyAddress, data.occupancyType]);

  // Calculate current rate based on occupancy type and payment interval
  const getCurrentRate = () => {
    if (!data.occupancyType || !data.paymentInterval) return 0;
    const rate = RATES[data.occupancyType][data.paymentInterval];
    return data.leaseType === 'bursary' ? rate * (10/12) : rate;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [section, field] = name.split('.')
      if (section === 'bankDetails') {
        updateData({
          bankDetails: {
            ...(data.bankDetails || {}),
            [field]: value
          }
        } satisfies Partial<PropertyDetailsData>);
      }
    } else if (name === 'propertyAddress') {
      updateData({
        propertyAddress: value,
        roomNumber: ''
      });
    } else if (name === 'leaseType') {
      const leaseValue = value as 'bursary' | 'private'
      updateData({
        leaseType: leaseValue,
        leaseStart: leaseValue === 'bursary' ? '2025-02-01' : '2025-01-01',
        leaseEnd: leaseValue === 'bursary' ? '2025-11-30' : '2025-12-31'
      });
    } else if (name === 'occupancyType') {
      updateData({
        occupancyType: value as OccupancyType,
        roomNumber: ''
      });
    } else if (name === 'paymentInterval') {
      updateData({
        paymentInterval: value as PaymentInterval
      });
    } else {
      updateData({
        [name]: value
      });
    }
  }

  // Get available rooms based on current property and occupancy type
  const getAvailableRoomOptions = () => {
    if (!data.propertyAddress || !data.occupancyType) return [];
    return getAvailableRooms(data.propertyAddress, data.occupancyType);
  }

  // Calculate total amount based on current selections
  const calculateTotalAmount = () => {
    const baseRate = getCurrentRate();
    const months = data.leaseType === 'bursary' ? 10 : 12;
    const total = data.paymentInterval === 'monthly' ? baseRate : baseRate * months;
    return total.toLocaleString();
  }

  const handleExtraChange = (extraId: string, isSelected: boolean) => {
    const updatedExtras = isSelected
      ? [...data.selectedExtras, extraId]
      : data.selectedExtras.filter(id => id !== extraId);

    updateData({
      selectedExtras: updatedExtras
    });
  };

  // Early return if bankDetails is not initialized
  if (!data.bankDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#003976]">Property & Payment Details</h2>
      
      <div className="space-y-8">
        {/* Property Details */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Room Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Occupancy Type
              </label>
              <select
                name="occupancyType"
                value={data.occupancyType}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select Occupancy Type</option>
                <option value="single">Single Room</option>
                <option value="sharing">Sharing Room</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Interval
              </label>
              <select
                name="paymentInterval"
                value={data.paymentInterval}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select Payment Interval</option>
                <option value="monthly">Monthly Payment</option>
                <option value="annual">Annual Payment</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Type
              </label>
              <select
                name="leaseType"
                value={data.leaseType}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="bursary">Bursary Student (10 months)</option>
                <option value="private">Private/Defunded Student (12 months)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Address
              </label>
              <select
                name="propertyAddress"
                value={data.propertyAddress}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select Property Address</option>
                {propertyAddresses.map(address => (
                  <option key={address} value={address}>
                    {address}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Number
              </label>
              <select
                name="roomNumber"
                value={data.roomNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
                disabled={!data.propertyAddress || !data.occupancyType}
              >
                <option value="">Select Room Number</option>
                {getAvailableRoomOptions().map(room => (
                  <option key={room.id} value={room.id}>
                    {room.id} ({room.type})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-600">Base Rate:</p>
              <p className="text-lg font-semibold">
                R {getCurrentRate().toLocaleString()} {data.paymentInterval === 'monthly' ? '/month' : '/year'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-600">Total Amount:</p>
              <p className="text-lg font-semibold">
                R {calculateTotalAmount()}
              </p>
            </div>
          </div>
        </div>

        {/* Optional Extras */}
        {data.occupancyType && data.paymentInterval && (
          <OptionalExtras
            selectedExtras={data.selectedExtras}
            onExtraChange={handleExtraChange}
            baseRent={getCurrentRate()}
          />
        )}

        {/* Student Bank Details */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Student Bank Details (For Debit Order)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Holder
              </label>
              <input
                type="text"
                name="bankDetails.accountHolder"
                value={data.bankDetails.accountHolder}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bank Name
              </label>
              <input
                type="text"
                name="bankDetails.bank"
                value={data.bankDetails.bank}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch Name
              </label>
              <input
                type="text"
                name="bankDetails.branch"
                value={data.bankDetails.branch}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch Code
              </label>
              <input
                type="text"
                name="bankDetails.branchCode"
                value={data.bankDetails.branchCode}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Number
              </label>
              <input
                type="text"
                name="bankDetails.accountNumber"
                value={data.bankDetails.accountNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails

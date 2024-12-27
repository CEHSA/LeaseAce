import { FormData } from '../components/LeaseForm';

interface ValidationError {
  field: string;
  message: string;
}

export const validateForm = (data: FormData): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Validate Lessor Details
  if (!data.lessorDetails.name) {
    errors.push({ field: 'lessorDetails.name', message: 'Lessor name is required' });
  }
  if (!data.lessorDetails.regNo) {
    errors.push({ field: 'lessorDetails.regNo', message: 'Registration number is required' });
  }
  if (!data.lessorDetails.email) {
    errors.push({ field: 'lessorDetails.email', message: 'Lessor email is required' });
  }
  if (!data.lessorDetails.phone) {
    errors.push({ field: 'lessorDetails.phone', message: 'Lessor phone is required' });
  }
  if (!data.lessorDetails.address) {
    errors.push({ field: 'lessorDetails.address', message: 'Lessor address is required' });
  }

  // Validate Personal Details
  if (!data.personalDetails.studentName) {
    errors.push({ field: 'personalDetails.studentName', message: 'Student name is required' });
  }
  if (!data.personalDetails.studentId) {
    errors.push({ field: 'personalDetails.studentId', message: 'Student ID is required' });
  }
  if (!data.personalDetails.email) {
    errors.push({ field: 'personalDetails.email', message: 'Student email is required' });
  }
  if (!data.personalDetails.phone) {
    errors.push({ field: 'personalDetails.phone', message: 'Student phone is required' });
  }
  if (!data.personalDetails.guardianName) {
    errors.push({ field: 'personalDetails.guardianName', message: 'Guardian name is required' });
  }
  if (!data.personalDetails.guardianEmail) {
    errors.push({ field: 'personalDetails.guardianEmail', message: 'Guardian email is required' });
  }
  if (!data.personalDetails.guardianPhone) {
    errors.push({ field: 'personalDetails.guardianPhone', message: 'Guardian phone is required' });
  }

  // Validate Property Details
  if (!data.propertyDetails.occupancyType) {
    errors.push({ field: 'propertyDetails.occupancyType', message: 'Occupancy type is required' });
  }
  if (!data.propertyDetails.propertyAddress) {
    errors.push({ field: 'propertyDetails.propertyAddress', message: 'Property address is required' });
  }
  if (!data.propertyDetails.roomNumber) {
    errors.push({ field: 'propertyDetails.roomNumber', message: 'Room number is required' });
  }
  if (!data.propertyDetails.leaseStart) {
    errors.push({ field: 'propertyDetails.leaseStart', message: 'Lease start date is required' });
  }
  if (!data.propertyDetails.leaseEnd) {
    errors.push({ field: 'propertyDetails.leaseEnd', message: 'Lease end date is required' });
  }

  // Validate Terms and Rules
  if (!data.termsAccepted) {
    errors.push({ field: 'termsAccepted', message: 'Terms must be accepted' });
  }
  if (!data.houseRulesAccepted) {
    errors.push({ field: 'houseRulesAccepted', message: 'House rules must be accepted' });
  }

  // Validate Signatures
  if (!data.signature.lesseeSignature) {
    errors.push({ field: 'signature.lesseeSignature', message: 'Lessee signature is required' });
  }
  if (!data.signature.lesseeDate) {
    errors.push({ field: 'signature.lesseeDate', message: 'Lessee signature date is required' });
  }
  if (!data.signature.lesseeLocation) {
    errors.push({ field: 'signature.lesseeLocation', message: 'Lessee signature location is required' });
  }

  // Validate Debit Order if accepted
  if (data.debitOrder.accepted) {
    if (!data.debitOrder.bankName) {
      errors.push({ field: 'debitOrder.bankName', message: 'Bank name is required for debit order' });
    }
    if (!data.debitOrder.accountNumber) {
      errors.push({ field: 'debitOrder.accountNumber', message: 'Account number is required for debit order' });
    }
    if (!data.debitOrder.branchCode) {
      errors.push({ field: 'debitOrder.branchCode', message: 'Branch code is required for debit order' });
    }
    if (!data.debitOrder.accountHolder) {
      errors.push({ field: 'debitOrder.accountHolder', message: 'Account holder name is required for debit order' });
    }
  }

  return errors;
};

export const formatValidationErrors = (errors: ValidationError[]): string => {
  if (errors.length === 0) return '';

  if (errors.length === 1) {
    return errors[0].message;
  }

  return `Please fix the following issues:\n${errors.map(err => `• ${err.message}`).join('\n')}`;
};
import { OccupancyType, PaymentInterval } from '../constants/roomManagement';

export type LeaseData = {
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

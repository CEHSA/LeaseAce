import createPdf from './pdfMakeConfig';
import type { LeaseData } from '../types/leaseData';

type GeneratePDFResult = {
  success: boolean;
  documentId?: string;
  errors?: string[];
};

export async function generatePDF(leaseData: LeaseData): Promise<GeneratePDFResult> {
  try {
    const currentDate = new Date().toISOString().split('T')[0];
    const docDefinition = {
      content: [
        { text: 'Lease Agreement', style: 'header' },
        { text: `Date: ${currentDate}` },
        { text: `Lessor: ${leaseData.lessorDetails.name}` },
        { text: `Lessee: ${leaseData.personalDetails.studentName}` },
        { text: `Property Address: ${leaseData.propertyDetails.propertyAddress}` },
        { text: 'Lease Terms', style: 'subheader' },
        { text: `Start Date: ${leaseData.propertyDetails.leaseStart}` },
        { text: `End Date: ${leaseData.propertyDetails.leaseEnd}` },
        { text: `Payment Type: ${leaseData.propertyDetails.paymentInterval}` },
        { text: 'Signatures', style: 'subheader' },
        { text: `Lessor Signature: ${leaseData.signature.lessorSignature}` },
        { text: `Lessor Date: ${leaseData.signature.lessorDate}` },
        { text: `Lessor Location: ${leaseData.signature.lessorLocation}` },
        { text: `Lessee Signature: ${leaseData.signature.lesseeSignature}` },
        { text: `Lessee Date: ${leaseData.signature.lesseeDate}` },
        { text: `Lessee Location: ${leaseData.signature.lesseeLocation}` },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        }
      }
    };

    await createPdf(docDefinition).open();
    
    return {
      success: true,
      documentId: `LEASE-${Date.now()}`
    };
    } catch (error) {
    console.error('Error generating PDF:', error);
    return {
      success: false,
      errors: [error instanceof Error ? error.message : 'Failed to generate PDF']
    };
    }

}

import pdfMake from 'pdfmake/build/pdfmake';
import * as vfsFonts from 'pdfmake/build/vfs_fonts';

// Initialize pdfmake with the fonts
(pdfMake as any).vfs = (vfsFonts as any).vfs;

// Create a wrapper function that returns the PDF document
export default function createPdf(docDefinition: any) {
  return pdfMake.createPdf(docDefinition);
}

interface PaymentData {
    studentName: string;
    studentEmail: string;
    // Add other relevant fields
}

// Replace this with your actual storage solution (database, redis, etc.)
const paymentDetailsStore = new Map<string, PaymentData>();

export async function getPaymentDetails(transactionReference: string): Promise<PaymentData | null> {
    try {
        // In production, this should fetch from your database
        return paymentDetailsStore.get(transactionReference) || null;
    } catch (error) {
        console.error('Error fetching payment details:', error);
        return null;
    }
}

export async function storePaymentDetails(transactionReference: string, data: PaymentData): Promise<void> {
    try {
        // In production, this should store in your database
        paymentDetailsStore.set(transactionReference, data);
    } catch (error) {
        console.error('Error storing payment details:', error);
    }
}

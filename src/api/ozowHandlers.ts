import { Request, Response } from 'express';
import { OzowResponse, TransactionRecord } from '../types/ozow';
import { validateOzowHash } from '../utils/ozowHash';
import { getPaymentDetails } from '../utils/storage';

// In-memory store for demonstration - replace with database in production
const transactionStore = new Map<string, TransactionRecord>();

export async function handleOzowNotification(req: Request, res: Response): Promise<void> {
    try {
        const response = await (req as Request & { json: () => Promise<OzowResponse> }).json();
        const privateKey = process.env.VITE_OZOW_PRIVATE_KEY as string;

        // Validate hash
        const isValid = await validateOzowHash(response, privateKey);
        if (!isValid) {
            console.error('Invalid hash in Ozow notification');
            res.status(400).send('Invalid hash');
            return;
        }

        // Get existing transaction
        const existingTransaction = transactionStore.get(response.TransactionReference);
        
        if (existingTransaction) {
            // Handle duplicate notifications
            if (existingTransaction.status === 'Complete' && response.Status === 'Complete') {
                console.warn('Duplicate successful payment notification received:', response.TransactionReference);
                res.status(200).send('OK');
                return;
            }

            // Update existing transaction
            existingTransaction.status = response.Status;
            existingTransaction.updatedAt = new Date();
            existingTransaction.processedNotifications += 1;
            
            transactionStore.set(response.TransactionReference, existingTransaction);
        } else {
            // Create new transaction record
            const newTransaction: TransactionRecord = {
                transactionId: response.TransactionId,
                transactionReference: response.TransactionReference,
                amount: response.Amount,
                currency: response.CurrencyCode,
                status: response.Status,
                isTest: response.IsTest === 'true',
                createdAt: new Date(),
                updatedAt: new Date(),
                processedNotifications: 1,
                studentName: paymentData?.studentName || 'Unknown',
                studentEmail: paymentData?.studentEmail || 'unknown@example.com'
            };
            
            transactionStore.set(response.TransactionReference, newTransaction);
        }

        // Process based on status
        switch (response.Status) {
            case 'Complete':
                console.log('Payment completed:', response.TransactionReference);
                break;
            case 'Error':
            case 'Cancelled':
            case 'Abandoned':
                console.error('Payment failed:', response.Status, response.StatusMessage);
                break;
            case 'Pending':
            case 'PendingInvestigation':
                console.log('Payment pending:', response.TransactionReference);
                break;
        }

        res.status(200).send('OK');
    } catch (error) {
        console.error('Error processing Ozow notification:', error);
        res.status(500).send('Internal server error');
    }
}

export async function handleOzowRedirect(req: Request, res: Response): Promise<void> {
    try {
        const response = await (req as Request & { json: () => Promise<OzowResponse> }).json();
        const privateKey = process.env.VITE_OZOW_PRIVATE_KEY as string;

        // Validate hash
        const isValid = await validateOzowHash(response, privateKey);
        if (!isValid) {
            console.error('Invalid hash in Ozow redirect');
            res.redirect('/payment/error?reason=invalid_hash');
            return;
        }

        // Get transaction details
        const transaction = transactionStore.get(response.TransactionReference);
        
        if (!transaction) {
            console.error('Transaction not found:', response.TransactionReference);
            res.redirect('/payment/error?reason=transaction_not_found');
            return;
        }

        // Redirect based on status
        switch (response.Status) {
            case 'Complete':
                res.redirect('/payment/success');
                break;
            case 'Cancelled':
                res.redirect('/payment/cancel');
                break;
            case 'Error':
                res.redirect(`/payment/error?status=error&message=${encodeURIComponent(response.StatusMessage || 'Payment failed')}`);
                break;
            case 'Abandoned':
                res.redirect('/payment/error?status=abandoned');
                break;
            case 'PendingInvestigation':
            case 'Pending':
                res.redirect('/payment/pending');
                break;
            default:
                res.redirect('/payment/error?reason=unknown_status');
        }
    } catch (error) {
        console.error('Error processing Ozow redirect:', error);
        res.redirect('/payment/error?reason=processing_error');
    }
}
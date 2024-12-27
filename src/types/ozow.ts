// Ozow response status types
export type OzowStatus = 'Complete' | 'Cancelled' | 'Error' | 'Abandoned' | 'PendingInvestigation' | 'Pending';

export type OzowSubStatus =
	| 'Unclassified'
	| 'AutomationError'
	| 'InsufficientFunds'
	| 'UserCancelled'
	| string; // Allow other status codes as per documentation

// Common response properties from Ozow
export interface OzowResponse {
	TransactionId: string;
	TransactionReference: string;
	Amount: number;
	CurrencyCode: string;
	Status: 'Complete' | 'Error' | 'Cancelled' | 'Abandoned' | 'Pending' | 'PendingInvestigation';
	StatusMessage?: string;
	IsTest: string;
	SiteCode: string;
	Optional1?: string;
	Optional2?: string;
	Optional3?: string;
	Optional4?: string;
	Optional5?: string;
	Hash: string;
}

// Transaction record to store in database
export interface TransactionRecord {
	transactionId: string;
	transactionReference: string;
	amount: number;
	currency: string;
	status: OzowResponse['Status'];
	isTest: boolean;
	createdAt: Date;
	updatedAt: Date;
	processedNotifications: number;
	studentName: string;
	studentEmail: string;
}
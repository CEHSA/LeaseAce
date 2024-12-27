import { OzowResponse } from '../types/ozow';

export async function validateOzowHash(response: OzowResponse, privateKey: string): Promise<boolean> {
	try {
		// Concatenate response variables 1-13 in order
		const hashInput = [
			response.SiteCode,
			response.TransactionId,
			response.TransactionReference,
			response.Amount,
			response.Status,
			response.Optional1 || '',
			response.Optional2 || '',
			response.Optional3 || '',
			response.Optional4 || '',
			response.Optional5 || '',
			response.CurrencyCode,
			response.IsTest,
			response.StatusMessage || ''
		].join('');

		// Append private key and convert to lowercase
		const hashString = (hashInput + privateKey).toLowerCase();

		// Generate SHA-512 hash
		const hashBuffer = await crypto.subtle.digest(
			'SHA-512',
			new TextEncoder().encode(hashString)
		);

		// Convert to hex string
		const calculatedHash = Array.from(new Uint8Array(hashBuffer))
			.map(b => b.toString(16).padStart(2, '0'))
			.join('');

		// Compare hashes (trim leading zeros as per warning in docs)
		const receivedHash = response.Hash.toLowerCase().replace(/^0+/, '');
		const finalCalculatedHash = calculatedHash.replace(/^0+/, '');

		return receivedHash === finalCalculatedHash;
	} catch (error) {
		console.error('Hash validation error:', error);
		return false;
	}
}
interface FormPlaceholders {
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
		propertyAddress: string;
		roomNumber: string;
		leaseStart: string;
		leaseEnd: string;
		bankDetails: {
			accountHolder: string;
			bank: string;
			branch: string;
			branchCode: string;
			accountNumber: string;
		};
	};
}

interface DebitOrderPlaceholders {
	bankName: string;
	accountNumber: string;
	branchCode: string;
	accountHolder: string;
}

interface SignaturePlaceholders {
	location: string;
	date: string;
}

export const formPlaceholders: FormPlaceholders = {
	personalDetails: {
		studentName: "Enter your full name as per your ID document",
		studentId: "Enter your student number",
		email: "Enter your email address (e.g., student@university.ac.za)",
		phone: "Enter your phone number (e.g., +27 12 345 6789)",
		physicalAddress: "Enter your current residential address",
		course: "Enter your course of study",
		guardianName: "Enter your guardian's full name",
		guardianId: "Enter your guardian's ID number",
		guardianPhone: "Enter your guardian's phone number",
		guardianEmail: "Enter your guardian's email address",
		guardianAddress: "Enter your guardian's residential address",
		guardianRelationship: "Specify your relationship with the guardian (e.g., Parent)"
	},
	propertyDetails: {
		propertyAddress: "Select property address",
		roomNumber: "Select room number",
		leaseStart: "Select lease start date",
		leaseEnd: "Select lease end date",
		bankDetails: {
			accountHolder: "Enter account holder's full name",
			bank: "Enter bank name",
			branch: "Enter branch name",
			branchCode: "Enter 6-digit branch code",
			accountNumber: "Enter account number"
		}
	}
};

export const debitOrderPlaceholders: DebitOrderPlaceholders = {
	bankName: "Select your bank",
	accountNumber: "Enter your account number",
	branchCode: "Enter 6-digit branch code",
	accountHolder: "Enter account holder's full name"
};

export const signaturePlaceholders: SignaturePlaceholders = {
	location: "Enter your current location",
	date: "Enter today's date"
};
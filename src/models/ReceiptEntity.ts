export interface ReceiptEntity {
    id: string; // UUID
    storeName: string;
    storeStreet: string;
    storeBuildingNumber: string;
    storePostalCode: string; // e.g., "05-200"
    storeCity: string;
    storeCountry: string; // e.g., "PL"
    nip: string; // Numer identyfikacji podatkowej
    merchantCompanyRegNo: string | null; // Opcjonalne
    receiptNumber: string;
    date: string; // ISO 8601 date string, e.g., "2024-10-12"
    time: string; // ISO 8601 time string, e.g., "10:05:00"
    currency: string; // e.g., "PLN"
    total: number;
    notes: string | null; // Opcjonalne
    items: ReceiptItem[];
    createdAt: string; // ISO 8601 date-time string
    updatedAt: string; // ISO 8601 date-time string
}

export interface ReceiptItem {
    id: string; // UUID
    name: string;
    quantity: number;
    unitPrice: number;
    category: string;
    remarks: string | null;
    createdAt: string; // ISO 8601 date-time string
    updatedAt: string; // ISO 8601 date-time string
}
export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export interface InvoiceData {
  from: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
  to: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
  details: {
    invoiceNumber: string;
    date: string;
    dueDate: string;
  };
  items: InvoiceItem[];
  taxRate: number;
  notes: string;
  terms: string;
}

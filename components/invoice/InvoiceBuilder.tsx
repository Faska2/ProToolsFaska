'use client';

import { useState } from 'react';
import { InvoiceData } from './types';
import InvoiceForm from './InvoiceForm';
import InvoicePreview from './InvoicePreview';
import { useTranslations } from 'next-intl';

const initialData: InvoiceData = {
  from: {
    name: '',
    email: '',
    address: '',
    phone: '',
  },
  to: {
    name: '',
    email: '',
    address: '',
    phone: '',
  },
  details: {
    invoiceNumber: 'INV-001',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  items: [
    {
      id: '1',
      description: 'Service 1',
      quantity: 1,
      price: 100,
    },
  ],
  taxRate: 0,
  notes: '',
  terms: '',
};

export default function InvoiceBuilder() {
  const [data, setData] = useState<InvoiceData>(initialData);
  const t = useTranslations('Services');

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-100px)]">
      <div className="w-full lg:w-1/2 bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-6 text-white">{t('invoiceGenerator')}</h2>
        <InvoiceForm data={data} onChange={setData} />
      </div>
      <div className="w-full lg:w-1/2">
        <div className="lg:sticky lg:top-8">
            <h2 className="text-2xl font-bold mb-6 text-white">{t('preview')}</h2>
            <InvoicePreview data={data} />
        </div>
      </div>
    </div>
  );
}

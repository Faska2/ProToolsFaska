'use client';

import { InvoiceData, InvoiceItem } from './types';
import { useTranslations } from 'next-intl';
import { Plus, Trash2 } from 'lucide-react';

interface InvoiceFormProps {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

export default function InvoiceForm({ data, onChange }: InvoiceFormProps) {
  const t = useTranslations();

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({
      ...data,
      from: {
        ...data.from,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({
      ...data,
      to: {
        ...data.to,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...data,
      details: {
        ...data.details,
        [e.target.name]: e.target.value,
      },
    });
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: crypto.randomUUID(),
      description: '',
      quantity: 1,
      price: 0,
    };
    onChange({ ...data, items: [...data.items, newItem] });
  };

  const removeItem = (id: string) => {
    onChange({
      ...data,
      items: data.items.filter((item) => item.id !== id),
    });
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    onChange({
      ...data,
      items: data.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  return (
    <div className="space-y-8">
      {/* From / To */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section>
          <h3 className="text-lg font-semibold mb-4 text-white">{t('Invoice.from')}</h3>
          <div className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder={t('CV.fullName')}
              value={data.from.name}
              onChange={handleFromChange}
              className="block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white placeholder-gray-400"
            />
            <input
              type="email"
              name="email"
              placeholder={t('CV.email')}
              value={data.from.email}
              onChange={handleFromChange}
              className="block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white placeholder-gray-400"
            />
            <input
              type="text"
              name="address"
              placeholder={t('CV.address')}
              value={data.from.address}
              onChange={handleFromChange}
              className="block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white placeholder-gray-400"
            />
          </div>
        </section>
        <section>
          <h3 className="text-lg font-semibold mb-4 text-white">{t('Invoice.to')}</h3>
          <div className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder={t('CV.fullName')}
              value={data.to.name}
              onChange={handleToChange}
              className="block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white placeholder-gray-400"
            />
            <input
              type="email"
              name="email"
              placeholder={t('CV.email')}
              value={data.to.email}
              onChange={handleToChange}
              className="block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white placeholder-gray-400"
            />
            <input
              type="text"
              name="address"
              placeholder={t('CV.address')}
              value={data.to.address}
              onChange={handleToChange}
              className="block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white placeholder-gray-400"
            />
          </div>
        </section>
      </div>

      {/* Invoice Details */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">{t('Invoice.invoiceNumber')}</label>
          <input
            type="text"
            name="invoiceNumber"
            value={data.details.invoiceNumber}
            onChange={handleDetailsChange}
            className="mt-1 block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">{t('Invoice.date')}</label>
          <input
            type="date"
            name="date"
            value={data.details.date}
            onChange={handleDetailsChange}
            className="mt-1 block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">{t('Invoice.dueDate')}</label>
          <input
            type="date"
            name="dueDate"
            value={data.details.dueDate}
            onChange={handleDetailsChange}
            className="mt-1 block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white"
          />
        </div>
      </section>

      {/* Items */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">{t('Invoice.items')}</h3>
          <button
            onClick={addItem}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <Plus className="h-4 w-4 mr-1" />
            {t('Invoice.addItem')}
          </button>
        </div>
        <div className="space-y-4">
          {data.items.map((item) => (
            <div key={item.id} className="grid grid-cols-12 gap-2 items-center bg-white/5 p-3 rounded-md border border-white/10">
               <div className="col-span-5">
                  <input
                    type="text"
                    placeholder={t('Invoice.description')}
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    className="block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white placeholder-gray-400"
                  />
               </div>
               <div className="col-span-2">
                  <input
                    type="number"
                    placeholder={t('Invoice.quantity')}
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                    className="block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white placeholder-gray-400"
                  />
               </div>
               <div className="col-span-3">
                  <input
                    type="number"
                    placeholder={t('Invoice.price')}
                    value={item.price}
                    onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))}
                    className="block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white placeholder-gray-400"
                  />
               </div>
               <div className="col-span-2 flex justify-between items-center">
                  <span className="text-sm font-medium text-white">
                    {(item.quantity * item.price).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Totals & Notes */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-300">{t('Invoice.notes')}</label>
          <textarea
            rows={3}
            value={data.notes}
            onChange={(e) => onChange({ ...data, notes: e.target.value })}
            className="mt-1 block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white"
          />
          <label className="block text-sm font-medium text-gray-300 mt-4">{t('Invoice.terms')}</label>
          <textarea
            rows={3}
            value={data.terms}
            onChange={(e) => onChange({ ...data, terms: e.target.value })}
            className="mt-1 block w-full rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 border text-white"
          />
        </div>
        <div className="space-y-4 bg-white/5 p-4 rounded-md h-fit border border-white/10">
           <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-300">{t('Invoice.tax')}</label>
              <input
                type="number"
                value={data.taxRate}
                onChange={(e) => onChange({ ...data, taxRate: Number(e.target.value) })}
                className="block w-24 rounded-md border-white/10 bg-white/5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-1 border text-right text-white"
              />
           </div>
        </div>
      </section>
    </div>
  );
}

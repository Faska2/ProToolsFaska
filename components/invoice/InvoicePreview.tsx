'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { InvoiceData } from './types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Loader2 } from 'lucide-react';

interface InvoicePreviewProps {
  data: InvoiceData;
}

export default function InvoicePreview({ data }: InvoicePreviewProps) {
  const t = useTranslations();
  const previewRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const calculateSubtotal = () => {
    return data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * (data.taxRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const downloadPdf = async () => {
    if (!previewRef.current) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`invoice-${data.details.invoiceNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={downloadPdf}
          disabled={isGenerating}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isGenerating ? <Loader2 className="animate-spin w-4 h-4" /> : <Download className="w-4 h-4" />}
          {t('Common.download')}
        </button>
      </div>

      <div className="border rounded-lg shadow-lg bg-white overflow-hidden">
        <div 
          ref={previewRef} 
          className="p-12 min-h-[1000px] bg-white text-gray-900"
          style={{ width: '100%', maxWidth: '210mm', margin: '0 auto' }}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('Invoice.title')}</h1>
              <div className="text-gray-600">
                <p className="font-semibold">#{data.details.invoiceNumber}</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="font-bold text-lg mb-2">{data.from.name}</h2>
              <p className="text-gray-600 whitespace-pre-line">{data.from.address}</p>
              <p className="text-gray-600">{data.from.email}</p>
              <p className="text-gray-600">{data.from.phone}</p>
            </div>
          </div>

          {/* Bill To & Details */}
          <div className="flex justify-between mb-12">
            <div>
              <h3 className="text-gray-500 font-semibold mb-2">{t('Invoice.to')}:</h3>
              <h2 className="font-bold text-lg mb-1">{data.to.name}</h2>
              <p className="text-gray-600 whitespace-pre-line">{data.to.address}</p>
              <p className="text-gray-600">{data.to.email}</p>
              <p className="text-gray-600">{data.to.phone}</p>
            </div>
            <div className="text-right">
              <div className="mb-2">
                <span className="text-gray-500 font-semibold mr-4">{t('Invoice.date')}:</span>
                <span>{data.details.date}</span>
              </div>
              <div>
                <span className="text-gray-500 font-semibold mr-4">{t('Invoice.dueDate')}:</span>
                <span>{data.details.dueDate}</span>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full mb-8">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 font-bold text-gray-700">{t('Invoice.description')}</th>
                <th className="text-right py-3 font-bold text-gray-700">{t('Invoice.quantity')}</th>
                <th className="text-right py-3 font-bold text-gray-700">{t('Invoice.price')}</th>
                <th className="text-right py-3 font-bold text-gray-700">{t('Invoice.amount')}</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-4 text-gray-800">{item.description}</td>
                  <td className="py-4 text-right text-gray-800">{item.quantity}</td>
                  <td className="py-4 text-right text-gray-800">${item.price.toFixed(2)}</td>
                  <td className="py-4 text-right font-medium text-gray-900">
                    ${(item.quantity * item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end mb-12">
            <div className="w-64 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>{t('Invoice.subtotal')}</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>{t('Invoice.tax')} ({data.taxRate}%)</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 border-t pt-3">
                <span>{t('Invoice.total')}</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          {(data.notes || data.terms) && (
            <div className="border-t pt-8">
              {data.notes && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{t('Invoice.notes')}</h3>
                  <p className="text-gray-600 text-sm whitespace-pre-line">{data.notes}</p>
                </div>
              )}
              {data.terms && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('Invoice.terms')}</h3>
                  <p className="text-gray-600 text-sm whitespace-pre-line">{data.terms}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FileSignature, Plus, Trash2, Download, Printer } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function QuotationGeneratorPage() {
    const t = useTranslations('Services');
    const invT = useTranslations('Invoice');
    const commonT = useTranslations('Common');

    const [formData, setFormData] = useState({
        quoteNumber: `QT-${Date.now().toString().slice(-6)}`,
        date: new Date().toISOString().split('T')[0],
        validUntil: '',
        clientName: '',
        clientEmail: '',
        clientAddress: '',
        yourName: 'protoolsFaska User',
        yourAddress: '',
        items: [{ description: '', quantity: 1, price: 0 }],
        taxRate: 0,
        notes: ''
    });

    const addItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { description: '', quantity: 1, price: 0 }]
        });
    };

    const removeItem = (index: number) => {
        const newItems = formData.items.filter((_, i) => i !== index);
        setFormData({ ...formData, items: newItems });
    };

    const updateItem = (index: number, field: string, value: any) => {
        const newItems = [...formData.items];
        newItems[index] = { ...newItems[index], [field]: value };
        setFormData({ ...formData, items: newItems });
    };

    const calculateSubtotal = () => {
        return formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    };

    const calculateTax = () => {
        return calculateSubtotal() * (formData.taxRate / 100);
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax();
    };

    const downloadPDF = async () => {
        const element = document.getElementById('quotation-preview');
        if (!element) return;

        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`quotation-${formData.quoteNumber}.pdf`);
    };

    return (
        <div className="relative isolate px-6 pt-14 lg:px-8 max-w-7xl mx-auto py-24 sm:py-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                    {t('quotationGenerator')}
                </h1>
                <p className="text-lg leading-8 text-gray-400 max-w-2xl mx-auto">
                    {t('quotationGeneratorDesc')}
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start text-white">
                {/* Editor */}
                <div className="glass p-8 rounded-3xl border border-white/10 space-y-8">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <label className="text-gray-400">{invT('quoteNumber')}</label>
                            <input type="text" value={formData.quoteNumber} readOnly className="block w-full bg-white/5 border border-white/10 rounded-lg p-2 mt-1" />
                        </div>
                        <div>
                            <label className="text-gray-400">{invT('date')}</label>
                            <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="block w-full bg-white/5 border border-white/10 rounded-lg p-2 mt-1" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold border-b border-white/10 pb-2">{invT('clientDetails')}</h3>
                        <input placeholder={invT('clientName')} value={formData.clientName} onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} className="block w-full bg-white/5 border border-white/10 rounded-lg p-3" />
                        <input placeholder={invT('clientAddress')} value={formData.clientAddress} onChange={(e) => setFormData({ ...formData, clientAddress: e.target.value })} className="block w-full bg-white/5 border border-white/10 rounded-lg p-3" />
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold border-b border-white/10 pb-2">{invT('items')}</h3>
                        {formData.items.map((item, index) => (
                            <div key={index} className="flex gap-4 items-center">
                                <input placeholder={invT('description')} value={item.description} onChange={(e) => updateItem(index, 'description', e.target.value)} className="flex-grow bg-white/5 border border-white/10 rounded-lg p-2" />
                                <input type="number" placeholder={invT('quantity')} value={item.quantity} onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value))} className="w-20 bg-white/5 border border-white/10 rounded-lg p-2" />
                                <input type="number" placeholder={invT('price')} value={item.price} onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))} className="w-24 bg-white/5 border border-white/10 rounded-lg p-2" />
                                <button onClick={() => removeItem(index)} className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        ))}
                        <button onClick={addItem} className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-bold">
                            <Plus className="w-4 h-4" /> {invT('addItem')}
                        </button>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                        <label className="text-gray-400 text-sm">{invT('tax')}</label>
                        <input type="number" value={formData.taxRate} onChange={(e) => setFormData({ ...formData, taxRate: parseFloat(e.target.value) })} className="block w-32 bg-white/5 border border-white/10 rounded-lg p-2 mt-1" />
                    </div>
                </div>

                {/* Preview */}
                <div className="space-y-6">
                    <div id="quotation-preview" className="bg-white text-gray-800 p-12 rounded-sm shadow-2xl min-h-[800px] flex flex-col">
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h2 className="text-3xl font-bold uppercase tracking-widest text-primary mb-2">{invT('quote')}</h2>
                                <p className="text-sm font-bold text-gray-500">#{formData.quoteNumber}</p>
                            </div>
                            <div className="text-right">
                                <h3 className="font-bold text-lg">protoolsFaska</h3>
                                <p className="text-sm text-gray-500">Professional Utility Platform</p>
                            </div>
                        </div>

                        <div className="mb-12 grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">{invT('to')}:</h4>
                                <p className="font-bold">{formData.clientName || invT('clientName')}</p>
                                <p className="text-sm text-gray-500 whitespace-pre-wrap">{formData.clientAddress || invT('clientAddress')}</p>
                            </div>
                            <div className="text-right">
                                <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">{invT('date')}:</h4>
                                <p className="text-sm">{formData.date}</p>
                            </div>
                        </div>

                        <table className="w-full mb-12">
                            <thead>
                                <tr className="border-b-2 border-gray-100 text-left text-xs font-bold uppercase text-gray-400">
                                    <th className="py-4">{invT('description')}</th>
                                    <th className="py-4 text-center">{invT('quantity')}</th>
                                    <th className="py-4 text-right">{invT('price')}</th>
                                    <th className="py-4 text-right">{invT('amount')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.items.map((item, i) => (
                                    <tr key={i} className="border-b border-gray-50 text-sm">
                                        <td className="py-4">{item.description || 'Service Description'}</td>
                                        <td className="py-4 text-center">{item.quantity}</td>
                                        <td className="py-4 text-right">${item.price.toFixed(2)}</td>
                                        <td className="py-4 text-right font-bold">${(item.quantity * item.price).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="mt-auto ml-auto w-64 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">{invT('subtotal')}</span>
                                <span>${calculateSubtotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">{invT('tax').replace(' (%)', '')} ({formData.taxRate}%)</span>
                                <span>${calculateTax().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold border-t pt-3 text-primary">
                                <span>{invT('total')}</span>
                                <span>${calculateTotal().toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="mt-20 border-t pt-8 text-[10px] text-gray-400 text-center">
                            {invT('validUntil')}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={downloadPDF} className="flex-grow flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all">
                            <Download className="w-5 h-5" /> {commonT('download')} PDF
                        </button>
                        <button onClick={() => window.print()} className="px-6 flex items-center justify-center glass hover:bg-white/10 text-white rounded-xl transition-all">
                            <Printer className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

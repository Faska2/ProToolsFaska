import {useTranslations} from 'next-intl';
import InvoiceBuilder from '@/components/invoice/InvoiceBuilder';

export default function InvoicePage() {
  const t = useTranslations('Services');

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">{t('invoiceGenerator')}</h1>
        <p className="mt-2 text-gray-400">{t('invoiceGeneratorDesc')}</p>
      </div>
      
      <InvoiceBuilder />
    </div>
  );
}

import {useTranslations} from 'next-intl';
import ImageToPdf from '@/components/pdf-tools/ImageToPdf';

export default function ImageToPdfPage() {
  const t = useTranslations('Services');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white">{t('imageToPdf')}</h1>
        <p className="mt-2 text-gray-400">{t('imageToPdfDesc')}</p>
      </div>
      
      <ImageToPdf />
    </div>
  );
}

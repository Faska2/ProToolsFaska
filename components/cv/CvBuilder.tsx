'use client';

import { useState } from 'react';
import { CvData } from './CvTypes';
import CvForm from './CvForm';
import CvPreview from './CvPreview';
import { useTranslations } from 'next-intl';

const initialData: CvData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
};

export default function CvBuilder() {
  const [data, setData] = useState<CvData>(initialData);
  const t = useTranslations('Services');

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-100px)]">
      <div className="w-full lg:w-1/2 glass p-8 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6 text-white">{t('cvGenerator')}</h2>
        <CvForm data={data} onChange={setData} />
      </div>
      <div className="w-full lg:w-1/2">
        <div className="lg:sticky lg:top-24">
          <h2 className="text-2xl font-bold mb-6 text-white">{t('preview')}</h2>
          <CvPreview data={data} />
        </div>
      </div>
    </div>
  );
}

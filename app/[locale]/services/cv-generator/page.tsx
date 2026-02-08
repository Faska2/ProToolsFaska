import { useTranslations } from 'next-intl';
import CvBuilder from '@/components/cv/CvBuilder';

export default function CvGeneratorPage() {
  const t = useTranslations('Services');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">{t('cvGenerator')}</h1>
        <p className="mt-2 text-gray-400">{t('cvGeneratorDesc')}</p>
      </div>

      <CvBuilder />

      {/* SEO Informative Content */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-24">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white uppercase tracking-tighter italic">
            {t('SeoContent.cvGenerator.title')}
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            {t('SeoContent.cvGenerator.text')}
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-primary uppercase tracking-tighter">
            {t('SeoContent.cvGenerator.howTo')}
          </h3>
          <div className="w-12 h-1 bg-primary/20 rounded-full" />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-emerald-500 uppercase tracking-tighter">
            {t('SeoContent.cvGenerator.tips')}
          </h3>
          <div className="w-12 h-1 bg-emerald-500/20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

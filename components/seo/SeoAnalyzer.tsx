'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { analyzeUrl } from '@/actions/analyze-seo';
import { CheckCircle, AlertTriangle, XCircle, Loader2 } from 'lucide-react';

export default function SeoAnalyzer() {
  const t = useTranslations();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeUrl(url);
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError(t('Common.error'));
    } finally {
      setLoading(false);
    }
  };

  const StatusIcon = ({ status }: { status: string }) => {
    if (status === 'good') return <CheckCircle className="w-6 h-6 text-green-500" />;
    if (status === 'warning') return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
    return <XCircle className="w-6 h-6 text-red-500" />;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white/5 border border-white/10 rounded-lg shadow-sm text-white">
      <h2 className="text-2xl font-bold mb-6 text-white">{t('Services.seoAnalyzer')}</h2>
      
      <form onSubmit={handleAnalyze} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={t('Tools.seo.urlPlaceholder')}
            className="flex-1 px-4 py-2 border border-white/10 bg-white/5 rounded-md focus:ring-primary focus:border-primary text-white placeholder-gray-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 flex items-center transition-all"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : null}
            {loading ? t('Common.loading') : t('Common.generate')}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-md mb-6">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          {/* Title Analysis */}
          <div className="border border-white/10 bg-white/5 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <StatusIcon status={result.title.status} />
              <div className="flex-1">
                <h3 className="font-semibold text-white">{t('Tools.seo.pageTitle')}</h3>
                <p className="text-gray-300 mt-1 font-mono text-sm bg-black/20 p-2 rounded">
                  {result.title.value || t('Tools.seo.noTitle')}
                </p>
                <p className={`text-sm mt-2 ${
                  result.title.status === 'good' ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {result.title.message}
                </p>
              </div>
            </div>
          </div>

          {/* Description Analysis */}
          <div className="border border-white/10 bg-white/5 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <StatusIcon status={result.description.status} />
              <div className="flex-1">
                <h3 className="font-semibold text-white">{t('Tools.seo.metaDescription')}</h3>
                <p className="text-gray-300 mt-1 font-mono text-sm bg-black/20 p-2 rounded">
                  {result.description.value || t('Tools.seo.noDescription')}
                </p>
                <p className={`text-sm mt-2 ${
                  result.description.status === 'good' ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {result.description.message}
                </p>
              </div>
            </div>
          </div>

          {/* H1 Analysis */}
          <div className="border border-white/10 bg-white/5 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <StatusIcon status={result.h1.status} />
              <div className="flex-1">
                <h3 className="font-semibold text-white">{t('Tools.seo.h1Header')}</h3>
                <p className="text-gray-300 mt-1">
                  {t('Tools.seo.foundH1', { count: result.h1.count })}
                </p>
                <p className={`text-sm mt-2 ${
                  result.h1.status === 'good' ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {result.h1.message}
                </p>
              </div>
            </div>
          </div>

          {/* Image Analysis */}
          <div className="border border-white/10 bg-white/5 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <StatusIcon status={result.images.status} />
              <div className="flex-1">
                <h3 className="font-semibold text-white">{t('Tools.seo.imagesAlt')}</h3>
                <p className="text-gray-300 mt-1">
                  {t('Tools.seo.imagesSummary', { total: result.images.total, missing: result.images.missingAlt })}
                </p>
                <p className={`text-sm mt-2 ${
                  result.images.status === 'good' ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {result.images.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

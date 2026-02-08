import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      {/* Animated Icon */}
      <div className="relative mb-8 group">
        <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full animate-pulse" />
        <div className="relative w-24 h-24 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
          <AlertTriangle className="w-12 h-12 text-red-500" />
        </div>
      </div>
      
      {/* 404 Text */}
      <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 mb-2 tracking-tighter">
        404
      </h1>
      
      {/* Message */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        {t('title')}
      </h2>
      
      <p className="text-gray-400 max-w-md mb-10 leading-relaxed text-lg">
        {t('description')}
      </p>
      
      {/* Action Button */}
      <Link 
        href="/"
        className="group relative px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <div className="relative flex items-center gap-3">
          <Home className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          <span>{t('backHome')}</span>
        </div>
      </Link>
    </div>
  );
}

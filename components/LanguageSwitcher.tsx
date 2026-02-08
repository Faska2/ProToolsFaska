'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  const languages = {
    en: 'English',
    fr: 'Français',
    ar: 'العربية'
  };

  return (
    <div className="relative group flex items-center gap-2">
      <Globe className={`w-4 h-4 transition-colors duration-300 ${isPending ? 'text-primary animate-spin' : 'text-gray-400 group-hover:text-primary'}`} />
      <select
        defaultValue={locale}
        className="bg-transparent text-gray-300 hover:text-white transition-all cursor-pointer text-sm font-bold uppercase tracking-widest outline-none border-none focus:ring-0 pr-4 appearance-none"
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value="en" className="bg-black text-white">EN</option>
        <option value="fr" className="bg-black text-white">FR</option>
        <option value="ar" className="bg-black text-white text-right">AR</option>
      </select>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-1.5 h-1.5 border-r border-b border-gray-500 rotate-45" />
      </div>
    </div>
  );
}

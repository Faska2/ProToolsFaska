import { Link } from '@/i18n/routing';
import { LucideIcon, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color?: string;
}

export default function ServiceCard({ title, description, href, icon: Icon, color }: ServiceCardProps) {
  const t = useTranslations('Common');

  return (
    <Link
      href={href}
      className="group relative block p-8 glass glass-hover rounded-2xl transition-all duration-500 overflow-hidden"
    >
      {/* Background Glow */}
      <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${color || 'from-primary to-secondary'} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`} />

      <div className="relative flex flex-col h-full">
        <div className={`flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${color || 'from-primary/20 to-secondary/20'} text-white mb-6 group-hover:scale-110 transition-transform duration-500`}>
          <Icon size={28} className="group-hover:rotate-6 transition-transform duration-500" />
        </div>

        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300 tracking-tight">
            {title}
          </h3>
          <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {t('tryNow')}
        </div>
      </div>
    </Link>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { Mail, Phone, Rocket, MessageSquare, Shield, Globe, Heart } from 'lucide-react';

export default function Footer() {
  const metaT = useTranslations('Metadata');
  const navT = useTranslations('Navigation');
  const footT = useTranslations('Footer');

  const links = [
    { label: navT('privacy'), href: '/privacy' },
    { label: navT('terms'), href: '/terms' },
    { label: navT('contact'), href: '/contact' },
  ];

  const developerInfo = {
    name: "Faska Elouaaziki",
    role: footT('role'),
    email: "faska2002elouaaziki@gmail.com",
    whatsapp: "+212706217356",
    waLink: "https://wa.me/212706217356"
  };

  return (
    <footer className="relative mt-32">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white tracking-tighter leading-none">
                  PROTOOLS
                </span>
                <span className="text-xs font-bold text-primary tracking-[0.3em] leading-none mt-1">
                  FASKA
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              {metaT('description')}
            </p>
            <div className="flex gap-4">
              <a href={developerInfo.waLink} target="_blank" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all">
                <MessageSquare className="w-6 h-6" />
              </a>
              <a href={`mailto:${developerInfo.email}`} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-white font-black text-sm uppercase tracking-[0.2em]">{footT('platform')}</h4>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-8">
            <h4 className="text-white font-black text-sm uppercase tracking-[0.2em]">{footT('getInTouch')}</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{footT('whatsApp')}</p>
                  <a href={developerInfo.waLink} target="_blank" className="text-white font-bold hover:text-primary transition-colors">
                    {developerInfo.whatsapp}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{footT('supportEmail')}</p>
                  <a href={`mailto:${developerInfo.email}`} className="text-white font-bold hover:text-primary transition-colors text-sm break-all">
                    {developerInfo.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Portfolio</p>
                  <a href="https://faskaeloua.netlify.app/" target="_blank" className="text-white font-bold hover:text-primary transition-colors text-sm break-all">
                    faskaeloua.netlify.app
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} PROTOOLS FASKA. {footT('rights').toUpperCase()}.
          </p>
          <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase">
            <span>{footT('developedWith')}</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>{footT('by')}</span>
            <a href="https://faskaeloua.netlify.app/" target="_blank" className="text-primary hover:underline hover:text-white transition-all underline-offset-4">
              {developerInfo.name.toUpperCase()}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

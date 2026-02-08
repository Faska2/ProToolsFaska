'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket, Shield, Cpu, ChevronDown, Sparkles, Phone } from 'lucide-react';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const homeT = useTranslations('Home');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('home'), icon: Cpu },
    { href: '/services', label: t('services'), icon: Rocket },
    { href: '/services/faska-gpt', label: t('faskaGpt'), icon: Sparkles },
    { href: '/about', label: t('about'), icon: Shield },
    { href: '/contact', label: t('contact'), icon: Phone },
  ];

  return (
    <nav
      className={`sticky top-0 z-[100] transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'
        }`}
    >
      <div className="absolute inset-x-4 top-2 bottom-0 bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl transition-all duration-500 group-hover:border-primary/20" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo Section */}
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-3 group relative">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-300">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tighter leading-none group-hover:text-primary transition-colors">
                  PROTOOLS
                </span>
                <span className="text-[10px] font-bold text-primary tracking-[0.2em] leading-none mt-1">
                  FASKA
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-5 py-2 text-sm font-semibold text-gray-400 hover:text-white transition-all rounded-full hover:bg-white/5 flex items-center gap-2 group"
                >
                  <link.icon className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center pr-4 border-r border-white/10">
              <LanguageSwitcher />
            </div>

            <Link
              href="/services"
              className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 hover:bg-primary/90 active:scale-95 transition-all duration-300 overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">{homeT('getStarted')}</span>
              <ChevronDown className="w-4 h-4 relative z-10 group-hover:rotate-180 transition-transform duration-500" />
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-full left-4 right-4 mt-2 lg:hidden z-[101]"
          >
            <div className="bg-black/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 text-gray-300 hover:text-white transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all">
                      <link.icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold">{link.label}</span>
                  </Link>
                ))}

                <div className="h-px bg-white/10 my-4" />

                <div className="flex items-center justify-between px-4 pb-4">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Language</span>
                  <LanguageSwitcher />
                </div>

                <Link
                  href="/services"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-5 rounded-2xl bg-primary text-white font-black uppercase tracking-[0.1em] shadow-xl shadow-primary/20"
                >
                  {homeT('getStarted')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

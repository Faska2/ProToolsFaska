'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Scale, CheckCircle, Shield, AlertTriangle, Copyright, FileCode } from 'lucide-react';

export default function TermsPage() {
  const t = useTranslations('Terms');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const sections = [
    { key: 'section1', icon: CheckCircle },
    { key: 'section2', icon: FileCode },
    { key: 'section3', icon: Copyright },
    { key: 'section4', icon: AlertTriangle },
    { key: 'section5', icon: Shield },
    { key: 'section6', icon: Scale },
  ];

  return (
    <div className="relative isolate px-6 pt-24 lg:px-8 min-h-screen overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-[-1] overflow-hidden bg-gray-900">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05]" />
      </div>

      <div className="mx-auto max-w-4xl py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-secondary/10 mb-6">
            <Scale className="w-12 h-12 text-secondary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            {t('title')}
          </h1>
          <p className="text-gray-400 font-mono text-sm">
            {t('lastUpdated')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="glass p-8 rounded-3xl border border-white/10">
            <p className="text-lg text-gray-300 leading-relaxed font-light">
              {t('intro')}
            </p>
          </motion.div>

          <div className="grid gap-6">
            {sections.map(({ key, icon: Icon }) => (
              <motion.section
                key={key}
                variants={itemVariants}
                className="group relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/5 hover:border-secondary/20 rounded-2xl p-8 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Icon className="w-24 h-24 -rotate-12" />
                </div>

                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-secondary/20 text-secondary">
                      <Icon className="w-5 h-5" />
                    </span>
                    {t(`${key}.title`)}
                  </h2>
                  <p className="text-gray-400 leading-relaxed pl-12 border-l-2 border-white/5">
                    {t(`${key}.content`)}
                  </p>
                </div>
              </motion.section>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

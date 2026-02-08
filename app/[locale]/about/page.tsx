'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield, Zap, Sparkles, Heart, Globe } from 'lucide-react';
import AboutHeroAnimation from '@/components/AboutHeroAnimation';

export default function AboutPage() {
    const t = useTranslations('About');
    const commonT = useTranslations('Metadata');

    return (
        <div className="relative isolate px-6 pt-14 lg:px-8">
            <div className="mx-auto max-w-7xl py-24 sm:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                        {t('title')} <span className="text-gradient">protools</span><span className="text-primary italic">Faska</span>
                    </h1>
                    <p className="text-lg leading-8 text-gray-400 max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-bold text-white">{t('missionTitle')}</h2>
                        <p className="text-gray-400 leading-relaxed">
                            {t('missionText1')}
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            {t('missionText2')}
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full h-full flex items-center justify-center p-4 lg:p-0"
                    >
                        <AboutHeroAnimation />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { key: 'feature1', icon: Heart, color: "text-rose-500" },
                        { key: 'feature2', icon: Shield, color: "text-emerald-500" },
                        { key: 'feature3', icon: Sparkles, color: "text-amber-500" },
                        { key: 'feature4', icon: Globe, color: "text-primary" }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 glass rounded-2xl border border-white/5 hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
                        >
                            <feature.icon className={`w-10 h-10 ${feature.color} mb-6`} />
                            <h3 className="text-xl font-bold text-white mb-3">{t(`${feature.key}Title`)}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{t(`${feature.key}Desc`)}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

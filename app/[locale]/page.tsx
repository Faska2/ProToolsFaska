'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import ServiceCard from '@/components/ServiceCard';
import { FileText, FileSpreadsheet, Search, Calculator, FileSignature, Files, Image as ImageIcon, ArrowRight, Sparkles, Globe, CheckCircle2, Mic2, Rocket, Cpu, Wand2, Shield, Code, Languages, Bot, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const t = useTranslations();

  const services = [
    {
      title: t('Services.cvGenerator'),
      description: t('Services.cvGeneratorDesc'),
      href: '/services/cv-generator',
      icon: FileText,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: t('Services.invoiceGenerator'),
      description: t('Services.invoiceGeneratorDesc'),
      href: '/services/invoice-generator',
      icon: FileSpreadsheet,
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: t('Services.seoAnalyzer'),
      description: t('Services.seoAnalyzerDesc'),
      href: '/services/seo-analyzer',
      icon: Globe,
      color: "from-teal-500 to-emerald-500"
    },
    {
      title: t('Services.pdfMerge'),
      description: t('Services.pdfMergeDesc'),
      href: '/services/pdf-tools/merge',
      icon: Files,
      color: "from-indigo-500 to-blue-500"
    },
    {
      title: t('Services.grammarChecker'),
      description: t('Services.grammarCheckerDesc'),
      href: '/services/grammar-checker',
      icon: CheckCircle2,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: t('Services.audioReport'),
      description: t('Services.audioReportDesc'),
      href: '/services/audio-report',
      icon: Mic2,
      color: "from-violet-500 to-purple-500"
    },
    {
      title: t('Services.translator'),
      description: t('Services.translatorDesc'),
      href: '/services/translator',
      icon: Languages,
      color: "from-orange-500 to-amber-500"
    },
    {
      title: t('Services.faskaGpt'),
      description: t('Services.faskaGptDesc'),
      href: '/services/faska-gpt',
      icon: Bot,
      color: "from-primary to-violet-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 overflow-hidden">
      {/* Dynamic Superstar Background */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-spotlight" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] animate-spotlight" style={{ animationDelay: '-5s' }} />

        {/* Animated Grid / Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

        {/* Floating Icons Background */}
        <div className="absolute inset-0 hero-mask pointer-events-none">
          {[FileText, Globe, Cpu, Sparkles, Wand2, Shield, Code].map((Icon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                y: [0, -20, 0],
                rotate: [0, 10, 0]
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.5
              }}
              className="absolute text-white/10"
              style={{
                left: `${(i * 15) + 5}%`,
                top: `${(i * 10) + 20}%`,
              }}
            >
              <Icon size={40 + (i * 10)} strokeWidth={1} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Beta Development Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-6 lg:px-8 pt-8"
      >
        <div className="relative glass border border-primary/20 bg-primary/5 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <Zap className="w-24 h-24 text-primary" />
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
            <Rocket className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <div className="flex-grow text-center md:text-left">
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-1">
              {t('Tools.betaNote.title')}
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('Tools.betaNote.message')}
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest text-white transition-all whitespace-nowrap"
          >
            {t('Tools.betaNote.cta')}
          </Link>
        </div>
      </motion.div>

      {/* Hero Content */}
      <div className="mx-auto max-w-5xl py-24 sm:py-32 lg:py-48">
        <div className="text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
            className="mb-10 flex justify-center"
          >
            <div className="relative group cursor-pointer inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:border-primary/50 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-bold text-gray-300 tracking-widest uppercase">
                {t('Home.popularServices')}
              </span>
              <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl font-black tracking-tighter text-white sm:text-8xl lg:text-9xl mb-10"
          >
            <span className="block opacity-50 text-4xl sm:text-5xl lg:text-6xl mb-4 font-bold tracking-normal italic">
              {t('Home.heroTitlePrefix')}
            </span>
            <span className="relative inline-block">
              <span className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
              <span className="relative bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-gray-500">PROTOOLS</span>
              <span className="relative italic text-primary drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]">FASKA</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl leading-relaxed text-gray-400 max-w-3xl mx-auto mb-16 font-medium"
          >
            {t('Home.heroSubtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              href="/services/faska-gpt"
              className="relative group px-10 py-5 bg-primary text-white font-black uppercase tracking-[0.2em] text-sm rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)] flex items-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Bot className="w-5 h-5 relative z-10" />
              <span className="relative z-10">{t('Home.askFaskaGpt')}</span>
            </Link>

            <Link
              href="#services"
              className="relative group px-10 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-sm rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-primary/40 flex items-center gap-3"
            >
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl" />
              {t('Home.getStarted')}
              <Rocket className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="mx-auto max-w-7xl px-6 lg:px-8 pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('Home.popularServices')}
          </h2>
          <div className="mt-4 h-1 w-20 bg-primary mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* FAQ Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-32">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('FAQ.title')}
          </h2>
        </div>
        <div className="mx-auto max-w-3xl space-y-6">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-2xl border border-white/10"
            >
              <h3 className="text-lg font-bold text-white mb-2">{t(`FAQ.q${i}`)}</h3>
              <p className="text-gray-400 text-sm">{t(`FAQ.a${i}`)}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [1, 2].map((i) => ({
              "@type": "Question",
              "name": t(`FAQ.q${i}`),
              "acceptedAnswer": {
                "@type": "Answer",
                "text": t(`FAQ.a${i}`)
              }
            }))
          })
        }}
      />
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ServiceCard from '@/components/ServiceCard';
import {
    FileText, FileSpreadsheet, Search, Calculator, Files, Image as ImageIcon,
    FileEdit, SearchCheck, FileSignature, ShieldCheck, Globe, Hash, Minimize2,
    FileType2, Wand2, LayoutList, PencilLine, CheckCircle2, Mic2, Sparkles, Languages, Bot, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ServicesPage() {
    const t = useTranslations();
    const [searchQuery, setSearchQuery] = useState('');

    const services = [
        {
            title: t('Services.faskaGpt'),
            description: t('Services.faskaGptDesc'),
            href: '/services/faska-gpt',
            icon: Bot,
            color: "from-primary to-violet-600"
        },
        {
            title: t('Services.translator'),
            description: t('Services.translatorDesc'),
            href: '/services/translator',
            icon: Languages,
            color: "from-orange-500 to-amber-500"
        },
        {
            title: t('Services.cvGenerator'),
            description: t('Services.cvGeneratorDesc'),
            href: '/services/cv-generator',
            icon: FileText,
            color: "from-blue-500 to-cyan-500"
        },
        {
            title: t('Services.coverLetter'),
            description: t('Services.coverLetterDesc'),
            href: '/services/cover-letter',
            icon: FileEdit,
            color: "from-indigo-500 to-purple-500"
        },
        {
            title: t('Services.cvAnalyzer'),
            description: t('Services.cvAnalyzerDesc'),
            href: '/services/cv-analyzer',
            icon: SearchCheck,
            color: "from-purple-500 to-pink-500"
        },
        {
            title: t('Services.invoiceGenerator'),
            description: t('Services.invoiceGeneratorDesc'),
            href: '/services/invoice-generator',
            icon: FileSpreadsheet,
            color: "from-emerald-500 to-teal-500"
        },
        {
            title: t('Services.quotationGenerator'),
            description: t('Services.quotationGeneratorDesc'),
            href: '/services/quotation-generator',
            icon: FileSignature,
            color: "from-amber-500 to-orange-500"
        },
        {
            title: t('Services.contractGenerator'),
            description: t('Services.contractGeneratorDesc'),
            href: '/services/contract-generator',
            icon: ShieldCheck,
            color: "from-rose-500 to-red-500"
        },
        {
            title: t('Services.netSalary'),
            description: t('Services.netSalaryDesc'),
            href: '/services/net-salary',
            icon: Calculator,
            color: "from-cyan-500 to-blue-500"
        },
        {
            title: t('Services.seoAnalyzer'),
            description: t('Services.seoAnalyzerDesc'),
            href: '/services/seo-analyzer',
            icon: Globe,
            color: "from-teal-500 to-emerald-500"
        },
        {
            title: t('Services.metaTagsGenerator'),
            description: t('Services.metaTagsGeneratorDesc'),
            href: '/services/meta-tags',
            icon: Hash,
            color: "from-orange-500 to-amber-500"
        },
        {
            title: t('Services.pdfMerge'),
            description: t('Services.pdfMergeDesc'),
            href: '/services/pdf-tools/merge',
            icon: Files,
            color: "from-indigo-500 to-blue-500"
        },
        {
            title: t('Services.pdfCompress'),
            description: t('Services.pdfCompressDesc'),
            href: '/services/pdf-tools/compress',
            icon: Minimize2,
            color: "from-blue-500 to-indigo-500"
        },
        {
            title: t('Services.pdfWordToPdf'),
            description: t('Services.pdfWordToPdfDesc'),
            href: '/services/pdf-tools/word-to-pdf',
            icon: FileType2,
            color: "from-blue-600 to-blue-400"
        },
        {
            title: t('Services.docCleaner'),
            description: t('Services.docCleanerDesc'),
            href: '/services/doc-cleaner',
            icon: Wand2,
            color: "from-emerald-400 to-cyan-400"
        },
        {
            title: t('Services.pdfSummarizer'),
            description: t('Services.pdfSummarizerDesc'),
            href: '/services/pdf-summarizer',
            icon: LayoutList,
            color: "from-purple-400 to-pink-400"
        },
        {
            title: t('Services.textRewriter'),
            description: t('Services.textRewriterDesc'),
            href: '/services/text-rewriter',
            icon: PencilLine,
            color: "from-rose-400 to-orange-400"
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
        }
    ];

    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative isolate px-6 pt-14 lg:px-8">
            <div className="mx-auto max-w-7xl py-24 sm:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                        {t('Common.allTools')}
                    </h1>
                    <p className="text-lg leading-8 text-gray-400 max-w-2xl mx-auto mb-12">
                        {t('Common.allToolsDesc')}
                    </p>

                    {/* Premium Search Bar */}
                    <div className="max-w-2xl mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-violet-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative glass border border-white/10 rounded-2xl flex items-center p-2 group-focus-within:border-primary/40 transition-all duration-300">
                            <div className="pl-4 text-gray-500">
                                <Search className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for a professional tool..."
                                className="w-full bg-transparent border-none outline-none py-4 px-4 text-white placeholder:text-gray-600 font-medium"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>

                {filteredServices.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredServices.map((service, index) => (
                                <motion.div
                                    key={service.href}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ServiceCard {...service} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-20 text-center"
                    >
                        <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                            <Search className="w-10 h-10 text-gray-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No tools found</h3>
                        <p className="text-gray-500">Try searching for something else like "PDF" or "CV".</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

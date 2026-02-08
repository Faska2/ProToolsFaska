'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Globe, Code, Copy, Eye, Layout, Type, Search } from 'lucide-react';

export default function MetaTagsPage() {
    const t = useTranslations('Services');
    const toolT = useTranslations('Tools.meta');
    const commonT = useTranslations('Common');

    const [meta, setMeta] = useState({
        title: '',
        description: '',
        keywords: '',
        robots: 'index, follow',
        author: ''
    });

    const metaTags = `<!-- Primary Meta Tags -->
<title>${meta.title}</title>
<meta name="title" content="${meta.title}">
<meta name="description" content="${meta.description}">
<meta name="keywords" content="${meta.keywords}">
<meta name="author" content="${meta.author}">
<meta name="robots" content="${meta.robots}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:title" content="${meta.title}">
<meta property="og:description" content="${meta.description}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:title" content="${meta.title}">
<meta property="twitter:description" content="${meta.description}">`;

    return (
        <div className="relative isolate px-6 pt-14 lg:px-8 max-w-7xl mx-auto py-24 sm:py-32 text-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
                    {t('metaTagsGenerator')}
                </h1>
                <p className="text-lg leading-8 text-gray-400 max-w-2xl mx-auto">
                    {t('metaTagsGeneratorDesc')}
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="glass p-8 rounded-3xl border border-white/10 space-y-8">
                    <div className="space-y-4">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                            <Type className="h-4 w-4" /> {toolT('title')}
                        </label>
                        <input
                            maxLength={60}
                            value={meta.title}
                            onChange={(e) => setMeta({ ...meta, title: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white hover:border-white/20 transition-all outline-none focus:border-primary"
                            placeholder={toolT('titlePlaceholder')}
                        />
                        <div className="text-right text-xs text-gray-500">{meta.title.length}/60</div>
                    </div>

                    <div className="space-y-4">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                            <Layout className="h-4 w-4" /> {toolT('desc')}
                        </label>
                        <textarea
                            maxLength={160}
                            rows={3}
                            value={meta.description}
                            onChange={(e) => setMeta({ ...meta, description: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white hover:border-white/20 transition-all outline-none focus:border-primary"
                            placeholder={toolT('descPlaceholder')}
                        />
                        <div className="text-right text-xs text-gray-500">{meta.description.length}/160</div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                                <Globe className="h-4 w-4" /> {toolT('keywords')}
                            </label>
                            <input
                                value={meta.keywords}
                                onChange={(e) => setMeta({ ...meta, keywords: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4"
                                placeholder={toolT('keywordsPlaceholder')}
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                                <Search className="h-4 w-4" /> {toolT('robots')}
                            </label>
                            <select
                                value={meta.robots}
                                onChange={(e) => setMeta({ ...meta, robots: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-primary"
                            >
                                <option value="index, follow" className="bg-black">Index, Follow</option>
                                <option value="noindex, follow" className="bg-black">No Index, Follow</option>
                                <option value="index, nofollow" className="bg-black">Index, No Follow</option>
                                <option value="noindex, nofollow" className="bg-black">Private (No Index, No Follow)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Google Preview */}
                    <div className="glass p-8 rounded-3xl border border-white/10 space-y-6">
                        <h4 className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                            <Eye className="h-4 w-4" /> {toolT('preview')}
                        </h4>
                        <div className="bg-white p-8 rounded-2xl">
                            <div className="text-[#1a0dab] text-xl font-medium hover:underline cursor-pointer mb-2 break-words">
                                {meta.title || toolT('titlePreview')}
                            </div>
                            <div className="text-[#006621] text-sm mb-2 break-all">
                                https://protoolsfaska.com/your-page-url
                            </div>
                            <div className="text-[#4d5156] text-sm break-words">
                                {meta.description || toolT('descPreview')}
                            </div>
                        </div>
                    </div>

                    {/* Code Result */}
                    <div className="glass p-8 rounded-3xl border border-white/10 space-y-6 relative group">
                        <h4 className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                            <Code className="h-4 w-4" /> {toolT('generatedTags')}
                        </h4>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(metaTags);
                                alert(commonT('copied'));
                            }}
                            className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                        >
                            <Copy className="h-4 w-4" />
                        </button>
                        <pre className="bg-black/50 p-6 rounded-2xl overflow-x-auto text-xs font-mono text-emerald-400 border border-white/5 leading-relaxed">
                            {metaTags}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}

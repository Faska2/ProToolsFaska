'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, ArrowRightLeft, Loader2, Copy, Sparkles, Wand2, Globe } from 'lucide-react';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية (Arabic)' },
    { code: 'fr', name: 'Français (French)' },
    { code: 'es', name: 'Español (Spanish)' },
    { code: 'de', name: 'Deutsch (German)' },
    { code: 'it', name: 'Italiano (Italian)' },
    { code: 'ja', name: '日本語 (Japanese)' },
    { code: 'zh', name: '中文 (Chinese)' },
    { code: 'pt', name: 'Português (Portuguese)' },
    { code: 'ru', name: 'Русский (Russian)' },
    { code: 'tr', name: 'Türkçe (Turkish)' }
];

export default function TranslatorPage() {
    const t = useTranslations('Services');
    const toolT = useTranslations('Tools.translator');
    const commonT = useTranslations('Common');

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [text, setText] = useState('');
    const [sourceLang, setSourceLang] = useState('auto');
    const [targetLang, setTargetLang] = useState('en');

    const handleTranslate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const sourceName = sourceLang === 'auto' ? 'automatically detected' : languages.find(l => l.code === sourceLang)?.name;
            const targetName = languages.find(l => l.code === targetLang)?.name;

            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    systemPrompt: `You are a professional translator. Translate the provided text from ${sourceName} to ${targetName}. Maintain the exact tone, formatting, and nuances. Only return the translated text.`,
                    prompt: text
                })
            });

            const data = await response.json();
            setResult(data.choices[0].message.content);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const swapLanguages = () => {
        if (sourceLang !== 'auto') {
            const temp = sourceLang;
            setSourceLang(targetLang);
            setTargetLang(temp);
            setText(result || text);
            setResult('');
        }
    };

    return (
        <div className="relative isolate px-6 pt-14 lg:px-8 max-w-7xl mx-auto py-24 sm:py-32 text-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-4">
                    <Globe className="w-4 h-4" /> {toolT('globalComm')}
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
                    {t('translator')}
                </h1>
                <p className="text-lg leading-8 text-gray-400 max-w-2xl mx-auto">
                    {t('translatorDesc')}
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-white">
                {/* Editor */}
                <div className="glass p-8 rounded-3xl border border-white/10 space-y-6 flex flex-col">
                    <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                        <select
                            value={sourceLang}
                            onChange={(e) => setSourceLang(e.target.value)}
                            className="w-full sm:w-auto bg-white/5 border border-white/10 rounded-xl p-3 text-sm font-bold outline-none focus:border-primary transition-all text-white"
                        >
                            <option value="auto" className="bg-black text-white">{toolT('auto')}</option>
                            {languages.map(l => (
                                <option key={l.code} value={l.code} className="bg-black text-white">{l.name}</option>
                            ))}
                        </select>

                        <button
                            type="button"
                            onClick={swapLanguages}
                            className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all hover:rotate-180 duration-500"
                        >
                            <ArrowRightLeft className="w-4 h-4 text-primary" />
                        </button>

                        <select
                            value={targetLang}
                            onChange={(e) => setTargetLang(e.target.value)}
                            className="w-full sm:w-auto bg-white/5 border border-white/10 rounded-xl p-3 text-sm font-bold outline-none focus:border-primary transition-all text-white"
                        >
                            {languages.map(l => (
                                <option key={l.code} value={l.code} className="bg-black text-white">{l.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-4 flex-grow flex flex-col">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                            <Languages className="w-5 h-5" /> {toolT('label')}
                        </label>
                        <textarea
                            required
                            rows={10}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white outline-none focus:border-primary transition-all resize-none flex-grow"
                            placeholder={toolT('placeholder')}
                        />
                    </div>

                    <button
                        onClick={handleTranslate}
                        disabled={loading || !text}
                        className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-600 font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
                    >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Wand2 className="w-6 h-6" />}
                        {loading ? commonT('analyzing') : toolT('translate')}
                    </button>
                </div>

                {/* Result */}
                <div className="space-y-6 flex flex-col">
                    <AnimatePresence mode="wait">
                        {result ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass p-8 rounded-3xl border border-white/10 flex-grow relative"
                            >
                                <div className="absolute top-6 right-6">
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(result);
                                            alert(commonT('copied'));
                                        }}
                                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl"
                                    >
                                        <Copy className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="prose prose-invert prose-lg max-w-none">
                                    <p className="text-gray-200 leading-relaxed min-h-[300px]">
                                        {result}
                                    </p>
                                </div>
                                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-widest">
                                        <Sparkles className="w-4 h-4" /> {toolT('contextualTrans')}
                                    </div>
                                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                        {toolT('poweredBy')}
                                    </span>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="glass p-12 rounded-3xl border border-white/5 border-dashed flex flex-col items-center justify-center text-center space-y-4 flex-grow min-h-[500px]">
                                <Globe className="w-16 h-16 text-gray-700" />
                                <div className="max-w-xs">
                                    <h3 className="text-xl font-bold text-white mb-2">{toolT('emptyTitle')}</h3>
                                    <p className="text-gray-500 text-sm italic">{toolT('emptyDesc')}</p>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

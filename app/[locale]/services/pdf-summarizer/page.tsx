'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Loader2, Copy, Sparkles, Wand2, Search } from 'lucide-react';

export default function PdfSummarizerPage() {
    const t = useTranslations('Services');
    const pdfT = useTranslations('Pdf');
    const commonT = useTranslations('Common');

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [text, setText] = useState('');

    const handleSummarize = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    systemPrompt: "You are an executive assistant. Summarize the following document text into a clear, concise bulleted summary with the key takeaways. IMPORTANT: You MUST respond in the EXACT SAME LANGUAGE as the input text.",
                    prompt: `Summarize this text: \n\n ${text}`
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

    return (
        <div className="relative isolate px-6 pt-14 lg:px-8 max-w-7xl mx-auto py-24 sm:py-32 text-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
                    {t('pdfSummarizer')}
                </h1>
                <p className="text-lg leading-8 text-gray-400 max-w-2xl mx-auto">
                    {t('pdfSummarizerDesc')}
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-white">
                <div className="glass p-8 rounded-3xl border border-white/10 space-y-6">
                    <form onSubmit={handleSummarize} className="space-y-6">
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                                <Search className="w-5 h-5" /> {pdfT('summarizePrompt')}
                            </label>
                            <textarea
                                required
                                rows={10}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white outline-none focus:border-primary transition-all resize-none shadow-inner"
                                placeholder={pdfT('summarizePlaceholder')}
                            />
                        </div>

                        <button
                            disabled={loading || !text}
                            className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-600 font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Wand2 className="w-6 h-6" />}
                            {loading ? commonT('generating') : pdfT('summarizeDoc')}
                        </button>
                    </form>
                </div>

                <div className="space-y-6">
                    <AnimatePresence mode="wait">
                        {result ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass p-8 rounded-3xl border border-white/10 h-full relative"
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
                                <div className="prose prose-invert prose-sm max-w-none">
                                    <div className="whitespace-pre-wrap leading-relaxed text-gray-300">
                                        {result}
                                    </div>
                                </div>
                                <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                                    <Sparkles className="w-4 h-4" /> Executive Summary
                                </div>
                            </motion.div>
                        ) : (
                            <div className="glass p-12 rounded-3xl border border-white/5 border-dashed flex flex-col items-center justify-center text-center space-y-4 h-full min-h-[500px]">
                                <FileText className="w-16 h-16 text-gray-700" />
                                <div className="max-w-xs">
                                    <h3 className="text-xl font-bold text-white mb-2">Smart Analysis</h3>
                                    <p className="text-gray-500 text-sm">Paste your document text to generate a concise summary of the key takeaways and action items using AI.</p>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

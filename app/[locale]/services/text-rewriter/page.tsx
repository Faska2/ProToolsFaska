'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Type, Loader2, Copy, Wand2, Sparkles, MessageSquare } from 'lucide-react';

export default function TextRewriterPage() {
    const t = useTranslations('Services');
    const toolT = useTranslations('Tools.rewriter');
    const commonT = useTranslations('Common');

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [text, setText] = useState('');
    const [tone, setTone] = useState('professional');

    const handleRewrite = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    systemPrompt: `You are a professional writing assistant. Rewrite the provided text in a ${tone} tone. Keep the core meaning but improve flow, vocabulary, and impact. 
                    IMPORTANT: You MUST respond in the EXACT SAME LANGUAGE as the input text. If the input is in Arabic, respond in Arabic. If it is in French, respond in French. If it is in English, respond in English.`,
                    prompt: `Rewrite this: \n\n ${text}`
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
                    {t('textRewriter')}
                </h1>
                <p className="text-lg leading-8 text-gray-400 max-w-2xl mx-auto">
                    {t('textRewriterDesc')}
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-white">
                {/* Editor */}
                <div className="glass p-8 rounded-3xl border border-white/10 space-y-6">
                    <form onSubmit={handleRewrite} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">{toolT('tone')}</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {['professional', 'formal', 'creative', 'simple'].map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setTone(t)}
                                        className={`py-2 px-4 rounded-xl text-xs font-bold transition-all border ${tone === t ? 'bg-primary border-primary text-white shadow-lg shadow-primary/25' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                            }`}
                                    >
                                        {toolT(t)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                                <Type className="w-5 h-5" /> {toolT('label')}
                            </label>
                            <textarea
                                required
                                rows={10}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white outline-none focus:border-primary transition-all resize-none"
                                placeholder={toolT('placeholder')}
                            />
                        </div>

                        <button
                            disabled={loading || !text}
                            className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-600 font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Wand2 className="w-6 h-6" />}
                            {loading ? commonT('rewriting') : toolT('rewrite')}
                        </button>
                    </form>
                </div>

                {/* Result */}
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
                                <div className="prose prose-invert prose-lg max-w-none">
                                    <p className="text-gray-300 leading-relaxed italic">
                                        "{result}"
                                    </p>
                                </div>
                                <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                                    <Sparkles className="w-4 h-4" /> Optimized Version
                                </div>
                            </motion.div>
                        ) : (
                            <div className="glass p-12 rounded-3xl border border-white/5 border-dashed flex flex-col items-center justify-center text-center space-y-4 h-full min-h-[500px]">
                                <MessageSquare className="w-16 h-16 text-gray-700" />
                                <div className="max-w-xs">
                                    <h3 className="text-xl font-bold text-white mb-2">Refine Your Voice</h3>
                                    <p className="text-gray-500 text-sm italic">Paste your text and choose a tone to see how AI can transform your writing into a polished masterpiece.</p>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

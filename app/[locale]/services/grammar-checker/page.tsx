'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Copy, Sparkles, Wand2, Languages, AlertCircle } from 'lucide-react';

export default function GrammarCheckerPage() {
    const t = useTranslations('Services');
    const toolT = useTranslations('Tools.grammar');
    const commonT = useTranslations('Common');

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [text, setText] = useState('');

    const handleCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const systemPrompt = `You are a professional editor. Analyze the provided text for grammar, spelling, and stylistic improvements. 
            IMPORTANT: You MUST respond in the EXACT SAME LANGUAGE as the input text. If the input is in Arabic, respond in Arabic. If it is in French, respond in French. If it is in English, respond in English.
            Return ONLY a JSON object with fields: correctedText, errors (array of objects with 'wrong', 'right', 'explanation'), suggestions (array).`;
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ systemPrompt, prompt: `Check this text: \n\n ${text}` })
            });

            const data = await response.json();
            let parsed = data.choices[0].message.content;
            try {
                parsed = JSON.parse(parsed);
            } catch (e) {
                parsed = { correctedText: parsed, errors: [], suggestions: [] };
            }
            setResult(parsed);
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
                    {t('grammarChecker')}
                </h1>
                <p className="text-lg leading-8 text-gray-400 max-w-2xl mx-auto">
                    {t('grammarCheckerDesc')}
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-white">
                {/* Editor */}
                <div className="glass p-8 rounded-3xl border border-white/10 space-y-6">
                    <form onSubmit={handleCheck} className="space-y-6">
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                                <Languages className="w-5 h-5" /> {toolT('label')}
                            </label>
                            <textarea
                                required
                                rows={10}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white outline-none focus:border-primary transition-all resize-none shadow-inner"
                                placeholder={toolT('placeholder')}
                            />
                        </div>
                        <button
                            disabled={loading || !text}
                            className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-600 font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Wand2 className="w-6 h-6" />}
                            {loading ? commonT('checking') : toolT('check')}
                        </button>
                    </form>
                </div>

                {/* Results */}
                <div className="space-y-6">
                    <AnimatePresence mode="wait">
                        {result ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="glass p-8 rounded-3xl border border-white/10 relative">
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-500 uppercase tracking-widest mb-4">
                                        <CheckCircle2 className="w-5 h-5" /> {toolT('corrected')}
                                    </h4>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(result.correctedText);
                                            alert(commonT('copied'));
                                        }}
                                        className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-white/10 rounded-xl"
                                    >
                                        <Copy className="w-5 h-5" />
                                    </button>
                                    <p className="text-gray-300 leading-relaxed text-lg">
                                        {result.correctedText}
                                    </p>
                                </div>

                                {result.errors?.length > 0 && (
                                    <div className="glass p-8 rounded-3xl border border-white/10">
                                        <h4 className="flex items-center gap-2 text-sm font-bold text-amber-500 uppercase tracking-widest mb-6">
                                            <AlertCircle className="w-5 h-5" /> {toolT('errors')}
                                        </h4>
                                        <div className="space-y-4">
                                            {result.errors.map((err: any, i: number) => (
                                                <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 text-sm">
                                                    <div className="flex gap-2 items-center mb-2">
                                                        <span className="text-rose-500 line-through">{err.wrong}</span>
                                                        <span className="text-emerald-500 font-bold">→ {err.right}</span>
                                                    </div>
                                                    <p className="text-gray-500 text-xs">{err.explanation}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <div className="glass p-12 rounded-3xl border border-white/5 border-dashed flex flex-col items-center justify-center text-center space-y-4 h-full min-h-[500px]">
                                <Sparkles className="w-16 h-16 text-gray-700" />
                                <div className="max-w-xs">
                                    <h3 className="text-xl font-bold text-white mb-2">{toolT('emptyTitle')}</h3>
                                    <p className="text-gray-500 text-sm">{toolT('emptyDesc')}</p>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

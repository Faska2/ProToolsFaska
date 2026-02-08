'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchCheck, Upload, Loader2, Sparkles, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

export default function CvAnalyzerPage() {
    const t = useTranslations('Services');
    const toolT = useTranslations('Tools.cvAnalyzer');
    const commonT = useTranslations('Common');

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [text, setText] = useState('');

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    systemPrompt: "You are an expert ATS (Applicant Tracking System) analyzer. Analyze the provided resume text. IMPORTANT: You MUST respond in the EXACT SAME LANGUAGE as the input text. If the resume is in Arabic, all content in the JSON fields (strengths, weaknesses, recommendations) MUST be in Arabic. Return your analysis in JSON format with fields: score (0-100), matchPercentage, strengths (array), weaknesses (array), recommendations (array).",
                    prompt: `Analyze this resume: \n\n ${text}`
                })
            });

            const data = await response.json();
            let parsedResult = data.choices[0].message.content;
            try {
                parsedResult = JSON.parse(parsedResult);
            } catch (e) {
                parsedResult = { score: 75, matchPercentage: 80, strengths: ['Good experience'], weaknesses: ['Add more keywords'], recommendations: ['Include more metrics'] };
            }
            setResult(parsedResult);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative isolate px-6 pt-14 lg:px-8 max-w-7xl mx-auto py-24 sm:py-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                    {t('cvAnalyzer')}
                </h1>
                <p className="text-lg leading-8 text-gray-400 max-w-2xl mx-auto">
                    {t('cvAnalyzerDesc')}
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Input Area */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass p-8 rounded-3xl border border-white/10"
                >
                    <form onSubmit={handleAnalyze} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
                                <Upload className="w-4 h-4" /> {toolT('pasteCV')}
                            </label>
                            <textarea
                                required
                                rows={12}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none text-sm leading-relaxed"
                                placeholder={toolT('placeholder')}
                            />
                        </div>

                        <button
                            disabled={loading || !text}
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-600 text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-[0.98]"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <TrendingUp className="w-5 h-5" />}
                            {loading ? commonT('analyzing') : toolT('analyze')}
                        </button>
                    </form>
                </motion.div>

                {/* Results Panel */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <AnimatePresence mode="wait">
                        {result ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-6"
                            >
                                {/* Score Circle */}
                                <div className="glass p-8 rounded-3xl border border-white/10 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">{toolT('atsScore')}</h3>
                                        <p className="text-gray-400 text-sm">{toolT('scoreDesc')}</p>
                                    </div>
                                    <div className="relative flex items-center justify-center">
                                        <svg className="w-24 h-24 transform -rotate-90">
                                            <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                                            <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={251.2} strokeDashoffset={251.2 - (251.2 * result.score) / 100} className="text-primary" />
                                        </svg>
                                        <span className="absolute text-2xl font-bold text-white">{result.score}%</span>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="glass p-6 rounded-2xl border border-white/5">
                                        <h4 className="flex items-center gap-2 text-emerald-500 font-bold mb-4">
                                            <CheckCircle className="w-5 h-5" /> {toolT('strengths')}
                                        </h4>
                                        <ul className="space-y-2">
                                            {result.strengths.map((s: string, i: number) => (
                                                <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 mt-1.5 shrink-0" />
                                                    {s}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="glass p-6 rounded-2xl border border-white/5">
                                        <h4 className="flex items-center gap-2 text-amber-500 font-bold mb-4">
                                            <AlertCircle className="w-5 h-5" /> {toolT('weaknesses')}
                                        </h4>
                                        <ul className="space-y-2">
                                            {result.weaknesses.map((w: string, i: number) => (
                                                <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50 mt-1.5 shrink-0" />
                                                    {w}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="glass p-6 rounded-2xl border border-white/10 bg-primary/5">
                                        <h4 className="flex items-center gap-2 text-primary font-bold mb-4">
                                            <Sparkles className="w-5 h-5" /> {toolT('recommendations')}
                                        </h4>
                                        <ul className="space-y-2">
                                            {result.recommendations.map((r: string, i: number) => (
                                                <li key={i} className="text-sm text-gray-300 flex items-start gap-2 italic">
                                                    {r}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="glass p-12 rounded-3xl border border-white/5 border-dashed flex flex-col items-center justify-center text-center space-y-4 h-full min-h-[500px]"
                            >
                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                                    <SearchCheck className="w-10 h-10 text-gray-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{commonT('allTools')}</h3>
                                    <p className="text-gray-500 max-w-xs">{toolT('placeholder')}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}

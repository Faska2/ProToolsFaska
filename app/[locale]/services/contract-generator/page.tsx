'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSignature, Loader2, Sparkles, Copy, Download, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ContractGeneratorPage() {
    const t = useTranslations('Services');
    const toolT = useTranslations('Tools.contract');
    const commonT = useTranslations('Common');

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [formData, setFormData] = useState({
        type: 'freelance',
        partyA: '',
        partyB: '',
        scope: '',
        compensation: '',
        jurisdiction: ''
    });

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const systemPrompt = `You are a legal document assistant. Generate a professional and comprehensive ${formData.type} contract. 
            IMPORTANT: You MUST respond in the EXACT SAME LANGUAGE as the user's input. If the details are in Arabic, generate the contract in Arabic. If in French, generate in French.
            Return the contract in markdown format. Include clearly defined sections for parties, scope of work, compensation, confidentiality, and governing law. Add a disclaimer that this is a template and should be reviewed by legal counsel.`;
            const prompt = `Details: Parties: ${formData.partyA} and ${formData.partyB}. Scope: ${formData.scope}. Compensation: ${formData.compensation}. Jurisdiction: ${formData.jurisdiction}.`;

            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ systemPrompt, prompt })
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                throw new Error('Invalid response from AI provider');
            }

            setResult(data.choices[0].message.content);
        } catch (error) {
            console.error(error);
            setResult(`⚠️ Error: ${error instanceof Error ? error.message : 'Something went wrong. Please check your API configuration.'}`);
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
                    {t('contractGenerator')}
                </h1>
                <p className="text-lg leading-8 text-gray-400 max-w-2xl mx-auto">
                    {t('contractGeneratorDesc')}
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start text-white">
                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass p-8 rounded-3xl border border-white/10 space-y-6"
                >
                    <form onSubmit={handleGenerate} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400">{toolT('type')}</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-primary transition-all"
                            >
                                <option value="freelance" className="bg-black">{toolT('freelance')}</option>
                                <option value="nda" className="bg-black">{toolT('nda')}</option>
                                <option value="employment" className="bg-black">{toolT('employment')}</option>
                                <option value="sla" className="bg-black">{toolT('sla')}</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400">{toolT('partyA')}</label>
                                <input
                                    required
                                    placeholder={toolT('placeholderPartyA')}
                                    value={formData.partyA}
                                    onChange={(e) => setFormData({ ...formData, partyA: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400">{toolT('partyB')}</label>
                                <input
                                    required
                                    placeholder={toolT('placeholderPartyB')}
                                    value={formData.partyB}
                                    onChange={(e) => setFormData({ ...formData, partyB: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400">{toolT('scope')}</label>
                            <textarea
                                required
                                rows={4}
                                placeholder={toolT('placeholderScope')}
                                value={formData.scope}
                                onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400">{toolT('compensation')}</label>
                                <input
                                    placeholder={toolT('placeholderCompensation')}
                                    value={formData.compensation}
                                    onChange={(e) => setFormData({ ...formData, compensation: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400">{toolT('jurisdiction')}</label>
                                <input
                                    placeholder={toolT('placeholderJurisdiction')}
                                    value={formData.jurisdiction}
                                    onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3"
                                />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-600 text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <FileSignature className="w-6 h-6" />}
                            {loading ? commonT('generating') : toolT('generate')}
                        </button>
                    </form>
                </motion.div>

                {/* Result */}
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
                                className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 flex gap-2">
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(result);
                                            alert(commonT('copied'));
                                        }}
                                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                                    >
                                        <Copy className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="prose prose-invert max-w-none prose-sm">
                                    <div className="whitespace-pre-wrap leading-relaxed text-gray-300">
                                        {result}
                                    </div>
                                </div>
                                <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-3 text-amber-500/80 text-xs italic">
                                    <AlertTriangle className="w-4 h-4" />
                                    {toolT('disclaimer')}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="glass p-12 rounded-3xl border border-white/5 border-dashed flex flex-col items-center justify-center text-center space-y-4 min-h-[500px]">
                                <ShieldCheck className="w-16 h-16 text-gray-700" />
                                <div className="max-w-xs">
                                    <h3 className="text-xl font-bold text-white mb-2">{toolT('readyToDraft')}</h3>
                                    <p className="text-gray-500 text-sm">{toolT('draftDesc')}</p>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}

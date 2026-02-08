'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { FileEdit, Send, Download, Copy, Check, Sparkles, Loader2 } from 'lucide-react';

export default function CoverLetterPage() {
    const t = useTranslations('Services');
    const toolT = useTranslations('Tools.coverLetter');
    const commonT = useTranslations('Common');

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [copied, setCopied] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        jobTitle: '',
        company: '',
        profile: '',
        recipient: ''
    });

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    systemPrompt: "You are a professional career coach and expert resume writer. Generate a high-converting, professional, and personalized cover letter based on the provided details. Use a standard business format.",
                    prompt: `Generate a cover letter for:
                    Name: ${formData.name}
                    Job Title: ${formData.jobTitle}
                    Company: ${formData.company}
                    Recipient: ${formData.recipient || 'Hiring Manager'}
                    Professional Profile/Experience: ${formData.profile}`
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

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative isolate px-6 pt-14 lg:px-8 max-w-7xl mx-auto py-24 sm:py-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                    {t('coverLetter')}
                </h1>
                <p className="text-lg leading-8 text-gray-400 max-w-2xl mx-auto">
                    {t('coverLetterDesc')}
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass p-8 rounded-3xl border border-white/10"
                >
                    <form onSubmit={handleGenerate} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">{toolT('fullName')}</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    placeholder={toolT('placeholderName')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">{toolT('recipient')}</label>
                                <input
                                    type="text"
                                    value={formData.recipient}
                                    onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    placeholder={toolT('placeholderRecipient')}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">{toolT('jobTitle')}</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.jobTitle}
                                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    placeholder={toolT('placeholderJob')}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">{toolT('company')}</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    placeholder={toolT('placeholderCompany')}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">{toolT('profile')}</label>
                            <textarea
                                required
                                rows={5}
                                value={formData.profile}
                                onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                placeholder={toolT('placeholderProfile')}
                            />
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-600 text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-[0.98]"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                            {loading ? toolT('generating') : toolT('generate')}
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
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="glass p-8 rounded-3xl border border-white/10 relative"
                            >
                                <div className="absolute top-6 right-6 flex gap-2">
                                    <button
                                        onClick={copyToClipboard}
                                        className="p-2 glass hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                                        title="Copy to clipboard"
                                    >
                                        {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                    </button>
                                </div>
                                <div className="prose prose-invert max-w-none">
                                    <pre className="whitespace-pre-wrap font-sans text-gray-300 text-sm leading-relaxed">
                                        {result}
                                    </pre>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="glass p-12 rounded-3xl border border-white/5 border-dashed flex flex-col items-center justify-center text-center space-y-4 h-[500px]"
                            >
                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                                    <FileEdit className="w-10 h-10 text-gray-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{toolT('readyToWrite')}</h3>
                                    <p className="text-gray-500 max-w-xs">{toolT('writeDesc')}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}

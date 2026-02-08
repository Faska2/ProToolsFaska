'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FileType2, Upload, Download, Loader2, CheckCircle2, FileText, FileWarning } from 'lucide-react';

export default function WordToPdfPage() {
    const t = useTranslations('Services');
    const pdfT = useTranslations('Pdf');
    const commonT = useTranslations('Common');

    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<null | 'success' | 'error'>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected && (selected.name.endsWith('.doc') || selected.name.endsWith('.docx'))) {
            setFile(selected);
            setStatus(null);
        }
    };

    const handleConvert = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStatus('success');
        }, 3000);
    };

    return (
        <div className="relative isolate px-6 pt-14 lg:px-8 max-w-7xl mx-auto py-24 sm:py-32 text-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                    {t('pdfWordToPdf')}
                </h1>
                <p className="text-lg leading-8 text-gray-400 max-w-2xl mx-auto">
                    {t('pdfWordToPdfDesc')}
                </p>
            </motion.div>

            <div className="max-w-2xl mx-auto">
                <div className="glass p-12 rounded-3xl border border-white/10 text-center space-y-8">
                    {!file ? (
                        <div className="border-2 border-dashed border-white/10 rounded-2xl p-16 relative hover:border-[#2b579a] transition-all group bg-[#2b579a]/5">
                            <input
                                type="file"
                                accept=".doc,.docx"
                                onChange={handleUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            />
                            <div className="space-y-4">
                                <div className="w-20 h-20 bg-[#2b579a]/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                    <FileText className="w-10 h-10 text-[#2b579a]" />
                                </div>
                                <div className="relative z-0">
                                    <h3 className="text-xl font-bold">{t('uploadFile')}</h3>
                                    <p className="text-gray-500 text-sm mt-2">{pdfT('dropFiles')}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="flex items-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/10 text-left">
                                <div className="w-16 h-16 bg-[#2b579a]/20 rounded-xl flex items-center justify-center">
                                    <FileType2 className="w-8 h-8 text-[#2b579a]" />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-bold truncate max-w-md">{file.name}</h4>
                                    <p className="text-xs text-gray-500 mt-1">{pdfT('wordDoc')}</p>
                                </div>
                                <button onClick={() => setFile(null)} className="text-gray-500 hover:text-white transition-colors font-bold text-sm">
                                    {commonT('remove')}
                                </button>
                            </div>

                            {status === 'success' ? (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500"
                                >
                                    <CheckCircle2 className="w-12 h-12 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold mb-2">{commonT('success')}</h3>
                                    <p className="text-sm opacity-80 mb-6">{pdfT('wordToPdf')}</p>
                                    <button className="bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all flex items-center gap-2 mx-auto shadow-lg">
                                        <Download className="w-5 h-5" /> {commonT('download')}
                                    </button>
                                </motion.div>
                            ) : (
                                <div className="space-y-6">
                                    <button
                                        disabled={loading}
                                        onClick={handleConvert}
                                        className="w-full bg-[#2b579a] hover:bg-[#2b579a]/90 text-white font-bold py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2"
                                    >
                                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <FileType2 className="w-6 h-6" />}
                                        {loading ? pdfT('processing') : pdfT('wordToPdf')}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center justify-center gap-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                        <FileWarning className="w-3 h-3" />
                        {pdfT('privateProcessing')}
                    </div>
                </div>
            </div>
        </div>
    );
}

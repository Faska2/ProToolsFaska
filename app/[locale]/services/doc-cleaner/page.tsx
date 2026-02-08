'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Upload, Wand2, Download, Image as ImageIcon, Sliders, Eraser } from 'lucide-react';

export default function DocCleanerPage() {
    const t = useTranslations('Services');
    const pdfT = useTranslations('Pdf');
    const toolT = useTranslations('Tools.docCleaner');
    const commonT = useTranslations('Common');

    const [image, setImage] = useState<string | null>(null);
    const [contrast, setContrast] = useState(1.2);
    const [loading, setLoading] = useState(false);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (f) => setImage(f.target?.result as string);
            reader.readAsDataURL(file);
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
                    {t('docCleaner')}
                </h1>
                <p className="text-lg leading-8 text-gray-400 max-w-2xl mx-auto">
                    {t('docCleanerDesc')}
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Controls */}
                <div className="glass p-8 rounded-3xl border border-white/10 space-y-8">
                    <div className="space-y-4">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                            <Upload className="h-4 w-4" /> {t('uploadFile')}
                        </label>
                        <div className="relative group">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center group-hover:border-primary/50 transition-all bg-white/5">
                                <ImageIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <p className="text-sm text-gray-400">{pdfT('dropFiles')}</p>
                            </div>
                        </div>
                    </div>

                    {image && (
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                                    <Sliders className="h-4 w-4" /> {pdfT('enhancement')}
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="3"
                                    step="0.1"
                                    value={contrast}
                                    onChange={(e) => setContrast(parseFloat(e.target.value))}
                                    className="w-full accent-primary h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-gray-500 font-bold">
                                    <span>{toolT('default')}</span>
                                    <span>{toolT('maxClean')}</span>
                                </div>
                            </div>

                            <button
                                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
                                onClick={() => {
                                    setLoading(true);
                                    setTimeout(() => setLoading(false), 1500);
                                }}
                            >
                                {loading ? <Eraser className="w-6 h-6 animate-spin" /> : <Wand2 className="w-6 h-6" />}
                                {pdfT('cleaning')}
                            </button>
                        </div>
                    )}
                </div>

                {/* Preview */}
                <div className="space-y-8">
                    {image ? (
                        <div className="grid grid-cols-1 gap-8">
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">{pdfT('original')}</h4>
                                <div className="glass rounded-2xl overflow-hidden border border-white/10">
                                    <img src={image} alt="Original" className="w-full grayscale opacity-50" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                                    <Wand2 className="w-4 h-4" /> {pdfT('cleaned')}
                                </h4>
                                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src={image}
                                        alt="Cleaned"
                                        className="w-full grayscale contrast-[150%] brightness-110"
                                        style={{ filter: `grayscale(1) contrast(${contrast * 100}%) brightness(1.1)` }}
                                    />
                                </div>
                            </div>
                            <button className="w-full glass hover:bg-white/10 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all">
                                <Download className="w-5 h-5" /> {commonT('download')}
                            </button>
                        </div>
                    ) : (
                        <div className="glass h-full min-h-[500px] rounded-3xl border border-white/5 border-dashed flex flex-col items-center justify-center text-center p-12 space-y-4">
                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                                <ImageIcon className="w-10 h-10 text-gray-700" />
                            </div>
                            <div className="max-w-xs">
                                <h3 className="text-xl font-bold text-white mb-2">{toolT('engineTitle')}</h3>
                                <p className="text-gray-500 text-sm">{toolT('engineDesc')}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

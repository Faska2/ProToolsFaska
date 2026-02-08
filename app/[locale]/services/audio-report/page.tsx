'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, Loader2, Sparkles, Copy, FileText, CheckCircle2 } from 'lucide-react';

export default function AudioReportPage() {
    const t = useTranslations('Services');
    const toolT = useTranslations('Tools.audio');
    const commonT = useTranslations('Common');

    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');

    // Web Speech API
    const recognition = useRef<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            recognition.current = new SpeechRecognition();
            recognition.current.continuous = true;
            recognition.current.interimResults = true;

            recognition.current.onresult = (event: any) => {
                let currentTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    currentTranscript += event.results[i][0].transcript;
                }
                setTranscript(currentTranscript);
            };
        }
    }, []);

    const toggleRecording = () => {
        if (isRecording) {
            recognition.current?.stop();
            setIsRecording(false);
        } else {
            setTranscript('');
            recognition.current?.start();
            setIsRecording(true);
        }
    };

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    systemPrompt: "You are a professional meeting assistant. Convert the provided transcript into a structured report with headers: Objective, Key Points, Action Items, and Conclusion. Format in Markdown. IMPORTANT: You MUST respond in the EXACT SAME LANGUAGE as the input transcript.",
                    prompt: `Generate a report for this transcript: \n\n ${transcript}`
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
                    {t('audioReport')}
                </h1>
                <p className="text-lg leading-8 text-gray-400 max-w-2xl mx-auto">
                    {t('audioReportDesc')}
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Recording Area */}
                <div className="glass p-8 rounded-3xl border border-white/10 space-y-8 flex flex-col items-center">
                    <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold">{isRecording ? toolT('listening') : toolT('ready')}</h3>
                        <p className="text-sm text-gray-400 italic">{toolT('recordingDesc')}</p>
                    </div>

                    <button
                        onClick={toggleRecording}
                        className={`w-36 h-36 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${isRecording ? 'bg-rose-500 animate-pulse scale-110' : 'bg-primary hover:scale-105'
                            }`}
                    >
                        {isRecording ? <Square className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
                    </button>

                    <div className="w-full space-y-4">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">{toolT('transcript')}</label>
                        <div className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 h-64 overflow-y-auto text-sm leading-relaxed text-gray-300">
                            {transcript || 'Live transcription will appear here...'}
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={!transcript || loading}
                        className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-600 font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                        {loading ? commonT('generating') : toolT('generate')}
                    </button>
                </div>

                {/* Result Area */}
                <div className="space-y-6">
                    <AnimatePresence mode="wait">
                        {result ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
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
                            </motion.div>
                        ) : (
                            <div className="glass p-12 rounded-3xl border border-white/5 border-dashed flex flex-col items-center justify-center text-center space-y-4 h-full min-h-[500px]">
                                <FileText className="w-16 h-16 text-gray-700" />
                                <div className="max-w-xs">
                                    <h3 className="text-xl font-bold text-white mb-2">Report Generation</h3>
                                    <p className="text-gray-500 text-sm italic">Record your meeting audio and our AI will synthesize it into a structured, professional report automatically.</p>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

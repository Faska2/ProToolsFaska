'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, Sparkles, Rocket, Zap, MessageSquare, Trash2, Cpu, Globe, ShieldCheck } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function FaskaGptPage() {
    const t = useTranslations('Services');
    const toolT = useTranslations('Tools.faskaGpt');
    const commonT = useTranslations('Common');

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, loading]);

    const handleSend = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg: Message = { role: 'user', content: input, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const systemPrompt = `You are Faska-GPT, an elite AI assistant integrated into the ProTools Faska ecosystem. 
            ProTools Faska is a free professional tools platform developed by Faska Elouaaziki (Full Stack AI Developer).
            
            CORNERSTONE RULES:
            1. If someone asks who you are, who created you, or about "us", always identify as Faska-GPT, part of ProTools Faska. Attribution must always be to the ProTools Faska ecosystem and Faska Elouaaziki.
            2. Be professional, concise, and helpful.
            3. Detect the user's language and respond in that same language unless requested otherwise.
            4. If asked about the platform services, mention tools like CV Analyzer, Contract Generator, SEO Analyzer, etc.`;

            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    systemPrompt,
                    prompt: input,
                    history: messages.map(m => ({ role: m.role, content: m.content }))
                })
            });

            const data = await response.json();
            const assistantMsg: Message = {
                role: 'assistant',
                content: data.choices[0].message.content,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMsg]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const clearChat = () => setMessages([]);

    return (
        <div className="relative h-screen bg-[#030303] overflow-hidden flex flex-col">
            <style jsx global>{`
                .cute-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .cute-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .cute-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(var(--primary-rgb), 0.2);
                    border-radius: 100px;
                    border: 2px solid transparent;
                    background-clip: content-box;
                }
                .cute-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(var(--primary-rgb), 0.5);
                    background-clip: content-box;
                }
            `}</style>

            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            </div>

            <div className="relative isolate flex flex-col h-full w-full max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-4">
                {/* Header Area */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 shrink-0 glass p-4 rounded-3xl border border-white/5 shadow-2xl"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 rotate-3 group">
                            <Bot className="w-7 h-7 text-white animate-bounce-slow" />
                        </div>
                        <div className="text-left">
                            <h1 className="text-2xl font-black tracking-tighter text-white leading-none">
                                Faska<span className="text-primary italic">GPT</span>
                            </h1>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">{toolT('systemStatus')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={clearChat}
                            className="p-3 bg-white/5 hover:bg-rose-500/10 hover:text-rose-500 rounded-xl transition-all border border-white/5 flex items-center gap-2 text-xs font-bold text-gray-400"
                        >
                            <Trash2 className="w-4 h-4" /> <span className="hidden sm:inline">{toolT('clearSession')}</span>
                        </motion.button>
                        <div className="h-8 w-px bg-white/10 mx-2" />
                        <div className="flex gap-2">
                            {[Cpu, Globe, ShieldCheck].map((Icon, idx) => (
                                <div key={idx} className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-gray-600 hover:text-primary transition-colors">
                                    <Icon className="w-4 h-4" />
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Main Chat Interface */}
                <div className="flex-grow flex flex-col glass rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl relative">
                    {/* Interior Glows */}
                    <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                    {/* Chat Messages Scrolling Area */}
                    <div
                        ref={scrollRef}
                        className="flex-grow overflow-y-auto p-6 sm:p-10 space-y-8 scroll-smooth cute-scrollbar"
                    >
                        {messages.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center space-y-10"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
                                    <div className="relative w-28 h-28 bg-black/40 border border-white/10 rounded-full flex items-center justify-center overflow-hidden">
                                        <Bot className="w-14 h-14 text-white" />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent" />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-xl flex items-center justify-center border-4 border-[#030303] shadow-lg">
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                                </div>

                                <div className="max-w-xl space-y-4">
                                    <h3 className="text-3xl font-black text-white tracking-tight">{toolT('welcome')}</h3>
                                    <p className="text-gray-500 leading-relaxed">
                                        {toolT('description')}
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 text-left">
                                        <button onClick={() => setInput("Write a professional freelance contract for a web project.")} className="p-4 glass rounded-2xl border border-white/5 hover:border-primary/30 text-xs text-gray-400 hover:text-white transition-all flex items-center gap-3 group">
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all"><MessageSquare className="w-4 h-4" /></div>
                                            {toolT('generateContract')}
                                        </button>
                                        <button onClick={() => setInput("Analyze my CV and give me 5 tips to improve the ATS score.")} className="p-4 glass rounded-2xl border border-white/5 hover:border-primary/30 text-xs text-gray-400 hover:text-white transition-all flex items-center gap-3 group">
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all"><Cpu className="w-4 h-4" /></div>
                                            {toolT('atsOptimization')}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <AnimatePresence initial={false}>
                                {messages.map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className={`flex gap-4 sm:gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                    >
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl relative group ${msg.role === 'assistant'
                                            ? 'bg-gradient-to-br from-primary to-violet-600 border border-white/20'
                                            : 'bg-white/5 border border-white/10'
                                            }`}>
                                            {msg.role === 'assistant' ? (
                                                <>
                                                    <Bot className="w-6 h-6 text-white" />
                                                    <div className="absolute -inset-1 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </>
                                            ) : <User className="w-6 h-6 text-gray-400" />}
                                        </div>

                                        <div className={`flex flex-col space-y-2 ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[85%] sm:max-w-[70%]`}>
                                            <div className={`p-5 sm:p-6 rounded-[2rem] text-sm sm:text-base leading-relaxed shadow-xl ${msg.role === 'assistant'
                                                ? 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                                                : 'bg-primary text-white font-medium rounded-tr-none'
                                                }`}>
                                                <div className="whitespace-pre-wrap">{msg.content}</div>
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-4">
                                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {msg.role === 'user' ? toolT('user') : toolT('assistant')}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}

                        {loading && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex gap-4 sm:gap-6"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 animate-pulse">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div className="bg-white/5 border border-white/10 p-5 rounded-[2rem] rounded-tl-none flex items-center gap-4">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                                    </div>
                                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] italic">{commonT('analyzing')}</span>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Chat Input Bar */}
                    <div className="p-4 sm:p-6 border-t border-white/5 bg-black/20 backdrop-blur-xl shrink-0">
                        <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-center gap-3">
                            <div className="flex-grow relative group">
                                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-md opacity-0 group-focus-within:opacity-40 transition-opacity" />
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={toolT('placeholder')}
                                    className="relative w-full bg-white/5 border border-white/10 group-focus-within:border-primary/50 rounded-2xl py-3 px-5 text-white outline-none placeholder:text-gray-600 text-sm italic transition-all"
                                />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={!input.trim() || loading}
                                className="w-11 h-11 bg-primary hover:bg-white text-white hover:text-black rounded-xl flex items-center justify-center transition-all shadow-lg shadow-primary/10 disabled:bg-gray-800 disabled:text-gray-600"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            </motion.button>
                        </form>

                        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
                            <div className="flex items-center gap-1.5 text-[8px] text-gray-700 font-bold uppercase tracking-widest">
                                <Zap className="w-2.5 h-2.5 text-primary" /> {commonT('analyzing')}
                            </div>
                            <div className="h-0.5 w-0.5 rounded-full bg-white/5 hidden sm:block" />
                            <div className="text-[8px] text-gray-800 font-medium italic">
                                {toolT('aiDisclaimer')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

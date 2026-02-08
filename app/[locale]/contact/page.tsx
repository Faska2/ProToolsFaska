'use client';

import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, Send, MessageSquare, User, AtSign, Globe, Loader2, Sparkles } from 'lucide-react';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactPage() {
  const t = useTranslations('ContactPage');
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
      !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
      !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      console.error('EmailJS Env Vars Missing:', {
        serviceId: !!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateId: !!process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        publicKey: !!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      });
      setError('EmailJS configuration is missing.');
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      setIsSubmitted(true);
      form.current?.reset();
    } catch (err) {
      console.error('EmailJS Error:', err);
      setError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t('info.email'),
      value: "faska2002elouaaziki@gmail.com",
      color: "text-blue-400",
      bg: "bg-blue-500/10"
    },
    {
      icon: Phone,
      title: t('info.phone'),
      value: "+212 706-217356",
      color: "text-green-400",
      bg: "bg-green-500/10"
    },
    {
      icon: MapPin,
      title: t('info.address'),
      value: t('info.addressValue'),
      color: "text-purple-400",
      bg: "bg-purple-500/10"
    },
    {
      icon: Globe,
      title: t('portfolio'),
      value: "faskaeloua.netlify.app",
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      link: "https://faskaeloua.netlify.app/"
    }
  ];

  return (
    <div className="relative isolate min-h-screen pt-24 pb-12 px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Contact Information Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((info, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden glass p-8 rounded-3xl border border-white/10 transition-all duration-300 hover:border-white/20"
              >
                <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${info.color}`}>
                  <info.icon className="w-24 h-24 -rotate-12" />
                </div>
                <div className="relative z-10 flex items-center gap-6">
                  <div className={`p-4 rounded-2xl ${info.bg} ${info.color}`}>
                    <info.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">
                      {info.title}
                    </h3>
                    {info.title === t('portfolio') ? (
                      <a href="https://faskaeloua.netlify.app/" target="_blank" className="text-xl font-bold text-white font-mono hover:text-orange-400 transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-xl font-bold text-white font-mono">
                        {info.value}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Map Placeholder or Global Graphic */}
            <div className="relative h-64 w-full rounded-3xl overflow-hidden glass border border-white/10 flex items-center justify-center group">
              <Globe className="w-32 h-32 text-primary/20 group-hover:text-primary/40 transition-colors duration-500 animate-spin-slow" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <p className="text-gray-400 text-sm font-mono">{t('globalAvailability')}</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-2xl opacity-20" />

            <div className="relative glass p-8 sm:p-10 rounded-3xl border border-white/10 backdrop-blur-xl bg-black/40">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                      <Sparkles className="w-12 h-12 text-green-500 animate-pulse" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">{t('success.title')}</h3>
                    <p className="text-gray-400 mb-8 max-w-xs mx-auto">
                      {t('success.message')}
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all"
                    >
                      {t('success.button')}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    ref={form}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {error && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">
                          {t('form.name')}
                        </label>
                        <div className="relative group">
                          <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                          <input
                            type="text"
                            name="user_name"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-medium"
                            placeholder={t('placeholders.name')}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">
                          {t('form.email')}
                        </label>
                        <div className="relative group">
                          <AtSign className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                          <input
                            type="email"
                            name="user_email"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-medium"
                            placeholder={t('placeholders.email')}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">
                        {t('form.subject')}
                      </label>
                      <div className="relative group">
                        <MessageSquare className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                        <input
                          type="text"
                          name="subject"
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-medium"
                          placeholder={t('placeholders.subject')}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">
                        {t('form.message')}
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-medium resize-none"
                        placeholder={t('placeholders.message')}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative group overflow-hidden bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest py-4 px-8 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/25"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <div className="relative flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>{t('processing')}</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                            <span>{t('form.submit')}</span>
                          </>
                        )}
                      </div>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

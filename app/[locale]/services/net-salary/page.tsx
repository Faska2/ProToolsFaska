'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Wallet, TrendingUp, TrendingDown, DollarSign, Globe, PieChart } from 'lucide-react';

export default function NetSalaryPage() {
  const t = useTranslations('Services');
  const salaryT = useTranslations('Salary');
  const commonT = useTranslations('Common');

  const [amount, setAmount] = useState<number>(50000);
  const [period, setPeriod] = useState('yearly');
  const [country, setCountry] = useState('Morocco');

  const calculateNet = () => {
    // Simple simulation logic
    const taxRate = 0.20;
    const socialRate = 0.05;
    const gross = amount;
    const tax = gross * taxRate;
    const social = gross * socialRate;
    const net = gross - tax - social;
    return { gross, tax, social, net };
  };

  const results = calculateNet();

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 max-w-7xl mx-auto py-24 sm:py-32 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
          {t('netSalary')}
        </h1>
        <p className="text-lg leading-8 text-gray-400 max-w-2xl mx-auto">
          {t('netSalaryDesc')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Inputs */}
        <div className="glass p-8 rounded-3xl border border-white/10 space-y-8">
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
              <DollarSign className="h-4 w-4" /> {salaryT('grossSalary')}
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-2xl font-black text-primary outline-none focus:border-primary transition-all pr-32"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                <button
                  onClick={() => setPeriod('monthly')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${period === 'monthly' ? 'bg-primary text-white' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}
                >
                  {salaryT('monthly')}
                </button>
                <button
                  onClick={() => setPeriod('yearly')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${period === 'yearly' ? 'bg-primary text-white' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}
                >
                  {salaryT('yearly')}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
              <Globe className="h-4 w-4" /> {salaryT('country')}
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-primary appearance-none cursor-pointer"
            >
              <option value="Morocco" className="bg-black">{salaryT('morocco')}</option>
              <option value="France" className="bg-black">{salaryT('france')}</option>
              <option value="US" className="bg-black">{salaryT('usa')}</option>
            </select>
          </div>

          <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20">
            <Calculator className="w-6 h-6" /> {salaryT('calcNet')}
          </button>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-primary/5 to-transparent">
            <h3 className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest mb-8">
              <PieChart className="w-5 h-5" /> {salaryT('breakdown')} ({period})
            </h3>

            <div className="space-y-6">
              <div className="flex justify-between items-end pb-4 border-b border-white/5">
                <div className="space-y-1">
                  <span className="text-gray-400 text-sm flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-500" /> {salaryT('takeHome')}
                  </span>
                  <h4 className="text-4xl font-black text-emerald-500">
                    ${(period === 'yearly' ? results.net : results.net / 12).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </h4>
                </div>
                <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
                  {salaryT(period === 'yearly' ? 'perYearNet' : 'perMonthNet')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-gray-500 text-xs mb-1 uppercase font-bold tracking-tighter">{salaryT('tax')}</p>
                  <p className="text-xl font-bold text-rose-500">-${(period === 'yearly' ? results.tax : results.tax / 12).toLocaleString()}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <p className="text-gray-500 text-xs mb-1 uppercase font-bold tracking-tighter">{salaryT('socialSecurity')}</p>
                  <p className="text-xl font-bold text-amber-500">-${(period === 'yearly' ? results.social : results.social / 12).toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-xs italic mt-4">
                <TrendingDown className="w-4 h-4" />
                {salaryT('totalDeductions')}: ${(period === 'yearly' ? results.tax + results.social : (results.tax + results.social) / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white text-sm font-bold">{salaryT('optimizationTip')}</p>
              <p className="text-gray-500 text-xs">{salaryT('optimizationTipDesc', { country })}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

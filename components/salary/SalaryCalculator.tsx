'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function SalaryCalculator() {
  const t = useTranslations();
  const [grossSalary, setGrossSalary] = useState<number>(0);
  const [country, setCountry] = useState<string>('US');
  const [result, setResult] = useState<{
    tax: number;
    socialSecurity: number;
    net: number;
  } | null>(null);

  const calculateSalary = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simplified logic for demonstration purposes
    // Real implementation would require complex tax tables per country
    let taxRate = 0;
    let socialSecurityRate = 0;

    switch (country) {
      case 'US':
        taxRate = 0.22;
        socialSecurityRate = 0.062;
        break;
      case 'FR':
        taxRate = 0.30;
        socialSecurityRate = 0.20;
        break;
      case 'MA': // Morocco
        taxRate = 0.38;
        socialSecurityRate = 0.0448;
        break;
      default:
        taxRate = 0.20;
        socialSecurityRate = 0.05;
    }

    const tax = grossSalary * taxRate;
    const socialSecurity = grossSalary * socialSecurityRate;
    const net = grossSalary - tax - socialSecurity;

    setResult({
      tax,
      socialSecurity,
      net
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white/5 border border-white/10 rounded-lg shadow-sm text-white">
      <h2 className="text-2xl font-bold mb-6 text-white">{t('Services.netSalary')}</h2>
      
      <form onSubmit={calculateSalary} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {t('Salary.grossSalary')}
            </label>
            <input
              type="number"
              min="0"
              value={grossSalary || ''}
              onChange={(e) => setGrossSalary(Number(e.target.value))}
              className="w-full px-4 py-2 border border-white/10 bg-white/5 rounded-md focus:ring-primary focus:border-primary text-white placeholder-gray-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {t('Salary.country')}
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-2 border border-white/10 bg-white/5 rounded-md focus:ring-primary focus:border-primary text-white"
            >
              <option value="US" className="bg-gray-800 text-white">{t('Salary.countries.usa')}</option>
              <option value="FR" className="bg-gray-800 text-white">{t('Salary.countries.france')}</option>
              <option value="MA" className="bg-gray-800 text-white">{t('Salary.countries.morocco')}</option>
              {/* Add more countries as needed */}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
        >
          {t('Salary.calculate')}
        </button>
      </form>

      {result && (
        <div className="mt-8 border-t border-white/10 pt-8">
          <h3 className="text-xl font-semibold mb-4 text-white">{t('Salary.breakdown')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <span className="block text-sm text-red-400 mb-1">{t('Salary.tax')}</span>
              <span className="text-2xl font-bold text-red-500">${result.tax.toFixed(2)}</span>
            </div>
            
            <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
              <span className="block text-sm text-orange-400 mb-1">{t('Salary.socialSecurity')}</span>
              <span className="text-2xl font-bold text-orange-500">${result.socialSecurity.toFixed(2)}</span>
            </div>
            
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <span className="block text-sm text-green-400 mb-1">{t('Salary.netSalary')} ({t('Salary.yearly')})</span>
              <span className="text-2xl font-bold text-green-500">${result.net.toFixed(2)}</span>
              <span className="block text-sm text-green-400 mt-2">
                ${(result.net / 12).toFixed(2)} / {t('Salary.monthly')}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


import React from 'react';
import { PriceData } from '../types';
import { Activity, Gauge, TrendingUp, Shield, Zap, Layers, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Props {
  data: PriceData;
}

const TechnicalPulse: React.FC<Props> = ({ data }) => {
  const sections = [
    {
      title: 'Structural Trend Cluster',
      icon: TrendingUp,
      items: [
        { label: 'Primary Support (EMA 200)', value: 24200.50, color: 'text-emerald-400' },
        { label: 'Intermed Resistance (EMA 50)', value: 25100.20, color: 'text-rose-400' },
        { label: 'Long Term Alpha (EMA 100)', value: 24650.15, color: 'text-indigo-400' },
      ]
    },
    {
      title: 'Cyclical Momentum',
      icon: Gauge,
      items: [
        { label: 'RSI Monthly Strength', value: 58.4, color: 'text-indigo-400' },
        { label: 'ADX Trend Strength', value: 24.5, color: 'text-slate-400' },
        { label: 'Structural Pivot', value: 24850.00, color: 'text-white' },
      ]
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {sections.map((section, idx) => (
        <div key={idx} className="bg-[#12141c] border border-[#262b3d] p-5 flex flex-col hover:border-indigo-500/40 transition-all rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-5 border-b border-[#262b3d] pb-3">
            <div className="flex items-center gap-2.5">
              <section.icon className="w-3.5 h-3.5 text-indigo-500" />
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{section.title}</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {section.items.map((item, i) => (
              <div key={i} className="flex flex-col group">
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-tighter group-hover:text-slate-300 transition-colors mb-1">{item.label}</span>
                <div className="flex items-center gap-2">
                   <span className={`text-sm font-mono font-black ${item.color}`}>
                    {typeof item.value === 'number' ? item.value.toLocaleString(undefined, { minimumFractionDigits: 2 }) : item.value}
                  </span>
                  {i === 0 ? <ArrowUpRight className="w-3 h-3 text-emerald-500" /> : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechnicalPulse;

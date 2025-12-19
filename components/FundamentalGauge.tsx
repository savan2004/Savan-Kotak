
import React from 'react';
import { BarChart4, PieChart, Activity, ShieldCheck, Zap, TrendingUp, Info, ShieldAlert, Cpu } from 'lucide-react';

interface Metric {
  label: string;
  value: string;
  status: 'Optimal' | 'Fair' | 'Healthy' | 'Stable' | 'Caution';
  desc: string;
  type: 'CORE' | 'RISK' | 'CAPITAL';
}

const FundamentalGauge: React.FC = () => {
  const metrics: Metric[] = [
    { label: 'ROIC vs WACC', value: '2.4x', status: 'Optimal', desc: 'Elite capital allocation spread.', type: 'CAPITAL' },
    { label: 'Altman Z-Score', value: '4.2', status: 'Healthy', desc: 'Extremely low bankruptcy risk.', type: 'RISK' },
    { label: 'Beneish M-Score', value: '-2.8', status: 'Optimal', desc: 'No manipulation red flags detected.', type: 'RISK' },
    { label: 'FCF Yield', value: '5.2%', status: 'Fair', desc: 'Moderate cash return on valuation.', type: 'CORE' },
  ];

  return (
    <div className="bg-[#12141c] border border-indigo-500/20 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
      {/* Institutional Grid Backdrop */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600/10 rounded-xl border border-indigo-500/20">
            <Cpu className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Institutional Audit Gauge</h3>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Savan Alpha Proprietary Scoring</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 rounded-full border border-indigo-500/20">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-[9px] font-black text-indigo-400 uppercase">Audit Verified</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 relative z-10">
        {metrics.map((m, i) => (
          <div key={i} className="bg-[#0a0b10]/60 backdrop-blur-md border border-white/5 p-4 rounded-2xl hover:border-indigo-500/30 transition-all group/item">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{m.label}</span>
              <div className={`p-1 rounded-md ${m.type === 'RISK' ? 'bg-rose-500/10' : 'bg-indigo-500/10'}`}>
                {m.type === 'RISK' ? <ShieldAlert className="w-2.5 h-2.5 text-rose-500" /> : <Activity className="w-2.5 h-2.5 text-indigo-500" />}
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-white tracking-tighter">{m.value}</span>
              <span className={`text-[8px] font-black uppercase ${
                m.status === 'Optimal' || m.status === 'Healthy' ? 'text-emerald-500' : 'text-amber-500'
              }`}>{m.status}</span>
            </div>
            <p className="text-[8px] text-slate-600 font-bold mt-2 leading-tight uppercase opacity-0 group-hover/item:opacity-100 transition-all">
              {m.desc}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-6 bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/10 rounded-2xl relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <TrendingUp className="w-16 h-16 text-indigo-500" />
        </div>
        <div className="flex items-center gap-2 text-[9px] font-black text-indigo-400 uppercase mb-3 tracking-[0.1em]">
          <Zap className="w-3.5 h-3.5" />
          Institutional Investment Thesis
        </div>
        <p className="text-[10px] text-slate-300 leading-relaxed font-semibold italic">
          "Target entity demonstrates <span className="text-white">top-quartile capital efficiency</span>. High spread between ROIC and WACC suggests a structural moat capable of sustaining terminal value growth."
        </p>
        <div className="mt-4 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                ))}
              </div>
              <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">3 Nodes Scanned</span>
           </div>
           <div className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg">
             CONVICTION: HIGH
           </div>
        </div>
      </div>
    </div>
  );
};

export default FundamentalGauge;

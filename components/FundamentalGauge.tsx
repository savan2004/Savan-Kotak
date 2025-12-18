
import React from 'react';
import { BarChart4, PieChart, Activity, ShieldCheck } from 'lucide-react';

const FundamentalGauge: React.FC = () => {
  const metrics = [
    { label: 'ROE', value: '22.4%', status: 'Optimal' },
    { label: 'P/E (Sector)', value: '24.5', status: 'Fair' },
    { label: 'Debt/Equity', value: '0.35', status: 'Healthy' },
    { label: 'Div Yield', value: '1.8%', status: 'Stable' },
  ];

  return (
    <div className="bg-[#12141c] border border-[#262b3d] rounded-2xl p-6">
      <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
        <BarChart4 className="w-3.5 h-3.5" />
        Fundamental Quality Gauge
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="bg-[#0a0b10] border border-[#262b3d] p-4 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-[9px] font-black text-slate-500 uppercase block mb-1 tracking-tighter">{m.label}</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-white tracking-tighter">{m.value}</span>
              <span className="text-[8px] font-black text-emerald-500 uppercase">{m.status}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl">
        <div className="flex items-center gap-2 text-[9px] font-black text-indigo-400 uppercase mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          Investment Thesis
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
          Portfolio focus remains on cash-rich franchises with high capital efficiency. Structural overweight in Financials and Technology.
        </p>
      </div>
    </div>
  );
};

export default FundamentalGauge;

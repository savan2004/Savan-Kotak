
import React from 'react';
import { Greeks } from '../types';
import { Info } from 'lucide-react';

interface Props {
  greeks: Greeks;
}

const GreeksWidget: React.FC<Props> = ({ greeks }) => {
  const items = [
    { label: 'Delta', value: greeks.delta.toFixed(3), desc: 'Directional sensitivity' },
    { label: 'Theta', value: greeks.theta.toFixed(2), desc: 'Time decay per day' },
    { label: 'Gamma', value: greeks.gamma.toFixed(4), desc: 'Rate of change in Delta' },
    { label: 'Vega', value: greeks.vega.toFixed(3), desc: 'Volatility sensitivity' },
  ];

  return (
    <div className="bg-[#141417] border border-[#262629] rounded-2xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Option Greeks (ATM)</h3>
        <Info className="w-3 h-3 text-gray-600" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item, idx) => (
          <div key={idx} className="bg-[#0a0a0b] p-3 rounded-xl border border-[#262629] group hover:border-blue-500/30 transition-colors">
            <span className="text-[9px] text-gray-500 font-bold uppercase block mb-1">{item.label}</span>
            <span className="text-sm font-mono font-bold text-white block">{item.value}</span>
            <span className="text-[8px] text-gray-600 italic block mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GreeksWidget;

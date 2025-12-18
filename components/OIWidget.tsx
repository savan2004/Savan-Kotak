
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { OIData } from '../types';

interface Props {
  oi: OIData;
}

const OIWidget: React.FC<Props> = ({ oi }) => {
  const data = [
    { name: 'Calls', value: oi.callOI, color: '#f43f5e' },
    { name: 'Puts', value: oi.putOI, color: '#10b981' }
  ];

  return (
    <div className="bg-[#141417] border border-[#262629] rounded-2xl p-4">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">OI Sentiment Analysis</h3>
      
      <div className="grid grid-cols-2 gap-4 items-center">
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#141417', border: '1px solid #262629', borderRadius: '8px', fontSize: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div className="bg-[#0a0a0b] p-3 rounded-xl border border-[#262629]">
            <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">PCR (Put Call Ratio)</span>
            <span className={`text-xl font-mono font-bold ${oi.pcr > 1.2 ? 'text-emerald-500' : oi.pcr < 0.7 ? 'text-rose-500' : 'text-white'}`}>
              {oi.pcr.toFixed(2)}
            </span>
          </div>
          <div className="bg-[#0a0a0b] p-3 rounded-xl border border-[#262629]">
            <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">Max Pain Level</span>
            <span className="text-xl font-mono font-bold text-amber-500">
              {oi.maxPain.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[#262629] grid grid-cols-2 gap-4">
        <div className="text-center">
          <span className="text-[9px] text-rose-500/70 font-bold uppercase block">Call OI (Resistance)</span>
          <span className="text-sm font-mono font-bold text-white">{(oi.callOI / 1000000).toFixed(1)}M</span>
        </div>
        <div className="text-center">
          <span className="text-[9px] text-emerald-500/70 font-bold uppercase block">Put OI (Support)</span>
          <span className="text-sm font-mono font-bold text-white">{(oi.putOI / 1000000).toFixed(1)}M</span>
        </div>
      </div>
    </div>
  );
};

export default OIWidget;

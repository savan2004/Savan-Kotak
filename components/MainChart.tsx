
import React from 'react';
import { 
  XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, ReferenceLine, Area, Line, ComposedChart, Scatter
} from 'recharts';
import { PriceData, CPR, SupportResistance } from '../types';

interface Props {
  data: PriceData[];
  cpr: CPR;
  sr: SupportResistance;
}

const MainChart: React.FC<Props> = ({ data, cpr, sr }) => {
  const formatTooltipValue = (value: number) => value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="h-full w-full bg-[#141417] rounded-3xl border border-[#262629] p-6 flex flex-col shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-5">
        <div className="text-8xl font-black italic tracking-tighter">NIFTY50</div>
      </div>

      <div className="flex items-center justify-between mb-4 z-10">
        <div className="flex items-center gap-6">
          <div>
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Market Sentiment</h3>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-white">BULLISH BIAS</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-[10px] font-black px-2.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 uppercase tracking-wider">Bollinger (20,2)</span>
            <span className="text-[10px] font-black px-2.5 py-1.5 rounded-lg bg-orange-500/10 text-orange-500 border border-orange-500/20 uppercase tracking-wider">CPR DAILY</span>
          </div>
        </div>
        <div className="flex bg-[#0a0a0b] p-1 rounded-xl border border-[#262629]">
          {['1M', '5M', '15M', '1H', '1D'].map(tf => (
            <button key={tf} className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all ${tf === '15M' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-500 hover:text-white'}`}>
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-grow flex flex-col gap-2 min-h-0">
        {/* Main Price Chart with Bollinger Bands */}
        <div className="flex-[3] min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBB" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.03}/>
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.03}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#262629" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis domain={['auto', 'auto']} stroke="#52525b" fontSize={9} tickLine={false} axisLine={false} orientation="right" tickFormatter={(v) => v.toFixed(0)} />
              <Tooltip 
                formatter={formatTooltipValue}
                contentStyle={{ backgroundColor: '#141417', borderColor: '#262629', borderRadius: '16px', fontSize: '12px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)' }}
                itemStyle={{ padding: '2px 0', fontWeight: 'bold' }}
              />
              
              {/* Bollinger Bands Area */}
              <Area type="monotone" dataKey="upperBand" stroke="transparent" fill="url(#colorBB)" fillOpacity={1} />
              <Area type="monotone" dataKey="lowerBand" stroke="transparent" fill="#141417" fillOpacity={1} />
              
              <Line type="monotone" dataKey="upperBand" stroke="#10b981" strokeWidth={1} dot={false} strokeOpacity={0.3} strokeDasharray="3 3" />
              <Line type="monotone" dataKey="lowerBand" stroke="#f43f5e" strokeWidth={1} dot={false} strokeOpacity={0.3} strokeDasharray="3 3" />

              {/* CPR Lines */}
              <ReferenceLine y={cpr.tc} label={{ position: 'left', value: 'TC', fill: '#f97316', fontSize: 9, fontWeight: 'bold' }} stroke="#f97316" strokeDasharray="3 3" strokeOpacity={0.4} />
              <ReferenceLine y={cpr.pivot} label={{ position: 'left', value: 'PIVOT', fill: '#f97316', fontSize: 9, fontWeight: 'bold' }} stroke="#f97316" strokeOpacity={0.6} />
              <ReferenceLine y={cpr.bc} label={{ position: 'left', value: 'BC', fill: '#f97316', fontSize: 9, fontWeight: 'bold' }} stroke="#f97316" strokeDasharray="3 3" strokeOpacity={0.4} />

              <Line type="monotone" dataKey="ma50" stroke="#fbbf24" strokeWidth={1} dot={false} strokeOpacity={0.5} />
              <Line type="monotone" dataKey="ma200" stroke="#a78bfa" strokeWidth={1} dot={false} strokeOpacity={0.5} />
              
              <Area type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPrice)" dot={false} animationDuration={300} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* RSI Sub-Chart */}
        <div className="flex-1 min-h-[100px] border-t border-[#262629] pt-2">
          <div className="flex items-center justify-between mb-1 px-2">
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">RSI (14) Indicator</span>
            <span className="text-[10px] font-mono font-bold text-blue-400">{data[data.length-1]?.rsi}</span>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262629" vertical={false} />
              <XAxis dataKey="time" stroke="#52525b" fontSize={9} tickLine={false} axisLine={false} minTickGap={40} />
              <YAxis domain={[0, 100]} ticks={[30, 70]} stroke="#52525b" fontSize={8} tickLine={false} axisLine={false} orientation="right" />
              <ReferenceLine y={70} stroke="#f43f5e" strokeDasharray="3 3" strokeOpacity={0.3} />
              <ReferenceLine y={30} stroke="#10b981" strokeDasharray="3 3" strokeOpacity={0.3} />
              <Line type="monotone" dataKey="rsi" stroke="#3b82f6" strokeWidth={1.5} dot={false} animationDuration={300} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MainChart;

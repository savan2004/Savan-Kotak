
import React from 'react';
import { Target, ShieldAlert, Zap, ArrowUpCircle, ArrowDownCircle, Coins } from 'lucide-react';
import { TradeSignal, SignalType } from '../types';
import { NIFTY_LOT_SIZE } from '../constants';

interface Props {
  signals: TradeSignal[];
}

const SignalPanel: React.FC<Props> = ({ signals }) => {
  return (
    <div className="bg-[#141417] border border-[#262629] rounded-2xl flex flex-col overflow-hidden">
      <div className="p-4 border-b border-[#262629] flex items-center justify-between">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          ACTIVE SIGNALS (ATM/OTM)
        </h3>
        <span className="text-[10px] text-emerald-500 font-black animate-pulse uppercase tracking-widest">Live Monitoring</span>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-4 max-h-[600px]">
        {signals.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="bg-[#0a0a0b] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 opacity-20" />
            </div>
            <p className="text-xs">No breakout signals detected.<br/>Monitoring MA Crossover & CPR Breakouts.</p>
          </div>
        ) : (
          signals.map(signal => (
            <div key={signal.id} className={`rounded-xl border border-[#262629] overflow-hidden group hover:border-blue-500/50 transition-all ${signal.type === SignalType.BUY ? 'bg-emerald-500/5' : 'bg-rose-500/5'}`}>
              <div className="p-3 border-b border-[#262629] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {signal.type === SignalType.BUY ? (
                    <ArrowUpCircle className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <ArrowDownCircle className="w-5 h-5 text-rose-500" />
                  )}
                  <span className="text-sm font-black text-white">{signal.strike}</span>
                </div>
                <div className="text-[10px] text-gray-500 font-mono">{signal.timestamp}</div>
              </div>

              <div className="p-4 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase">Entry Price</span>
                  <p className="text-lg font-mono font-bold text-white">₹{signal.entry.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase">R:R Ratio</span>
                  <p className="text-lg font-mono font-bold text-blue-400">{signal.riskReward}</p>
                </div>

                <div className="space-y-1 bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                  <div className="flex items-center justify-between text-[9px] text-rose-400 font-bold uppercase mb-1">
                    <span>Stop Loss</span>
                    <ShieldAlert className="w-3 h-3" />
                  </div>
                  <p className="text-md font-mono font-bold text-rose-500">₹{signal.stopLoss.toFixed(2)}</p>
                  <p className="text-[10px] text-rose-400/70 font-medium italic">Max Loss: ₹{((signal.entry - signal.stopLoss) * NIFTY_LOT_SIZE).toLocaleString()}</p>
                </div>

                <div className="space-y-1 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                  <div className="flex items-center justify-between text-[9px] text-emerald-400 font-bold uppercase mb-1">
                    <span>Target</span>
                    <Target className="w-3 h-3" />
                  </div>
                  <p className="text-md font-mono font-bold text-emerald-500">₹{signal.target.toFixed(2)}</p>
                  <p className="text-[10px] text-emerald-400/70 font-medium italic">Profit: ₹{((signal.target - signal.entry) * NIFTY_LOT_SIZE).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="px-4 py-2 bg-[#0a0a0b] flex items-center justify-between border-t border-[#262629]">
                 <span className="text-[9px] text-gray-400 font-bold uppercase">1 Lot = {NIFTY_LOT_SIZE} Qty</span>
                 <button className="flex items-center gap-1 text-[10px] font-black text-blue-500 hover:text-blue-400 uppercase tracking-widest">
                    Execution Guide
                 </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SignalPanel;

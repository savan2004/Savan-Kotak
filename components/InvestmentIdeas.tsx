
import React from 'react';
import { Target, ShieldCheck, ChevronRight, BarChart4, Star } from 'lucide-react';

interface Idea {
  company: string;
  ticker: string;
  rating: string;
  upside: string;
  rationale: string;
}

const InvestmentIdeas: React.FC = () => {
  const mockIdeas: Idea[] = [
    { company: 'HDFC Bank', ticker: 'HDFCBANK', rating: 'ACCUMULATE', upside: '22%', rationale: 'Valuations at 5-year lows, strong credit growth expected.' },
    { company: 'Tata Motors', ticker: 'TATAMOTORS', rating: 'BUY', upside: '18%', rationale: 'Dominance in EV segment and JLR margin expansion.' },
    { company: 'Infosys', ticker: 'INFY', rating: 'HOLD', upside: '8%', rationale: 'Conservative guidance but strong deal pipeline.' },
  ];

  return (
    <div className="bg-[#12141c] border border-[#262b3d] rounded-2xl overflow-hidden">
      <div className="bg-[#1a1d29] px-6 py-4 border-b border-[#262b3d] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Star className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-black text-white uppercase tracking-widest">Strategic Conviction List</h3>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        {mockIdeas.map((idea, idx) => (
          <div key={idx} className="bg-[#0a0b10] border border-[#262b3d] p-4 rounded-xl hover:border-indigo-500/30 transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-sm font-black text-white">{idea.company}</h4>
                <span className="text-[10px] font-mono text-slate-500">{idea.ticker}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 uppercase">
                  {idea.rating}
                </span>
                <p className="text-xs font-black text-emerald-400 mt-1">{idea.upside} Upside</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
              {idea.rationale}
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-[#262b3d]">
               <div className="flex items-center gap-2 text-[9px] font-black text-slate-600 uppercase">
                 <ShieldCheck className="w-3 h-3" />
                 Fundamental Moat: Strong
               </div>
               <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-indigo-500 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentIdeas;

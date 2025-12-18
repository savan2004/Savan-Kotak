
import React, { useRef } from 'react';
import { Target, Zap, Shield, TrendingUp, AlertTriangle, Share2, FileText, Globe, Award, MessageCircle, Download, Printer } from 'lucide-react';
import { ResearchOutput } from '../types';

interface Props {
  data: ResearchOutput;
  query: string;
}

const BottomUpReport: React.FC<Props> = ({ data, query }) => {
  const intel = data.alphaIntel;
  const reportRef = useRef<HTMLDivElement>(null);

  const handleWhatsAppShare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!data || !data.text) return;
    
    const branding = "DISPATCH FROM: SAVAN KOTAK | MASTER TERMINAL AI";
    const disclaimer = "Disclaimer: For institutional research & educational use only. Trading involves high risk.";
    const title = `*MASTER ALPHA REPORT: ${query.toUpperCase()}*`;
    
    // Compression Logic: Strictly limit to 1000 words
    const allWords = data.text.split(/\s+/);
    const wordLimit = 1000;
    const charLimit = 2500; // Extra safety for URL length constraints in browser/app
    
    let compressedText = allWords.slice(0, wordLimit).join(' ');
    
    if (compressedText.length > charLimit) {
      compressedText = compressedText.substring(0, charLimit).trim() + "... [Full Report in PDF]";
    } else if (allWords.length > wordLimit) {
      compressedText += "\n\n... [Read Full Report for deep forensics]";
    }

    const fullMessage = `${title}\n\n${compressedText}\n\n*${branding}*\n_${disclaimer}_`;
    
    // Using api.whatsapp.com with proper encoding for maximum cross-platform support
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullMessage)}`;
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleGeneratePDF = () => {
    window.print();
  };

  if (!intel) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700" id="alpha-report-root">
      {/* Print-Only Header Branding (Savan Kotak) */}
      <div className="print-only print-header">
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '900', textTransform: 'uppercase', margin: 0, padding: 0 }}>SAVAN KOTAK</h1>
          <p style={{ fontSize: '12px', fontWeight: '800', color: '#000', letterSpacing: '4px', marginTop: '2px' }}>MASTER ALPHA TERMINAL</p>
          <p style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>Institutional Equity Research Unit</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>RESEARCH AUDIT: {query.toUpperCase()}</p>
          <p style={{ fontSize: '10px', color: '#666' }}>Date: {new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
          <p style={{ fontSize: '10px', color: '#666' }}>ID: SK-ALPH-NODE-01</p>
        </div>
      </div>

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 no-print">
        <div className="bg-[#12141c] border border-indigo-500/20 p-6 rounded-3xl shadow-xl flex flex-col justify-between">
          <div>
            <Award className="w-8 h-8 text-indigo-500 mb-4" />
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Moat Rating</h4>
            <div className="text-4xl font-black text-white font-mono">{intel.moatScore}%</div>
          </div>
          <p className="text-[9px] text-emerald-400 font-black uppercase tracking-widest mt-4">Wide Economic Barrier</p>
        </div>

        <div className="bg-[#12141c] border border-white/5 p-6 rounded-3xl shadow-xl">
          <AlertTriangle className={`w-8 h-8 mb-4 ${intel.riskRating === 'HIGH' ? 'text-rose-500' : 'text-amber-500'}`} />
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Risk Profile</h4>
          <div className="text-2xl font-black text-white">{intel.riskRating}</div>
          <div className="mt-2 w-full h-1 bg-white/5 rounded-full overflow-hidden">
             <div className="h-full bg-amber-500 w-1/2" />
          </div>
        </div>

        <div className="bg-indigo-600 p-6 rounded-3xl shadow-2xl shadow-indigo-600/20 flex flex-col justify-center items-center text-center">
          <TrendingUp className="w-8 h-8 text-white/50 mb-3" />
          <h4 className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Impact Velocity</h4>
          <div className="text-xl font-black text-white uppercase tracking-tighter">High Potential</div>
        </div>
      </div>

      {/* SWOT Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 no-print">
        <div className="bg-[#12141c] border border-emerald-500/10 p-8 rounded-[2rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
            <Zap className="w-20 h-20 text-emerald-500" />
          </div>
          <h4 className="text-sm font-black text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-3">
            <Zap className="w-4 h-4" /> Strategic Advantages (S)
          </h4>
          <ul className="space-y-3">
            {intel.swot.s.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#12141c] border border-blue-500/10 p-8 rounded-[2rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
            <Target className="w-20 h-20 text-blue-500" />
          </div>
          <h4 className="text-sm font-black text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-3">
            <Target className="w-4 h-4" /> Growth Levers (O)
          </h4>
          <ul className="space-y-3">
            {intel.swot.o.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Report Body */}
      <div ref={reportRef} className="bg-[#0f1117] border border-white/5 p-8 lg:p-12 rounded-[2.5rem] relative shadow-2xl overflow-hidden print:border-none print:shadow-none print:p-0">
        <div className="absolute top-0 right-0 p-8 opacity-5 no-print">
          <FileText className="w-32 h-32 text-indigo-500" />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 border-b border-white/5 pb-8 gap-6 print:border-black print:mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600/10 rounded-2xl border border-indigo-500/20 no-print">
              <TrendingUp className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter print:text-black">Alpha Intelligence Analysis</h2>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] print:text-slate-600">Company Audit: {query.toUpperCase()}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 no-print">
            <button 
              onClick={handleGeneratePDF}
              className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-black rounded-xl text-[10px] font-black transition-all shadow-xl active:scale-95 uppercase tracking-widest border border-slate-200"
            >
              <Printer className="w-4 h-4" />
              Generate PDF
            </button>
            <button 
              onClick={handleWhatsAppShare}
              className="flex items-center gap-3 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[10px] font-black transition-all shadow-xl shadow-emerald-600/20 active:scale-95 uppercase tracking-widest"
            >
              <MessageCircle className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

        <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed font-medium mb-12 print:text-black print:prose-black">
          {data.text.split('\n').map((line, i) => {
            if (line.trim().startsWith('###')) {
              return <h3 key={i} className="text-white font-black uppercase tracking-widest mt-12 mb-6 text-sm border-l-4 border-indigo-600 pl-4 print:text-black print:border-black">{line.replace('###', '').trim()}</h3>;
            }
            if (line.trim() === '') return <br key={i} />;
            return <p key={i} className="mb-4">{line}</p>;
          })}
        </div>

        {/* Dispatch Hub Section (Savan Kotak) */}
        <div className="mt-12 p-8 lg:p-10 bg-black/40 border border-white/5 rounded-3xl flex flex-col items-center gap-6 text-center no-print">
            <div className="w-12 h-12 bg-indigo-600/10 rounded-full flex items-center justify-center border border-indigo-500/20">
               <Zap className="w-6 h-6 text-indigo-400" />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-black text-white uppercase tracking-widest">SAVAN KOTAK DISPATCH HUB</h4>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest max-w-md">Transmit this branded institutional intelligence report directly to your network.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
              <button 
                onClick={handleGeneratePDF}
                className="w-full sm:w-auto flex items-center gap-4 px-10 py-5 bg-white text-black rounded-2xl text-xs font-black transition-all shadow-2xl hover:bg-slate-100 active:scale-95 uppercase tracking-[0.2em] border border-slate-200"
              >
                <Download className="w-5 h-5" />
                Get Branded PDF
              </button>
              <button 
                onClick={handleWhatsAppShare}
                className="w-full sm:w-auto flex items-center gap-4 px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-black transition-all shadow-2xl shadow-emerald-600/30 active:scale-95 uppercase tracking-[0.2em]"
              >
                <MessageCircle className="w-5 h-5" />
                Share via WhatsApp
              </button>
            </div>
        </div>

        {/* Print-Only Footer */}
        <div className="print-only print-footer">
          <p>© {new Date().getFullYear()} SAVAN KOTAK • Institutional Equity Research Terminal • Node SK-ALPHA-01</p>
          <p>Confidential: This document is strictly for intended institutional recipients only.</p>
        </div>

        <div className="mt-16 pt-10 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between no-print">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                 <Globe className="w-4 h-4 text-blue-400" />
                 <span className="text-[10px] font-black text-slate-500 uppercase">Institutional Grounding</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-400">
                 <Shield className="w-4 h-4" />
                 <span className="text-[10px] font-black uppercase">Verified Alpha Node</span>
              </div>
           </div>
           <p className="text-[9px] text-slate-700 font-black uppercase tracking-[0.4em]">SAVAN KOTAK • MASTER EQUITY TERMINAL</p>
        </div>
      </div>
    </div>
  );
};

export default BottomUpReport;

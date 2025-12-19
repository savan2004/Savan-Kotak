
import React, { useState } from 'react';
import { LogIn, Cpu, Globe, ArrowRight, AlertCircle, Lock, UserCircle, Sparkles } from 'lucide-react';
import LogoMCARE from './LogoMCARE';

interface Props {
  onLogin: (userData: { email: string; name: string; mobile: string }) => void;
}

const AuthScreen: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Hardcoded credentials as requested: Login ID "savan", Password "jordar"
    setTimeout(() => {
      if (username === 'savan' && password === 'jordar') {
        onLogin({
          email: 'savan@mcare.alpha',
          name: 'Savan Kotak',
          mobile: 'Institutional'
        });
      } else {
        setError("Invalid Terminal Credentials. Access Denied.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_#3b82f6_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,_#6366f1_0%,_transparent_50%)]"></div>
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #1e293b 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      </div>

      <div className="w-full max-w-lg z-10">
        <div className="bg-[#0f1117]/80 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_-20px_rgba(59,130,246,0.3)]">
          <div className="p-10 text-center">
            <LogoMCARE className="w-24 h-24 mx-auto mb-8 animate-pulse-slow" />
            <h1 className="text-4xl font-black text-white tracking-tighter mb-2 uppercase">MCARE TERMINAL</h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] flex items-center justify-center gap-2">
              <Sparkles className="w-3 h-3 text-blue-400" />
              Institutional Intelligence Uplink
            </p>
          </div>

          <div className="px-10 pb-16">
            <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-8">
                <h2 className="text-white font-bold text-lg mb-2">Secure Access</h2>
                <p className="text-slate-500 text-sm">Enter your master credentials to unlock the terminal.</p>
              </div>

              {error && (
                <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl flex items-center gap-3 text-rose-500 text-xs font-bold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Terminal ID</label>
                  <div className="relative">
                    <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Login ID"
                      className="w-full bg-[#050505] border border-white/5 text-white rounded-2xl py-5 pl-12 pr-4 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all font-mono text-lg"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Security Pwd</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#050505] border border-white/5 text-white rounded-2xl py-5 pl-12 pr-4 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all font-mono text-lg"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-500 transition-all flex items-center justify-center gap-4 group shadow-2xl shadow-blue-600/20"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Unlock Terminal
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="bg-black/40 border-t border-white/5 p-6 flex justify-between items-center text-[10px] font-black text-slate-600 uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <Lock className="w-3 h-3 text-blue-500" />
              MCARE Encrypted
            </span>
            <span className="flex items-center gap-2 text-blue-500">
              <Globe className="w-3 h-3" />
              Node: Mum-1-Safe
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;


import React, { useState, useRef, useEffect, useMemo } from 'react';
import { getGeminiResponse, AIResponseMode } from '../services/gemini';
import { ChatMessage, SystemMetrics } from '../types';

interface AICommandCenterProps {
  metrics?: SystemMetrics;
}

interface Suggestion {
  id: string;
  label: string;
  category: 'DEFENSE' | 'OPTIMIZE' | 'DIAG';
  priority: 'LOW' | 'HIGH';
}

export const AICommandCenter: React.FC<AICommandCenterProps> = ({ metrics }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'CORE INTELLIGENCE INITIALIZED. STANDING BY FOR COMMANDS.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState<AIResponseMode>('FAST');
  const endRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo<Suggestion[]>(() => {
    const pool: Suggestion[] = [
      { id: '1', label: 'Threat Surface Scan', category: 'DEFENSE', priority: 'LOW' },
      { id: '2', label: 'Full Health Audit', category: 'DIAG', priority: 'LOW' }
    ];

    if (!metrics) return pool;

    if (metrics.quantumStability < 99.5) {
      pool.unshift({ id: '3', label: 'Stabilize Quantum Entanglement', category: 'DEFENSE', priority: 'HIGH' });
    }
    if (metrics.cpu > 80 && metrics.network > 60) {
      pool.unshift({ id: '4', label: 'Isolate Ingress Vectors', category: 'DEFENSE', priority: 'HIGH' });
    } else if (metrics.cpu > 70) {
      pool.unshift({ id: '5', label: 'Analyze Resource Consumption', category: 'OPTIMIZE', priority: 'LOW' });
    }

    return pool.slice(0, 3);
  }, [metrics]);

  const handleCommand = async (command: string) => {
    if (!command.trim() || isTyping) return;

    setMessages(prev => [...prev, { role: 'user', text: command }]);
    setIsTyping(true);

    const response = await getGeminiResponse(command, mode);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input;
    setInput('');
    handleCommand(cmd);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="bg-slate-900/40 border border-indigo-500/20 rounded-xl flex flex-col h-full overflow-hidden backdrop-blur-2xl shadow-2xl transition-all">
      {/* Header */}
      <div className="p-5 border-b border-indigo-500/10 bg-indigo-500/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className={`absolute inset-0 blur-md rounded-full animate-pulse ${mode === 'DEEP' ? 'bg-amber-500/40' : 'bg-indigo-500/30'}`} />
            <div className={`relative w-2.5 h-2.5 rounded-full ${mode === 'DEEP' ? 'bg-amber-400 shadow-[0_0_10px_#fbbf24]' : 'bg-indigo-400 shadow-[0_0_10px_#818cf8]'}`} />
          </div>
          <h3 className={`font-orbitron text-[11px] tracking-[0.4em] uppercase font-black ${mode === 'DEEP' ? 'text-amber-300' : 'text-indigo-300'}`}>
            Neural Core {mode === 'DEEP' ? '[DEEP]' : '[FAST]'}
          </h3>
        </div>
        
        <button 
          onClick={() => setMode(prev => prev === 'FAST' ? 'DEEP' : 'FAST')}
          className={`flex items-center gap-2 px-3 py-1.5 border rounded-full transition-all duration-500 group ${
            mode === 'DEEP' 
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' 
              : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20'
          }`}
        >
          <span className="text-[9px] font-black tracking-widest uppercase">{mode} MODE</span>
          <div className={`w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center transition-transform ${mode === 'DEEP' ? 'rotate-180' : ''}`}>
             <div className="w-1 h-1 bg-current rounded-full" />
          </div>
        </button>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-3 duration-500`}>
            <div className={`text-[8px] font-black uppercase tracking-[0.3em] mb-2 opacity-40 ${m.role === 'user' ? 'text-cyan-400' : 'text-indigo-400'}`}>
                {m.role === 'user' ? 'Local_Admin' : 'AI_Synthesizer'}
            </div>
            <div className={`max-w-[95%] p-4 rounded-2xl text-[11px] font-mono border leading-relaxed ${
              m.role === 'user' 
                ? 'bg-slate-800/60 border-cyan-500/20 text-cyan-50 shadow-lg' 
                : 'bg-indigo-950/20 border-indigo-500/20 text-indigo-100 shadow-xl'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex flex-col items-start animate-pulse">
            <div className="text-[8px] font-black uppercase tracking-[0.3em] mb-2 opacity-40 text-indigo-400">Thinking...</div>
            <div className="bg-indigo-950/20 border border-indigo-500/10 p-4 rounded-2xl flex gap-1.5">
               <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
               <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
               <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Suggestions Overlay */}
      <div className="px-5 py-4 border-t border-white/5 bg-slate-950/40">
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s.id}
              onClick={() => handleCommand(s.label)}
              disabled={isTyping}
              className={`text-[9px] font-mono border px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
                s.priority === 'HIGH' 
                ? 'border-rose-500/40 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 hover:border-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.1)]' 
                : 'border-white/10 bg-white/5 text-slate-400 hover:border-indigo-500/50 hover:text-indigo-300'
              } disabled:opacity-20`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${
                s.category === 'DEFENSE' ? 'bg-rose-500' : 'bg-cyan-500'
              }`} />
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-5 bg-slate-950/60 border-t border-white/5">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'DEEP' ? "ANALYZE_TACTICAL_DATA..." : "ENTER_COMMAND..."}
            className={`w-full bg-slate-900/60 border rounded-xl pl-5 pr-14 py-3.5 text-xs placeholder-slate-600 outline-none transition-all font-mono shadow-inner ${
              mode === 'DEEP' 
                ? 'border-amber-500/30 text-amber-200 focus:border-amber-500/60' 
                : 'border-indigo-500/20 text-cyan-100 focus:border-indigo-500/50'
            }`}
          />
          <button 
            type="submit"
            className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
              mode === 'DEEP' ? 'text-amber-400 hover:bg-amber-400/10' : 'text-indigo-400 hover:bg-indigo-400/10'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

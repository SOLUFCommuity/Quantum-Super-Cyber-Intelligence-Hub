
import React, { useState, useEffect } from 'react';
import { CyberTerminal } from './components/CyberTerminal';
import { ThreatMap } from './components/ThreatMap';
import { AICommandCenter } from './components/AICommandCenter';
import { MetricChart } from './components/MetricChart';
import { QuantumEncryptionDiagnostics } from './components/QuantumEncryptionDiagnostics';
import { NetworkWaveform } from './components/NetworkWaveform';
import { Icons } from './constants';
import { SystemMetrics } from './types';

const App: React.FC = () => {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState<SystemMetrics>({
    cpu: 45,
    memory: 62,
    network: 12,
    quantumStability: 99.9,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString();
      const newValue = Math.floor(Math.random() * 40) + 30;
      setMetrics(prev => [...prev.slice(-19), { time, value: newValue }]);
      
      setCurrentMetrics({
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 20) + 60,
        network: Math.floor(Math.random() * 80) + 10,
        quantumStability: 99.8 + Math.random() * 0.2,
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col p-4 gap-4 overflow-hidden relative">
      {/* Decorative corners */}
      <div className="absolute top-2 left-2 w-16 h-16 border-t-2 border-l-2 border-cyan-500/40 pointer-events-none rounded-tl-xl z-50" />
      <div className="absolute top-2 right-2 w-16 h-16 border-t-2 border-r-2 border-cyan-500/40 pointer-events-none rounded-tr-xl z-50" />
      <div className="absolute bottom-2 left-2 w-16 h-16 border-b-2 border-l-2 border-cyan-500/40 pointer-events-none rounded-bl-xl z-50" />
      <div className="absolute bottom-2 right-2 w-16 h-16 border-b-2 border-r-2 border-cyan-500/40 pointer-events-none rounded-br-xl z-50" />

      {/* Header */}
      <header className="flex items-center justify-between border border-cyan-500/20 py-4 px-6 bg-slate-900/40 backdrop-blur-2xl rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-5">
          <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <Icons.Shield />
          </div>
          <div>
            <h1 className="font-orbitron font-black text-3xl tracking-tighter leading-none text-cyan-50 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              QUANTUM-SUPER
            </h1>
            <p className="text-[9px] text-cyan-400/60 tracking-[0.5em] uppercase font-bold mt-1.5 ml-1">
              Intelligence Operations Hub v8.6
            </p>
          </div>
        </div>

        <div className="flex gap-10 items-center font-mono">
          <div className="text-right">
            <div className="text-[9px] text-slate-500 tracking-[0.2em] mb-0.5">STABILITY_ARRAY</div>
            <div className="text-2xl font-orbitron text-cyan-100 glow-cyan leading-none">
              {currentMetrics.quantumStability.toFixed(3)}<span className="text-xs opacity-50">%</span>
            </div>
          </div>
          
          <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 px-5 py-2 rounded-full text-[10px] font-bold tracking-widest text-emerald-400">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
              MESH_GRID: OPTIMAL
            </div>
            <div className="flex items-center gap-3 bg-indigo-500/10 border border-indigo-500/30 px-5 py-2 rounded-full text-[10px] font-bold tracking-widest text-indigo-400">
              <span className="w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_8px_#6366f1]" />
              NEURAL_LINK: ACTIVE
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        
        {/* Left Column: Telemetry & Monitoring */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 min-h-0">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/40 border border-cyan-500/10 p-4 rounded-xl backdrop-blur-md group hover:border-cyan-500/30 transition-all">
              <div className="text-[9px] text-slate-500 mb-1 tracking-widest uppercase">CPU_CORE_LOAD</div>
              <div className="text-3xl font-orbitron text-cyan-50">{currentMetrics.cpu}<span className="text-xs opacity-30">%</span></div>
              <div className="w-full h-1 bg-slate-800 mt-3 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 shadow-[0_0_10px_#22d3ee]" style={{ width: `${currentMetrics.cpu}%`, transition: 'width 1s ease-in-out' }} />
              </div>
            </div>
            <div className="bg-slate-900/40 border border-cyan-500/10 p-4 rounded-xl backdrop-blur-md group hover:border-indigo-500/30 transition-all">
              <div className="text-[9px] text-slate-500 mb-1 tracking-widest uppercase">NEURAL_ALLOC</div>
              <div className="text-3xl font-orbitron text-indigo-100">{currentMetrics.memory}<span className="text-xs opacity-30">%</span></div>
              <div className="w-full h-1 bg-slate-800 mt-3 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 shadow-[0_0_10px_#6366f1]" style={{ width: `${currentMetrics.memory}%`, transition: 'width 1s ease-in-out' }} />
              </div>
            </div>
          </div>
          
          <NetworkWaveform />
          <MetricChart title="Packet Analysis (p/s)" data={metrics} color="#22d3ee" />
          
          <div className="flex-1 min-h-0">
            <CyberTerminal />
          </div>
        </div>

        {/* Center Column: Global Topology & Diagnostics */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-4 min-h-0 overflow-y-auto pr-1 custom-scrollbar">
          <ThreatMap />
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="bg-slate-900/40 border border-indigo-500/20 rounded-xl p-5 relative overflow-hidden group min-h-[380px] backdrop-blur-md shadow-lg">
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-5 border-b border-indigo-500/10 pb-3">
                  <div>
                    <h2 className="text-xs font-orbitron font-bold uppercase tracking-[0.3em] text-indigo-300">Node Status Matrix</h2>
                    <p className="text-[8px] text-slate-500 tracking-tighter mt-1 uppercase">Phase_Heuristic_Cluster_v0.9</p>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
                    <div className="w-1.5 h-1.5 bg-cyan-500/40 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-cyan-500/20 rounded-full" />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className={`aspect-square rounded-md border flex flex-col items-center justify-center gap-1 transition-all duration-500 ${
                      Math.random() > 0.94 ? 'bg-rose-500/15 border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.1)]' : 'bg-slate-800/30 border-slate-700/50 hover:border-cyan-500/30'
                    }`}>
                      <div className="text-[6px] opacity-40 font-mono">{i.toString(16).padStart(2, '0').toUpperCase()}</div>
                      <div className={`w-1.5 h-1.5 rounded-full ${Math.random() > 0.1 ? 'bg-cyan-400 shadow-[0_0_5px_#22d3ee] animate-pulse' : 'bg-slate-700'}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="min-h-[380px]">
              <QuantumEncryptionDiagnostics />
            </div>
          </div>
          
          <div className="bg-slate-900/60 border border-indigo-500/10 p-4 rounded-xl flex justify-around items-center font-mono text-[10px] tracking-tight backdrop-blur-sm">
             <div className="flex items-center gap-3"><span className="text-slate-500 font-bold uppercase">Legacy Bridge:</span> <span className="text-amber-500/80">bridge.php v1.0</span></div>
             <div className="h-4 w-[1px] bg-slate-800" />
             <div className="flex items-center gap-3"><span className="text-slate-500 font-bold uppercase">Logic Kernel:</span> <span className="text-indigo-400">pattern_analysis.py</span></div>
             <div className="h-4 w-[1px] bg-slate-800" />
             <div className="flex items-center gap-3"><span className="text-slate-500 font-bold uppercase">Runtime:</span> <span className="text-cyan-400/80">IBM_QISKIT_ENGINE</span></div>
          </div>
        </div>

        {/* Right Column: AI Core */}
        <div className="col-span-12 lg:col-span-3 min-h-0">
          <AICommandCenter metrics={currentMetrics} />
        </div>
      </main>

      {/* Footer */}
      <footer className="h-10 flex items-center justify-between px-8 bg-slate-900/60 border border-cyan-500/10 rounded-xl text-[9px] font-mono tracking-[0.2em] text-slate-500 shadow-2xl backdrop-blur-md">
        <div className="flex gap-10 uppercase items-center">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_5px_#22d3ee]" />
            REGION: SUB_SECTOR_7G
          </div>
          <div className="flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_5px_#6366f1]" />
             UPTIME: 1,422:12:44
          </div>
          <div className="flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_5px_#f43f5e]" />
             ERRORS: 0.00%
          </div>
        </div>
        <div className="flex gap-6 items-center">
          <span className="text-cyan-400/80 uppercase font-black tracking-[0.4em]">Quantum_Kernel_Sync_Stable</span>
          <div className="flex gap-1.5 h-4 items-end">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="w-1 bg-cyan-500/40 rounded-t-sm animate-pulse" style={{ height: `${20 + Math.random() * 80}%`, animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

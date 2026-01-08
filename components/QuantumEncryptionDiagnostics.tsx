
import React, { useState, useEffect, useMemo } from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { QuantumDiagnostics, VulnerabilityDetail, ScriptMetadata } from '../types';
import { Icons } from '../constants';

const INTEGRITY_THRESHOLD = 98.0;
const DECAY_THRESHOLD = 0.15;

const THREAT_DATABASE: Omit<VulnerabilityDetail, 'timestamp'>[] = [
  { 
    name: "Quantum Tunneling Leak", 
    severity: "HIGH",
    impact: "Non-classical data egress detected. Potential private key fragment leakage across secondary relays. 12% entropy drain observed.", 
    origin: "Sector 7G: Node-0xFF21 [Secure Gateway]",
    mitigation: "Protocol_77: FLUSH_TUNNEL_CAVITY"
  },
  { 
    name: "Superposition Collapse", 
    severity: "CRITICAL",
    impact: "Total destruction of entangled qubit pairs. Primary neural mesh link coherence dropping at 4.2%/s. Imminent blackout.", 
    origin: "Core Grid: Thermal-Relay-A4 [Cryo Anomaly]",
    mitigation: "Protocol_01: RESONATE_PHASE_ARRAY"
  },
  { 
    name: "Entanglement Hijack", 
    severity: "CRITICAL",
    impact: "Unauthorized observer detected in Bell-state pairs. Man-in-the-middle cryptographic risk confirmed on sub-channel 4.", 
    origin: "Edge Router: 0xAF [Spoofed_ID_V4]",
    mitigation: "Protocol_X: SEVER_PARITY_LINK"
  },
  { 
    name: "Phase Shift Injection", 
    severity: "MEDIUM",
    impact: "Malicious phase noise insertion. 15% packet drop rate observed. Signal-to-noise ratio compromised.", 
    origin: "Network Ingress: Sub-sector 4A [Broadband Relay]",
    mitigation: "Protocol_12: ACTIVE_NOISE_SQUELCH"
  },
  { 
    name: "Bell State Violation", 
    severity: "HIGH",
    impact: "Local realism verified on secure link. Quantum non-locality properties negated. Entropy pool integrity at 12%.", 
    origin: "Void Relay: unknown-origin-09 [External Interference]",
    mitigation: "Protocol_09: REGEN_ENTROPY_POOL"
  }
];

const INITIAL_SCRIPTS: ScriptMetadata[] = [
  {
    id: 'legacy-bridge',
    filename: 'bridge.php',
    language: 'PHP',
    status: 'IDLE',
    content: `<?php
// Neural Mesh Bridge Protocol
header('Content-Type: application/json');

$entropy = bin2hex(random_bytes(16));
echo json_encode([
    'status' => 'CONNECTED',
    'seed' => $entropy,
    'integrity' => 'PASSED'
]);
?>`
  },
  {
    id: 'quantum-engine',
    filename: 'pattern_analysis.py',
    language: 'PYTHON',
    status: 'IDLE',
    content: `import qiskit as q
from qiskit_ibm_runtime import QiskitRuntimeService

circuit = q.QuantumCircuit(2, 2)
circuit.h(0)
circuit.cx(0, 1)
circuit.measure([0,1], [0,1])

job = q.execute(circuit, backend='simulator', shots=1024)
print(f"Intelligence Pattern Results: {job.result()}")`
  }
];

export const QuantumEncryptionDiagnostics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'DIAG' | 'SCRIPTS'>('DIAG');
  const [diagData, setDiagData] = useState<any[]>([]);
  const [isRotating, setIsRotating] = useState(false);
  const [rotationProgress, setRotationProgress] = useState(0);
  const [scripts, setScripts] = useState<ScriptMetadata[]>(INITIAL_SCRIPTS);
  const [latestThreat, setLatestThreat] = useState<VulnerabilityDetail | null>(null);
  
  const [current, setCurrent] = useState<QuantumDiagnostics>({
    keyStrength: 8192,
    entanglementDecay: 0.042,
    noiseLevel: 0.08,
    activeVulnerabilities: ["Coherence Drift", "Phase Shift Noise"],
    integrityScore: 99.85
  });

  useEffect(() => {
    if (isRotating) return;
    const interval = setInterval(() => {
      const decayVal = parseFloat((Math.random() * 0.1).toFixed(3));
      const integrityVal = parseFloat((98.5 + Math.random() * 1.5).toFixed(2));
      setDiagData(prev => [...prev.slice(-20), { time: Date.now(), value: decayVal }]);
      
      setCurrent(prev => ({
        ...prev,
        entanglementDecay: decayVal,
        integrityScore: integrityVal,
        noiseLevel: parseFloat((0.02 + Math.random() * 0.1).toFixed(3)),
      }));
    }, 1200);
    return () => clearInterval(interval);
  }, [isRotating]);

  const initiateKeyRotation = () => {
    if (isRotating) return;
    setIsRotating(true);
    setRotationProgress(0);
    setLatestThreat(null);

    const duration = 2500;
    const intervalTime = 50;
    const totalSteps = duration / intervalTime;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      setRotationProgress((step / totalSteps) * 100);
      setDiagData(prev => [...prev.slice(-20), { time: Date.now(), value: Math.random() }]);

      if (step >= totalSteps) {
        clearInterval(interval);
        setIsRotating(false);
        setCurrent(prev => ({
          ...prev,
          entanglementDecay: 0.001,
          noiseLevel: 0.002,
          integrityScore: 100.00,
          activeVulnerabilities: ["COHERENCE_STABILIZED"]
        }));
      }
    }, intervalTime);
  };

  const simulateVulnerability = () => {
    if (isRotating) return;
    const threatIdx = Math.floor(Math.random() * THREAT_DATABASE.length);
    const threat = THREAT_DATABASE[threatIdx];
    const detailedThreat: VulnerabilityDetail = {
      ...threat,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setLatestThreat(detailedThreat);
    setCurrent(prev => ({
      ...prev,
      integrityScore: parseFloat((detailedThreat.severity === 'CRITICAL' ? 92 + Math.random() * 2 : 95 + Math.random() * 2).toFixed(2)),
      entanglementDecay: parseFloat((detailedThreat.severity === 'CRITICAL' ? 0.2 + Math.random() * 0.1 : 0.12 + Math.random() * 0.05).toFixed(3)),
      activeVulnerabilities: [detailedThreat.name, ...prev.activeVulnerabilities.filter(v => typeof v === 'string')].slice(0, 4)
    }));
  };

  const executeScript = (id: string) => {
    setScripts(prev => prev.map(s => s.id === id ? { ...s, status: 'RUNNING' } : s));
    setTimeout(() => {
      setScripts(prev => prev.map(s => s.id === id ? { ...s, status: 'SUCCESS' } : s));
      setTimeout(() => setScripts(prev => prev.map(s => s.id === id ? { ...s, status: 'IDLE' } : s)), 3000);
    }, 1000);
  };

  const getSeverityStyles = (severity?: string) => {
    switch(severity) {
      case 'CRITICAL': return 'bg-rose-500/10 border-rose-500 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)] animate-pulse';
      case 'HIGH': return 'bg-amber-500/10 border-amber-500 text-amber-500 shadow-[0_0_10px_rgba(251,191,36,0.2)]';
      default: return 'bg-cyan-500/10 border-cyan-500 text-cyan-400';
    }
  };

  return (
    <div className={`transition-all duration-500 rounded-xl flex flex-col h-full backdrop-blur-xl border relative overflow-hidden group/main ${
      isRotating ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_30px_rgba(34,211,238,0.2)]' : 
      latestThreat?.severity === 'CRITICAL' ? 'border-rose-500 bg-rose-950/10' :
      current.integrityScore < 98.0 ? 'animate-cyber-flash border-rose-500' : 'bg-slate-900/40 border-indigo-500/20 shadow-xl'
    }`}>
      
      {/* Tabs */}
      <div className="flex bg-slate-950/40 border-b border-indigo-500/10 p-1">
        <button 
          onClick={() => setActiveTab('DIAG')}
          className={`flex-1 py-3 text-[10px] font-orbitron tracking-[0.2em] uppercase transition-all rounded-lg flex items-center justify-center gap-2 ${activeTab === 'DIAG' ? 'text-cyan-400 bg-cyan-500/10 shadow-[inset_0_0_10px_rgba(34,211,238,0.1)]' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${activeTab === 'DIAG' ? 'bg-cyan-400' : 'bg-transparent'}`} />
          Telemetry
        </button>
        <button 
          onClick={() => setActiveTab('SCRIPTS')}
          className={`flex-1 py-3 text-[10px] font-orbitron tracking-[0.2em] uppercase transition-all rounded-lg flex items-center justify-center gap-2 ${activeTab === 'SCRIPTS' ? 'text-indigo-400 bg-indigo-500/10 shadow-[inset_0_0_10px_rgba(99,102,241,0.1)]' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${activeTab === 'SCRIPTS' ? 'bg-indigo-400' : 'bg-transparent'}`} />
          Scripts
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col min-h-0 relative">
        {activeTab === 'DIAG' ? (
          <>
            {/* DISRUPTION OVERLAY */}
            {isRotating && (
              <div className="absolute inset-0 z-50 bg-slate-950/95 flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
                <div className="relative">
                   <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full animate-ping" />
                   <div className="w-16 h-16 border-b-2 border-cyan-400 rounded-full animate-spin flex items-center justify-center">
                      <div className="w-10 h-10 border-t-2 border-indigo-400 rounded-full animate-spin" style={{ animationDirection: 'reverse' }} />
                   </div>
                </div>
                <div className="text-cyan-100 font-orbitron text-[11px] tracking-[0.6em] mt-8 mb-5 font-black uppercase glow-cyan">
                  RE_KEYING_PHASE
                </div>
                <div className="w-full max-w-[220px] h-1.5 bg-slate-800 rounded-full overflow-hidden border border-cyan-500/10">
                    <div className="h-full bg-cyan-400 shadow-[0_0_15px_#22d3ee] transition-all duration-75" style={{ width: `${rotationProgress}%` }} />
                </div>
                <div className="text-[9px] font-mono text-cyan-500/50 mt-4 tracking-widest uppercase">Syncing Entropy Streams...</div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 flex-1 min-h-0">
               {/* Top Stats */}
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 group hover:border-cyan-500/30 transition-all">
                     <div className="text-[9px] text-slate-500 uppercase mb-2 tracking-widest font-bold">Key Depth</div>
                     <div className="text-2xl font-orbitron text-cyan-50 leading-none">
                       {current.keyStrength}<span className="text-[10px] opacity-40 ml-1">Qubits</span>
                     </div>
                  </div>
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 group hover:border-indigo-500/30 transition-all">
                     <div className="text-[9px] text-slate-500 uppercase mb-2 tracking-widest font-bold">Integrity</div>
                     <div className={`text-2xl font-orbitron leading-none ${current.integrityScore < 98 ? 'text-rose-400' : 'text-emerald-400'}`}>
                       {current.integrityScore.toFixed(2)}<span className="text-[10px] opacity-40 ml-1">%</span>
                     </div>
                  </div>
               </div>

               {/* FORENSIC THREAT HUD */}
               <div className={`border p-4 rounded-xl min-h-[140px] transition-all duration-500 overflow-hidden relative ${
                 latestThreat ? 'bg-slate-950/60 border-current shadow-inner' : 'bg-black/20 border-white/5'
               }`} style={{ color: latestThreat?.severity === 'CRITICAL' ? '#f43f5e' : latestThreat?.severity === 'HIGH' ? '#fbbf24' : '#22d3ee' }}>
                  
                  <div className="text-[8px] uppercase mb-3 flex justify-between items-center tracking-[0.2em] font-black opacity-60">
                    <span className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      Forensic_Threat_Analysis
                    </span>
                    {latestThreat && <span className="animate-pulse">Vector_Detected_0x{Math.floor(Math.random()*999)}</span>}
                  </div>

                  {latestThreat ? (
                    <div className="animate-in slide-in-from-right-2 duration-300 space-y-3">
                      <div className="flex justify-between items-start border-b border-current/20 pb-2">
                        <div className="flex flex-col">
                           <div className="text-[11px] font-black font-orbitron uppercase tracking-tighter">
                             {latestThreat.name}
                           </div>
                           <div className="text-[7px] font-mono opacity-50 tracking-widest uppercase mt-0.5">Vector_Origin: {latestThreat.origin}</div>
                        </div>
                        <div className={`px-2 py-0.5 rounded text-[8px] font-black border uppercase ${getSeverityStyles(latestThreat.severity)}`}>
                          {latestThreat.severity}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        <div className="bg-black/40 p-2 rounded border border-white/5">
                           <div className="text-[7px] font-black uppercase mb-1 opacity-50 tracking-widest">Potential_System_Impact:</div>
                           <p className="text-[9px] text-slate-300 leading-tight italic font-mono">{latestThreat.impact}</p>
                        </div>
                        
                        <div className="flex justify-between items-center px-1">
                           <div className="flex flex-col">
                              <span className="text-[7px] font-black uppercase opacity-50">Active_Protocol:</span>
                              <span className="text-[9px] font-mono font-bold tracking-tighter text-current uppercase">{latestThreat.mitigation}</span>
                           </div>
                           <div className="text-[7px] font-mono opacity-40 text-right uppercase">
                             Log_Ref: {latestThreat.timestamp}<br/>
                             Parity: Passed
                           </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-2 opacity-30">
                      <div className="text-[9px] font-mono tracking-widest uppercase">Scanner_Passive: No_External_Breaches</div>
                      <div className="flex gap-1.5">
                        <div className="w-1 h-3 bg-cyan-500/20" />
                        <div className="w-1 h-3 bg-cyan-500/40" />
                        <div className="w-1 h-3 bg-cyan-500/60" />
                      </div>
                    </div>
                  )}
               </div>

               {/* Chart View */}
               <div className="flex-1 min-h-0 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Waveform Stability Heuristics</div>
                    <div className="text-[10px] font-mono text-cyan-400/80">{current.entanglementDecay.toFixed(3)}% Drift</div>
                  </div>
                  <div className="flex-1 bg-black/30 rounded-xl border border-white/5 p-3 overflow-hidden relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={diagData}>
                        <defs>
                           <linearGradient id="decayGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={current.integrityScore < 98 ? "#f43f5e" : "#22d3ee"} stopOpacity={0.2}/>
                              <stop offset="95%" stopColor={current.integrityScore < 98 ? "#f43f5e" : "#22d3ee"} stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <YAxis domain={[0, 0.25]} hide />
                        <Area 
                          type="stepAfter" 
                          dataKey="value" 
                          stroke={current.integrityScore < 98 ? "#f43f5e" : "#22d3ee"} 
                          strokeWidth={1.5} 
                          fill="url(#decayGrad)" 
                          isAnimationActive={false} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(34,211,238,0.03)_40px,rgba(34,211,238,0.03)_41px)] pointer-events-none" />
                  </div>
               </div>

               {/* Actions */}
               <div className="flex gap-3">
                 <button
                    onClick={initiateKeyRotation}
                    disabled={isRotating}
                    className={`flex-1 border font-orbitron text-[10px] py-4 rounded-xl uppercase tracking-[0.3em] transition-all relative overflow-hidden group/btn ${
                      isRotating 
                        ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 cursor-wait' 
                        : 'bg-slate-950 border-cyan-500/20 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10 shadow-lg'
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 font-black">
                      <Icons.Shield />
                      {isRotating ? 'Synchronizing...' : 'Rotate Key'}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                  </button>

                  <button
                    onClick={simulateVulnerability}
                    disabled={isRotating}
                    className="px-6 border border-rose-500/30 text-rose-500 bg-slate-950/40 font-orbitron text-[9px] rounded-xl uppercase tracking-tighter hover:bg-rose-500/10 hover:border-rose-500 transition-all flex items-center justify-center font-black"
                    title="Simulate Cyber Attack"
                  >
                    Inject Threat
                  </button>
               </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col h-full gap-5 min-h-0">
            <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2">
              {scripts.map(script => (
                <div key={script.id} className="bg-slate-950/60 border border-indigo-500/10 rounded-xl p-4 flex flex-col gap-4 group hover:border-indigo-500/30 transition-all">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-md text-[9px] font-black border tracking-widest ${script.language === 'PHP' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'}`}>
                        {script.language}
                      </span>
                      <span className="text-[11px] font-mono text-slate-200 font-bold">{script.filename}</span>
                    </div>
                    <button 
                      onClick={() => executeScript(script.id)}
                      disabled={script.status === 'RUNNING'}
                      className={`px-3 py-1 rounded-full text-[9px] font-mono border transition-all uppercase tracking-tighter ${
                        script.status === 'RUNNING' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400 animate-pulse' :
                        script.status === 'SUCCESS' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' :
                        'border-white/10 text-slate-500 hover:text-slate-200 hover:border-white/30'
                      }`}
                    >
                      {script.status === 'RUNNING' ? 'Busy...' : script.status === 'SUCCESS' ? 'Success' : 'Compile'}
                    </button>
                  </div>
                  <pre className="text-[10px] font-mono text-slate-400 leading-relaxed overflow-x-auto p-3 bg-black/40 rounded-lg border border-white/5">
                    <code>{script.content}</code>
                  </pre>
                  {script.status === 'SUCCESS' && (
                    <div className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 p-3 border border-emerald-500/20 rounded-lg animate-in slide-in-from-bottom-2">
                      <span className="opacity-50 mr-2">&gt;</span> PROCESS_FINALIZE: PATTERN_SYNC COMPLETE.
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-[9px] font-mono text-slate-600 text-center uppercase tracking-widest italic opacity-60">
              * Kernel modules operating in sandboxed environment *
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

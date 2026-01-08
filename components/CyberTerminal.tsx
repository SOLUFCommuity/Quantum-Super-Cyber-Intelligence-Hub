
import React, { useState, useEffect, useRef } from 'react';
import { LogEntry } from '../types';

const MOCK_LOG_MESSAGES = [
  "Quantum entanglement established on node-7",
  "Intrusion attempt detected: Sub-sector 4A",
  "Heuristic scanner: 99.9% clean",
  "Packet inspection complete: 0.002ms latency",
  "Neural firewall updated to version 8.4.1",
  "Memory overflow mitigated in sandbox cluster",
  "Unauthorized decryption attempt blocked - IP: 192.168.1.104",
  "Satellite link synchronized at 4.2 Tbps",
  "Core temperature stabilized at 0.1 Kelvin",
];

export const CyberTerminal: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initialLog: LogEntry = {
      id: 'boot',
      timestamp: new Date().toLocaleTimeString(),
      message: "QUANTUM-SUPER OS v8.6.4 INITIALIZED. SECURE_SHELL ACTIVE.",
      type: 'SYSTEM',
    };
    setLogs([initialLog]);

    const interval = setInterval(() => {
      const newLog: LogEntry = {
        id: Math.random().toString(36),
        timestamp: new Date().toLocaleTimeString(),
        message: MOCK_LOG_MESSAGES[Math.floor(Math.random() * MOCK_LOG_MESSAGES.length)],
        type: Math.random() > 0.85 ? 'WARNING' : 'INFO',
      };
      setLogs(prev => [...prev.slice(-100), newLog]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (message: string, type: LogEntry['type'] = 'INFO') => {
    const newLog: LogEntry = {
      id: Math.random().toString(36),
      timestamp: new Date().toLocaleTimeString(),
      message,
      type,
    };
    setLogs(prev => [...prev.slice(-100), newLog]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = Math.min(historyIndex + 1, history.length - 1);
        setHistoryIndex(newIndex);
        setInputValue(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue('');
      }
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputValue.trim();
    if (!command) return;

    addLog(`admin@quantum-super:~$ ${command}`, 'SYSTEM');
    
    // Manage history
    setHistory(prev => [...prev, command].slice(-50));
    setHistoryIndex(-1);
    setInputValue('');

    const cmd = command.toLowerCase();

    // Mock Command Logic
    setTimeout(() => {
      switch (cmd) {
        case 'help':
          addLog("AVAILABLE_PROTOCOLS:");
          addLog("  HELP          - Display this assistance manual");
          addLog("  CLEAR         - Flush terminal buffer");
          addLog("  STATUS        - Query kernel health and uptime");
          addLog("  SCAN          - Execute heuristic sub-sector analysis");
          addLog("  NEURAL_SYNC   - Re-align neural mesh parity");
          addLog("  DIAG          - Run deep quantum diagnostics");
          addLog("  WHOAMI        - Query current authorized identity");
          addLog("  VERSION       - Display system build metadata");
          break;
        case 'clear':
          setLogs([]);
          break;
        case 'status':
          addLog("STATE: [OPTIMAL]");
          addLog("CPU_TEMP: 0.1K");
          addLog("NEURAL_LOAD: 24.5%");
          addLog("UPTIME: 1,422:12:44");
          break;
        case 'scan':
          addLog("INITIATING_HEURISTIC_SCAN...", 'INFO');
          let progress = 0;
          const scanInt = setInterval(() => {
            progress += 25;
            if (progress <= 100) {
              addLog(`SCANNING... ${progress}%`, 'INFO');
            } else {
              clearInterval(scanInt);
              addLog("SCAN_COMPLETE: 0 THREATS DETECTED IN PRIMARY VECTORS.", 'INFO');
            }
          }, 400);
          break;
        case 'diag':
          addLog("RUNNING_QUANTUM_DIAGNOSTICS...", 'WARNING');
          setTimeout(() => {
            addLog("PARITY_CHECK: [PASSED]", 'INFO');
            addLog("ENTROPY_POOL: [STABLE]", 'INFO');
            addLog("COHERENCE: 99.982%", 'INFO');
          }, 800);
          break;
        case 'neural_sync':
          addLog("SYNCHRONIZING_NEURAL_MESH...", 'WARNING');
          setTimeout(() => addLog("NEURAL_SYNC_COMPLETE: PARITY RE-ESTABLISHED.", 'INFO'), 1500);
          break;
        case 'whoami':
          addLog("IDENTITY: Level 4 Security Administrator");
          addLog("CLEARANCE: ALPHA-NINE");
          break;
        case 'version':
          addLog("QUANTUM-SUPER OS v8.6.4-LTS (Cyber-Noir Edition)");
          addLog("KERNEL: 5.15.0-Q-EXTENDED");
          break;
        case 'echo':
          addLog("ECHO: usage 'echo [string]'");
          break;
        default:
          if (cmd.startsWith('echo ')) {
            addLog(command.substring(5));
          } else {
            addLog(`COMMAND_ERROR: Unknown protocol "${cmd.toUpperCase()}". Type 'help' for available commands.`, 'ERROR');
          }
          break;
      }
    }, 100);
  };

  return (
    <div 
      className="bg-slate-950/80 border border-cyan-500/30 rounded-xl p-4 font-mono text-[11px] h-full flex flex-col backdrop-blur-xl shadow-[inset_0_0_20px_rgba(34,211,238,0.05)] relative overflow-hidden group"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Header */}
      <div className="flex justify-between items-center mb-3 border-b border-cyan-500/10 pb-2 shrink-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          <span className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-[10px]">Secure_Shell_Terminal</span>
        </div>
        <div className="flex gap-4">
          <span className="text-slate-600 text-[9px] uppercase tracking-widest">TTY_01</span>
          <span className="text-slate-600 text-[9px] uppercase tracking-widest font-bold">admin@quantum-super</span>
        </div>
      </div>
      
      {/* Log Feed */}
      <div ref={scrollRef} className="overflow-y-auto flex-1 space-y-1.5 mb-3 custom-scrollbar pr-2 z-10">
        {logs.length === 0 && (
          <div className="text-slate-700 italic opacity-50">Terminal buffer flushed. Awaiting input...</div>
        )}
        {logs.map(log => (
          <div key={log.id} className="flex gap-3 animate-in fade-in duration-200">
            <span className="text-slate-600 shrink-0 select-none">[{log.timestamp}]</span>
            <span className={`break-all leading-relaxed ${
              log.type === 'WARNING' ? 'text-amber-400/90' : 
              log.type === 'ERROR' ? 'text-rose-500/90' : 
              log.type === 'SYSTEM' ? 'text-indigo-400 font-bold tracking-tight' :
              'text-cyan-400/70'
            }`}>
              {log.message}
            </span>
          </div>
        ))}
      </div>

      {/* Command Input Area */}
      <form onSubmit={handleCommand} className="flex gap-2 border-t border-cyan-500/10 pt-3 shrink-0 relative z-10">
        <span className="text-cyan-500 font-bold shrink-0 select-none animate-pulse">$</span>
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            placeholder="Execute protocol..."
            className="bg-transparent border-none outline-none text-cyan-50 w-full placeholder-cyan-900/40 caret-transparent"
            autoFocus
          />
          {/* Custom Block Cursor */}
          <div 
            className="absolute top-0 h-4 w-2.5 bg-cyan-400/80 transition-all pointer-events-none animate-[pulse_0.8s_infinite]"
            style={{ 
              left: `${inputValue.length * 6.6}px`, // Fixed width approximation for JetBrains Mono
              display: inputRef.current === document.activeElement ? 'block' : 'none'
            }}
          />
        </div>
      </form>

      {/* CRT Scanline Overlay specifically for terminal */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-0 bg-[length:100%_2px,3px_100%]" />
    </div>
  );
};

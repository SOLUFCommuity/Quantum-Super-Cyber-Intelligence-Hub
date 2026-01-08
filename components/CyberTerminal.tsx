
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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog: LogEntry = {
        id: Math.random().toString(36),
        timestamp: new Date().toLocaleTimeString(),
        message: MOCK_LOG_MESSAGES[Math.floor(Math.random() * MOCK_LOG_MESSAGES.length)],
        type: Math.random() > 0.8 ? 'WARNING' : 'INFO',
      };
      setLogs(prev => [...prev.slice(-40), newLog]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-4 font-mono text-xs h-full flex flex-col backdrop-blur-md">
      <div className="flex justify-between items-center mb-2 border-b border-cyan-500/20 pb-1">
        <span className="text-cyan-300 font-bold uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          System Logs
        </span>
        <span className="text-slate-500">Live_Stream_v4.2</span>
      </div>
      <div ref={scrollRef} className="overflow-y-auto flex-1 space-y-1">
        {logs.map(log => (
          <div key={log.id} className="flex gap-2">
            <span className="text-slate-500 whitespace-nowrap">[{log.timestamp}]</span>
            <span className={log.type === 'WARNING' ? 'text-amber-400' : 'text-cyan-400/80'}>
              {log.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

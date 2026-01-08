
import React, { useEffect, useRef } from 'react';

export const NetworkWaveform: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const render = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // Draw background lines
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let i = 0; i < height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }

      // Wave parameters
      const centerY = height / 2;
      const amplitude = 30;
      const frequency = 0.02;

      // Draw three layers of waves
      const drawWave = (color: string, speed: number, alpha: number, scale: number) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 2;

        for (let x = 0; x < width; x++) {
          const y = centerY + Math.sin(x * frequency + offset * speed) * amplitude * scale * Math.sin(offset * 0.5);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;
      };

      drawWave('#22d3ee', 2, 0.8, 1);     // Primary Cyan
      drawWave('#818cf8', 1.5, 0.4, 0.7); // Secondary Indigo
      drawWave('#f43f5e', 3, 0.2, 0.4);   // Alert Rose (subtle noise)

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;

      // Add center baseline
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.2)';
      ctx.setLineDash([5, 5]);
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();
      ctx.setLineDash([]);

      offset += 0.05;
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="bg-slate-950/40 border border-cyan-500/20 rounded-lg p-3 h-32 flex flex-col relative overflow-hidden group">
      <div className="flex justify-between items-center mb-1 z-10">
        <h4 className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
          Neural_Pulse_Stream
        </h4>
        <span className="text-[8px] text-slate-500 font-mono">FREQ: 4.29 GHz</span>
      </div>
      <div className="flex-1 relative">
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={80} 
          className="w-full h-full opacity-80"
        />
        <div className="absolute top-0 left-0 text-[8px] font-mono text-cyan-500/40 p-1 pointer-events-none">
          L7_TRAFFIC_MONITOR
        </div>
      </div>
      <div className="absolute bottom-1 right-2 text-[8px] font-mono text-slate-600 flex gap-3">
        <span>RX: 1.2 GB/S</span>
        <span>TX: 0.8 GB/S</span>
      </div>
    </div>
  );
};

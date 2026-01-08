
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MetricChartProps {
  title: string;
  data: any[];
  color: string;
}

export const MetricChart: React.FC<MetricChartProps> = ({ title, data, color }) => {
  return (
    <div className="bg-slate-900/40 border border-cyan-500/20 p-4 rounded-lg h-64 flex flex-col">
      <h4 className="text-xs uppercase tracking-widest text-slate-400 mb-4">{title}</h4>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" hide />
            <YAxis domain={[0, 100]} hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: `1px solid ${color}`, borderRadius: '4px' }}
              itemStyle={{ color: color }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              fillOpacity={1} 
              fill={`url(#grad-${title})`} 
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

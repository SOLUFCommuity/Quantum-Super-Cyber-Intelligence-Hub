
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const ThreatMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 400;
    
    svg.selectAll("*").remove();

    // Create a background grid pattern
    const nodes = d3.range(30).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 4 + 2,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      threat: Math.random() > 0.8,
    }));

    const links: any[] = [];
    nodes.forEach((n, i) => {
      nodes.slice(i + 1).forEach(m => {
        if (Math.hypot(n.x - m.x, n.y - m.y) < 100) {
          links.push({ source: n, target: m });
        }
      });
    });

    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).distance(100).strength(0.01))
      .force("charge", d3.forceManyBody().strength(-20))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", () => {
        linkSelection
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

        nodeSelection
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
      });

    const linkSelection = svg.append("g")
      .attr("stroke", "#22d3ee")
      .attr("stroke-opacity", 0.2)
      .selectAll("line")
      .data(links)
      .join("line");

    const nodeSelection = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", d => d.r)
      .attr("fill", d => d.threat ? "#f43f5e" : "#22d3ee")
      .attr("filter", "drop-shadow(0 0 5px currentColor)");

    // Animation for "scanning"
    const scanner = svg.append("line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("stroke", "#22d3ee")
      .attr("stroke-width", 2)
      .attr("stroke-opacity", 0.5);

    function scan() {
      scanner
        .attr("y1", 0)
        .attr("y2", 0)
        .transition()
        .duration(4000)
        .ease(d3.easeLinear)
        .attr("y1", height)
        .attr("y2", height)
        .transition()
        .duration(4000)
        .ease(d3.easeLinear)
        .attr("y1", 0)
        .attr("y2", 0)
        .on("end", scan);
    }
    scan();

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] bg-slate-900/40 border border-cyan-500/20 rounded-lg overflow-hidden group">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-cyan-400 font-orbitron text-sm tracking-widest uppercase flex items-center gap-2">
          <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
          Neural Threat Topology
        </h3>
        <p className="text-[10px] text-slate-500">Global Intrusion Vectors - 1:1 Scale</p>
      </div>
      <svg ref={svgRef} className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />
    </div>
  );
};

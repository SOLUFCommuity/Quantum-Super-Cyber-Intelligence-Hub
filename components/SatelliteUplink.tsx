
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const SatelliteUplink: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 400;
    const height = 400;
    const svg = d3.select(svgRef.current)
      .attr('viewBox', [0, 0, width, height]);

    svg.selectAll('*').remove();

    const projection = d3.geoOrthographic()
      .scale(180)
      .translate([width / 2, height / 2])
      .clipAngle(90);

    const path = d3.geoPath(projection);

    const globe = svg.append('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', 180)
      .attr('fill', 'rgba(15, 23, 42, 0.6)')
      .attr('stroke', 'rgba(34, 211, 238, 0.2)')
      .attr('stroke-width', 1);

    const graticule = d3.geoGraticule()();
    svg.append('path')
      .datum(graticule)
      .attr('class', 'graticule')
      .attr('d', path as any)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(34, 211, 238, 0.1)')
      .attr('stroke-width', 0.5);

    // Create random "Satellite Intercept" points
    const points = Array.from({ length: 12 }).map(() => ({
      coords: [(Math.random() - 0.5) * 360, (Math.random() - 0.5) * 180],
      pulse: Math.random()
    }));

    const pointsGroup = svg.append('g');

    d3.timer((elapsed) => {
      projection.rotate([elapsed * 0.01, -15]);
      svg.select('.graticule').attr('d', path as any);
      
      const dots = pointsGroup.selectAll('circle')
        .data(points);

      dots.enter().append('circle')
        .merge(dots as any)
        .attr('r', d => 2 + Math.sin(elapsed * 0.005 + d.pulse * 10) * 1.5)
        .attr('fill', '#22d3ee')
        .attr('cx', d => projection(d.coords as any)?.[0] || -100)
        .attr('cy', d => projection(d.coords as any)?.[1] || -100)
        .attr('opacity', d => {
          const visible = path({ type: 'Point', coordinates: d.coords } as any);
          return visible ? 1 : 0;
        });
    });

  }, []);

  return (
    <div className="bg-slate-900/40 border border-cyan-500/10 rounded-xl p-5 relative overflow-hidden group h-full backdrop-blur-md">
      <div className="absolute top-4 left-5 z-10">
        <h4 className="text-[10px] font-orbitron font-bold text-cyan-400 uppercase tracking-[0.3em]">Orbital_Intercept_Matrix</h4>
        <p className="text-[8px] text-slate-500 mt-1 uppercase">SAT_ARRAY: ALPHA_TANGO_9</p>
      </div>
      <div className="flex items-center justify-center h-full">
        <svg ref={svgRef} className="w-full h-full max-w-[300px]" />
      </div>
      <div className="absolute bottom-4 right-5 text-[8px] font-mono text-cyan-500/40 flex flex-col items-end uppercase">
        <span>Sync: 99.9%</span>
        <span>Pos: 37.7 N, 122.4 W</span>
      </div>
    </div>
  );
};

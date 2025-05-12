import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// constants
import { Data } from '../constant';

interface IProps {
  width?: number;
  height?: number;
}

export const PieChart = ({ width = 300, height = 300 }: IProps) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie<{ label: string; value: number }>().value(d => d.value);

    const arc = d3
      .arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .innerRadius(radius / 2)
      .outerRadius(radius);

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arcs = g.selectAll('arc').data(pie(Data)).enter().append('g');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i.toString()));

    arcs
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .text(d => d.data.label);
  }, [Data]);

  return <svg ref={ref} width={width} height={height}></svg>;
};

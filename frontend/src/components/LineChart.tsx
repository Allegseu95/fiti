import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// constants
import { Data } from '../constant';

interface IProps {
  width?: number;
  height?: number;
}

export const LineChart = ({ width = 400, height = 300 }: IProps) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const x = d3
      .scaleLinear()
      .domain(d3.extent(Data, d => d.x) as [number, number])
      .range([0, innerWidth]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(Data, d => d.y)!])
      .nice()
      .range([innerHeight, 0]);

    const line = d3
      .line<{ x: number; y: number }>()
      .x(d => x(d.x))
      .y(d => y(d.y));

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g').call(d3.axisLeft(y));
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    g.append('path')
      .datum(Data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);
  }, [Data]);

  return <svg ref={ref} width={width} height={height}></svg>;
};

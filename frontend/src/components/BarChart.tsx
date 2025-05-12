import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// constants
import { Data } from '../constant';

interface IProps {
  width?: number;
  height?: number;
}

export const BarChart = ({ width = 400, height = 300 }: IProps) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const x = d3
      .scaleBand()
      .domain(Data.map(d => d.label))
      .range([0, innerWidth])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(Data, d => d.value)!])
      .nice()
      .range([innerHeight, 0]);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g').call(d3.axisLeft(y));

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    g.selectAll('rect')
      .data(Data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.label)!)
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => innerHeight - y(d.value))
      .attr('fill', 'steelblue');
  }, [Data]);

  return <svg ref={ref} width={width} height={height}></svg>;
};

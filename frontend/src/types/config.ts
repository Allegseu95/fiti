import type { IconType } from 'react-icons';

export interface IChartConfig {
  type: ChartTypes;
}

export enum ChartTypes {
  bar = 'bar',
  line = 'line',
  pie = 'pie',
}

export interface IChartType {
  value: ChartTypes;
  label: string;
  icon: IconType;
}

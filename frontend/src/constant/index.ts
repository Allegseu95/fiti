// icons
import { MdBarChart, MdShowChart, MdPieChart } from 'react-icons/md';

// types
import { type IChartType, ChartTypes } from '../types/config';

export const ChartTypesList: IChartType[] = [
  { value: ChartTypes.bar, label: 'Bar Chart', icon: MdBarChart },
  { value: ChartTypes.line, label: 'Line Chart', icon: MdShowChart },
  { value: ChartTypes.pie, label: 'Pie Chart', icon: MdPieChart },
];

export const Data = [
  { label: 'A', value: 100 },
  { label: 'B', value: 200 },
  { label: 'C', value: 300 },
  { label: 'D', value: 400 },
];

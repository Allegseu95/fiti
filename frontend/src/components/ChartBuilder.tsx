// store
import { useConfig } from '../store/useConfig';

// components
import { BarChart } from '../components/BarChart';
import { LineChart } from '../components/LineChart';
import { PieChart } from '../components/PieChart';
import { NoChart } from '../components/NoChart';

// types
import { ChartTypes } from '../types/config';

const ChartComponentsMap: { [key in ChartTypes]: React.FC<any> } = {
  [ChartTypes.bar]: BarChart,
  [ChartTypes.line]: LineChart,
  [ChartTypes.pie]: PieChart,
};

export const ChartBuilder = () => {
  const { config } = useConfig();

  if (!config) return null;

  const ChartComponent = ChartComponentsMap[config.type] ?? NoChart;

  return (
    <div className="border-2 border-red-700">
      <ChartComponent />
    </div>
  );
};

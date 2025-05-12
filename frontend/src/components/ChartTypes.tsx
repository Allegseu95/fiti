// store
import { useConfig } from '../store/useConfig';

// constants
import { ChartTypesList } from '../constant';

// types
import type { IChartType } from '../types/config';

export const ChartTypes = () => {
  const { config, setConfig } = useConfig();

  return (
    <div className="grid grid-cols-4 gap-5">
      {ChartTypesList.map((type: IChartType, index: number) => {
        return (
          <div
            key={index}
            className={`rounded-2xl p-2 cursor-pointer text-center flex flex-col items-center gap-2 hover:opacity-70 transition-opacity duration-200 ${
              type.value === config?.type ? 'bg-cyan-600' : 'bg-white'
            }`}
            onClick={() => setConfig({ type: type.value })}
          >
            <type.icon
              className={`text-3xl ${
                type.value === config?.type ? 'text-white' : 'text-cyan-600'
              }`}
            />
            <p
              className={`font-semibold ${
                type.value === config?.type ? 'text-white' : 'text-gray-700'
              }`}
            >{`${type.label}`}</p>
          </div>
        );
      })}
    </div>
  );
};

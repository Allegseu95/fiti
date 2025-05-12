// components
import { ConfigChart } from './components/ConfigChart';
import { ChartBuilder } from './components/ChartBuilder';

export const App = () => {
  return (
    <main className="flex flex-col">
      <h1 className="font-bold text-3xl text-center my-5">
        FITI - Chart Builder
      </h1>

      <section className="flex gap-10 px-10">
        <ConfigChart />

        <ChartBuilder />
      </section>
    </main>
  );
};

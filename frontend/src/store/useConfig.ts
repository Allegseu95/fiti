import { create } from 'zustand';

// types
import type { IChartConfig } from '../types/config';

interface IConfigStore {
  config: IChartConfig | null;
  setConfig: (val: any) => void;
}

export const useConfig = create<IConfigStore>((set, get) => ({
  config: null,
  setConfig: (val: any) => set({ config: { ...get().config, ...val } }),
}));

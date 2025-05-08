import { create } from 'zustand';

interface IHover {
  label: string;
  switchLabel: (newValue: string) => void
}

export const useHover = create<IHover>()((set) => ({
    label: '',
    switchLabel: (nextHover) => set({ label: nextHover }),
}))
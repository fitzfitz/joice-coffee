import { create } from "zustand";
import { Action, State } from "./types";

const initialFilter: State = {
  isFirstLaunched: true,
};

const useAppStore = create<State & Action>()((set) => ({
  ...initialFilter,
  setIsFirstLaunched: (value) => set({ isFirstLaunched: value }),
}));

export default useAppStore;

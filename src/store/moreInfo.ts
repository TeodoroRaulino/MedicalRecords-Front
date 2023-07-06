import { create } from "zustand";

type State = {
  isOpen: boolean;
  id?: number;
  openAndSetId: (id?: number) => void;
  close: () => void;
};

const INITIAL_STATE = {
  isOpen: false,
  id: undefined,
};

export const useMoreInfoStore = create<State>((set, get) => ({
  ...INITIAL_STATE,
  close: () => set(() => INITIAL_STATE),
  openAndSetId: (id) => set(() => ({ isOpen: true, id })),
}));

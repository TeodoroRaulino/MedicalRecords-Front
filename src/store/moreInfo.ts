import { create } from "zustand";

type State = {
  isOpen: boolean;
  id?: number;
  openAndSetId: (id?: number) => void;
  close: () => void;
};

const initialState = {
  isOpen: false,
  id: undefined,
};

export const useMoreInfoStore = create<State>((set, get) => ({
  ...initialState,
  close: () => set(() => initialState),
  openAndSetId: (id) => set(() => ({ isOpen: true, id })),
}));

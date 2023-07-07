import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Sidebar = {
  sidebarIsOpen: boolean;
  setSidebarIsOpen: (payload: boolean) => void;
};

const initialState = {
  sidebarIsOpen: true,
  setSidebarIsOpen: () => {},
};

export const useSidebarStore = create<Sidebar>()(
  persist(
    (set) => ({
      ...initialState,
      setSidebarIsOpen: (payload) => {
        set({ sidebarIsOpen: payload });
      },
    }),
    {
      name: "sidebar-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

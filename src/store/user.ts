import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  name: string;
  role: string;
};

type State = {
  user: User;
  setProfile: (payload: User) => void;
};

const initialState = {
  user: {
    name: "",
    role: "",
  },
  setProfile: () => {},
};

export const userStore = create<State>()(
  persist(
    (set) => ({
      ...initialState,
      setProfile: (payload) => {
        set({ user: payload });
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

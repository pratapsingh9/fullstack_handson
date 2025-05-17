import { create } from "zustand";

type TellingItem = {
  id: number;
  temps: string;
};

type TellingStore = {
  tellingStore: TellingItem[];
  pushedThem: (id: number, temps: string) => void;
  popCurrentItem: () => void;
  searchById: (id: number) => TellingItem | undefined;
};

export const useTellingStore = create<TellingStore>((set, get) => ({
  tellingStore: [],

  pushedThem: (id, temps) =>
    set((state) => ({
      tellingStore: [...state.tellingStore, { id, temps }],
    })),
  popCurrentItem: () => {
    set((state) => ({
      tellingStore: state.tellingStore.slice(0, -1),
    }));
  },
  searchById: (id: Number) => {
    const state = get();
    return state.tellingStore.find((item) => item.id == id);
  },
  // popCurrentItem:   () =>
  //   set((state) => ({
  //     tellingStore: state.tellingStore.slice(0, -1),
  //   })),
}));

interface BearState {
  bears: number;
  increase: () => void;
  reset: () => void;
}

export const useUserStore = create((set) => ({
  users: 0,
  increase: () =>
    set((state: any) => ({
      users: state.users + 1,
    })),
  decrease: () =>
    set((state: any) => ({
      users: state.users - 1,
    })),
}));

export const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
  reset: () => set({ bears: 0 }),
  decrease: () =>
    set((state) => ({
      bears: state.bears - 1,
    })),
}));

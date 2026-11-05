import { create } from 'zustand';

type NavigationState = {
  history: string[];
  push: (path: string) => void;
  replace: (path: string) => void;
  goBack: () => string | null;
};

export const useNavigationStore = create<NavigationState>((set, get) => ({
  history: [],

  push: (path) =>
    set((state) => {
      const last = state.history.at(-1);

      if (last === path) return state;

      return {
        history: [...state.history, path],
      };
    }),

  replace: (path) =>
    set((state) => ({
      history:
        state.history.length ? [...state.history.slice(0, -1), path] : [path],
    })),

  goBack: () => {
    const history = get().history;

    if (history.length <= 1) return null;

    const previousPath = history[history.length - 2];

    set({
      history: history.slice(0, -1),
    });

    return previousPath;
  },
}));

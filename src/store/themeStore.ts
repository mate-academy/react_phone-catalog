import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      theme: 'light',

      toggleTheme: () =>
        set(state => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';

          document.documentElement.setAttribute('data-theme', newTheme);

          return { theme: newTheme };
        }),

      setTheme: newTheme => {
        document.documentElement.setAttribute('data-theme', newTheme);
        set({ theme: newTheme });
      },
    }),
    {
      name: 'theme-storage',

      onRehydrateStorage: () => state => {
        if (state) {
          document.documentElement.setAttribute('data-theme', state.theme);
        }
      },
    },
  ),
);

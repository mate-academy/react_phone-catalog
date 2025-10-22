import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'blue' | 'green' | 'red'; // Приклади тем

interface ThemeState {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      currentTheme: 'light', // Тема за замовчуванням
      setTheme: theme => {
        set({ currentTheme: theme });
      },
    }),
    {
      name: 'theme-store-cache',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useThemeStore;

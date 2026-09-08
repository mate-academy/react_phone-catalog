import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Theme = 'orange' | 'dark' | 'blue' | 'purple' | 'black';

interface ThemeState {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      currentTheme: 'orange', // Тема за замовчуванням
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

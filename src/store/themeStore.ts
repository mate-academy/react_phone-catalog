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
      // Початковий стан
      theme: 'light',

      // Функція для перемикання (Toggle)
      toggleTheme: () =>
        set(state => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          // Оновлюємо атрибут на рівні <html> для CSS-змінних

          document.documentElement.setAttribute('data-theme', newTheme);

          return { theme: newTheme };
        }),

      // Функція для встановлення конкретної теми
      setTheme: newTheme => {
        document.documentElement.setAttribute('data-theme', newTheme);
        set({ theme: newTheme });
      },
    }),
    {
      name: 'theme-storage', // Ключ у localStorage
      // Виконуємо синхронізацію з DOM при ініціалізації (rehydrate)
      onRehydrateStorage: () => state => {
        if (state) {
          document.documentElement.setAttribute('data-theme', state.theme);
        }
      },
    },
  ),
);

import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

const getCurrentTheme = (): 'light' | 'dark' => {
  try {
    const theme = localStorage.getItem('theme');
    return theme ? JSON.parse(theme) : 'light';
  } catch {
    return 'light';
  }
};

export const useThemeState = create<ThemeState>((set) => ({
  theme: getCurrentTheme(),
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', JSON.stringify(newTheme));
      return { theme: newTheme };
    }),
}));

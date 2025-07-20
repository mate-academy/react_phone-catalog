import { create } from 'zustand';

interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (newTheme: 'light' | 'dark') => void;
}

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('data-theme');
    return storedTheme === 'light' || storedTheme === 'dark' ?
        storedTheme
      : 'dark';
  }
  return 'dark';
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: getInitialTheme(),
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        localStorage.setItem('data-theme', newTheme);
      }
      return { theme: newTheme };
    }),
  setTheme: (newTheme) =>
    set(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('data-theme', newTheme);
      }
      return { theme: newTheme };
    }),
}));

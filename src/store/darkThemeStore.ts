import { create } from 'zustand';

interface DarkThemeStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const useDarkThemeStore = create<DarkThemeStore>(set => {
  const initialTheme =
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light';

  document.querySelector('body')?.setAttribute('data-theme', initialTheme);

  return {
    theme: initialTheme,
    toggleTheme: () => {
      set(state => {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';

        document.querySelector('body')?.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        return { theme: newTheme };
      });
    },
  };
});

export default useDarkThemeStore;

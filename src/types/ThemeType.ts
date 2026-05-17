export type Theme = 'light' | 'dark';

export type ThemeContextProps = {
  theme: Theme;
  isChecked: boolean;
  isThemeLoaded: boolean;
  toggleTheme: () => void;
};

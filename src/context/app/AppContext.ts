import { createContext } from 'react';

export type Theme = 'light' | 'dark';

type AppContextType = {
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  theme: Theme;
  toggleTheme: () => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

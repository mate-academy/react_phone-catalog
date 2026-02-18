import { createContext } from 'react';

interface MenuContextType {
  isMenuOpen: boolean;
  closeMenu: () => void;
  toggleMenu: () => void;
}

const defaultMenuContext: MenuContextType = {
  isMenuOpen: false,
  closeMenu: () => {},
  toggleMenu: () => {},
};

export const MenuContext = createContext(defaultMenuContext);

import { createContext } from 'react';

interface MenuContextType {
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

const defaultMenuContext: MenuContextType = {
  isMenuOpen: false,
  openMenu: () => {},
  closeMenu: () => {},
};

export const MenuContext = createContext(defaultMenuContext);

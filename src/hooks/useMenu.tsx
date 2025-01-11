import React, { useCallback, useContext, useState } from 'react';

interface MenuContextType {
  isOpen: boolean;
  closeMenu: () => void;
  openMenu: () => void;
}

const defaultContextValue: MenuContextType = {
  isOpen: false,
  closeMenu: () => {},
  openMenu: () => {},
};

const MenuContext = React.createContext<MenuContextType>(defaultContextValue);

type Props = {
  children: React.ReactNode;
};

export const MenuProvider: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openMenu = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <MenuContext.Provider value={{ isOpen, closeMenu, openMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const menuContext = useContext(MenuContext);

  return menuContext;
};

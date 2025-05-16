import React, { useCallback, useContext, useState } from 'react';

interface MenuContextType {
  isOpen: boolean;
  closeMenu: () => void;
  openMenu: () => void;
}

type Props = {
  children: React.ReactNode;
};

const MenuContext = React.createContext<MenuContextType>({
  isOpen: false,
  closeMenu: () => {},
  openMenu: () => {},
});

export const MenuProvider = ({ children }: Props) => {
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

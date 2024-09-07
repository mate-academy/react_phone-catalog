import React, { createContext, useContext, useState } from 'react';

interface MenuContextType {
  isOpen: boolean;
  toggleMenu: () => void;
}

type Props = {
  children: React.ReactNode;
};

export const MenuContext = createContext<MenuContextType | undefined>(
  undefined,
);

export const MenuProvider: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MenuContext.Provider value={{ isOpen, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext);

  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }

  return context;
};

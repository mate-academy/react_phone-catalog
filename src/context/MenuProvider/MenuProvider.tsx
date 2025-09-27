import React, { createContext, useState } from 'react';

interface ToggleMenu {
  isVisibleMenu: boolean;
  setIsVisibleMenu: (value: boolean) => void;
}

export const MenuContext = createContext<ToggleMenu>({
  isVisibleMenu: false,
  setIsVisibleMenu: () => {},
});

interface MenuProviderProps {
  children: React.ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);

  if (isVisibleMenu) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }

  return (
    <MenuContext.Provider value={{ isVisibleMenu, setIsVisibleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

import React, { createContext, useState, useEffect, useMemo } from 'react';

interface MenuContextType {
  isVisibleMenu: boolean;
  setIsVisibleMenu: (value: boolean) => void;
}

export const MenuContext = createContext<MenuContextType>({
  isVisibleMenu: false,
  setIsVisibleMenu: () => {},
});

interface MenuProviderProps {
  children: React.ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);

  useEffect(() => {
    if (isVisibleMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisibleMenu]);

  const contextValue = useMemo(
    () => ({
      isVisibleMenu,
      setIsVisibleMenu,
    }),
    [isVisibleMenu],
  );

  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  );
};

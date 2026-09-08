import React, { ReactNode, useContext, useMemo, useState } from 'react';

type MenuContextType = {
  isOpen: boolean | undefined;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// eslint-disable-next-line prettier/prettier
export const MenuContext = React.createContext<MenuContextType | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export const MenuProvider: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      setIsOpen,
    }),
    [isOpen, setIsOpen],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export const useMenu = () => {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }

  return context;
};

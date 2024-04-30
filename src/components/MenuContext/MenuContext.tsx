import React, { createContext, useState, useContext } from 'react';

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuContext = createContext<Props | undefined>(undefined);

export const useMenuContext = () => {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error();
  }

  return context;
};

export const MenuProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const value = { isMenuOpen, setIsMenuOpen };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

import { createContext, useContext, useState } from 'react';

export const MenuContext = createContext({
  isMenuOpen: false,
  toggleMenu: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const useMenu = () => useContext(MenuContext);

export const MenuProvider: React.FC<Props> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <MenuContext.Provider value={{ isMenuOpen, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

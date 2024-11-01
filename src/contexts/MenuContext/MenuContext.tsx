import { createContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type MenuContextType = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

export const MenuContext = createContext<MenuContextType>({
  isMenuOpen: false,
  toggleMenu: () => {},
});

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

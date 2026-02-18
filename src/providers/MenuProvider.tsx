import { FC, ReactNode, useCallback, useState } from 'react';
import { MenuContext } from '../contexts/MenuContext';

type Props = {
  children: ReactNode;
};

export const MenuProvider: FC<Props> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, [setIsMenuOpen]);
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prevState => !prevState);
  }, [setIsMenuOpen]);

  return (
    <MenuContext.Provider value={{ isMenuOpen, closeMenu, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

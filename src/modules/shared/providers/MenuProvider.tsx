import { FC, ReactNode, useCallback, useState } from 'react';
import { MenuContext } from '../contexts/MenuContext';

type Props = {
  children: ReactNode;
};

export const MenuProvider: FC<Props> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, [setIsMenuOpen]);
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, [setIsMenuOpen]);

  return (
    <MenuContext.Provider value={{ isMenuOpen, openMenu, closeMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

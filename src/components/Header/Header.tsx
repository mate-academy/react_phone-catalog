import React, { useState } from 'react';
import { Menu } from '../Menu/Menu';
import { HeaderNavigation } from '../HeaderNavigation';
import style from './Header.module.scss';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={style.header}>
      <HeaderNavigation onOpenMobileMenu={openMenu} />
      <Menu isOpen={isMenuOpen} onClose={closeMenu} />
    </header>
  );
};

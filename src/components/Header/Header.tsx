import React, { useState } from 'react';
import './Header.scss';
import { Menu } from '../Menu';
import { Logo } from '../Logo';
import { Favourites } from '../Favourites';
import { ShoppingBag } from '../ShoppingBag';
import { BurgerMenu } from '../BurgerMenu';
import { MenuMobile } from '../MenuMobile';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header_container">
        <nav className="header__nav">
          <Logo />
          <Menu />
        </nav>
        <div className="header__shopping">
          <Favourites />
          <ShoppingBag />
        </div>

        <BurgerMenu
          handleOpen={handleMenuOpen}
          handleClose={handleMenuClose}
          isOpen={isMenuOpen}
        />
      </div>
      {isMenuOpen && <MenuMobile />}
    </header>
  );
};

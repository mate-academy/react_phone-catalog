import { useState } from 'react';
import { Favourites } from '../Favourites/Favourites';
import { Logo } from '../Logo/Logo';
import { Menu } from '../Menu/Menu';
import { ShopingBag } from '../ShopingBag/ShopingBag';

import './Header.scss';
import { MenuMobile } from '../MenuMobile/MenuMobile';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';

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
          <ShopingBag />
        </div>

        <BurgerMenu
          handleMenuOpen={handleMenuOpen}
          handleMenuClose={handleMenuClose}
          isMenuOpen={isMenuOpen}
        />
      </div>
      {isMenuOpen && <MenuMobile onClose={handleMenuClose} />}
    </header>
  );
};

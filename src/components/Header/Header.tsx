import { Logo } from '../Logo';
import { Navigation } from '../Navigation/Navigation';
import { NavSearch } from '../NavSearch/NavSearch';
import './Header.scss';
// import { Toggler } from '../Elements/Toggler/Toggler';
import { PurchaseNavButtons } from '../Elements/PurchaseNavButtons';
import { HamburgerMenu } from '../Elements/MenuButton';
import { useState } from 'react';
import { MobileMenu } from '../MobileMenu';
import { useLocation } from 'react-router-dom';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isProductsPage =
    location.pathname.includes('phones') ||
    location.pathname.includes('tablets') ||
    location.pathname.includes('accessories');

  return (
    <header className="header">
      <div className="header__left">
        <Logo />
        <Navigation />
      </div>

      {isProductsPage && <NavSearch />}

      <div className="header__right">
        {/* <Toggler /> */}
        <PurchaseNavButtons className="header__buttons" />
        <HamburgerMenu handleOpen={() => setIsMenuOpen(true)} />
      </div>
      <MobileMenu
        isOpen={isMenuOpen}
        handleClose={() => setIsMenuOpen(false)}
      />
    </header>
  );
};

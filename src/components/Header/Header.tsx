import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Nav } from '../Nav';
import { Logo } from '../Logo';
import { HeaderButton } from '../HeaderButton';
import { Search } from '../Search';
import { Menu } from '../Menu';

import { HeaderButtonIcon } from '../../types/HeaderButtonIcon';

import { IsMenuActiveContext } from '../../contexts/IsMenuActiveContext';
import {
  HandleIsMenuActiveContext,
} from '../../contexts/HandleIsMenuActiveContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('body-overflow');
    } else {
      document.body.classList.remove('body-overflow');
    }
  }, [isMenuOpen]);

  const location = useLocation();

  const isCartPage = location.pathname === '/cart';

  return (
    <header className="header">
      <HandleIsMenuActiveContext.Provider value={setIsMenuOpen}>
        <div className="header__nav-container">
          <IsMenuActiveContext.Provider value={isMenuOpen}>
            <Menu />
          </IsMenuActiveContext.Provider>

          <Logo />

          {!isCartPage && (
            <Nav />
          )}
        </div>

        <div className="header__button-container">
          <Search />

          {!isCartPage && (
            <HeaderButton type={HeaderButtonIcon.Favourites} />
          )}

          <HeaderButton type={HeaderButtonIcon.Cart} />
        </div>
      </HandleIsMenuActiveContext.Provider>
    </header>
  );
};

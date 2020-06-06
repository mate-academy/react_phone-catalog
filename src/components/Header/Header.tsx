import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Logo } from '../Logo/Logo';
import { Nav } from './Nav';
import { Favorites } from './Favorites';
import { Cart } from './Cart';
import { Search } from './Search';
import { LOCATIONS } from '../../common/constants';
import { useRouter } from '../_hooks/useRouter';
import { Sandwich } from './Sandwich';

export const Header = () => {
  const [isNavOpen, setOpen] = useState(false);
  const { location } = useRouter();
  const path = location.pathname;

  const handleNavOpen = useCallback(() => {
    document.body.classList.toggle('nav-open');

    setOpen(!isNavOpen);
  }, [isNavOpen]);

  useEffect(() => {
    document.body.classList.remove('nav-open');

    setOpen(false);
  }, [location.pathname]);


  const searchInputIsHidden = useMemo(() => (
    (path === LOCATIONS.phones)
    || (path === LOCATIONS.tablets)
    || (path === LOCATIONS.favorites)
  ), [path]);

  return (
    <header className="header">
      <div className="header__flex-wrap">
        <div className="header__sandwich">
          <Sandwich
            isNavOpen={isNavOpen}
            handleNavOpen={handleNavOpen}
          />
        </div>
        <div className="header__logo">
          <Logo />
        </div>
        <div className="header__nav">
          <Nav
            isNavOpen={isNavOpen}
          />
        </div>
      </div>
      <div className="header__flex-wrap">
        {searchInputIsHidden && (
          <Search />
        )}
        <Favorites
          isNavOpen={isNavOpen}
        />
        <Cart
          isNavOpen={isNavOpen}
        />
      </div>
    </header>
  );
};

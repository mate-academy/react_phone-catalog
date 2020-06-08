import React, { useCallback, useMemo, useState } from 'react';

import { Logo } from '../Logo/Logo';
import { Nav } from './Nav';
import { Favorites } from './Favorites';
import { Cart } from './Cart/Cart';
import { Search } from './Search';
import { LOCATIONS } from '../../common/constants';
import { useRouter } from '../_hooks/useRouter';
import { Sandwich } from './Sandwich';

export const Header = () => {
  const [isNavOpen, setOpen] = useState(false);
  const { location } = useRouter();
  const path = location.pathname;

  const toggleSandwich = useCallback(() => {
    document.body.classList.toggle('nav-open');

    setOpen(!isNavOpen);
  }, [isNavOpen]);

  const closeNavMenu = useCallback(
    () => {
      document.body.classList.remove('nav-open');
      setOpen(false);
    },
    []
  );

  const searchInputIsHidden = useMemo(() => (
    (path === LOCATIONS.phones)
    || (path === LOCATIONS.tablets)
    || (path === LOCATIONS.favorites)
  ), [path]);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__flex-wrap">
          <div className="header__sandwich">
            <Sandwich
              isNavOpen={isNavOpen}
              toggleSandwich={toggleSandwich}
            />
          </div>
          <div className="header__logo">
            <Logo />
          </div>
          <div className="header__nav">
            <Nav
              isNavOpen={isNavOpen}
              closeNavMenu={closeNavMenu}
            />
          </div>
        </div>
        <div className="header__flex-wrap">
          {searchInputIsHidden && (
            <Search />
          )}
          <Favorites
            isNavOpen={isNavOpen}
            closeNavMenu={closeNavMenu}
          />
          <Cart
            isNavOpen={isNavOpen}
            closeNavMenu={closeNavMenu}
          />
        </div>
      </div>
    </header>
  );
};

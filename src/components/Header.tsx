/* eslint-disable import/no-cycle */
import { useLocation } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
import {
  Nav,
  TopActions,
  Logo,
  Search,
} from './index';

import { categories } from '../utils/listsNames';

export const Header = memo(() => {
  const { pathname } = useLocation();
  const headerItemsName = ['home', ...categories];
  const showSearch = pathname === '/favourites' || pathname === '/phones';
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const Id = () => window.scrollTo(0, 0);

    if (showNav) {
      window.addEventListener('scroll', Id);
    }

    // eslint-disable-next-line no-restricted-globals
    return () => removeEventListener('scroll', Id);
  }, [showNav]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setShowNav(false);
  }, [pathname]);

  const handlerShowMenu = () => {
    setShowNav(!showNav);
  };

  return (
    <header className="header">
      <div
        className="header__wrap-left"
        onScroll={(e) => e.preventDefault()}
      >
        <Logo />
        <button
          type="button"
          onClick={handlerShowMenu}
          className="header__wrap-left--show-menu"
        >
          <img
            src={`assests/images/${!showNav ? 'Menu.png' : 'Close.svg'}`}
            alt="menu icon"
            width={20}
          />
        </button>
      </div>
      <div className="header__nav" style={{ left: showNav ? 0 : '-800px' }}>
        <Nav items={headerItemsName} />
      </div>
      <div className="header__wrap--right">
        {showSearch && !showNav && <Search pathName={pathname.slice(1)} />}
        <TopActions />
      </div>
    </header>
  );
});

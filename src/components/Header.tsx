import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
  Nav,
  TopActions,
  Logo,
  Search,
} from './index';

import { Categories } from '../utils/types/Categgories';

export const Header = () => {
  const headerItemsName = ['home', ...Object.values(Categories)];
  const { pathname } = useLocation();

  const showSearch = pathname === '/favourites' || pathname === '/phones';

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, [window.location.pathname]);

  return (
    <header className="header" id="top">
      <div className="header__wrap--left">
        <Logo />
        <Nav items={headerItemsName} />
      </div>
      <div className="header__wrap--right">
        {showSearch && <Search pathName={pathname.slice(1)} />}
        <TopActions />
      </div>
    </header>
  );
};

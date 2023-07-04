import { useLocation } from 'react-router-dom';
import { useEffect, memo } from 'react';
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

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <header className="header">
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
});

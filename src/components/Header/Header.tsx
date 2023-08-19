import { useLocation } from 'react-router-dom';

import { Nav } from '../Nav';
import { Logo } from '../Logo';
import { HeaderButton } from '../HeaderButton';
import { Search } from '../Search';

import { HeaderButtonIcon } from '../../types/HeaderButtonIcon';

export const Header = () => {
  const location = useLocation();

  const isCartPage = location.pathname === '/cart';

  return (
    <header className="header">
      <div className="header__nav-container">
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
    </header>
  );
};

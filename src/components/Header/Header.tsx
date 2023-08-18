import { useLocation } from 'react-router-dom';

import { Nav } from '../Nav';
import { Logo } from '../Logo';
import { HeaderButton } from '../HeaderButton';

import { HeaderButtonIcon } from '../../types/HeaderButtonIcon';

export const Header = () => {
  const location = useLocation();

  const isCartPage = location.pathname.includes('cart');

  return (
    <header className="header">
      <div className="header__nav-container">
        <Logo />

        {!isCartPage && (
          <Nav />
        )}
      </div>

      <div className="header__button-container">
        {!isCartPage && (
          <HeaderButton type={HeaderButtonIcon.Favourites} />
        )}

        <HeaderButton type={HeaderButtonIcon.Cart} />
      </div>
    </header>
  );
};

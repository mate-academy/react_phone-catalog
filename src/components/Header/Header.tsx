import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../Logo';
import { Nav } from '../Nav';
import { SavedProductsButton } from '../SavedProductsButton';
import { SearchBar } from '../SearchBar';

import './Header.scss';

export const Header = () => {
  const { pathname } = useLocation();
  const nestingDepth = pathname.split('/').filter(el => el !== '').length;

  const showSearchBar = pathname !== '/'
    && pathname !== '/cart'
    && pathname !== '/menu'
    && nestingDepth === 1;

  const navigate = useNavigate();

  const handleMenuClick = () => {
    if (pathname === '/menu') {
      navigate(-1);
    }
  };

  return (
    <header className="Header">
      <div className="Header__content">
        <div className="Header__left-side">
          <NavLink
            to="/menu"
            className="Header__menu-button"
            onClick={handleMenuClick}
          >
            {' '}
          </NavLink>

          <div className="Header__logo-container">
            <Logo />
          </div>

          <div className="Header__nav-container">
            <Nav />
          </div>
        </div>

        <div className="Header__right-side">

          {showSearchBar && <SearchBar />}

          <SavedProductsButton type="favs" />
          <SavedProductsButton type="cart" />
        </div>
      </div>
    </header>
  );
};

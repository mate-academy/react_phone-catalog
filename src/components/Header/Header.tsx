import { useLocation } from 'react-router-dom';

import { Logo } from '../Logo';
import { Nav } from '../Nav';
import { SavedProductsButton } from '../SavedProductsButton';

import './Header.scss';
import { SearchBar } from '../SearchBar';

export const Header = () => {
  const { pathname } = useLocation();
  const nestingDepth = pathname.split('/').filter(el => el !== '').length;

  const showSearchBar = pathname !== '/'
    && pathname !== '/cart'
    && nestingDepth === 1; // only show searchbar if it's a products page, not details

  return (
    <header className="Header">
      <div className="Header__content">
        <div className="Header__left-side">
          <div className="Header__logo-container">
            <Logo />
          </div>

          <Nav />
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

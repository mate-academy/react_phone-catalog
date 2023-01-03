import { useLocation } from 'react-router-dom';
import { Logo } from '../Logo';
import { Nav } from '../Nav';
import { SearchBar } from '../SearchBar';
import { SavedProductsButton } from '../SavedProductsButton';
import './Header.scss';

export const Header = () => {
  const { pathname } = useLocation();
  const nestingDepth = pathname.split('/').filter(el => el !== '').length;

  const showSearchbar = pathname !== '/'
    && pathname !== '/cart'
    && nestingDepth === 1; // only show searchbar if it's a products page, not details

  return (
    <div className="header">
      <div className="header__left">
        <div className="header__logo">
          <Logo />
        </div>
        <Nav />
      </div>
      <div className="header__right">
        {showSearchbar && <SearchBar />}
        <SavedProductsButton
          type="favs"
        />
        <SavedProductsButton
          type="cart"
        />
      </div>
    </div>
  );
};

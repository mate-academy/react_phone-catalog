import './style.scss';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { Nav } from '../Nav';
import { SearchFilter } from '../Search';
import { CartContext } from '../contexts/CartContextProvider';
import { FavContext } from '../contexts/FavContextProvider';

enum SearchVisible {
  Phones = '/phones',
  Tablets = '/tablets',
  Accessories = '/accessories',
  Favorites = '/favorites',
}

const searchVisibleArray: string[] = Object.values(SearchVisible);

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const isSearchVisible = searchVisibleArray.includes(pathname);
  const { cart } = useContext(CartContext);
  const { favItems } = useContext(FavContext);

  const hasCart = cart.length !== 0;
  const hasFavs = favItems.length !== 0;
  const isNotOnCartPage = pathname !== '/cart';

  return (
    <header className="header">
      <nav className="header__nav">
        <Link className="header__logo" to="/">
          <img
            src="img/header-img/LOGO.png"
            className="header__logo-img"
            alt="logo"
          />
        </Link>
        {isNotOnCartPage && <Nav />}
      </nav>

      <div className="header__utils">
        {isSearchVisible && <SearchFilter />}

        {isNotOnCartPage && (
          <Link to="favorites" className="header__link" aria-label="icon">
            <i className="icon icon--fav header__action-icon">
              {hasFavs && (
                <div className="header__cart-length">{favItems?.length}</div>
              )}
            </i>
          </Link>
        )}

        <Link to="cart" className="header__link" aria-label="icon">
          <i className="icon icon--cart header__action-icon">
            {hasCart && (
              <div className="header__cart-length">{cart?.length}</div>
            )}
          </i>
        </Link>
      </div>
    </header>
  );
};

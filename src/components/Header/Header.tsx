import { Link, useLocation, useSearchParams } from 'react-router-dom';
import './Header.scss';
import { useContext, useState } from 'react';
import { Navbar } from '../Navbar/Navbar';
import { Logo } from '../Logo';
import { getSearchWith } from '../../utils/getSearchWith';
import { FavouritesContext } from '../../context/favouritesContext';
import { CartContext } from '../../context/cartContext';
import { SideNavbar } from '../SideNavbar';

export const Header = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const { favourites } = useContext(FavouritesContext);
  const { cartList } = useContext(CartContext);
  const productsInCart = cartList.reduce((acc, item) => acc + item.quantity, 0);

  const setSearchWith = (params: { query: string }) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({
      query: event.target.value,
    });
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="header sticky">
      <div className="header__content">
        <div className="header__left">
          <Logo />
          <Navbar />
        </div>
        <div className="header__right">
          {(pathname === '/phones' ||
            pathname === '/tablets' ||
            pathname === '/accessories' ||
            pathname === 'favourites') && (
            <div className="header__right-search">
              <input
                value={query}
                type="text"
                className="header__right-search-input"
                placeholder={`Search in ${pathname.slice(1)}...`}
                onChange={handleQueryChange}
              />
              <button className="header__right-search-button">
                <div className="icon icon-search" />
              </button>
            </div>
          )}

          <div
            className="header__menu-button"
            onClick={() => setIsMenuOpen(true)}
          >
            <div className="icon icon-menu" />
          </div>
          <SideNavbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

          <Link to="favourites" className="header__right-button">
            <div className="header__right-button-fav icon">
              {favourites.length > 0 && (
                <p className="header__right-counter icon">
                  {favourites.length}
                </p>
              )}
            </div>
          </Link>
          <Link to="cart" className="header__right-button">
            <div className="header__right-button-cart icon">
              {cartList.length > 0 && (
                <p className="header__right-counter icon">{productsInCart}</p>
              )}
            </div>
          </Link>
        </div>
      </div>

      {(pathname === '/phones' ||
        pathname === '/tablets' ||
        pathname === '/accessories' ||
        pathname === 'favourites') && (
        <div className="header__search">
          <input
            value={query}
            type="text"
            className="header__right-search-input"
            placeholder={`Search in ${pathname.slice(1)}...`}
            onChange={handleQueryChange}
          />
          <button className="header__right-search-button">
            <div className="icon icon-search" />
          </button>
        </div>
      )}
    </div>
  );
};

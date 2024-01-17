import { useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { useCart } from '../../context/CartProvider';
import { useFavourites } from '../../context/FavouritesProvider';
import { getSearchWith } from '../../helpers/searchHelper';

import './Header.scss';

export const Header = () => {
  const location = useLocation();
  const { cart } = useCart();
  const { favourites } = useFavourites();
  const [isFocus, setIsFocus] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const isHomePage = location.pathname === '/';
  const isPhonesPage = location.pathname === '/phones';
  const isTabletsPage = location.pathname === '/tablets';
  const isAccessoriesPage = location.pathname === '/accessories';
  const isFavouritesPage = location.pathname === '/favourites';
  const isCartPage = location.pathname === '/cart';

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  let pageType: string;

  switch (true) {
    case isPhonesPage:
      pageType = 'phones';
      break;
    case isTabletsPage:
      pageType = 'tablets';
      break;
    case isAccessoriesPage:
      pageType = 'accessories';
      break;
    case isFavouritesPage:
      pageType = 'favourites';
      break;
    default:
      pageType = '';
      break;
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: event.target.value || null,
      }),
    );
    setIsFocus(true);

    if (query === null) {
      setIsFocus(false);
    }
  };

  const handleQueryCancel = () => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: null,
      }),
    );
    setIsFocus(false);
  };

  return (
    <header className="header">
      <nav className="header__nav nav">
        <div className="nav__menu">
          <NavLink to="/" className="nav__logo">
            <span className="logo" />
          </NavLink>
          {!isCartPage
            && (
              <>
                <NavLink
                  to="home"
                  className={cn('nav__link', {
                    'is-active-link': isHomePage,
                  })}
                >
                  Home
                </NavLink>
                <NavLink
                  to="phones"
                  className={cn('nav__link', {
                    'is-active-link': isPhonesPage,
                  })}
                >
                  Phones
                </NavLink>
                <NavLink
                  to="tablets"
                  className={cn('nav__link', {
                    'is-active-link': isTabletsPage,
                  })}
                >
                  Tablets
                </NavLink>
                <NavLink
                  to="accessories"
                  className={cn('nav__link', {
                    'is-active-link': isAccessoriesPage,
                  })}
                >
                  Accessories
                </NavLink>
              </>
            )}
        </div>
        <button
          className="nav__menu-for-Tablets"
          type="button"
          aria-label="menu"
        >
          <span className="icon icon-menu" />
        </button>
        <div className="nav__bar">
          {(isPhonesPage
            || isTabletsPage
            || isAccessoriesPage
            || isFavouritesPage) && (
            <div
              className="nav__form"
            >
              <input
                type="text"
                className="search"
                placeholder={`Search in ${pageType}...`}
                value={query}
                onChange={handleQueryChange}
                onBlur={() => (
                  query === '' ? setIsFocus(false) : setIsFocus(true))}
              />
              {isFocus ? (
                <button
                  type="button"
                  aria-label="reset"
                  className="search__reset"
                  onClick={handleQueryCancel}
                />
              ) : (
                <div
                  className="search__icon"
                />
              )}
            </div>
          )}
          {!isCartPage
            && (
              <NavLink to="favourites" className="icon__favourites">
                <span className="icon icon-favourites" />
                {favourites.length >= 1
                  && (
                    <div className="icon-count icon-count-fav">
                      {favourites.length}
                    </div>
                  )}
              </NavLink>
            )}
          <NavLink to="cart" className="icon__cart">
            <span className="icon icon-cart" />
            {cart.length >= 1
              && (
                <div className="icon-count icon-count-cart">
                  {totalCartItems}
                </div>
              )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

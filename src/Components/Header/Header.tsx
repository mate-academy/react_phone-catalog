import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { Navbar } from '../Navbar/Navbar';
import { Aside } from '../Aside/Aside';
import { FavoriteContext } from '../../context/FavoriteContext';
import { CartContext } from '../../context/CartContext';
import { Search } from '../Search/Search';

import './Header.scss';

export const Header = () => {
  const { favoritesProducts } = useContext(FavoriteContext);
  const { cartProducts } = useContext(CartContext);
  const [isActive, setIsActive] = useState(false);
  const { pathname } = useLocation();

  const searchField =
    pathname === '/phones' ||
    pathname === '/tablets' ||
    pathname === '/accessories';

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isActive]);

  const favoritesCount = favoritesProducts.length;
  const cartCount = cartProducts.reduce((total, product) => {
    return total + (product.quantity || 0);
  }, 0);

  return (
    <>
      <section className="header">
        <div className="header__nav-block">
          <Link to="/" className="logo" aria-label="logo">
            <div className="logo-arm" />
          </Link>

          <Navbar />
        </div>

        <div className="header__icon-container">
          {searchField && <Search />}

          <NavLink
            to="/favorites"
            className="header__icon header__icon-favourites icon"
            aria-label="favourites"
          >
            {!!favoritesCount && (
              <div className="header__icon-favourites-count">
                {favoritesCount}
              </div>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className="header__icon header__icon--cart icon"
            aria-label="cart"
          >
            {!!cartCount && (
              <div className="header__icon-cart-count">{cartCount}</div>
            )}
          </NavLink>

          {!isActive ? (
            <button
              className="header__button header__button--open icon"
              onClick={() => setIsActive(true)}
            />
          ) : (
            <button
              className="header__button header__button--close icon"
              onClick={() => setIsActive(false)}
            />
          )}
        </div>
      </section>

      <div className="header__underline" />

      {isActive && <Aside setIsActive={setIsActive} />}
    </>
  );
};

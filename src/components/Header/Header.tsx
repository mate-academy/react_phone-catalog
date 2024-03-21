import React, { memo, useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { Logo } from '../Logo';
import { Navbar } from '../Navbar';
import { Search } from '../Search';

import { Cart } from '../../utils/Cart';
import { Favorites } from '../../utils/Favorites';

import './Header.scss';

import cartIcon from '../../images/icons/Cart_icon.svg';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('Header__link', { 'Header__link--active': isActive });

export const Header: React.FC = memo(() => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);

  const { pathname } = useLocation();

  const isSearchShown = useMemo(
    () =>
      ['/phones', '/tablets', '/accessories', '/favorites'].includes(pathname),
    [pathname],
  );

  const isCartPage = useMemo(() => pathname === '/cart', [pathname]);

  useEffect(() => {
    Cart.load();
    Favorites.load();

    const updateCartItemCount = () => {
      setCartItemsCount(Cart.getTotalLength());
    };

    const updateFavoritesCount = () => {
      setFavoritesCount(Favorites.getTotalLength());
    };

    updateCartItemCount();
    updateFavoritesCount();

    Cart.subscribe(updateCartItemCount);
    Favorites.subscribe(updateFavoritesCount);

    return () => {
      Cart.unsubscribe(updateCartItemCount);
      Favorites.unsubscribe(updateFavoritesCount);
    };
  }, []);

  return (
    <header className="Header" id="top">
      <div className="Header__container">
        <section className="Header__startBlock">
          <Logo />

          {!isCartPage && <Navbar />}
        </section>

        <section className="Header__endBlock">
          {isSearchShown && <Search category={pathname.slice(1)} />}

          {!isCartPage && (
            <article className="Header__linkContainer">
              <NavLink className={getLinkClass} to="/favourites">
                {favoritesCount > 0 && (
                  <div className="Header__linkCounter">{favoritesCount}</div>
                )}

                <i className="far fa-heart Header__heart" />
              </NavLink>
            </article>
          )}

          <article className="Header__linkContainer">
            <NavLink
              className={getLinkClass}
              to="/cart"
              state={{ prevPathname: pathname }}
            >
              {cartItemsCount > 0 && (
                <div className="Header__linkCounter">{cartItemsCount}</div>
              )}

              <img src={cartIcon} alt="Cart" className="Header__icon" />
            </NavLink>
          </article>
        </section>
      </div>
    </header>
  );
});

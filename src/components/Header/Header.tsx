import cn from 'classnames';
import header from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import React, { useContext } from 'react';
import { AddToFavContext } from '../../contexts/AddToFavContext';
import { AddToCartContext } from '../../contexts/AddToCartContext';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header: React.FC<Props> = ({ isMenuOpen, setIsMenuOpen }) => {
  const { fav } = useContext(AddToFavContext);
  const { cart } = useContext(AddToCartContext);
  const location = useLocation();
  const showSearch =
    (location.pathname.startsWith('/phones') ||
      location.pathname.startsWith('/tablets') ||
      location.pathname.startsWith('/accessories') ||
      location.pathname.startsWith('/favourites')) &&
    !isMenuOpen;

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [searchValue, setSearchValue] = useState(query);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (searchValue.trim()) {
        params.set('query', searchValue);
      } else {
        params.delete('query');
      }

      setSearchParams(params);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  return (
    <header className={header.header}>
      <Link to="/" className={header.header__logo}>
        <img
          src="img\header\logo.svg"
          alt=""
          className={header.header__logo__img}
        />
      </Link>
      <nav className={cn(header.header__nav, header.nav)}>
        <ul className={header.nav__list}>
          <li className={header.nav__item}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(header.nav__link, {
                  [header['link--active']]: isActive,
                })
              }
            >
              home
            </NavLink>
          </li>
          <li className={header.nav__item}>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                cn(header.nav__link, {
                  [header['link--active']]: isActive,
                })
              }
            >
              phones
            </NavLink>
          </li>
          <li className={header.nav__item}>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                cn(header.nav__link, {
                  [header['link--active']]: isActive,
                })
              }
            >
              tablets
            </NavLink>
          </li>
          <li className={header.nav__item}>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                cn(header.nav__link, {
                  [header['link--active']]: isActive,
                })
              }
            >
              accessories
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={cn(header.header__actions, header.actions)}>
        <ul className={header.actions__list}>
          {showSearch && (
            <li className={header.actions__item}>
              <div className={header.search__wrapper}>
                <input
                  type="text"
                  placeholder={isFocused ? 'Search...' : ''}
                  value={isFocused ? searchValue : ''}
                  onChange={e => setSearchValue(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className={header.search}
                />
                {searchValue && (
                  <button
                    type="button"
                    className={header.search__clear}
                    onMouseDown={event => event.preventDefault()}
                    onClick={() => setSearchValue('')}
                  ></button>
                )}
              </div>
            </li>
          )}

          <li className={header.actions__item}>
            <NavLink
              to="favourites"
              className={({ isActive }) =>
                cn(header.actions__link, header.actions__link__fav, {
                  [header['link--active']]: isActive,
                })
              }
            >
              {fav.length > 0 && (
                <div className={header.counter__container}>
                  <p className={header.counter}>{fav.length}</p>
                </div>
              )}
            </NavLink>
          </li>
          <li className={header.actions__item}>
            <NavLink
              to="cart"
              className={({ isActive }) =>
                cn(header.actions__link, header.actions__link__cart, {
                  [header['link--active']]: isActive,
                })
              }
            >
              {cart.length > 0 && (
                <div className={header.counter__container}>
                  <p className={header.counter}>
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </p>
                </div>
              )}
            </NavLink>
          </li>
          <li className={header.actions__item}>
            <button
              className={cn(header.actions__link, header.actions__link__menu, {
                [header['actions__link__menu--open']]: isMenuOpen,
              })}
              onClick={() => setIsMenuOpen(prev => !prev)}
            ></button>
          </li>
        </ul>
      </div>
    </header>
  );
};

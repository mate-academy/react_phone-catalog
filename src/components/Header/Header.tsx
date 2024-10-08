import cn from 'classnames';
import './Header.scss';
import { NavLink, useSearchParams } from 'react-router-dom';
import React, { useState } from 'react';
import { getSearchWith } from '../../utils/searchHelper';
import { UseAppDispatch, useAppSelector } from '../../utils/store';
import { actions as ThemeActions } from '../../utils/theme';

const getLinkStyle = ({ isActive }: { isActive: boolean }) =>
  cn('nav__item', { 'is-active': isActive });

type Props = {
  search?: boolean;
};

export const Header: React.FC<Props> = ({ search = false }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = getSearchWith(searchParams, {
      query: event.target.value || null,
    });

    setSearchParams(newSearchParams.toLowerCase());
  };

  const cart = useAppSelector(state => state.cart);
  const favourites = useAppSelector(state => state.favourites);
  const theme = useAppSelector(state => state.theme);
  const dispatch = UseAppDispatch();
  const setTheme = () => dispatch(ThemeActions.setTheme());
  const removeTheme = () => dispatch(ThemeActions.removeTheme());

  const handleTheme = () => {
    if (theme === 'dark') {
      removeTheme();
    } else {
      setTheme();
    }
  };

  const [showMenu, setShowMenu] = useState(false);

  if (showMenu) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    <header className="header">
      <div className="logo">
        <a
          href="#home"
          className={cn('header__logo', { 'is-dark': theme === 'dark' })}
        ></a>
      </div>

      <nav className="nav">
        <ul className="nav__list">
          <NavLink to="/" className={getLinkStyle}>
            Home
          </NavLink>

          <NavLink to="/phones" className={getLinkStyle}>
            Phones
          </NavLink>

          <NavLink to="/tablets" className={getLinkStyle}>
            Tablets
          </NavLink>

          <NavLink to="/accessories" className={getLinkStyle}>
            Accessories
          </NavLink>
        </ul>
      </nav>

      <div className="header__icons">
        {search && (
          <div
            className={cn('search__field', {
              'is-searching': isSearching,
            })}
          >
            <span
              className="search__field__icon"
              onClick={() => setIsSearching(!isSearching)}
            ></span>
            {isSearching && (
              <input
                type="text"
                className="search__field__input"
                placeholder="Search..."
                onBlur={() => setIsSearching(false)}
                value={query}
                onChange={handleQueryChange}
              />
            )}
          </div>
        )}
        <div className="icon" onClick={() => handleTheme()}>
          <div className="sun__icon"></div>
        </div>
        <NavLink to="/favourites" className="icon">
          {favourites.length > 0 && (
            <span className="favourites__counter span__counter">
              {favourites.length}
            </span>
          )}
          <div className="favourites__icon"></div>
        </NavLink>
        <NavLink to="/cart" className="icon">
          {cart.length > 0 && (
            <span className="cart__counter span__counter">{cart.length}</span>
          )}
          <div className="shopping-bag__icon"></div>
        </NavLink>
      </div>

      <div className="mobile__menu__icon">
        {!showMenu ? (
          <div className="icons__wrapper">
            <div
              className={cn('search__field', {
                'is-searching': isSearching,
              })}
              style={{ display: !search ? 'none' : 'flex' }}
            >
              <span
                className="search__field__icon"
                onClick={() => setIsSearching(!isSearching)}
              ></span>
              {isSearching && (
                <input
                  type="text"
                  className="search__field__input"
                  placeholder="Search..."
                  onBlur={() => setIsSearching(false)}
                  value={query}
                  onChange={handleQueryChange}
                />
              )}
            </div>
            <div className="icon" onClick={() => setShowMenu(true)}>
              <div className="menu__icon"></div>
            </div>
          </div>
        ) : (
          <div className="mobile__menu" id="menu">
            <header className="mobile__menu__header">
              <div className="logo">
                <a
                  href="#home"
                  className={cn('header__logo', {
                    'is-dark': theme === 'dark',
                  })}
                ></a>
              </div>
              <div className="icon" onClick={() => setShowMenu(false)}>
                <div className="close__icon"></div>
              </div>
            </header>
            <nav>
              <ul className="nav__list mobile__menu__list">
                <NavLink to="/" className={getLinkStyle}>
                  Home
                </NavLink>

                <NavLink to="/phones" className={getLinkStyle}>
                  Phones
                </NavLink>

                <NavLink to="/tablets" className={getLinkStyle}>
                  Tablets
                </NavLink>

                <NavLink to="/accessories" className={getLinkStyle}>
                  Accessories
                </NavLink>
              </ul>
            </nav>
            <div className="header__icons mobile__menu__icons">
              <div
                className="icon mobile__menu__icon"
                onClick={() => handleTheme()}
              >
                <div className="sun__icon"></div>
              </div>
              <NavLink to="/favourites" className="icon mobile__menu__icon">
                {favourites.length > 0 && (
                  <span className="favourites__counter span__counter">
                    {favourites.length}
                  </span>
                )}
                <div className="favourites__icon"></div>
              </NavLink>
              <NavLink to="/cart" className="icon mobile__menu__icon">
                {cart.length > 0 && (
                  <span className="favourites__counter span__counter">
                    {cart.length}
                  </span>
                )}
                <div className="shopping-bag__icon"></div>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

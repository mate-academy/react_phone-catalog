/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import {
  Link, NavLink, useLocation, useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { useData } from '../../helpers/DataContext';
import { getSearchWith } from '../../helpers/getSearchWith';

import './Header.scss';

export const Header = () => {
  const { pageURL, query } = useData();
  const location = useLocation();
  const PhonesPage = location.pathname === '/phones';
  const TabletsPage = location.pathname === '/tablets';
  const AccessoriesPage = location.pathname === '/accessories';
  const FavouritesPage = location.pathname === '/favourites';
  const [inputValue, setInputValue] = useState(query);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    setSearchParams(getSearchWith(searchParams, { query: null }));
    setInputValue(query);
  };

  const getLinkClass = (
    { isActive }: { isActive: boolean },
  ) => classNames('header__nav__link',
    {
      'is-Active': isActive,
    });

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpened(!isMenuOpened);
    document.body.classList.toggle('menu-opened');
  };

  return (
    <div className="header">
      {screenWidth > 650
        ? (
          <>
            <div className="header__nav">
              <Link
                className="page__logo"
                to="/"
                title="Back to HomePage"
              />
              <NavLink
                to="/"
                className={getLinkClass}
              >
                Home
              </NavLink>
              <NavLink
                to="/phones"
                className={({ isActive }) => classNames('header__nav__link',
                  {
                    'is-Active': isActive,
                  })}
              >
                Phones
              </NavLink>
              <NavLink
                to="/tablets"
                className={({ isActive }) => classNames('header__nav__link',
                  {
                    'is-Active': isActive,
                  })}
              >
                Tablets
              </NavLink>
              <NavLink
                to="/accessories"
                className={({ isActive }) => classNames('header__nav__link',
                  {
                    'is-Active': isActive,
                  })}
              >
                Accessories
              </NavLink>
            </div>

            <div className="header__utils">
              {(PhonesPage || TabletsPage || AccessoriesPage || FavouritesPage)
                && (
                  <div className="header__input-container">
                    <input
                      className="header__input"
                      type="text"
                      placeholder={`Search in ${pageURL?.slice(1)}..`}
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                    {inputValue
                      ? (
                        <button
                          type="button"
                          onClick={clearInput}
                          title="clear input"
                          data-cy="searchDelete"
                        >
                          <span className="icon icon--close" />
                        </button>
                      )
                      : <span className="icon icon--search" />}
                  </div>
                )}

              <Link
                className="header__fav"
                to="/favourites"
                title="Favourities"
              />
              <Link
                className="header__busket"
                to="/cart"
                title="Cart"
              />
            </div>
          </>
        )
        : (
          <div className="header-small">
            <Link
              className="page__logo"
              to="/"
              title="Back to HomePage"
            />
            <button
              type="button"
              className="header__menu"
              onClick={handleMenuClick}
            >
              <span className="icon icon--menu" />
            </button>
          </div>
        )}

      <aside
        id="menu"
        className={classNames('Menu', {
          'Menu--opened': isMenuOpened,
        })}
      >
        <div className="Menu__top">
          <Link
            className="Menu__logo"
            to="/"
            title="Back to HomePage"
          />
          <button
            type="button"
            className="Menu__cross"
            onClick={handleMenuClick}
          >
            <span className="icon icon--cross" />
          </button>
        </div>
        <div className="Menu__main">
          <NavLink
            to="/"
            className="Menu__item"
            onClick={handleMenuClick}
          >
            Home
          </NavLink>
          <NavLink
            to="/phones"
            className="Menu__item"
            onClick={handleMenuClick}
          >
            Phones
          </NavLink>
          <NavLink
            to="/tablets"
            className="Menu__item"
            onClick={handleMenuClick}
          >
            Tablets
          </NavLink>
          <NavLink
            to="/accessories"
            className="Menu__item"
            onClick={handleMenuClick}
          >
            Accessories
          </NavLink>
        </div>
        <div className="Menu__bottom">
          <div className="Menu__bottom-search">
            {(PhonesPage || TabletsPage || AccessoriesPage || FavouritesPage)
              && (
                <div className="Menu__input-container">
                  <input
                    className="Menu__input"
                    type="text"
                    placeholder={`Search in ${pageURL?.slice(1)}..`}
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  {inputValue
                    ? (
                      <button
                        type="button"
                        onClick={clearInput}
                        title="clear input"
                        data-cy="searchDelete"
                      >
                        <span className="icon icon--close" />
                      </button>
                    )
                    : <span className="icon icon--search" />}
                </div>
              )}
          </div>
          <div className="Menu__bottom-utils">
            <Link
              className="Menu--icon icon--fav"
              to="/favourites"
              title="Favourities"
              onClick={handleMenuClick}
            />
            <Link
              className="Menu--icon icon--busket"
              to="/cart"
              title="Cart"
              onClick={handleMenuClick}
            />
          </div>
        </div>
      </aside>
    </div>
  );
};

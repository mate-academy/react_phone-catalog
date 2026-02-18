/* eslint max-len: "off" */
import { Link } from 'react-router-dom';
import './HeaderNavigation.scss';
import React, { useContext } from 'react';
import { useProductFilters } from '../../../hooks/useProductsFilters';
import { useCurrentPath } from '../../context/PathContext';
import classNames from 'classnames';
import { CartAndFavouritesContext } from '../../context/CartAndFavouritesContext';
import { useTheme } from '../../context/ThemeContext';

export const HeaderNavigation: React.FC = () => {
  const { pathname, search } = useCurrentPath();
  const context = useContext(CartAndFavouritesContext);
  const { favourites, cart } = context;
  const { getLastSearch } = useProductFilters();
  const { theme } = useTheme();

  const pages = [
    { title: 'HOME', path: '/' },
    { title: 'PHONES', path: '/phones' },
    { title: 'TABLETS', path: '/tablets' },
    { title: 'ACCESSORIES', path: '/accessories' },
  ];

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const itemInFavourites = favourites.length;

  return (
    <nav className="header__navigation">
      <div className="header__container">
        <ul className="header__list">
          {pages.map(({ title, path }) => (
            <li className="header__list--item" key={title}>
              <Link
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={classNames('header__list--link', {
                  'is-active':
                    path === '/' ? pathname === '/' : pathname.startsWith(path),
                })}
                to={
                  path === '/'
                    ? '/'
                    : search
                      ? `${path}${search}`
                      : `${path}${getLastSearch()}`
                }
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="header__actions">
          <div className="header__icon--container">
            <Link
              className={classNames('header__icon--link', {
                'is-active': pathname === '/favourites',
              })}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              to="/favourites"
            >
              <img
                className="icon"
                src={
                  theme === 'light'
                    ? './img/icons/Favourites_icon.svg'
                    : './img/icons/Favourites_dark.svg'
                }
                alt="Favourites icon"
              />
              {itemInFavourites > 0 && (
                <div className="header__quantity--box">
                  <div className="header__quantity">{itemInFavourites}</div>
                </div>
              )}
            </Link>
          </div>
          <div className="header__icon--container">
            <Link
              className={classNames('header__icon--link', {
                'is-active': pathname === '/cart',
              })}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              to="/cart"
            >
              <img
                className="icon"
                src={
                  theme === 'light'
                    ? './img/icons/Shopping-bag_icon.svg'
                    : './img/icons/Shopping-bag_dark.svg'
                }
                alt="Shopping Bag icon"
              />
              {totalQuantity > 0 && (
                <div className="header__quantity--box">
                  <div className="header__quantity">{totalQuantity}</div>
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

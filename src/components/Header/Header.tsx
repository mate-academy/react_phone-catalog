import React, { useContext, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { FavContext } from '../../context/FavContext';
import { CartContext } from '../../context/CartContext';

import { Logo } from '../Logo';
import { Navbar } from '../Navbar';
import { Search } from '../Search';
import { Counter } from '../Counter/Counter';

import favIcon from '../../images/icons/Favourites.svg';
import cartIcon from '../../images/icons/Shopping_cart.svg';
import menuIcon from '../../images/icons/icon-menu.svg';
import closeIcon from '../../images/icons/icon-close.svg';

import './Header.scss';
import '../../App.scss';

const getClassName = ({ isActive }: { isActive: boolean }) => {
  return classNames('Navbar__button', {
    'Navbar__button--active': isActive,
  });
};

const getMenuClassName = ({ isActive }: { isActive: boolean }) => {
  return classNames('Menu__nav-link', {
    'Menu__nav-link--active': isActive,
  });
};

const getActionClassName = ({ isActive }: { isActive: boolean }) => {
  return classNames('Menu__action', {
    'Menu__action--active': isActive,
  });
};

const menuNav = [
  { href: '/', name: 'Home' },
  { href: '/phones', name: 'Phones' },
  { href: '/tablets', name: 'Tablets' },
  { href: '/accessories', name: 'Accessories' },
];

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { fav } = useContext(FavContext);
  const { cart } = useContext(CartContext);

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const isSearchVisible = pathname === '/phones'
  || pathname === '/tablets'
  || pathname === '/accessories'
  || pathname === '/favorites';

  const handleMenuClick = () => {
    setIsMenuOpened(!isMenuOpened);
    document.body.classList.toggle('menu-opened');
  };

  return (
    <>
      <div className="Header" id="header">
        <div className="Header__content">
          <div className="Header__logo-and-nav">
            <div className="Header__logo">
              <Logo />
            </div>

            {pathname !== '/cart' && (<Navbar />)}
          </div>

          <div className="Header__fav-and-cart">
            {isSearchVisible && (
              <div className="Header__search">
                <Search />
              </div>
            )}

            {pathname !== '/cart' && (
              <NavLink
                to="/favorites"
                className={getClassName}
              >
                <div className="Action">
                  <img
                    src={favIcon}
                    alt="Favorites"
                    className="Action__img"
                  />
                  {!!fav.length && (
                    <Counter count={fav.length} />
                  )}
                </div>
              </NavLink>
            )}

            <NavLink
              to="/cart"
              className={getClassName}
            >
              <div className="Action">
                <img
                  src={cartIcon}
                  alt="Shopping cart"
                  className="Action__img"
                />
                {!!cart.length && (
                  <Counter count={cart.length} />
                )}
              </div>
            </NavLink>

            <button
              type="button"
              aria-label="menu"
              className="Header__menu-button"
              onClick={handleMenuClick}
            >
              <img
                src={menuIcon}
                alt="Menu"
                className="Header__menu-button-img"
              />
            </button>
          </div>
        </div>
      </div>

      <aside
        id="menu"
        className={classNames('Menu', {
          'Menu--opened': isMenuOpened,
        })}
      >
        <div className="Menu__top">
          <div className="Menu__top-actions">
            <div className="Menu__logo">
              <Logo />
            </div>
            <button
              type="button"
              aria-label="menu"
              className="Menu__button"
              onClick={handleMenuClick}
            >
              <img
                src={closeIcon}
                alt="Menu"
                className="Menu__img"
              />
            </button>
          </div>
          <nav className="Menu__nav">
            <ul className="Menu__nav-list">
              {menuNav.map(elem => (
                <li
                  key={elem.href}
                  className="Menu__nav-item"
                >
                  <NavLink
                    to={elem.href}
                    className={getMenuClassName}
                    onClick={handleMenuClick}
                  >
                    {elem.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="Menu__bottom">
          <NavLink
            to="/favorites"
            className={getActionClassName}
            onClick={handleMenuClick}
          >
            <div className="Action">
              <img
                src={favIcon}
                alt="Favorites"
                className="Action__img"
              />
              {!!fav.length && (
                <Counter count={fav.length} />
              )}
            </div>
          </NavLink>

          <NavLink
            to="/cart"
            className={getActionClassName}
            onClick={handleMenuClick}
          >
            <div className="Action">
              <img
                src={cartIcon}
                alt="Shopping cart"
                className="Action__img"
              />
              {!!cart.length && (
                <Counter count={cart.length} />
              )}
            </div>
          </NavLink>
        </div>
      </aside>
    </>
  );
};

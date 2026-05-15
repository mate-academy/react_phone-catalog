/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import './Header.scss';

export const Header: React.FC = () => {
  const { cart } = useCart();
  const { favorites } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('is-menu-open');
    } else {
      document.body.classList.remove('is-menu-open');
    }

    return () => {
      document.body.classList.remove('is-menu-open');
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'nav__link is-active' : 'nav__link';

  const getActiveIconClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'header__icon-link is-active' : 'header__icon-link';

  const getMenuLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'menu__link is-active' : 'menu__link';

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__logo">
          <img src="img/icons/logo.svg" alt="Logo" />
        </Link>

        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink to="/" className={getActiveClass}>
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/phones" className={getActiveClass}>
                Phones
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/tablets" className={getActiveClass}>
                Tablets
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/accessories" className={getActiveClass}>
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="header__right">
        <div className="header__desktop-icons">
          <NavLink to="/favorites" className={getActiveIconClass}>
            <img
              src="img/icons/heart.svg"
              alt="Favorites"
              className="header__icon"
            />
            {favorites.length > 0 && (
              <span className="header__count">{favorites.length}</span>
            )}
          </NavLink>

          <NavLink to="/cart" className={getActiveIconClass}>
            <img src="img/icons/cart.svg" alt="Cart" className="header__icon" />
            {totalItemsInCart > 0 && (
              <span className="header__count">{totalItemsInCart}</span>
            )}
          </NavLink>
        </div>

        <button
          type="button"
          className="header__burger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <img
            src={isMenuOpen ? 'img/icons/close.svg' : 'img/icons/menu.svg'}
            alt="Menu"
            className="header__icon"
          />
        </button>
      </div>

      <div className={`menu ${isMenuOpen ? 'is-open' : ''}`}>
        <nav className="menu__nav">
          <NavLink to="/" className={getMenuLinkClass}>
            HOME
          </NavLink>
          <NavLink to="/phones" className={getMenuLinkClass}>
            PHONES
          </NavLink>
          <NavLink to="/tablets" className={getMenuLinkClass}>
            TABLETS
          </NavLink>
          <NavLink to="/accessories" className={getMenuLinkClass}>
            ACCESSORIES
          </NavLink>
        </nav>

        <div className="menu__footer">
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? 'menu__icon-link is-active' : 'menu__icon-link'
            }
          >
            <img
              src="img/icons/heart.svg"
              alt="Favorites"
              className="header__icon"
            />
            {favorites.length > 0 && (
              <span className="header__count">{favorites.length}</span>
            )}
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? 'menu__icon-link is-active' : 'menu__icon-link'
            }
          >
            <img src="img/icons/cart.svg" alt="Cart" className="header__icon" />
            {totalItemsInCart > 0 && (
              <span className="header__count">{totalItemsInCart}</span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};

/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link, NavLink } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import { useState } from 'react';
import logo from '../../images/icons/logo.svg';
import favoritesIcon from '../../images/icons/favorites.svg';
import cartIcon from '../../images/icons/cart.svg';
import menuIcon from '../../images/icons/menu.svg';
import closeIcon from '../../images/icons/close.svg';

import './Header.scss';

export const Header: React.FC = () => {
  const { cart, favorites } = useGlobalContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img alt="logo" src={logo} className="header__logo" />
        </Link>

        <nav
          className={`header__navigation ${
            isMenuOpen ? 'header__navigation--open' : ''
          }`}
        >
          <ul className="header__navigation--list">
            <li className="header__navigation--item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'header__navigation--link header__navigation--link-active'
                    : 'header__navigation--link'
                }
                end
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li className="header__navigation--item">
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  isActive
                    ? 'header__navigation--link header__navigation--link-active'
                    : 'header__navigation--link'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Phones
              </NavLink>
            </li>
            <li className="header__navigation--item">
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  isActive
                    ? 'header__navigation--link header__navigation--link-active'
                    : 'header__navigation--link'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Tablets
              </NavLink>
            </li>
            <li className="header__navigation--item">
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  isActive
                    ? 'header__navigation--link header__navigation--link-active'
                    : 'header__navigation--link'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="header__icons">
        <Link to="/favorites" className="header__icons--button">
          <img
            src={favoritesIcon}
            alt="favorites"
            className="header__icons--icon"
          />
          {favorites.length > 0 && (
            <span className="header__icons--badge">{favorites.length}</span>
          )}
        </Link>

        <Link to="/cart" className="header__icons--button">
          <img src={cartIcon} alt="cart" className="header__icons--icon" />
          {cart.length > 0 && (
            <span className="header__icons--badge">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </Link>
      </div>

      <button className="header__burger" onClick={toggleMenu}>
        <img src={isMenuOpen ? closeIcon : menuIcon} alt="menu" />
      </button>

      {isMenuOpen && (
        <div className="header__mobile-menu">
          <div className="header__mobile-top">
            <Link to="/" onClick={closeMenu}>
              <img src={logo} alt="logo" className="header__mobile-logo" />
            </Link>

            <button className="header__mobile-close" onClick={closeMenu}>
              <img
                className="header__mobile-close--icon"
                src={closeIcon}
                alt="close menu"
              />
            </button>
          </div>

          <ul className="header__mobile-list">
            {['Home', 'Phones', 'Tablets', 'Accessories'].map(name => (
              <li key={name}>
                <NavLink
                  to={`/${name === 'Home' ? '' : name.toLowerCase()}`}
                  end={name === 'Home'}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive
                      ? 'header__mobile-list--item active'
                      : 'header__mobile-list--item'
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="header__mobile-bottom">
            <Link
              to="/favorites"
              onClick={closeMenu}
              className="header__mobile-bottom--button"
            >
              <div className="header__mobile-bottom--icon-wrapper">
                <img
                  src={favoritesIcon}
                  className="header__mobile-bottom--icons"
                  alt="Favorites"
                />
                {favorites.length > 0 && (
                  <span className="header__mobile-bottom--badge">
                    {favorites.length}
                  </span>
                )}
              </div>
            </Link>

            <Link
              to="/cart"
              onClick={closeMenu}
              className="header__mobile-bottom--button"
            >
              <div className="header__mobile-bottom--icon-wrapper">
                <img
                  src={cartIcon}
                  className="header__mobile-bottom--icons"
                  alt="Cart"
                />
                {cart.length > 0 && (
                  <span className="header__mobile-bottom--badge">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

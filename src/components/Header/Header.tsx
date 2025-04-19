import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import favoriteIcon from '../../assets/img/Icons/favorite.png';
import cartIcon from '../../assets/img/Icons/cart.svg';
import handIcon from '../../assets/img/hand.svg';
// import logo from '../../assets/img/logo.png'; // Removed single logo import
import './Header.scss';

export const Header: React.FC = () => {
  const { favorites } = useFavorites();
  const { getTotalItems } = useCart();
  const cartItemsCount = getTotalItems();

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo">
          <Link to="/" className="header__logo-link">
            <div className="header__logo-container">
              <div className="header__logo-text">
                <div className="header__logo-nice-container">
                  <span className="header__logo-nice">NICE</span>
                  <img src={handIcon} alt="OK" className="header__logo-hand" />
                </div>
                <span className="header__logo-gadgets">GADGETS</span>
              </div>
            </div>
          </Link>
        </div>

        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`
                }
              >
                HOME
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`
                }
              >
                PHONES
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`
                }
              >
                TABLETS
              </NavLink>
            </li>
            <li className="header__nav-item">
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`
                }
              >
                ACCESSORIES
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="header__icons">
          <Link to="/favorites" className="header__icon-button">
            <span className="header__icon header__icon--favorites">
              <img
                src={favoriteIcon}
                alt="Favorites"
                className="header__icon-img"
              />
            </span>
            {favorites.length > 0 && (
              <span className="header__icon-counter">{favorites.length}</span>
            )}
          </Link>
          <Link to="/cart" className="header__icon-button">
            <span className="header__icon header__icon--cart">
              <img src={cartIcon} alt="Cart" className="header__icon-img" />
            </span>
            {cartItemsCount > 0 && (
              <span className="header__icon-counter">{cartItemsCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

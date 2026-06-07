/* eslint-disable max-len */
import { NavLink, Link } from 'react-router-dom';
import './Header.scss';
import classNames from 'classnames';
import { useCart } from '../../Functional/CartContext/CartContext';
import { Aside } from '../Aside/Aside';
import { useState } from 'react';
import { getBaseUrl } from '../../utils';

export const Header = () => {
  const { cart, favorites } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', {
      'is-active': isActive,
    });

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <header className="header">
      <div className="header__top">
        <div className="header__logo">
          <Link to="/">
            <img src={`${getBaseUrl()}icons/logo.svg`} alt="NiceGadgets logo" />
          </Link>
        </div>

        <nav className="header__nav">
          <NavLink to="/" className={getLinkClass}>HOME</NavLink>
          <NavLink to="/phones" className={getLinkClass}>PHONES</NavLink>
          <NavLink to="/tablets" className={getLinkClass}>TABLETS</NavLink>
          <NavLink to="/accessories" className={getLinkClass}>ACCESSORIES</NavLink>
        </nav>

        <div className="header__head--logo">
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              classNames('header__heart', { 'is-active': isActive })
            }
          >
            <div className="header__heart__top">
              <img src={`${getBaseUrl()}icons/heart.svg`} alt="Favorites" />
              {favorites.length > 0 && (
                <span className="cart-count">{favorites.length}</span>
              )}
            </div>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              classNames('header__packet', { 'is-active': isActive })
            }
          >
            <div className="header__packet__top">
              <img src={`${getBaseUrl()}icons/cart.svg`} alt="Cart" />
              {cart.length > 0 && (
                <span className="cart-count">{cart.length}</span>
              )}
            </div>
          </NavLink>

          <div className="header__burger-wrapper">
            <div className="header__burger">
              <button
                type="button"
                className="header__burger-menu"
                onClick={toggleMenu}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>

        <Aside isMenuOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </header>
  );
};
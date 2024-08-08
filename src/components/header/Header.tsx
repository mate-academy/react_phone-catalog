import './Header.scss';
import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ProductsContext } from '../../context/ProductsContext';
import { getTotalCount } from '../../services/utils/getTotalCount';

export const Header: React.FC = () => {
  const context = useContext(ProductsContext);
  const { cart, favorites } = context;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <nav className="nav">
      <div className="nav__group nav__group--all-links">
        <NavLink to="/">
          <div className="nav__logo" />
        </NavLink>
        <div className="nav__group--links">
          <NavLink to="/" className="nav__link">
            HOME
          </NavLink>

          <NavLink to="/phones" className="nav__link">
            PHONES
          </NavLink>

          <NavLink to="/tablets" className="nav__link">
            TABLETS
          </NavLink>

          <NavLink to="/accessories" className="nav__link">
            ACCESSORIES
          </NavLink>
        </div>
      </div>

      <div className="nav__group nav__group--icons">
        <Link to="/favorites" className="nav__group--icons--border">
          <div className="nav__icon nav__icon--heart" />
          {!!favorites.length && (
            <div className="nav__count-heart">
              <p className="nav__count__text">{favorites.length}</p>
            </div>
          )}
        </Link>

        <NavLink to="/cart" className="nav__group--icons--border">
          <div className="nav__icon nav__icon--shopping-bag" />
          {!!cart.length && (
            <div className="nav__count-bag">
              <p className="nav__count__text">{getTotalCount(cart)}</p>
            </div>
          )}
        </NavLink>

        <button
          type="button"
          aria-label="menu-burger"
          className="nav__button nav__button--menu"
          onClick={toggleMenu}
        />
      </div>

      <div className={`nav__menu ${isMenuOpen ? 'nav__menu--open' : ''}`}>
        <div className="nav__menu--links">
          <NavLink to="/" className="nav__menu-link" onClick={closeMenu}>
            HOME
          </NavLink>
          <NavLink to="/phones" className="nav__menu-link" onClick={closeMenu}>
            PHONES
          </NavLink>
          <NavLink to="/tablets" className="nav__menu-link" onClick={closeMenu}>
            TABLETS
          </NavLink>
          <NavLink
            to="/accessories"
            className="nav__menu-link"
            onClick={closeMenu}
          >
            ACCESSORIES
          </NavLink>
        </div>

        <div className="nav__menu-icons">
          <NavLink
            to="/favorites"
            className="nav__menu--heart-wrap"
            onClick={closeMenu}
          >
            <div className="nav__menu-icon">
              <div className="nav__icon nav__icon--heart" />
              {!!favorites.length && (
                <div className="nav__count-heart nav__menu--cart-wrap--heart">
                  <p className="nav__count__text">{favorites.length}</p>
                </div>
              )}
            </div>
          </NavLink>

          <NavLink
            to="/cart"
            className="nav__menu--cart-wrap"
            onClick={closeMenu}
          >
            <div className="nav__menu-icon">
              <div className="nav__icon nav__icon--shopping-bag" />
              {!!cart.length && (
                <div className="nav__count-bag nav__menu--cart-wrap--bag">
                  <p className="nav__count__text">{cart.length}</p>
                </div>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

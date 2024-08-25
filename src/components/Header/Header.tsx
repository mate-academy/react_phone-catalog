import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Header.scss';
import { useFavorites } from '../../context/FavoritesContext';

export const Header: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { cartItems } = useCart();
  const { favorites } = useFavorites();

  const toggleMenu = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    if (isNavOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isNavOpen]);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('header__link', 'header__nav--link', {
      'is-active': isActive,
      'nav-open': isNavOpen,
    });

  const getAdditionalLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('header__extra--link', {
      'is-activeExtra': isActive,
    });

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalFavorites = () => {
    return favorites.length;
  };

  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/" className="header__nav--logo">
          <img
            src={`${process.env.PUBLIC_URL}/img/icons/Logo.svg`}
            alt="Logo"
          />
        </Link>
        <nav className={classNames('header__nav', { 'nav-open': isNavOpen })}>
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>
          <NavLink to="/phones" className={getLinkClass}>
            Phones
          </NavLink>
          <NavLink to="/tablets" className={getLinkClass}>
            Tablets
          </NavLink>
          <NavLink to="/accessories" className={getLinkClass}>
            Accessories
          </NavLink>
        </nav>

        <div className="menu" onClick={toggleMenu}>
          <img
            src={`${process.env.PUBLIC_URL}/img/icons/${isNavOpen ? 'closeMenu.svg' : 'Menu.png'}`}
            alt="menu"
          />
        </div>

        <div className="header__extra">
          <NavLink to={'/favorites'} className={getAdditionalLinkClass}>
            <div className="header__favorite--icon">
              <img
                src={`${process.env.PUBLIC_URL}/img/icons/favorites.png`}
                alt="Favorite"
              />
              {getTotalFavorites() > 0 && (
                <span className="header__favorite--count">
                  {getTotalFavorites()}
                </span>
              )}
            </div>
          </NavLink>
          <NavLink to={'/basket'} className={getAdditionalLinkClass}>
            <div className="header__basket--icon">
              <img
                src={`${process.env.PUBLIC_URL}/img/icons/basket.png`}
                alt="Basket"
              />
              {getTotalQuantity() > 0 && (
                <span className="header__basket--count">
                  {getTotalQuantity()}
                </span>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

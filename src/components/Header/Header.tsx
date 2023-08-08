import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { FavContext } from '../../providers/FavProvider/FavProvider';
import { CartContext } from '../../providers/CartProvider/CartProvider';

import { Search } from '../Search/Search';
import { locationsForSearch } from '../../helpers/locationsForSearch';

import logo from '../../images/logo.svg';
import burgerMenu from '../../images/burger__menu.svg';

import './Header.scss';

export const Header: React.FC = () => {
  const currentLocation = useLocation();
  const { favoriteProducts } = useContext(FavContext);
  const { productsInCart } = useContext(CartContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const showSearch = locationsForSearch.some(
    location => location === currentLocation.pathname,
  );

  const favItemsQuantity = useMemo(() => {
    return favoriteProducts.length;
  }, [favoriteProducts]);

  const cartItemsQuantity = useMemo(() => {
    return productsInCart.reduce((prevValue, currentValue) => {
      return prevValue + currentValue.quantity;
    }, 0);
  }, [productsInCart]);

  const toggleMobileMenu = () => {
    setShowMobileMenu((prevShowMobileMenu) => !prevShowMobileMenu);
  };

  useEffect(() => {
    if (showMobileMenu) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }

    return () => {
      document.documentElement.style.overflow = 'auto';
    };
  }, [showMobileMenu]);

  const handleLinkClick = () => {
    setShowMobileMenu(false);
  };

  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/" className="header__logo">
          <img
            src={logo}
            alt="logo"
            className="header__logo-img"
          />
        </Link>

        <button
          type="button"
          className="header__burger"
          onClick={toggleMobileMenu}
        >
          <img src={burgerMenu} alt="menu" />
        </button>

        <div className={cn('header__mobile mobile', {
          show: showMobileMenu,
          'show-menu': showMobileMenu,
        })}
        >
          <div className="mobile__header">
            <Link to="/" className="mobile__logo" onClick={handleLinkClick}>
              <img
                src={logo}
                alt="logo"
                className="mobile__logo-img"
              />
            </Link>

            <button
              type="button"
              className="mobile__burger"
              onClick={toggleMobileMenu}
            >
              <img src={burgerMenu} alt="menu" />
            </button>
          </div>

          <div className="mobile__search">
            {showSearch && <Search setShowMobileMenu={setShowMobileMenu} />}
          </div>
          <ul className="mobile__menu">
            <li className="mobile__item">
              <NavLink
                to="/"
                className="header__link"
                onClick={handleLinkClick}
              >
                Home
              </NavLink>
            </li>
            <li className="mobile__item">
              <NavLink
                to="/phones"
                className="header__link"
                onClick={handleLinkClick}
              >
                Phones
              </NavLink>
            </li>
            <li className="mobile__item">
              <NavLink
                to="/tablets"
                className="header__link"
                onClick={handleLinkClick}
              >
                Tablets
              </NavLink>
            </li>
            <li className="mobile__item">
              <NavLink
                to="/accessories"
                className="header__link"
                onClick={handleLinkClick}
              >
                Accessories
              </NavLink>
            </li>
          </ul>

          <div className="mobile__buttons">
            <NavLink
              to="/favorites"
              className="header__button header__button--fav mobile__button"
              onClick={handleLinkClick}
            >
              <span className={cn('header__quantity', {
                active: favItemsQuantity > 0,
              })}
              >
                {favItemsQuantity}
              </span>
            </NavLink>
            <NavLink
              to="/cart"
              className="header__button header__button--cart mobile__button"
              onClick={handleLinkClick}
            >
              <span className={cn('header__quantity', {
                active: cartItemsQuantity > 0,
              })}
              >
                {cartItemsQuantity}
              </span>
            </NavLink>
          </div>
        </div>

        <ul className="header__menu">
          <li className="header__item">
            <NavLink
              to="/"
              className={({ isActive }) => cn(
                'header__link',
                { 'header__link--active': isActive },
              )}
            >
              Home
            </NavLink>
          </li>
          <li className="header__item">
            <NavLink
              to="/phones"
              className={({ isActive }) => cn(
                'header__link',
                { 'header__link--active': isActive },
              )}
            >
              Phones
            </NavLink>
          </li>
          <li className="header__item">
            <NavLink
              to="/tablets"
              className={({ isActive }) => cn(
                'header__link',
                { 'header__link--active': isActive },
              )}
            >
              Tablets
            </NavLink>
          </li>
          <li className="header__item">
            <NavLink
              to="/accessories"
              className={({ isActive }) => cn(
                'header__link',
                { 'header__link--active': isActive },
              )}
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="header__buttons">
        {showSearch && <Search />}
        <NavLink to="/favorites" className="header__button header__button--fav">
          <span className={cn('header__quantity', {
            active: favItemsQuantity > 0,
          })}
          >
            {favItemsQuantity}
          </span>
        </NavLink>
        <NavLink to="/cart" className="header__button header__button--cart">
          <span className={cn('header__quantity', {
            active: cartItemsQuantity > 0,
          })}
          >
            {cartItemsQuantity}
          </span>
        </NavLink>
      </div>
    </header>
  );
};

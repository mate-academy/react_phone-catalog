import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import './NavBar.scss';
import { Search } from '../Search/Search';
import { CartContext } from '../../context/CartContext';
import { FavouriteContext } from '../../context/FavouriteContext';
import { Logo } from '../Logo/Logo';

export const NavBar: React.FC = () => {
  const currentLocation = useLocation();
  const { favouriteProducts } = useContext(FavouriteContext);
  const { productsInCart } = useContext(CartContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const showSearch = [
    '/react_phone-catalog/phones',
    '/react_phone-catalog/favourite',
    '/react_phone-catalog/tablets',
    '/react_phone-catalog/accessories',
    '/react_phone-catalog/favourite',
  ].includes(currentLocation.pathname);

  const favItemsQuantity = useMemo(() => {
    return favouriteProducts.length;
  }, [favouriteProducts]);

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
        <Logo />

        <button
          type="button"
          className="header__burger"
          onClick={toggleMobileMenu}
        >
          <div className="header__burger--icon" />
        </button>

        <div className={cn('header__mobile mobile', {
          show: showMobileMenu,
          'show-menu': showMobileMenu,
        })}
        >
          <div className="mobile__header">
            <Logo />

            <button
              type="button"
              className="mobile__burger"
              onClick={toggleMobileMenu}
            >
              <div className="mobile__burger--icon" />
            </button>
          </div>

          <div className="mobile__search">
            {showSearch && <Search />}
          </div>
          <ul className="mobile__menu">
            <li className="mobile__item">
              <NavLink
                to="/react_phone-catalog/"
                className="header__link"
                onClick={handleLinkClick}
              >
                Home
              </NavLink>
            </li>
            <li className="mobile__item">
              <NavLink
                to="/react_phone-catalog/phones"
                className="header__link"
                onClick={handleLinkClick}
              >
                Phones
              </NavLink>
            </li>
            <li className="mobile__item">
              <NavLink
                to="/react_phone-catalog/tablets"
                className="header__link"
                onClick={handleLinkClick}
              >
                Tablets
              </NavLink>
            </li>
            <li className="mobile__item">
              <NavLink
                to="/react_phone-catalog/accessories"
                className="header__link"
                onClick={handleLinkClick}
              >
                Accessories
              </NavLink>
            </li>
          </ul>

          <div className="mobile__buttons">
            <NavLink
              to="/react_phone-catalog/favourite"
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
              to="/react_phone-catalog/cart"
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
              to="/react_phone-catalog/"
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
              to="/react_phone-catalog/phones"
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
              to="/react_phone-catalog/tablets"
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
              to="/react_phone-catalog/accessories"
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
        <NavLink
          to="/react_phone-catalog/favourite"
          className="header__button header__button--fav"
        >
          <span className={cn('header__quantity', {
            active: favItemsQuantity > 0,
          })}
          >
            {favItemsQuantity}
          </span>
        </NavLink>
        <NavLink
          to="/react_phone-catalog/cart"
          className="header__button header__button--cart"
        >
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

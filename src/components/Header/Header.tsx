import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import './Header.scss';
import logo from '../../assets/icons/Logo.svg';
import favouritesIcon from '../../assets/icons/Favourites.svg';
import cartIcon from '../../assets/icons/Cart.svg';
import {
  ReactComponent as BurgerIcon,
} from '../../assets/icons/Icon-Burger-menu.svg';
import {
  ReactComponent as CloseIcon,
} from '../../assets/icons/HeaderClose.svg';
import { Navigation } from '../Navigation';
import { Search } from '../Search';
import { FavAndCartContext } from '../context/FavAndCartContext';

export const Header: React.FC = () => {
  const { favourites, cart } = useContext(FavAndCartContext);
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const pathnamesToSearch = [
    '/phones',
    '/tablets',
    '/accessories',
    '/favourites',
  ];

  const handleBurgerClick = useCallback(() => {
    setIsOpen(state => !state);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__left-side">
          <button
            type="button"
            className="header__icon header__icon--burger"
            onClick={handleBurgerClick}
          >
            {isOpen ? (
              <CloseIcon />
            ) : (
              <BurgerIcon />
            )}
          </button>

          <Link to="/" className="header__logo">
            <img src={logo} alt="Logo" />
          </Link>

          <Navigation isOpen={isOpen} />
        </div>

        <div className="header__right-side">
          {pathnamesToSearch.includes(pathname) && (
            <Search />
          )}

          <Link
            to="/favourites"
            className={classNames('header__icon header__icon--favourites', {
              'header__icon--active': pathname === '/favourites',
            })}
          >
            <img src={favouritesIcon} alt="Favourites icon" />

            {!!favourites.length && (
              <span className="header__quantity">
                {favourites.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className={classNames('header__icon header__icon--cart', {
              'header__icon--active': pathname === '/cart',
            })}
          >
            <img src={cartIcon} alt="Cart icon" />

            {!!cart.length && (
              <span className="header__quantity">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

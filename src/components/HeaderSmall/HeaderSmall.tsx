import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import 'bulma/css/bulma.min.css';
import { LogoIcon } from '../../assets/icons/logo-icon';
import { ReactComponent as AddToCart } from '../../assets/icons/Cart.svg';
// eslint-disable-next-line
import { ReactComponent as AddToFavourites } from '../../assets/icons/Favourites (Heart Like).svg';
import { Counter } from '../Counter/Counter';
import { useCartContext } from '../../context/cartContext';
import { useFavsContext } from '../../context/favouritesContext';
import './HeaderSmall.scss';

export const HeaderSmall: React.FC = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const { addedToCart } = useCartContext();
  const { addedToFavs } = useFavsContext();

  const handleMenuOpen = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <button
          type="button"
          className={classNames('navbar-burger', {
            'is-active': isMenuActive,
          })}
          aria-label="menu"
          aria-expanded="false"
          onClick={handleMenuOpen}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <Link
          className="navbar-item"
          to="/"
        >
          <LogoIcon />
        </Link>

        <div className="navbar-item">
          <div className="buttons_container">
            <NavLink
              to="favorites"
              className={({ isActive }) => classNames('navlink', {
                'is-actived': isActive,
              })}
            >
              {addedToFavs > 0 && <Counter count={addedToFavs} />}
              <AddToFavourites className="buttons" />

            </NavLink>
          </div>

          <div className="buttons_container">
            <NavLink
              to="cart"
              className={({ isActive }) => classNames('navlink', {
                'is-actived': isActive,
              })}
            >
              {addedToCart > 0 && <Counter count={addedToCart} />}
              <AddToCart className="buttons" />
            </NavLink>
          </div>
        </div>
      </div>

      <div
        className={classNames('navbar-menu', {
          'is-active': isMenuActive,
        })}
      >
        <div className="navbar-start">
          <NavLink
            to="phones"
            className="navbar-item menuitem"
            onClick={handleMenuOpen}
          >
            Phones
          </NavLink>

          <NavLink
            to="tablets"
            className="navbar-item menuitem"
            onClick={handleMenuOpen}
          >
            Tablets
          </NavLink>

          <NavLink
            to="accessories"
            className="navbar-item menuitem"
            onClick={handleMenuOpen}
          >
            Accessories
          </NavLink>
        </div>

        <div className="navbar-end" />
      </div>
    </nav>
  );
};

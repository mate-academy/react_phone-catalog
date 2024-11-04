
import React, { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import { logo, favouritesIcon, shoppingBagIcon } from '../assets/icons';
import '../App.scss';
import classNames from 'classnames';
import { useFavorites } from '../context/FavoritesContext/FavoritesContext';
import { useCart } from '../context/CartContext/CartContext';

interface HeaderProps {

}
export const Header = forwardRef<HTMLDivElement, HeaderProps>((props, ref) => {
  const { totalQuantity } = useCart();
  const { favorites } = useFavorites();
  const selectedPage = (isActive: boolean) =>
    classNames('header__nav-link', { active: isActive });

  return (
    <header ref={ref} className="header">
      <div className="header__logo">
        <NavLink to="/" className="header__logo-link">
          <img src={logo} alt="Logo" className="header__logo-logo" />
        </NavLink>

        <nav>
          <ul className="header__nav-list">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => selectedPage(isActive)}
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/phones"
                className={({ isActive }) => selectedPage(isActive)}
              >
                PHONES
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tablets"
                className={({ isActive }) => selectedPage(isActive)}
              >
                TABLETS
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/accessories"
                className={({ isActive }) => selectedPage(isActive)}
              >
                ACCESSORIES
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="header__icons">
        <NavLink
          to="/favourites"
          className="header__icon header__icon--favourites"
        >
          <img src={favouritesIcon} alt="Favourites" />

        </NavLink>
        <NavLink to="/cart" className="header__icon header__icon--bag">

          <img src={shoppingBagIcon} alt="Shopping Bag" />
          {totalQuantity > 0 && (
            <span>{totalQuantity}</span>
          )}
        </NavLink>
      </div>
    </header>
  );
});

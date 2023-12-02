import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import './NavIcons.scss';

export const NavIcons: FC = () => {
  return (
    <>
      <NavLink
        to="/favorites"
        className={({ isActive }) => classNames(
          'navbar__icon',
          { 'has-background-grey-lighter': isActive },
          { 'nav-link-active': isActive },
        )}
      >
        <img src="img/Icons/Favourites.svg" alt="Favourites" />

      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) => classNames(
          'navbar__icon',
          { 'has-background-grey-lighter': isActive },
          { 'nav-link-active': isActive },
        )}
      >
        <img src="img/Icons/Cart.svg" alt="Cart" />

      </NavLink>
    </>
  );
};

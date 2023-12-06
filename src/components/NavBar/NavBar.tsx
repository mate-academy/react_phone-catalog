import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import './NavBar.scss';

type Props = {
  toggleMenu?: () => void;
};

export const NavBar: React.FC<Props> = ({ toggleMenu }) => {
  const handleNalLink = () => {
    if (toggleMenu) {
      toggleMenu();
    }
  };

  return (
    <nav className="nav nav__menu">
      <NavLink
        onClick={handleNalLink}
        className={({ isActive }) => (
          classNames('nav__link', {
            'nav__is-active': isActive,
          })
        )}
        to="/"
      >
        Home
      </NavLink>

      <NavLink
        onClick={handleNalLink}
        className={({ isActive }) => (
          classNames('nav__link', {
            'nav__is-active': isActive,
          })
        )}
        to="/phones"
      >
        Phones
      </NavLink>

      <NavLink
        onClick={handleNalLink}
        className={({ isActive }) => (
          classNames('nav__link', {
            'nav__is-active': isActive,
          })
        )}
        to="/tablets"
      >
        Tablets
      </NavLink>

      <NavLink
        onClick={handleNalLink}
        className={({ isActive }) => (
          classNames('nav__link', {
            'nav__is-active': isActive,
          })
        )}
        to="/accessories"
      >
        Accessories
      </NavLink>
    </nav>
  );
};

NavBar.defaultProps = {
  toggleMenu: () => {},
};

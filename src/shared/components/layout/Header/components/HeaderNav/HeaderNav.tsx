/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';

import { NavLink } from 'react-router-dom';

import classNames from 'classnames';

import { useMenuContext } from '../../../../../../contexts/MenuContext';
import { closeMenu } from '../../../../../../shared/helpers/handlers';

import styles from './HeaderNav.module.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.navbarLink, {
    [styles.linkActive]: isActive,
  });

export const HeaderNav: React.FC = () => {
  const { isMenuOpen, toggleMenu } = useMenuContext();

  return (
    <nav
      className={classNames(styles.navbar, { [styles.menuOpen]: isMenuOpen })}
    >
      <NavLink
        className={getLinkClass}
        to="/"
        onClick={() => closeMenu(isMenuOpen, toggleMenu)}
      >
        Home
      </NavLink>

      <NavLink
        className={getLinkClass}
        to="/phones"
        onClick={() => closeMenu(isMenuOpen, toggleMenu)}
      >
        Phones
      </NavLink>

      <NavLink
        className={getLinkClass}
        to="/tablets"
        onClick={() => closeMenu(isMenuOpen, toggleMenu)}
      >
        Tablets
      </NavLink>

      <NavLink
        className={getLinkClass}
        to="/accessories"
        onClick={() => closeMenu(isMenuOpen, toggleMenu)}
      >
        Accessories
      </NavLink>
    </nav>
  );
};

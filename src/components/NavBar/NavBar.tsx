import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import useMediaQuery from 'react-use-media-query-ts';

import styles from './NavBar.module.scss';
import logo from '../../img/icons/Logo.svg';

import { Icon } from '../Icon/Icon';

export const NavBar = () => {
  const isTablet = useMediaQuery('(max-width: 992px)');
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <nav className={styles.Nav}>
      <div className={styles.NavLeft}>
        <Icon path="/" icon={logo} alt="logo" />
        {isTablet && (
          <button
            type="button"
            className={classNames([styles.NavMenu], {
              [styles.NavMenuActive]: isOpenMenu,
            })}
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          >
            <span />
            <span />
            <span />
          </button>
        )}
      </div>

      <ul className={classNames([styles.Nav], {
        [styles.NavTablet]: isTablet,
        [styles.NavTabletActive]: isOpenMenu,
      })}
      >
        <li>
          <NavLink
            onClick={() => setIsOpenMenu(false)}
            className={({ isActive }) => classNames('uppercase', {
              [styles.active]: isActive,
            })}
            to="/"
          >
            home
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={() => setIsOpenMenu(false)}
            className={({ isActive }) => classNames('uppercase', {
              [styles.active]: isActive,
            })}
            to="catalog/phones"
          >
            phones
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={() => setIsOpenMenu(false)}
            className={({ isActive }) => classNames('uppercase', {
              [styles.active]: isActive,
            })}
            to="catalog/tablets"
          >
            tablets
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={() => setIsOpenMenu(false)}
            className={({ isActive }) => classNames('uppercase', {
              [styles.active]: isActive,
            })}
            to="catalog/accessories"
          >
            accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

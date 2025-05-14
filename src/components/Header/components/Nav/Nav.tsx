import React from 'react';
import classNames from 'classnames';

import { NavLink, useLocation } from 'react-router-dom';

import styles from './Nav.module.scss';
import { Category } from '../../../../types/Category';

export const Nav = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get('category');

  return (
    <nav className={styles.nav}>
      <NavLink
        to="/"
        className={({ isActive }) => {
          return classNames(`${styles.nav__link} uppercase-text`, {
            [styles['nav__link--active']]: isActive,
          });
        }}
      >
        Home
      </NavLink>
      <NavLink
        to={{
          pathname: '/catalog',
          search: `?category=${Category.Phone}&page=1`,
        }}
        className={({ isActive }) => {
          return classNames(`${styles.nav__link} uppercase-text`, {
            [styles['nav__link--active']]:
              isActive && currentCategory === Category.Phone,
          });
        }}
      >
        Phones
      </NavLink>
      <NavLink
        to={{
          pathname: '/catalog',
          search: `?category=${Category.Tablet}&page=1`,
        }}
        className={({ isActive }) => {
          return classNames(`${styles.nav__link} uppercase-text`, {
            [styles['nav__link--active']]:
              isActive && currentCategory === Category.Tablet,
          });
        }}
      >
        Tablets
      </NavLink>
      <NavLink
        to={{
          pathname: '/catalog',
          search: `?category=${Category.Accessories}&page=1`,
        }}
        className={({ isActive }) => {
          return classNames(`${styles.nav__link} uppercase-text`, {
            [styles['nav__link--active']]:
              isActive && currentCategory === Category.Accessories,
          });
        }}
      >
        Accessories
      </NavLink>
    </nav>
  );
};

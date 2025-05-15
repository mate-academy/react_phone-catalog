import React from 'react';
import classNames from 'classnames';

import { NavLink, useSearchParams } from 'react-router-dom';

import styles from './Nav.module.scss';
import { Category } from '../../../../types/Category';

export const Nav = () => {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');

  // Needed for saving all URLSearchParams when user switching
  // switches between product categories (phones/tablets/...)
  const getAllSearchParams = (path: string) => {
    let finalPath = path + '&page=1';
    const allSearchParams = searchParams
      .keys()
      .filter(param => param !== 'category' && param !== 'page');

    allSearchParams.forEach(paramKey => {
      const formattedParamValue = searchParams
        .get(paramKey)
        ?.replaceAll(' ', '+');

      finalPath = `${finalPath}&${paramKey}=${formattedParamValue}`;
    });

    return finalPath;
  };

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
          search: getAllSearchParams(`?category=${Category.Phone}`),
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
          search: getAllSearchParams(`?category=${Category.Tablet}`),
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
          search: getAllSearchParams(`?category=${Category.Accessories}`),
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

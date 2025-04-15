import React from 'react';
import styles from './Navigation.module.scss';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { toggleMenu } from '../../features/settingsSlice';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.nav__link, {
    [styles.nav__link_active]: isActive,
  });

export const Navigation = () => {
  const isTablet = useMediaQuery({ minWidth: 640 });
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(toggleMenu());
    window.scrollTo(0, 0);
  };

  return (
    <nav
      className={classNames(styles.nav, {
        [styles['nav--mobile']]: !isTablet,
      })}
    >
      <ul
        className={classNames(styles.nav__list, {
          [styles['nav__list--mobile']]: !isTablet,
        })}
      >
        <li className={styles.nav__item}>
          <NavLink to="/" className={getLinkClass} onClick={handleClick}>
            home
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink to="phones" className={getLinkClass} onClick={handleClick}>
            Phones
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink to="tablets" className={getLinkClass} onClick={handleClick}>
            tablets
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink
            to="accessories"
            className={getLinkClass}
            onClick={handleClick}
          >
            accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

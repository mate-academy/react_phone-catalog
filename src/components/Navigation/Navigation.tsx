import React from 'react';
import styles from './navigation.module.scss';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../Hooks/hooks';
import { Theme } from '../../services/theme';

export const Navigation: React.FC = () => {
  const theme = useAppSelector(state => state.theme.theme);

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return [
      styles.navigation__links,
      isActive
        ? theme === Theme.light
          ? styles.isActive
          : styles.navigationlinksDark__isActive
        : '',
    ].join(' ');
  };

  return (
    <section
      className={
        theme === Theme.light ? styles.navigation : styles.navigationDark
      }
    >
      <nav className={styles.nav}>
        <ul className={styles.navigation}>
          <li
            className={
              theme === Theme.light
                ? styles.navigationli
                : styles.navigationliDark
            }
          >
            <NavLink
              to={{ pathname: '/', search: '' }}
              className={getLinkClass}
            >
              Home
            </NavLink>
          </li>
          <li
            className={
              theme === Theme.light
                ? styles.navigationli
                : styles.navigationliDark
            }
          >
            <NavLink
              to={{ pathname: '/phones', search: '' }}
              className={getLinkClass}
            >
              Phones
            </NavLink>
          </li>
          <li
            className={
              theme === Theme.light
                ? styles.navigationli
                : styles.navigationliDark
            }
          >
            <NavLink
              to={{ pathname: '/tablets', search: '' }}
              className={getLinkClass}
            >
              Tablets
            </NavLink>
          </li>
          <li
            className={
              theme === Theme.light
                ? styles.navigationli
                : styles.navigationliDark
            }
          >
            <NavLink
              to={{ pathname: '/accessories', search: '' }}
              className={getLinkClass}
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>
    </section>
  );
};

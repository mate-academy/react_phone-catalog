import React from 'react';
import styles from './navigation.module.scss';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../Hooks/hooks';
import { Theme } from '../../Helpers/theme';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/phones', label: 'Phones' },
  { path: '/tablets', label: 'Tablets' },
  { path: '/accessories', label: 'Accessories' },
];

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
          {navItems.map(item => (
            <li
              key={item.path}
              className={
                theme === Theme.light
                  ? styles.navigationli
                  : styles.navigationliDark
              }
            >
              <NavLink
                to={{ pathname: item.path, search: '' }}
                className={getLinkClass}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};

import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { useStateContext } from '../../hooks/useStateContext';

import styles from './Nav.module.scss';

const NAV_LINKS = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Phones',
    path: '/phones',
  },
  {
    title: 'Tablets',
    path: '/tablets',
  },
  {
    title: 'Accessories',
    path: '/accessories',
  },
];

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.nav__link, {
    [styles.active]: isActive,
  });

type Props = {
  orientation: 'horizontal' | 'vertical';
};

export const Nav: React.FC<Props> = ({ orientation }) => {
  const { setIsMenuOpen } = useStateContext();

  return (
    <nav
      className={`${styles.nav} ${styles[`nav--${orientation}`]}`}
      aria-label="Main"
    >
      <ul className={styles.nav__list}>
        {NAV_LINKS.map(item => (
          <li className={styles.nav__item} key={`${item.path}`}>
            <NavLink
              to={item.path}
              className={getLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

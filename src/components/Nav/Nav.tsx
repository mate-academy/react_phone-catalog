import React from 'react';

import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';
import { PathType } from '../../types/Types';

interface NavProps {
  className?: string;
  listClassName?: string;
  linkClassName?: string;
  onClick?: () => void;
}

export const Nav: React.FC<NavProps> = ({
  className = '',
  listClassName = '',
  linkClassName = '',
  onClick,
}) => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    [styles.nav__link, linkClassName, isActive ? 'active' : '']
      .filter(Boolean)
      .join(' ');

  return (
    <nav className={className}>
      <ul
        className={[styles.nav__list, listClassName].filter(Boolean).join(' ')}
      >
        <li className={styles.nav__item}>
          <NavLink to="/" className={getLinkClass} onClick={onClick}>
            Home
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink
            to={PathType.PHONES}
            className={getLinkClass}
            onClick={onClick}
          >
            Phones
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink
            to={PathType.TABLETS}
            className={getLinkClass}
            onClick={onClick}
          >
            Tablets
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink
            to={PathType.ACCESSORIES}
            className={getLinkClass}
            onClick={onClick}
          >
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

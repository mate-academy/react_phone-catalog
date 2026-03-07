import React from 'react';
import { NavLink } from 'react-router-dom';
import { PathType } from '../../types/Types';
import styles from './Nav.module.scss';

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
  const getActiveLinkClass = ({ isActive }: { isActive: boolean }) =>
    [styles.nav__link, linkClassName, isActive ? styles.active : '']
      .filter(Boolean)
      .join(' ');

  return (
    <nav className={className}>
      <ul
        className={[styles.nav__list, listClassName].filter(Boolean).join(' ')}
      >
        <li className={styles.nav__item}>
          <NavLink
            to={PathType.HOME}
            className={getActiveLinkClass}
            onClick={onClick}
          >
            Home
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink
            to={PathType.PHONES}
            className={getActiveLinkClass}
            onClick={onClick}
          >
            Phones
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink
            to={PathType.TABLETS}
            className={getActiveLinkClass}
            onClick={onClick}
          >
            Tablets
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink
            to={PathType.ACCESSORIES}
            className={getActiveLinkClass}
            onClick={onClick}
          >
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

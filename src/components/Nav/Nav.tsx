import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { categories } from '../../data/categoriesData';
import { getActiveLink } from '../../utils/getActiveLink';
import styles from './Nav.module.scss';

interface Props {
  variant: string;
  onLinkClick?: () => void;
}

export const Nav: React.FC<Props> = ({ variant, onLinkClick }) => {
  return (
    <div
      className={classNames(styles.nav, {
        [styles['nav--header']]: variant === 'header',
        [styles['nav--menu']]: variant === 'menu',
      })}
    >
      <ul className={styles.nav__list}>
        {categories.map((category, index) => (
          <li className={styles.nav__item} key={index}>
            <NavLink
              to={category.name}
              onClick={onLinkClick}
              className={({ isActive }) =>
                getActiveLink({ isActive, element: 'nav__link', styles })
              }
            >
              {category.name.length > 1
                ? category.name.charAt(0).toUpperCase() + category.name.slice(1)
                : 'Home'}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

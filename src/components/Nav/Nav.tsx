import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
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
        <li className={styles.nav__item}>
          <NavLink
            to="/"
            onClick={onLinkClick}
            className={({ isActive }) =>
              getActiveLink({ isActive, element: 'nav__link', styles })
            }
          >
            Home
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink
            to="/phones"
            onClick={onLinkClick}
            className={({ isActive }) =>
              getActiveLink({ isActive, element: 'nav__link', styles })
            }
          >
            Phones
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink
            to="/tablets"
            onClick={onLinkClick}
            className={({ isActive }) =>
              getActiveLink({ isActive, element: 'nav__link', styles })
            }
          >
            Tablets
          </NavLink>
        </li>
        <li className={styles.nav__item}>
          <NavLink
            to="/accessories"
            onClick={onLinkClick}
            className={({ isActive }) =>
              getActiveLink({ isActive, element: 'nav__link', styles })
            }
          >
            Accessories
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

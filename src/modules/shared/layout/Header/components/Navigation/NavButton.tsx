import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Navigation.module.scss';
import React, { useContext } from 'react';
import { HeaderContext } from '../../context/HeaderContext';

type Props = {
  to: string;
  children: React.ReactNode;
};

export const NavButton = ({ to, children, ...props }: Props) => {
  const { setShowNavigation } = useContext(HeaderContext);
  const location = useLocation();

  return (
    <li className={styles['nav__buttons--item']}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          classNames(styles['nav__buttons--link'], {
            [styles.active]: isActive,
          })
        }
        state={{ from: location.pathname + location.search }}
        onClick={() => setShowNavigation(false)}
        {...props}
      >
        {children}
      </NavLink>
    </li>
  );
};

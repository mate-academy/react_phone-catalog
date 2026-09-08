import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Navigation.module.scss';
import React, { useContext } from 'react';
import { HeaderContext } from '../../context/HeaderContext';

type Props = {
  to: string;
  children: React.ReactNode;
};

export const NavItem = ({ to, children, ...props }: Props) => {
  const { setShowNavigation } = useContext(HeaderContext);

  return (
    <li className={`uppercase-text ${styles['nav__links--item']}`}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          classNames(styles['nav__links--link'], {
            [styles.active]: isActive,
          })
        }
        onClick={() => setShowNavigation(false)}
        {...props}
      >
        {children}
      </NavLink>
    </li>
  );
};
